import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favoriteIds: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      addFavorite: (id) => 
        set({ favoriteIds: [...get().favoriteIds, id] }),
      removeFavorite: (id) =>
        set({ favoriteIds: get().favoriteIds.filter(favId => favId !== id) }),
      isFavorite: (id) => get().favoriteIds.includes(id),
      toggleFavorite: (id) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        isFavorite(id) ? removeFavorite(id) : addFavorite(id);
      }
    }),
    { name: 'favorites-storage' }
  )
);