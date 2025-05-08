'use client';

import EventForm from '@/components/EventForm';
import Link from 'next/link';

export default function CreateEventPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Events
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <EventForm />
      </div>
    </div>
  );
}