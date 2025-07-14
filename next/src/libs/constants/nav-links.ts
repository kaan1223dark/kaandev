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
        href: '/ozelders/larpake',
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
    translation: 'profile',
    href: '/profile',
    authenticationLevel: 'authenticated',
  },
  {
    translation: 'own_events',
    href: '/own-events',
    authenticationLevel: 'authenticated',
  },
  {
    translation: 'migrate_account',
    href: '/migrate-account',
    authenticationLevel: 'authenticated',
  },
  {
    translation: 'admin',
    href: '/admin?mode=user',
    authenticationLevel: 'luuppi-hato',
  },
  {
    translation: 'sports',
    href: '/sports',
  },
  {
    translation: 'events',
    href: '/etkinliktakvimi',
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
        href: '/ozelders/larpake',
      },
      {
        translation: 'faq',
        href: '/ozelders/faq',
      },
    ],
  },
  {
    translation: 'organization',
    sublinks: [
      {
        translation: 'introduction',
        href: '/hakkimizda',
      },
      {
        translation: 'rules',
        href: '/hakkimizda/rules',
      },
      {
        translation: 'board',
        href: '/hakkimizda/board',
      },
      {
        translation: 'office',
        href: '/hakkimizda/office',
      },
      {
        translation: 'tradition_guidelines',
        href: '/organization/tradition-guidelines',
      },
      {
        translation: 'honorary_members',
        href: '/organization/honorary-members',
      },
      {
        translation: 'member_benefits',
        href: '/organization/benefits',
      },
      {
        translation: 'songbook',
        href: '/organization/songbook',
      },
      {
        translation: 'documents',
        href: '/organization/documents',
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
    translation: 'collaboration',
    sublinks: [
      {
        translation: 'general',
        href: '/collaboration',
      },
      {
        translation: 'companies',
        href: '/collaboration/companies',
      },
    ],
  },
  {
    translation: 'communication',
    sublinks: [
      {
        translation: 'news',
        href: '/news',
      },
      {
        translation: 'sanomat',
        href: '/luuppi-sanomat',
      },
      {
        translation: 'gallery',
        href: 'https://luuppiry.kuvat.fi/kuvat/',
      },
    ],
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
