import { dateFormat } from '@/libs/constants';
import { getStrapiData } from '@/libs/strapi/get-strapi-data';
import { getStrapiUrl } from '@/libs/strapi/get-strapi-url';
import { SupportedLanguage } from '@/models/locale';
import { APIResponseCollection } from '@/types/types';
import { IoCalendarOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5';
;

import { BlocksContent } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import { redirect } from 'next/navigation';

function getPlainText(blocks?: BlocksContent): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .map((block) =>
      Array.isArray(block.children)
        ? block.children
          .map((child) =>
            child.type === 'text' && 'text' in child ? child.text : ''
          )
          .join(' ')
        : ''
    )
    .join('\n\n');
}

interface EventProps {
  params: Promise<{ slug: string; lang: SupportedLanguage }>;
}
export default async function Event(props: EventProps) {
  const params = await props.params;

  const url = `/api/gruplars?filters[slug][$eq]=${params.slug}&populate=*`;

  const event = await getStrapiData<
    APIResponseCollection<'api::gruplar.gruplar'>
  >(params.lang, url, [`event-${params.slug}`], true);

  if (!event?.data?.length) {
    redirect(`/${params.lang}/404`);
  }

  const eventData = event.data[0].attributes;
  const posterUrlLocalized =
    params.lang === 'en'
      ? eventData.SideimgEn?.data?.attributes?.url ?? eventData.SideimgEn?.data?.attributes?.url
      : eventData.SideimgTr?.data?.attributes?.url;

  const posterUrl = posterUrlLocalized ? getStrapiUrl(posterUrlLocalized) : null;

  const imageUrlLocalized =
    params.lang === 'en'
      ? eventData.imageEn?.data?.attributes?.url ?? eventData.image?.data?.attributes?.url
      : eventData.image?.data?.attributes?.url;
  if (!imageUrlLocalized) {
    // eslint-disable-next-line no-console
    //  console.warn('Image URL bulunamadı:', JSON.stringify(eventData, null, 2));
  }

  const imageUrl = imageUrlLocalized ? getStrapiUrl(imageUrlLocalized) : null;

  // const imageUrsl = 'http://localhost:1337/uploads/Whats_App_Image_2025_06_19_at_18_39_35_dc250d1c68.jpeg';

  // eslint-disable-next-line no-console
  console.log('yazdir sayfası render edildiss! ' +
    JSON.stringify(eventData, null, 2));

  const descriptionRaw =
    params.lang === 'en' ? eventData.DescriptionEn : eventData.DescriptionTr;

  const descriptionText = getPlainText(descriptionRaw);

  const title =
    params.lang === 'en'
      ? eventData.TitleEn || eventData.TitleTr
      : eventData.TitleTr;

  const location =
    params.lang === 'en'
      ? eventData.LocationEn || eventData.LocationFi
      : eventData.LocationFi;

  const Tel = eventData.Tel;

  return (
    <div className="flex w-full flex-col gap-12 lg:flex-row">
      {/* Ana İçerik */}
      <div className="flex w-full flex-col gap-12 lg:w-2/3">
        <div className="relative aspect-[3/1] w-full rounded-lg bg-gradient-to-r from-secondary-400 to-primary-300">
          {imageUrl && (
            <Image
              alt="Page banner image"
              className="rounded-lg object-cover"
              src={imageUrl}
              fill
              priority
            />
          )}
        </div>

        <div className="relative flex flex-col gap-4">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <div className="flex flex-col opacity-40" />
          <div className="luuppi-pattern absolute -left-28 -top-28 -z-50 h-[401px] w-[601px] max-md:left-0 max-md:w-full" />
        </div>

        <article className="prose prose-custom max-w-full decoration-secondary-400 transition-all duration-300 ease-in-out">
          {descriptionText}
        </article>
        <div className="flex items-center">
          <div className="mr-2 flex items-center justify-center rounded-full bg-primary-400 p-2 text-white">
            <IoCallOutline className="shrink-0 text-2xl" />
          </div>
          <p className="line-clamp-2">
            {
              Tel
            }
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-2 flex items-center justify-center rounded-full bg-primary-400 p-2 text-white">
            <IoLocationOutline className="shrink-0 text-2xl" />
          </div>
          <p className="line-clamp-2">
            {
              location
            }
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-2 flex items-center justify-center rounded-full bg-primary-400 p-2 text-white">
            <IoCalendarOutline className="shrink-0 text-2xl" />
          </div>
          <p className="line-clamp-2">
            {
              new Date(eventData.Date).toLocaleString(
                params.lang,
                dateFormat,
              )

            }

          </p>
        </div>
        <div className="luuppi-questions-bg flex flex-col items-center justify-center gap-4 rounded-xl bg-secondary-400 p-6 text-center text-white shadow-sm">

          <h2 className="text-2xl font-bold">Etkinlik Detayları</h2>
          <p className="max-w-md">Daha fazla bilgi için iletişime geçin</p>
        </div>
      </div>

      {/* Afiş Bölümü - Mobilde üstte, Desktop'ta sağda sticky */}
      {posterUrl && (
        <div className="sticky top-4 order-first h-fit w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:order-last lg:top-24 lg:w-1/3 lg:self-start">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
            <Image
              alt="Event poster"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={posterUrl}
              fill
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <h3 className="text-xl font-semibold" />
            <p className="text-sm text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
}
