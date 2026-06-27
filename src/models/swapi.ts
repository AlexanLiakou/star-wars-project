export type Character = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]     
  species: string[]   
  vehicles: string[]  
  starships: string[] 
  url: string
};

export type Film = {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]   
  starships: string[] 
  vehicles: string[]  
  species: string[]   
  url: string
};

export type Planet = {
  name: string
  climate: string
  terrain: string
  population: string
  diameter: string
  gravity: string
  residents: string[] 
  films: string[]     
  url: string
};

export type Species = {
  name: string
  classification: string
  designation: string
  average_height: string
  average_lifespan: string
  language: string
  homeworld: string | null
  people: string[]  
  films: string[]   
  url: string
};

export type Vehicle = {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  vehicle_class: string
  pilots: string[] 
  films: string[]  
  url: string
};

export type Starship = {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  hyperdrive_rating: string
  starship_class: string
  pilots: string[] 
  films: string[]  
  url: string
};