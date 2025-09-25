import Banner from '@/components/Banner/Banner';
import EventsPreview from '@/components/EventsPreview/EventsPreviewcopy';
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

      <EventsPreview dictionary={dictionary} lang={params.lang} />
      <Banner lang={params.lang} />
    </>
  );
}
