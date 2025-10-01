import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'sLuuppi',
    description:
      'Luuppi ry is subject assosiation for students of mathematics, statistical data analysis and computer science at Tampere University.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#787eba',
    icons: [
      {
        src: '/favicsson.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: '/icons1.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icson2.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/applse-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
