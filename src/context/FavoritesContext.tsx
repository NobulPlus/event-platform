'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (eventId: string) => void;
  removeFavorite: (eventId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (eventId: string) => {
    setFavorites((prev) => [...prev, eventId]);
  };

  const removeFavorite = (eventId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== eventId));
  };

  const contextValue: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
  };
  console.log('FavoritesContext value:', contextValue);

  return (
    <FavoritesContext.Provider value={contextValue}>
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