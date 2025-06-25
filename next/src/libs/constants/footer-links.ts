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
        href: '/organization',
      },
    ],
  },
  {
    translation: 'studies',
    sublinks: [
      {
        translation: 'general',
        href: '/studies',
      },
      {
        translation: 'workshops',
        href: '/studies/workshops',
      },
    ],
  },
  {
    translation: 'events',
    sublinks: [
      {
        translation: 'general',
        href: '/events',
      },
    ],
  },
  {
    translation: 'tutoring',
    sublinks: [
      {
        translation: 'general',
        href: '/tutoring',
      },
      {
        translation: 'larpake',
        href: '/tutoring/larpake',
      },
      {
        translation: 'faq',
        href: '/tutoring/faq',
      },
    ],
  },
  {
    translation: 'contact',
    sublinks: [
      {
        translation: 'contact',
        href: '/contact',
      },
      {
        translation: 'feedback',
        href: '/contact/feedback',
      },
    ],
  },
];
