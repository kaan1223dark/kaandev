/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Local Strapi (development)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Production Strapi (domain)
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace(
          'https://',
          '',
        ).replace('http://', ''),
        pathname: '/uploads/**',
      },
      // Production Strapi (IP adresi)
      {
        protocol: 'http',
        hostname: '156.67.63.251',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  // Production'da IP/domain çakışmasını önlemek için
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        process.env.NEXT_PUBLIC_STRAPI_BASE_URL?.replace(
          'https://',
          '',
        ).replace('http://', ''),
        '156.67.63.251:1337',
      ],
    },
  },
};

export default nextConfig;
