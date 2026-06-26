export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}


export interface ResolvedPlanet extends Omit<Planet, 'residents' | 'films'> {
  residents: Character[];
  films: Film[];
}

export interface ResolvedSpecies extends Omit<Species, 'homeworld' | 'people' | 'films'> {
  homeworld: Planet;
  people: Character[];
  films: Film[];
}

export interface ResolvedVehicle extends Omit<Vehicle, 'pilots' | 'films'> {
  pilots: Character[];
  films: Film[];
}

export interface ResolvedStarship extends Omit<Starship, 'pilots' | 'films'> {
  pilots: Character[];
  films: Film[];
}

export interface ResolvedCharacter extends Omit<Character, 'homeworld' | 'films' | 'species' | 'vehicles' | 'starships'> {
  homeworld: ResolvedPlanet;
  films: Film[];
  species: ResolvedSpecies[];
  vehicles: ResolvedVehicle[];
  starships: ResolvedStarship[];
}

export interface ResolvedFilm extends Omit<Film, 'characters' | 'planets' | 'species' | 'vehicles' | 'starships'> {
  characters: Character[];
  planets: ResolvedPlanet[];
  species: ResolvedSpecies[];
  vehicles: ResolvedVehicle[];
  starships: ResolvedStarship[];
}