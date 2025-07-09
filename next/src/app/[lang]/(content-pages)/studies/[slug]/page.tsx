import { getStrapiData } from '@/libs/strapi/get-strapi-data';
import { Dictionary, SupportedLanguage } from '@/models/locale';
import { APIResponseCollection } from '@/types/types';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface EventProps {
  params: Promise<{ slug: string; lang: SupportedLanguage }>;
  contentData: any;
  dictionary: Dictionary;
  lang: SupportedLanguage;
}

export default async function Event(props: EventProps) {
  const params = await props.params;
  /* eslint-disable */
  // ... diğer importlar ve kodlar
  console.log('yazdir sayfası render edildi!' + params.slug);
  // ... diğer kodlar
  /* eslint-enable */
  const url = `/api/gruplars?filters[slug][$eq]=${params.slug}&populate=*`;
  const event = await getStrapiData<
    APIResponseCollection<'api::gruplar.gruplar'>
  >(params.lang, url, [`event-${params.slug}`], true);
  if (!event || !event.data || event?.data?.length === 0) {
    /* eslint-disable */
    // ... diğer importlar ve kodlar
    console.warn('event verisi bulunamadi!', event);
    // ... diğer kodlar
    /* eslint-enable */
    redirect(`/${params.lang}/404`);
  }
  const firstChild = event.data[0].attributes.DescriptionEn?.[0]?.children?.[0];
  const text =
    params.lang === 'en' && firstChild && firstChild.type === 'text'
      ? firstChild.text
      : 'Boş veya metin değil';
  const secondChild =
    event.data[0].attributes.DescriptionTr?.[0]?.children?.[0];

  // const texttwo =
  params.lang === 'tr' && secondChild && secondChild.type === 'text'
    ? secondChild.text
    : 'Boş veya metin değil';
  /* eslint-disable */
  // ... diğer importlar ve kodlar
  console.log('yazdir sayfası render edildi! ' + JSON.stringify(text, null, 2));
  // ... diğer kodlar
  /* eslint-enable */
  return (
    <>
      <div className="flex w-full gap-12">
        <div className="flex w-full flex-col gap-12">
          <div className="relative aspect-[3/1] w-full rounded-lg bg-gradient-to-r from-secondary-400 to-primary-300" />

          <div className="relative flex flex-col gap-4">
            <h1> {params.lang === 'en' ? text : text}</h1>
            <div className="flex flex-col opacity-40">
              <p className="text-sm">
                {'ss'}: {'sss'}
              </p>
            </div>
            <div className="luuppi-pattern absolute -left-28 -top-28 -z-50 h-[401px] w-[601px] max-md:left-0 max-md:w-full" />
          </div>
          <article className="organization-page prose prose-custom max-w-full decoration-secondary-400 transition-all duration-300 ease-in-out" />

          <div className="luuppi-questions-bg flex flex-col items-center justify-center gap-4 rounded-xl bg-secondary-400 p-6 text-center text-white shadow-sm">
            <h2 className="text-2xl font-bold">{'sss'}</h2>
            <p className="max-w-md">{'sss'}</p>
            <Link className="link text-white" href={`mailto:${'dss'}`}>
              {'xxx'}
            </Link>
          </div>
        </div>
        <div className="sticky top-36 flex h-[calc(100vh-180px)] w-full max-w-80 flex-col gap-8 max-lg:hidden">
          <div className="flex flex-col" />

          <div className="flex w-full flex-col gap-2 px-4">
            <h6 className="text-lg font-bold">{'sss'}</h6>
            <div className="flex flex-col gap-4">
              <Link key={'sss'} href={'dd'} />
              <Link key={'ssss'} href={'dd'} />
              <Link key={'sssss'} href={'dd'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
