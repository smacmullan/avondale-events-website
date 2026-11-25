import { useEffect, useState } from "react";
import type { Event } from "@/lib/definitions";
import { formatTimeRange } from "@/lib/time";
import { removePastEvents, generateEventSchedule } from "../../lib/eventDisplay";
import type { DaySchedule } from "../../lib/eventDisplay";

export default function EventList() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      try {
        const response = await fetch("/events.json", { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Event data request failed with status ${response.status}`);
        }

        const data: unknown = await response.json();
        if (!isEventArray(data)) {
          throw new Error("Event data has an invalid format");
        }

        setEvents(data);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Unable to load event data", error);
        setLoadError("Unable to load events. Please try again later.");
      }
    }

    void loadEvents();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (loadError) {
    return <p role="alert" className="py-8 text-sm">{loadError}</p>;
  }

  if (events === null) {
    return null;
  }

  const upcomingEvents = removePastEvents(events, now);
  if (upcomingEvents.length === 0) {
    return <p role="status" className="py-8 text-sm">No upcoming events.</p>;
  }

  const eventSchedule = generateEventSchedule(upcomingEvents);
  return (
    <div>
      {eventSchedule.map((daySchedule: DaySchedule) => (
        <EventListDay daySchedule={daySchedule} key={daySchedule.dayDisplay} />
      ))}
    </div>
  );
}

function isEventArray(data: unknown): data is Event[] {
  return Array.isArray(data) && data.every(isEvent);
}

function isEvent(data: unknown): data is Event {
  if (
    typeof data !== "object" ||
    data === null ||
    !("name" in data) ||
    typeof data.name !== "string" ||
    !("startDate" in data) ||
    typeof data.startDate !== "string"
  ) {
    return false;
  }

  if ("endDate" in data && data.endDate !== undefined && typeof data.endDate !== "string") {
    return false;
  }
  if ("url" in data && data.url !== undefined && typeof data.url !== "string") {
    return false;
  }
  if ("organizer" in data && data.organizer !== undefined) {
    const organizer = data.organizer;
    if (
      typeof organizer !== "object" ||
      organizer === null ||
      !("name" in organizer) ||
      typeof organizer.name !== "string"
    ) {
      return false;
    }
  }

  return true;
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
            <li key={index} className="flex items-start mb-6 min-w-0">
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
      <div className="w-2/3 min-w-0 max-w-full">
        <p>{event.name}</p>
        <div className="flex items-center text-xs mt-1 text-gray-600">
          <p className="break-words whitespace-normal break-all whitespace-normal max-w-full">
            {event.organizer?.name ? event.organizer.name : ""}
          </p>
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
    <a href={event.url} className="flex items-start w-full">
      {content}
    </a>
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