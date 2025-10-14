import { getStrapiData } from '@/libs/strapi/get-strapi-data';
import { SupportedLanguage } from '@/models/locale';
import { APIResponseCollection } from '@/types/types';
import { SitemapItemLoose, SitemapStream, streamToPromise } from 'sitemap';

/**
 * Get static pages for sitemap. There is no clean way
 * to get all static pages automatically, so this is something that
 * needs to be maintained manually. :(
 * @param lang "fi" or "en
 * @returns array of static pages
 */
export const dynamic = 'force-dynamic'; // ← bu satırı ekle
const getStaticPages = (lang: SupportedLanguage) => {
  const staticPages = [
    // General
    `/${lang}`,

    // Organization
    `/${lang}/organization`,
    `/${lang}/organization/rules`,
    `/${lang}/organization/songbook`,
    `/${lang}/organization/board`,
    `/${lang}/organization/office`,
    `/${lang}/organization/tradition-guidelines`,
    `/${lang}/organization/honorary-members`,
    `/${lang}/organization/benefits`,
    `/${lang}/organization/documents`,

    // Studies
    `/${lang}/studies`,
    `/${lang}/studies/workshops`,

    // Tutoring
    `/${lang}/tutoring`,
    `/${lang}/tutoring/larpake`,
    `/${lang}/tutoring/faq`,

    // Collaboration
    `/${lang}/collaboration`,
    `/${lang}/collaboration/companies`,

    // Events
    `/${lang}/events`,

    // Sanomat
    `/${lang}/luuppi-sanomat`,

    // Sports
    `/${lang}/sports`,

    // Contact
    `/${lang}/contact`,

    // Feedback
    `/${lang}/feedback`,

    // Privacy policy
    `/${lang}/privacy-policy`,
  ];

  return staticPages;
};

/**
 * TODO: This is a temporary solution for sitemap generation.
 * Nextjs not supporting languages on it's own sitemap.xml generation.
 * PR: https://github.com/vercel/next.js/pull/53765
 *
 * (There is nothing more permanent than a temporary solution :D)
 *
 * @returns sitemap.xml
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const fiStaticPages = getStaticPages('tr');
  const enStaticPages = getStaticPages('en');

  const staticEnglishSitemap: SitemapItemLoose[] = enStaticPages.map((url) => ({
    url: url,
    links: [
      { hreflang: 'tr', url: url.replace('/en/', '/tr/'), lang: 'tr' },
      { hreflang: 'en', url: url, lang: 'en' },
    ],
  }));

  const staticFinnishSitemap: SitemapItemLoose[] = fiStaticPages.map((url) => ({
    url: url,
    links: [
      { hreflang: 'tr', url: url, lang: 'tr' },
      { hreflang: 'en', url: url.replace('/tr/', '/en/'), lang: 'en' },
    ],
  }));

  const boardData = await getStrapiData<
    APIResponseCollection<'api::board.board'>
  >('tr', '/api/boards', ['board']);

  const luuppiSanomatData = await getStrapiData<
    APIResponseCollection<'api::luuppi-sanomat.luuppi-sanomat'>
  >('tr', '/api/luuppi-sanomats', ['luuppi-sanomat']);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const url = `/api/events?filters[StartDate][$gte]=${weekAgo.toISOString()}&pagination[limit]=9999&sort[0]=createdAt:desc`;

  const eventsData = await getStrapiData<
    APIResponseCollection<'api::event.event'>
  >('tr', url, ['event']);

  const eventPagesSiteMap: SitemapItemLoose[] = eventsData.data.map(
    (event) => ({
      url: `/tr/events/${event.id}`,
      links: [
        {
          hreflang: 'tr',
          url: `/tr/events/${event.id}`,
          lang: 'tr',
        },
        {
          hreflang: 'en',
          url: `/en/events/${event.id}`,
          lang: 'en',
        },
      ],
    }),
  );

  const eventPagesSiteMapEn: SitemapItemLoose[] = eventsData.data.map(
    (event) => ({
      url: `/en/events/${event.id}`,
      links: [
        {
          hreflang: 'en',
          url: `/en/events/${event.id}`,
          lang: 'en',
        },
        {
          hreflang: 'tr',
          url: `/tr/events/${event.id}`,
          lang: 'tr',
        },
      ],
    }),
  );

  const boardPages: SitemapItemLoose[] = boardData.data
    .sort((a, b) => b.attributes.year - a.attributes.year)
    .map((board) => ({
      url: `/tr/organization/board/${board.attributes.year}`,
      lastmod: new Date(board.attributes.updatedAt!).toISOString(),
      links: [
        {
          hreflang: 'tr',
          url: `/tr/organization/board/${board.attributes.year}`,
          lang: 'tr',
        },
        {
          hreflang: 'en',
          url: `/en/organization/board/${board.attributes.year}`,
          lang: 'en',
        },
      ],
    }))
    .slice(1);

  const sanomatPages: SitemapItemLoose[] = luuppiSanomatData.data.map(
    (sanomat) => ({
      url: `/tr/luuppi-sanomat/${sanomat.id}`,
      lastmod: new Date(sanomat.attributes.updatedAt!).toISOString(),
      links: [
        {
          hreflang: 'tr',
          url: `/tr/luuppi-sanomat/${sanomat.id}`,
          lang: 'tr',
        },
        {
          hreflang: 'en',
          url: `/en/luuppi-sanomat/${sanomat.id}`,
          lang: 'en',
        },
      ],
    }),
  );

  const boardPagesSiteMap: SitemapItemLoose[] = boardPages.map((page) => ({
    url: page.url,
    lastmod: page.lastmod,
    links: [
      { hreflang: 'tr', url: page.url, lang: 'tr' },
      { hreflang: 'en', url: page.url.replace('/tr/', '/en/'), lang: 'en' },
    ],
  }));

  const boardPagesSiteMapEn: SitemapItemLoose[] = boardPages.map((page) => ({
    url: page.url.replace('/tr/', '/en/'),
    lastmod: page.lastmod,
    links: [
      { hreflang: 'en', url: page.url.replace('/tr/', '/en/'), lang: 'en' },
      { hreflang: 'tr', url: page.url, lang: 'tr' },
    ],
  }));

  const sanomatPagesSiteMap: SitemapItemLoose[] = sanomatPages.map((page) => ({
    url: page.url,
    lastmod: page.lastmod,
    links: [
      { hreflang: 'tr', url: page.url, lang: 'tr' },
      { hreflang: 'en', url: page.url.replace('/tr/', '/en/'), lang: 'en' },
    ],
  }));

  const sanomatPagesSiteMapEn: SitemapItemLoose[] = sanomatPages.map(
    (page) => ({
      url: page.url.replace('/tr/', '/en/'),
      lastmod: page.lastmod,
      links: [
        { hreflang: 'en', url: page.url.replace('/tr/', '/en/'), lang: 'en' },
        { hreflang: 'tr', url: page.url, lang: 'tr' },
      ],
    }),
  );

  const sitemap: SitemapItemLoose[] = [
    ...boardPagesSiteMap,
    ...boardPagesSiteMapEn,
    ...staticFinnishSitemap,
    ...staticEnglishSitemap,
    ...eventPagesSiteMap,
    ...eventPagesSiteMapEn,
    ...sanomatPagesSiteMap,
    ...sanomatPagesSiteMapEn,
  ];

  const smStream = new SitemapStream({
    hostname: baseUrl,
  });

  sitemap.forEach((item) => {
    smStream.write(item);
  });

  smStream.end();

  const sitemapXml = (await streamToPromise(smStream)).toString();

  const res = new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });

  return res;
}
