'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px' }}>
      <nav
        style={{
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link
            href="/"
            style={{ color: 'white', textDecoration: 'none' }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
            aria-label="Go to home page"
          >
            Home
          </Link>
          <Link
            href="/events/create"
            style={{ color: 'white', textDecoration: 'none' }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
            aria-label="Create new event"
          >
            Create Event
          </Link>
        </div>
      </nav>
    </header>
  );
}