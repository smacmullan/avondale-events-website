'use client';
import EventList from "../components/event-list/event-list";
import { useEffect, useState } from 'react';

export default function Home() {

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/events.json');
      const data = await res.json();
      setEvents(data);
    };
    fetchData();
  }, []);


  return (
    <div className="items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center">
       <EventList events={events}/>
      </main>
    </div>
  );
}
