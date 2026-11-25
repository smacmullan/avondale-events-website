import { eventSort, formatDay, isISODate } from "@/lib/time";
import type { Event } from "@/lib/definitions";

export type DaySchedule = {
  dayDisplay: string;
  events: Event[];
};


export function generateEventSchedule(events: Event[]): DaySchedule[] {
  let sortedEvents = events.sort(eventSort);

  let eventSchedule: DaySchedule[] = [];
  let currentDay: any;
  sortedEvents.forEach(event => {
    const eventDay = formatDay(event);
    // Print the day only once per group of events
    if (eventDay !== currentDay?.dayDisplay) {
      // push completed day
      if (currentDay)
        eventSchedule.push(currentDay);

      // create new current day object
      currentDay = {
        dayDisplay: eventDay,
        events: [event],
      };
    }
    else {
      currentDay.events.push(event);
    }
  });
  // add final current day
  if (currentDay)
    eventSchedule.push(currentDay);
  return eventSchedule;
};


export function removePastEvents(events: Event[], now = new Date()): Event[] {

  const today = new Date(now);
  today.setHours(0, 0, 0, 0); // today at 00:00

  return events.filter((event: Event) => {
    const isAllDay = isISODate(event.startDate);
    if (isAllDay) {
      // keep if today or later
      return new Date(`${event.startDate}T00:00`) >= today;
    }
    else if (event.endDate) {
      //keep if end time has not passed
      return new Date(event.endDate) > now;
    }
    else {
      // assume event runs for two hours
      let estimatedEnd = new Date(event.startDate);
      estimatedEnd.setHours(estimatedEnd.getHours() + 2);
      // keep if event start within the past two hours
      return estimatedEnd > now;
    }
  });
}
