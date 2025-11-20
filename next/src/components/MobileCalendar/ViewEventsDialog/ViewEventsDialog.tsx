import { Event } from '@/models/event';
import { Dictionary, SupportedLanguage } from '@/models/locale';
import Link from 'next/link';

interface ViewEventsDialogProps {
  events: Event[];
  onClose: () => void;
  lang: SupportedLanguage;
  dictionary: Dictionary;
}

export default function ViewEventsDialog({
  events,
  onClose,
  lang,
  dictionary,
}: ViewEventsDialogProps) {
  if (!events) return null;

  return (
    <dialog
      className={`modal modal-bottom sm:modal-middle ${events && events.length > 0 ? 'modal-open' : ''}`}
    >
      <div className="modal-box">
        <h2 className="mb-4 text-lg font-bold">
          {new Intl.DateTimeFormat(lang, {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
          }).format(events[0]?.start)}{''}
        </h2>
        {events && events.length > 0 && (
          <>
            {events.map((event) => {
              const startDt = new Date(event.start);
              const endDt = new Date(event.end);
              const startTimeStr = startDt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' });
              const endTimeStr = endDt.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' });
              const eventTimeDisplay = startDt.toISOString() === endDt.toISOString() ? startTimeStr : `${startTimeStr}-${endTimeStr}`;

              return (
                <Link
                  key={event.id}
                  className="mb-4 block rounded-lg bg-background-50 p-4"
                  href={`/${lang}/etkinliktakvimi/${event.id}`}
                >
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <h4>{eventTimeDisplay}</h4>
                  <p className="line-clamp-3 text-sm">{event.description}</p>
                </Link>
              );
            })}
          </>
        )}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm" onClick={onClose}>
              {dictionary.general.close}
            </button>
          </form>
        </div>
      </div>
      <label className="modal-backdrop" onClick={onClose}>
        Close
      </label>
    </dialog>
  );
}
