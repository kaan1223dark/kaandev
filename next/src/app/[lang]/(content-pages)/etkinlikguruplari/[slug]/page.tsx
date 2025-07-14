import BlockRendererClient from '@/components/BlockRendererClient/BlockRendererClient';
import { getStrapiData } from '@/libs/strapi/get-strapi-data';
import { getStrapiUrl } from '@/libs/strapi/get-strapi-url';
import { Dictionary, SupportedLanguage } from '@/models/locale';
import { APIResponseCollection } from '@/types/types';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { BlocksContent } from '@strapi/blocks-react-renderer';

// 🔧 getPlainText fonksiyonu en üste taşındı
function getPlainText(blocks?: BlocksContent): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map((block) => {
      if (!block.children) return '';
      return block.children.map((child) => child.text).join(' ');
    })
    .join('\n\n');
}

interface EventProps {
  params: Promise<{ slug: string; lang: SupportedLanguage }>;
  contentData: any;
  dictionary: Dictionary;
  lang: SupportedLanguage;
}

export default async function Event(props: EventProps) {
  const params = await props.params;

  console.log('yazdir sayfası render edildi!' + params.slug);

  const url = `/api/gruplars?filters[slug][$eq]=${params.slug}&populate=*`;

  const event = await getStrapiData<
    APIResponseCollection<'api::gruplar.gruplar'>
  >(params.lang, url, [`event-${params.slug}`], true);

  if (!event || !event.data || event?.data?.length === 0) {
    console.warn('event verisi bulunamadi!', event);
    redirect(`/${params.lang}/404`);
  }

  const eventData = event.data[0].attributes;
  //?.data?.attributes?.url

  //const imageUrlLocalized = eventData.image?.data?.attributes?.url;
  const imageUrlLocalized =
  params.lang === 'en' && eventData.imageEn?.data?.attributes?.url
    ? eventData.imageEn.data.attributes.url
    : eventData.image?.data?.attributes?.url;
 
  const imageUrl = imageUrlLocalized ? getStrapiUrl(imageUrlLocalized) : null;

  const descriptionRaw =
    params.lang === 'en' ? eventData.DescriptionEn : eventData.DescriptionTr;

  const descriptionText = getPlainText(descriptionRaw);

  const firstChild = eventData.DescriptionEn?.[0]?.children?.[0];
  const secondChild = eventData.DescriptionTr?.[0]?.children?.[0];

  const title =
    params.lang === 'en' && firstChild?.type === 'text'
      ? eventData.TitleEn
      : eventData.TitleTr;

  const text =
    params.lang === 'en' && firstChild?.type === 'text'
      ? firstChild.text
      : 'Boş veya metin değil';

  const texttwo =
    params.lang === 'tr' && secondChild?.type === 'text'
      ? secondChild.text
      : 'Boş veya metin değil';

  console.log(
    'yazdir sayfası render edildiss! ' +
      JSON.stringify(imageUrl, null, 2)
  );

  return (
     <div className="flex w-full gap-12">
      <div className="flex w-full flex-col gap-12">
        <div className="relative aspect-[3/1] w-full rounded-lg bg-gradient-to-r from-secondary-400 to-primary-300">
          <Image
            alt="Page banner image"
            className="rounded-lg object-cover"
            src={imageUrl}
            fill
          />
        </div>

        <div className="relative flex flex-col gap-4">
          <h1>{title}</h1>
          <div className="flex flex-col opacity-40">
            
          </div>
          <div className="luuppi-pattern absolute -left-28 -top-28 -z-50 h-[401px] w-[601px] max-md:left-0 max-md:w-full" />
        </div>
        <article className="organization-page prose prose-custom max-w-full decoration-secondary-400 transition-all duration-300 ease-in-out">
         {descriptionText}
        </article>
   
          <div className="luuppi-questions-bg flex flex-col items-center justify-center gap-4 rounded-xl bg-secondary-400 p-6 text-center text-white shadow-sm">
            <h2 className="text-2xl font-bold">
              {"sssssssss"}
            </h2>
            <p className="max-w-md">
              {"sssssssssssssxxxx"}
            </p>
         
          </div>
       
      </div>
      <div className="sticky top-36 flex h-[calc(100vh-180px)] w-full max-w-80 flex-col gap-8 max-lg:hidden">
        <div className="flex flex-col">
         
        </div>
        
      </div>
    </div>
  );
}
