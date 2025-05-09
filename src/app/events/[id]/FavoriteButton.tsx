'use client';

import { useFavorites } from '@/context/FavoritesContext';

export function FavoriteButton({ eventId }: { eventId: string }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.includes(eventId);

  return (
    <button
      onClick={() => toggleFavorite(eventId)}
      className={`px-4 py-2 rounded transition-colors ${
        isFavorited 
          ? 'bg-red-100 text-red-500 hover:bg-red-200' 
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      {isFavorited ? '❤️ Remove Favorite' : '♡ Add Favorite'}
    </button>
  );
}