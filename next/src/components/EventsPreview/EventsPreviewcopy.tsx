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
      {/* Butonlar Container (ön planda) */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <Link
          className="w-full rounded-2xl bg-indigo-600 px-12 py-4 text-center text-2xl font-bold text-white shadow-lg transition duration-200 hover:bg-indigo-700 sm:w-auto sm:min-w-[350px] sm:text-3xl lg:text-4xl"
          href={`/${lang}/events`}
        >
          {dictionary.pages_home.events_preview.event_calendar ||
            'Etkinlik Takvimi'}
        </Link>
        <Link
          className="w-full rounded-2xl bg-indigo-600 px-12 py-4 text-center text-2xl font-bold text-white shadow-lg transition duration-200 hover:bg-indigo-700 sm:w-auto sm:min-w-[350px] sm:text-3xl lg:text-4xl"
          href={`/${lang}/studies`}
        >
          {dictionary.pages_home.events_preview.event_groups ||
            'Çalışma grupları'}
        </Link>
      </div>
      {/* Arka plan deseni (tamamen geride, tıklamaya engel olmaz) */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10" />
    </section>
  );
}
