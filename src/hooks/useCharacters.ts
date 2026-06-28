// src/hooks/useCharacters.ts
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters, fetchCharacter } from '../api/swapi';
import type { Character, Film, Planet, Species, Vehicle, Starship} from '../models/swapi';
import { queryKeys } from '../api/queryKeys';
import { useFetchUrlData} from './useFetchUrlData';

const PAGE_SIZE = 10

// List
// Fetches all characters once and caches them under ['characters'].
// Pagination is handled by slicing the cached array 

export const useCharacters = (page: number = 1) => {
  const query = useQuery({
    queryKey: queryKeys.characters.all,
    queryFn: fetchCharacters,
  })

  const allCharacters = query.data ?? [];
  const start = (page - 1) * PAGE_SIZE;
  const paginated = allCharacters.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(allCharacters.length / PAGE_SIZE);

  return {
    ...query,
    data: paginated,
    totalPages,
    total: allCharacters.length,
  }
};

// Single character

export const useCharacter = (id: string) =>
  useQuery({
    queryKey: queryKeys.characters.detail(id),
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
});

// ─── List-level relations (homeworld + species only) ─────────────────────────
// Used on the characters list page where we only need a subset of nested data.
// Deduplicates URLs across all characters on the current page before fetching,
// then returns lookup maps keyed by URL for instant access per character.

export const useCharacterListRelations = (characters: Character[]) => {
  const homeworldUrls = [...new Set(characters.map(c => c.homeworld).filter(Boolean))];
  const speciesUrls = [...new Set(characters.flatMap(c => c.species).filter(Boolean))];

  const homeworlds = useFetchUrlData<Planet>(homeworldUrls, 'planets');
  const species = useFetchUrlData<Species>(speciesUrls, 'species');

  const homeworldMap = Object.fromEntries(homeworlds.data.map(p => [p.url, p]));
  const speciesMap = Object.fromEntries(species.data.map(s => [s.url, s]));

  return {
    homeworldMap,
    speciesMap,
    isLoading: homeworlds.isLoading || species.isLoading,
    isError: homeworlds.isError || species.isError,
  }
};

// ─── Detail-level relations (all nested data) ────────────────────────────────
// Used on the character detail page.
// Accepts character as optional — when undefined (still loading),
// all useFetchUrlData calls receive empty arrays and fire no requests.

export const useCharacterRelations = (character?: {
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  homeworld: string
}) => {
  const films = useFetchUrlData<Film>    (character?.films ?? [], 'films');
  const species = useFetchUrlData<Species> (character?.species ?? [], 'species');
  const vehicles = useFetchUrlData<Vehicle> (character?.vehicles ?? [], 'vehicles');
  const starships = useFetchUrlData<Starship>(character?.starships ?? [], 'starships');

  const homeworldResults = useFetchUrlData<Planet>(
    character?.homeworld ? [character.homeworld] : [],
    'planets'
  );

  return {
    films,
    species,
    vehicles,
    starships,
    homeworld: {
      data:      homeworldResults.data[0],
      isLoading: homeworldResults.isLoading,
      isError:   homeworldResults.isError,
    },
  }
};