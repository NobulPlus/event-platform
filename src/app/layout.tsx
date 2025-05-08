import { FavoritesProvider } from '@/context/FavoritesContext';
import { Header } from '@/components/Header';

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>
          <Header />
           <FavoritesProvider>{children}</FavoritesProvider>
         </body>
       </html>
     );
   }