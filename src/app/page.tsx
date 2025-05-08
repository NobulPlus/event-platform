import EventCard from 'components/EventCard';
import { getEvents } from 'lib/data';

export default async function HomePage() {
  const events = await getEvents();
  return (
    <div>
      <h1>Events</h1>
      <div>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}