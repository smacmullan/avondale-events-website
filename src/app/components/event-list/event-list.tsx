import { Event } from "@/app/lib/definitions";
import { formatTimeRange } from "@/app/lib/time";
import { removePastEvents, generateEventSchedule, DaySchedule } from "../../lib/eventDisplay";
import Link from "next/link";

export default function EventList({ events }: { events: Event[] }) {

  let upcomingEvents = removePastEvents(events);
  let eventSchedule = generateEventSchedule(upcomingEvents);

  return (
    <>
      <div className="">
        {eventSchedule.map((daySchedule: DaySchedule) => (
          <EventListDay daySchedule={daySchedule} key={daySchedule.dayDisplay} />
        ))}
      </div>
    </>
  );
}

function EventListDay({ daySchedule }: { daySchedule: DaySchedule }) {

  return (
    <>
      <h2 className="text-2xl py-2 mb-8 border-b-2 border-gray-300" >
        {daySchedule.dayDisplay}
      </h2>
      <div className="pb-16">
        <ul className="text-sm list-none">
          {daySchedule.events.map((event: Event, index: any) => (
            <li key={index} className="flex items-start mb-6">
              <EventDisplay event={event} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};



function EventDisplay({ event }: { event: Event }) {
  let timeDisplay = formatTimeRange(event);
  const content = (
    <>
      <div className="w-1/3 font-semibold pr-6 text-right">
        {timeDisplay}
      </div>
      <div className="w-2/3">
        <div>{event.name}</div>
        {event.organizer?.name && (
          <div className="text-xs mt-1 text-gray-600">{event.organizer.name}</div>
        )}
      </div>
    </>
  );

  return event.url ? (
    <Link href={event.url} className="flex items-start w-full">
      {content}
    </Link>
  ) : (
    content
  );
};


