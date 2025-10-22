type AuthenticationLevel = 'authenticated' | 'luuppi-hato' | 'luuppi-member';

export interface NavLink {
  translation: string;
  href?: string;
  authenticationLevel?: AuthenticationLevel;
  sublinks?: {
    translation: string;
    href: string;
  }[];
}

export const navLinksDesktop: NavLink[] = [
  {
    translation: 'home',
    href: '/',
  },
  {
    translation: 'organization',
    sublinks: [
      {
        translation: 'introduction',
        href: '/hakkimizda',
      },
    ],
  },
  {
    translation: 'studies',
    sublinks: [
      {
        translation: 'general',
        href: '/etkinlikguruplari',
      },
      {
        translation: 'workshops',
        href: '/etkinlikguruplari/atolyeler',
      },
    ],
  },
  {
    translation: 'tutoring',
    sublinks: [
      {
        translation: 'general',
        href: '/ozelders',
      },
      {
        translation: 'larpake',
        href: '/ozelders/dersler',
      },
      {
        translation: 'faq',
        href: '/ozelders/faq',
      },
    ],
  },
  {
    translation: 'events',
    href: '/etkinliktakvimi',
  },
  {
    translation: 'contact',
    sublinks: [
      {
        translation: 'contact',
        href: '/iletisim',
      },
      {
        translation: 'feedback',
        href: '/oneriveyorum',
      },
    ],
  },
];

// Mobile links are separated from desktop links to allow
// for different navigation structures. We wan't to prioritize
// the most important links on mobile and hide the rest under
export const navLinksMobile: NavLink[] = [
  {
    translation: 'home',
    href: '/',
  },
  {
    translation: 'organization',
    sublinks: [
      {
        translation: 'introduction',
        href: '/hakkimizda',
      },
    ],
  },
  {
    translation: 'studies',
    sublinks: [
      {
        translation: 'general',
        href: '/etkinlikguruplari',
      },
      {
        translation: 'workshops',
        href: '/etkinlikguruplari/atolyeler',
      },
    ],
  },
  {
    translation: 'tutoring',
    sublinks: [
      {
        translation: 'general',
        href: '/ozelders',
      },
      {
        translation: 'larpake',
        href: '/ozelders/dersler',
      },
      {
        translation: 'faq',
        href: '/ozelders/faq',
      },
    ],
  },
  {
    translation: 'events',
    href: '/etkinliktakvimi',
  },
  {
    translation: 'contact',
    sublinks: [
      {
        translation: 'contact',
        href: '/iletisim',
      },
      {
        translation: 'feedback',
        href: '/oneriveyorum',
      },
    ],
  },
];
