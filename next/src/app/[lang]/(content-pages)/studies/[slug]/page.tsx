import { getStrapiData } from '@/libs/strapi/get-strapi-data';
import { SupportedLanguage } from '@/models/locale';
import { APIResponseCollection } from '@/types/types';
import { redirect } from 'next/navigation';
interface EventProps {
  params: Promise<{ slug: string; lang: SupportedLanguage }>;
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
  const texttwo =
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
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Başlık Bölümü (Tüm sayfalarda aynı) */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-4xl font-bold text-gray-800">
              {'baslık'}
            </h1>
            <p className="text-xl text-gray-600">{'ss'}</p>
          </div>
          {/* İçerik Bölümü (Dinamik) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Sol Kolon - Grup Bilgileri */}
            <div className="md:col-span-2">
              <div className="overflow-hidden rounded-xl bg-white shadow-md">
                <div className="h-64 w-full rounded-xl border-2 border-dashed bg-gray-200 md:h-80" />
                <div className="p-6">
                  <div className="prose max-w-none" />
                  <div className="mt-6">
                    <h3 className="mb-3 text-xl font-semibold">
                      {params.lang === 'en' ? text : texttwo}
                    </h3>
                    <ul className="space-y-2">
                      <li key={'a'} className="flex items-start">
                        <span className="mr-2 text-blue-600">•</span>
                        <span>{'ss'}</span>
                      </li>
                      <li key={'b'} className="flex items-start">
                        <span className="mr-2 text-blue-600">•</span>
                        <span>{'ss'}</span>
                      </li>
                      <li key={'c'} className="flex items-start">
                        <span className="mr-2 text-blue-600">•</span>
                        <span>{'ss'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-6 rounded-xl bg-blue-50 p-6">
                <h3 className="mb-3 text-lg font-semibold">
                  Öne Çıkan Etkinlik
                </h3>
                <p className="text-gray-700">{'ssssss'}</p>
                <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700">
                  Katıl
                </button>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-4 text-lg font-semibold">Grup Kuralları</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">•</span>
                    <span>Tüm üyeler birbirine saygı göstermelidir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">•</span>
                    <span>Etkinliklere zamanında katılım önemlidir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">•</span>
                    <span>Malzeme ve ekipmanlar özenle kullanılmalıdır</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-600">•</span>
                    <span>Grup kararlarına uyulmalıdır</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
