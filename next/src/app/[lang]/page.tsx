import Banner from '@/components/Banner/Banner';
import EventsPreview from '@/components/EventsPreview/EventsPreview';
import { getDictionary } from '@/dictionaries';
import { getOrganizationJsonLd } from '@/libs/utils/json-ld';
import { SupportedLanguage } from '@/models/locale';
import Script from 'next/script';
interface HomeProps {
  params: Promise<{ lang: SupportedLanguage }>;
}
export default async function Home(props: HomeProps) {
  const params = await props.params;
  const dictionary = await getDictionary(params.lang);
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationJsonLd(dictionary)),
        }}
        id="organization-jsonld"
        type="application/ld+json"
      />
      <Banner lang={params.lang} />
      <EventsPreview dictionary={dictionary} lang={params.lang} />
    </>
  );
}
