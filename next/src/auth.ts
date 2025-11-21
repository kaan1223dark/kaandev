import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import AzureB2C from 'next-auth/providers/azure-ad-b2c';
import Credentials from 'next-auth/providers/credentials';
import 'server-only';
import prisma from './libs/db/prisma';
import { logger } from './libs/utils/logger';

// Validate required Azure AD env variables at startup so errors are explicit
// and easy to diagnose (fails fast with clear message).
const _validateAzureEnv = () => {
  const required = [
    'AZURE_P_CLIENT_ID',
    'AZURE_P_CLIENT_SECRET',
    'AZURE_TENANT_ID',
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    const msg = `Missing required Azure env vars: ${missing.join(', ')}`;
    logger.error(msg);
    throw new Error(msg);
  }
};

_validateAzureEnv();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    AzureB2C({
      clientId: process.env.AZURE_P_CLIENT_ID,
      clientSecret: process.env.AZURE_P_CLIENT_SECRET,
      authorization: {
        url: `https://${process.env.AZURE_TENANT_ID}.ciamlogin.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/authorize`,
        params: {
          code_challenge_method: undefined,
          code_challenge: undefined,
        },
      },
      issuer: `https://${process.env.AZURE_TENANT_ID}.ciamlogin.com/${process.env.AZURE_TENANT_ID}/v2.0`,
      token: {
        url: `https://${process.env.AZURE_TENANT_ID}.ciamlogin.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
        grant_type: 'authorization_code',
      },
    }),

    /* Credentials provider for username/email + password */
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          // Cast email to string for TypeScript compatibility
          const email = credentials.email as string;

          const user = (await prisma.user.findUnique({
            where: { email },
          })) as any;
          if (!user || !user.localAuth || !user.passwordHash) return null;
          const valid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash as string,
          );
          if (!valid) return null;

          /* Return a minimal user object for session */
          return {
            id: user.entraUserUuid,
            email: user.email,
            name: user.username ?? user.email,
          } as any;
        } catch (e) {
          logger.error('Error in credentials authorize', e);
          return null;
        }
      },
    }),
  ],
  pages: {
    error: '/auth/error',
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.entraUserUuid = token.id as string;
        session.user.isLuuppiHato = token.isLuuppiHato as boolean;
        session.user.isLuuppiMember = token.isLuuppiMember as boolean;
        session.user.name = token.username as string;
      }

      // Forces user to sign in again if token version is outdated.
      // Useful for forcing users to sign in again after updating token version if
      // major changes have been made to the token structure.
      if (!token.version || token.version !== process.env.TOKEN_VERSION) {
        throw new Error('Token version mismatch');
      }

      // This should never happen, but just in case
      if (!session.user.entraUserUuid) {
        throw new Error('Malformed token');
      }

      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        // Azure AD B2C flow (id_token present)
        if (account.provider === 'azure-ad-b2c') {
          const idToken = account.id_token;
          if (idToken) {
            let decoded: null | { email: string; oid: string } = null;
            try {
              decoded = jwt.decode(idToken) as { email: string; oid: string };
            } catch (e) {
              logger.error('Error decoding JWT', e);
            }
            if (decoded) {
              token.email = decoded.email;
              token.id = decoded.oid;

              // Update/create user in local database using entraUserUuid

              const localUser = await (prisma as any).user.upsert({
                where: { entraUserUuid: decoded.oid },
                update: {
                  email: decoded.email,
                  roles: {
                    connectOrCreate: {
                      where: {
                        strapiRoleUuid_entraUserUuid: {
                          entraUserUuid: decoded.oid,
                          strapiRoleUuid: process.env.NEXT_PUBLIC_NO_ROLE_ID!,
                        },
                      },
                      create: {
                        role: {
                          connect: {
                            strapiRoleUuid: process.env.NEXT_PUBLIC_NO_ROLE_ID!,
                          },
                        },
                      },
                    },
                  },
                },
                create: {
                  entraUserUuid: decoded.oid,
                  email: decoded.email,
                  roles: {
                    create: {
                      role: {
                        connect: {
                          strapiRoleUuid: process.env.NEXT_PUBLIC_NO_ROLE_ID!,
                        },
                      },
                    },
                  },
                },
                include: {
                  roles: {
                    include: { role: true },
                    where: {
                      OR: [
                        { expiresAt: { gte: new Date() } },
                        { expiresAt: null },
                      ],
                    },
                  },
                },
              });

              const hasRole = (roleUuid: string) =>
                (localUser.roles as any[]).some(
                  (role: any) => role.role.strapiRoleUuid === roleUuid,
                );

              token.isLuuppiHato = hasRole(
                process.env.NEXT_PUBLIC_LUUPPI_HATO_ID!,
              );
              token.isLuuppiMember = hasRole(
                process.env.NEXT_PUBLIC_LUUPPI_MEMBER_ID!,
              );
              token.username = localUser.username;
              token.version = process.env.TOKEN_VERSION;
            }
          }
        } else if (account.provider === 'credentials') {
          // Credentials provider: `user` contains the returned object from authorize()
          if (user && (user as any).email) {
            const email = (user as any).email;

            const localUser = await (prisma as any).user.upsert({
              where: { email },
              update: {
                username: (user as any).name ?? undefined,
                localAuth: true,
              },
              create: {
                email,
                username: (user as any).name ?? undefined,
                localAuth: true,
                roles: {
                  create: {
                    role: {
                      connect: {
                        strapiRoleUuid: process.env.NEXT_PUBLIC_NO_ROLE_ID!,
                      },
                    },
                  },
                },
              },
              include: {
                roles: {
                  include: { role: true },
                  where: {
                    OR: [
                      { expiresAt: { gte: new Date() } },
                      { expiresAt: null },
                    ],
                  },
                },
              },
            });

            const hasRole = (roleUuid: string) =>
              (localUser.roles as any[]).some(
                (role: any) => role.role.strapiRoleUuid === roleUuid,
              );

            token.email = localUser.email;
            token.id = localUser.entraUserUuid;
            token.isLuuppiHato = hasRole(
              process.env.NEXT_PUBLIC_LUUPPI_HATO_ID!,
            );
            token.isLuuppiMember = hasRole(
              process.env.NEXT_PUBLIC_LUUPPI_MEMBER_ID!,
            );
            token.username = localUser.username;
            token.version = process.env.TOKEN_VERSION;
          }
        }
      }
      return token;
    },
  },
});
