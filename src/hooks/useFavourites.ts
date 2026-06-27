import { useState } from 'react'

type FavouriteType = 'character' | 'film';

export type Favourite = {
    id: string
    name: string
    type: FavouriteType
};

const STORAGE_KEY = 'swapi_favourites'

const loadFromStorage = (): Favourite[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    };
};

const saveToStorage = (favourites: Favourite[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
};

export const useFavourites = () => {
    const [favourites, setFavourites] = useState<Favourite[]>(loadFromStorage)

    const addFavourite = (favourite: Favourite) => {
        setFavourites(prev => {
            // Prevent duplicates
            if (prev.some(f => f.id === favourite.id && f.type === favourite.type)) return prev
            const updated = [...prev, favourite]
            saveToStorage(updated)
            return updated
        });
    };

    const removeFavourite = (id: string, type: FavouriteType) => {
        setFavourites(prev => {
            const updated = prev.filter(f => !(f.id === id && f.type === type))
            saveToStorage(updated)
            return updated
        });
    } ;

  const isFavourite = (id: string, type: FavouriteType): boolean =>
    favourites.some(f => f.id === id && f.type === type);

  const toggleFavourite = (favourite: Favourite) => {
    isFavourite(favourite.id, favourite.type)
      ? removeFavourite(favourite.id, favourite.type)
      : addFavourite(favourite)
  };

  return {
    favourites,
    toggleFavourite,
    isFavourite,
  };
};