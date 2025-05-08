import { getEvents } from '@/lib/data';
import { getWeather } from '@/lib/weather';
import { notFound } from 'next/navigation';
import { useFavorites } from '@/context/FavoritesContext';
import Link from 'next/link';
import Image from 'next/image';
import type { NextPage } from 'next';

interface EventPageProps {
  params: Promise<{ id: string }>;
}

const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  const { id } = await params;
  const events = await getEvents();
  const event = events.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const weather = await getWeather(event.location);

  return (
    <div>
      <Image
        src={event.image}
        alt={event.title}
        width={800}
        height={400}
        className="object-cover"
      />
      <h1>{event.title}</h1>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      <div>
        <h2>Weather Forecast</h2>
        {weather ? (
          <p>
            Temperature: {weather.temperature}°C, Condition: {weather.condition}
          </p>
        ) : (
          <p>Weather information unavailable</p>
        )}
      </div>
      <FavoriteButton eventId={event.id} />
      <Link href="/">Back to Home</Link>
    </div>
  );
};

function FavoriteButton({ eventId }: { eventId: string }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(eventId);

  return (
    <button onClick={() => toggleFavorite(eventId)}>
      {isFavorited ? '❤️' : '♡'} Favorite
    </button>
  );
}

export default EventPage;