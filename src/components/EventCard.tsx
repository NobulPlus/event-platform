import Link from 'next/link';
import Image from 'next/image';
import type { Event } from '@/lib/data';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        margin: '16px auto',
      }}
    >
      <Image
        src={event.image}
        alt={event.title}
        width={300}
        height={200}
        style={{ objectFit: 'cover', width: '100%', height: '200px', borderRadius: '8px' }}
      />
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginTop: '12px',
          marginBottom: '8px',
          color: '#1f2937',
        }}
      >
        {event.title}
      </h2>
      <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '8px' }}>
        {event.date}
      </p>
      <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '12px' }}>
        {event.location}
      </p>
      <Link
        href={`/events/${event.id}`}
        style={{
          color: '#2563eb',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: '500',
        }}
      >
        View Details
      </Link>
    </div>
  );
}