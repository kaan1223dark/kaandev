import ContentPage from '@/components/ContentPage/ContentPage';
import { getDictionary } from '@/dictionaries';
import { formatMetadata } from '@/libs/strapi/format-metadata';
import { getStrapiData } from '@/libs/strapi/get-strapi-data';
import { SupportedLanguage } from '@/models/locale';
import { APIResponse } from '@/types/types';
import { Metadata } from 'next';

const url =
  '/api/organization-general?populate[0]=Content.banner&populate[1]=Seo.twitter.twitterImage&populate[2]=Seo.openGraph.openGraphImage';
const tags = ['organization-general'];

interface OrganizationProps {
  params: Promise<{ lang: SupportedLanguage }>;
}

export default async function Organization(props: OrganizationProps) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);

  const pageData = await getStrapiData<
    APIResponse<'api::organization-general.organization-general'>
  >(params.lang, url, tags);

  return (
    <ContentPage
      contentData={pageData.data}
      dictionary={dictionary}
      lang={params.lang}
    />

    /*
    <section className="py-12 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-10 text-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
        Kurslar ve Özel Dersler
      </h2>
      <p className="mt-2 text-base text-gray-600">
        Alanında uzman eğitmenlerle hemen öğrenmeye başlayın.
      </p>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-50 rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden">
          <img
            src={`https://source.unsplash.com/400x200/?education,course,${i}`}
            alt="Kurs Görseli"
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800">Kurs Başlığı #{i}</h3>
            <p className="mt-2 text-sm text-gray-600">
              Bu kurs ile temel bilgilerden ileri seviyeye kadar ilerleyin.
            </p>
            <button className="mt-4 w-full bg-indigo-600 text-white font-medium py-2 rounded hover:bg-indigo-700 transition">
              Detayları Gör
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    */
  );
}

export async function generateMetadata(
  props: OrganizationProps,
): Promise<Metadata> {
  const params = await props.params;
  const data = await getStrapiData<
    APIResponse<'api::organization-general.organization-general'>
  >(params.lang, url, tags);

  const pathname = `/${params.lang}/organization`;

  return formatMetadata(data, pathname);
}
