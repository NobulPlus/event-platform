'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Platform Lite</h1>
        <div>
          <Link href="/" className="mr-4 hover:underline">Home</Link>
          <Link href="/events/create" className="hover:underline">Create Event</Link>
        </div>
      </nav>
    </header>
  );
}