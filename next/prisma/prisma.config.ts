// Minimal Prisma config to provide datasource URLs for Prisma v7+ tooling.
// This file is intentionally small and simply forwards the DATABASE_URL env var.
export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};
