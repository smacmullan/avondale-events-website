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
      <p className="w-1/3 font-semibold pr-6 text-right">
        {timeDisplay}
      </p>
      <div className="w-2/3">
        <p>{event.name}</p>
        <div className="flex items-center text-xs mt-1 text-gray-600">
          <p>{event.organizer?.name ? event.organizer.name : ""}</p>
          {event.url && (
            <span className="ml-2 text-gray-600 flex items-center">
              <LinkIcon />
            </span>
          )}
        </div>
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



function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-3 inline-block"
    >
      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clipRule="evenodd" />
    </svg>
  );
}