import type {Character, Film, Planet, Species, Vehicle, Starship} from '../models/swapi';

  export async function fetchStarWarsData() {
  const [characters, films, vehicles, starships, planets, species] = await Promise.all([
    fetch('https://swapi.info/api/people').then(r => r.json()) as Promise<Character[]>,
    fetch('https://swapi.info/api/films').then(r => r.json())  as Promise<Film[]>,
    fetch('https://swapi.info/api/vehicles').then(r => r.json())  as Promise<Vehicle[]>,
    fetch('https://swapi.info/api/starships').then(r => r.json())  as Promise<Starship[]>,
    fetch('https://swapi.info/api/planets').then(r => r.json())  as Promise<Planet[]>,
    fetch('https://swapi.info/api/species').then(r => r.json())  as Promise<Species[]>,
  ]);

  return { characters, films, vehicles, starships, planets, species };
};