interface FooterLink {
  translation: string;
  href?: string;
  sublinks?: {
    translation: string;
    href: string;
  }[];
}
export const footerLinks: FooterLink[] = [
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
    translation: 'events',
    sublinks: [
      {
        translation: 'general',
        href: '/etkinliktakvimi',
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
