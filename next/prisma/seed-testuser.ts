import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Strapi rolü: NO_ROLE_ID (env'den alınıyor, yoksa elle girin)
  const strapiRoleUuid = process.env.NEXT_PUBLIC_NO_ROLE_ID || 'no-role-uuid';

  // Test kullanıcı bilgileri
  const entraUserUuid = 'test-entra-uuid'; // rastgele bir string
  const email = 'testuser@example.com';
  const username = 'testuser';
  const passwordHash =
    '$2a$10$wH6QJQwQwQwQwQwQwQwQwOQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw'; // "test1234" için bcrypt hash

  // Kullanıcıyı ekle
  const user = await prisma.user.upsert({
    where: { entraUserUuid },
    update: {},
    create: {
      entraUserUuid,
      email,
      username,

      // Eğer schema'da passwordHash alanı yoksa kaldırın
      // passwordHash,
      roles: {
        create: {
          role: {
            connect: { strapiRoleUuid },
          },
        },
      },
    },
    include: { roles: { include: { role: true } } },
  });

  console.log('Test kullanıcı oluşturuldu:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
