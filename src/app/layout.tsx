import { FavoritesProvider } from '@/context/FavoritesContext';
import { Header } from '@/components/Header';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Event App',
  description: 'Manage and view events',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flexGrow: 1, padding: '24px' }}>
          <FavoritesProvider>{children}</FavoritesProvider>
        </main>
      </body>
    </html>
  );
}