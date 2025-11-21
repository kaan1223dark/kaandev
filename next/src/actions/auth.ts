'use server';
import { signIn as authSignIn, signOut as authSignOut } from '@/auth';
import { redirect } from 'next/navigation';

export const signIn = async (provider = 'azure-ad-b2c', options?: any) =>
  authSignIn(provider, options);
export const signOut = async (provider = 'azure-ad-b2c') => {
  await authSignOut({ redirect: false });
  if (provider === 'azure-ad-b2c') {
    const logoutUrl = `https://${process.env.AZURE_TENANT_ID}.ciamlogin.com/${process.env.AZURE_TENANT_ID}/oauth2/logout?client_id=${process.env.AZURE_P_CLIENT_ID}&post_logout_redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}`;
    redirect(logoutUrl);
  } else {
    redirect(process.env.NEXT_PUBLIC_BASE_URL as string);
  }
};
