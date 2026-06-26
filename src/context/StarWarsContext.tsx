import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchStarWarsData } from '../api/swapi';
import type {ResolvedCharacter, ResolvedFilm, ResolvedPlanet, ResolvedSpecies, ResolvedVehicle, ResolvedStarship,
} from '../models/swapi';

interface StarWarsContextType {
  characters: ResolvedCharacter[];
  films: ResolvedFilm[];
  planets: ResolvedPlanet[];
  species: ResolvedSpecies[];
  vehicles: ResolvedVehicle[];
  starships: ResolvedStarship[];
  loading: boolean;
  error: string | null;
}

const StarWarsContext = createContext<StarWarsContextType | null>(null);

export function StarWarsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StarWarsContextType>({
    characters: [], films: [], planets: [],
    species: [], vehicles: [], starships: [],
    loading: true, error: null,
  });

  useEffect(() => {
    fetchStarWarsData()
      .then(({ characters, films, planets, species, vehicles, starships }) => {

        const resolvedPlanets: ResolvedPlanet[] = planets.map(planet => ({
          ...planet,
          residents: characters.filter(c => planet.residents.includes(c.url)),
          films:     films.filter(f => planet.films.includes(f.url)),
        }));

        const resolvedSpecies: ResolvedSpecies[] = species.map(s => ({
          ...s,
          homeworld: planets.find(p => p.url === s.homeworld)!,
          people:    characters.filter(c => s.people.includes(c.url)),
          films:     films.filter(f => s.films.includes(f.url)),
        }));

        const resolvedVehicles: ResolvedVehicle[] = vehicles.map(vehicle => ({
          ...vehicle,
          pilots: characters.filter(c => vehicle.pilots.includes(c.url)),
          films:  films.filter(f => vehicle.films.includes(f.url)),
        }));

        const resolvedStarships: ResolvedStarship[] = starships.map(starship => ({
          ...starship,
          pilots: characters.filter(c => starship.pilots.includes(c.url)),
          films:  films.filter(f => starship.films.includes(f.url)),
        }));

        const resolvedCharacters: ResolvedCharacter[] = characters.map(character => ({
          ...character,
          homeworld: resolvedPlanets.find(p => p.url === character.homeworld)!,
          films:     films.filter(f => character.films.includes(f.url)),
          species:   resolvedSpecies.filter(s => character.species.includes(s.url)),
          vehicles:  resolvedVehicles.filter(v => character.vehicles.includes(v.url)),
          starships: resolvedStarships.filter(s => character.starships.includes(s.url)),
        }));

        const resolvedFilms: ResolvedFilm[] = films.map(film => ({
          ...film,
          characters: characters.filter(c => film.characters.includes(c.url)),
          planets:    resolvedPlanets.filter(p => film.planets.includes(p.url)),
          species:    resolvedSpecies.filter(s => film.species.includes(s.url)),
          vehicles:   resolvedVehicles.filter(v => film.vehicles.includes(v.url)),
          starships:  resolvedStarships.filter(s => film.starships.includes(s.url)),
        }));

        setState({
          characters: resolvedCharacters,
          films: resolvedFilms,
          planets: resolvedPlanets,
          species: resolvedSpecies,
          vehicles: resolvedVehicles,
          starships: resolvedStarships,
          loading: false,
          error: null,
        });
      })
      .catch(e => setState(prev => ({ ...prev, loading: false, error: e.message })));
  }, []);

  return (
    <StarWarsContext.Provider value={state}>
      {children}
    </StarWarsContext.Provider>
  );
}

export function useStarWars() {
  const ctx = useContext(StarWarsContext);
  if (!ctx) throw new Error('useStarWars must be used inside <StarWarsProvider>');
  return ctx;
}