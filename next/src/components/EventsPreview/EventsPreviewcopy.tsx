import { Dictionary, SupportedLanguage } from '@/models/locale';
import Link from 'next/link';
interface EventsPreviewProps {
  dictionary: Dictionary;
  lang: SupportedLanguage;
}
export default function EventsPreview({
  dictionary,
  lang,
}: EventsPreviewProps) {
  return (
    <section className="relative bg-[#f5f7fa] py-12 sm:py-16 lg:py-20">
      {/* Slogan (butonların üzerinde) */}
      <div className="relative z-10 mb-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700 sm:text-xl lg:text-2xl">
          {dictionary.pages_home.events_preview.title ||
            'Finike Etkinlik Platformu'}
        </h2>
        <h2 className="text-lg font-semibold text-gray-700 sm:text-xl lg:text-2xl">
          {dictionary.pages_home.events_preview.subtitle ||
            'Finike’deki kültürel etkinlikleri destekleyen gönüllülerin bir çatı oluşumudur.'}
        </h2>
      </div>

      {/* Butonlar Container */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <Link
          className="w-full rounded-2xl bg-primary-800 px-12 py-4 text-center text-2xl font-bold text-white shadow-lg transition duration-200 hover:bg-indigo-700 sm:w-auto sm:min-w-[350px] sm:text-3xl lg:text-4xl"
          href={`/${lang}/events`}
        >
          {dictionary.pages_home.events_preview.event_calendar ||
            'Etkinlik Takvimi'}
        </Link>
        <Link
          className="w-full rounded-2xl bg-primary-800 px-12 py-4 text-center text-2xl font-bold text-white shadow-lg transition duration-200 hover:bg-indigo-700 sm:w-auto sm:min-w-[350px] sm:text-3xl lg:text-4xl"
          href={`/${lang}/studies`}
        >
          {dictionary.pages_home.events_preview.event_groups ||
            'Etkinlik Grupları'}
        </Link>
      </div>

      {/* Arka plan deseni */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10" />
    </section>
  );
}
