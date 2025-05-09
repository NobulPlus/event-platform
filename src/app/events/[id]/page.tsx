import { getEventById } from '@/lib/data';
import { getWeather } from '@/lib/weather';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FavoriteButton } from './FavoriteButton';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const weather = await getWeather(event.location);

  return (
    <div
      style={{
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '16px',
      }}
    >
      <div
        style={{
          maxWidth: '672px',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '192px',
            width: '100%',
            maxWidth: '672px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={400}
            style={{
              objectFit: 'cover',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              width: '100%',
              height: '100%',
            }}
            priority
          />
        </div>

        <div
          style={{
            padding: '24px',
          }}
        >
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '8px',
              color: '#1f2937',
            }}
          >
            {event.title}
          </h1>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <p>
              <span style={{ fontWeight: '600' }}>Date:</span>{' '}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <span style={{ fontWeight: '600' }}>Location:</span> {event.location}
            </p>
            <p style={{ color: '#4b5563' }}>
              <span style={{ fontWeight: '600' }}>Description:</span> {event.description}
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '8px', 
              marginBottom: '24px', 
            }}
          >
            <h2
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#1f2937',
              }}
            >
              Weather Forecast
            </h2>
            {weather ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span>Temperature: {weather.temperature}°C</span>
                <span>Condition: {weather.condition}</span>
              </div>
            ) : (
              <p>Weather information unavailable</p>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <FavoriteButton eventId={event.id} />
            <Link
              href="/"
              style={{
                padding: '8px 16px',
                color: '#3b82f6', 
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'background-color 0.3s',
              }}
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}