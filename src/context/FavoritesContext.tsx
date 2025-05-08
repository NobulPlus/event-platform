'use client';

   import { createContext, useContext, useState, useEffect } from 'react';

   interface FavoritesContextType {
     favorites: string[];
     toggleFavorite: (eventId: string) => void;
   }

   const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

   export function FavoritesProvider({ children }: { children: React.ReactNode }) {
     const [favorites, setFavorites] = useState<string[]>([]);

     useEffect(() => {
       const stored = localStorage.getItem('favorites');
       if (stored) {
         setFavorites(JSON.parse(stored));
       }
     }, []);

     const toggleFavorite = (eventId: string) => {
       setFavorites((prev) => {
         const newFavorites = prev.includes(eventId)
           ? prev.filter((id) => id !== eventId)
           : [...prev, eventId];
         localStorage.setItem('favorites', JSON.stringify(newFavorites));
         return newFavorites;
       });
     };

     return (
       <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
         {children}
       </FavoritesContext.Provider>
     );
   }

   export function useFavorites() {
     const context = useContext(FavoritesContext);
     if (!context) {
       throw new Error('useFavorites must be used within a FavoritesProvider');
     }
     return context;
   }