import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Finike Etkinlik',
    short_name: 'Finike Etkinlik',
    description:
      'Finike Etkinlik Platformu Finikede kültürel etkinlikleri destekleyen gönüllülerden oluşan bir çatı oluşumudur.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#787eba',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: '/icon1.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon2.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
