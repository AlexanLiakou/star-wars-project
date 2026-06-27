// src/hooks/useFilms.ts
import { useQuery } from '@tanstack/react-query'
import { fetchFilms, fetchFilm } from '../api/swapi';
import type { Character, Planet, Species, Vehicle, Starship} from '../models/swapi';
import { queryKeys } from '../api/queryKeys'
import { useFetchUrlData } from './useFetchUrlData';

// ─── List ────────────────────────────────────────────────────────────────────
// swapi.info returns all 6 films in one call, no pagination needed.
// Sorted by episode number for natural display order.

export const useFilms = () => {
  const query = useQuery({
    queryKey: queryKeys.films.all,
    queryFn: fetchFilms,
  })

  const sorted = [...(query.data ?? [])].sort((a, b) => a.episode_id - b.episode_id);

  return {
    ...query,
    data: sorted,
  }
};

// ─── Single film ─────────────────────────────────────────────────────────────

export const useFilm = (id: string) =>
  useQuery({
    queryKey: queryKeys.films.detail(id),
    queryFn: () => fetchFilm(id),
    enabled: !!id,
});

// ─── Detail-level relations (all nested data) ────────────────────────────────

export const useFilmRelations = (film?: {
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
}) => {
  const characters = useFetchUrlData<Character>(film?.characters ?? [], 'characters');
  const planets = useFetchUrlData<Planet>   (film?.planets ?? [], 'planets');
  const starships = useFetchUrlData<Starship> (film?.starships ?? [], 'starships');
  const vehicles = useFetchUrlData<Vehicle>  (film?.vehicles ?? [], 'vehicles');
  const species = useFetchUrlData<Species>  (film?.species ?? [], 'species');

  return { characters, planets, starships, vehicles, species }
};