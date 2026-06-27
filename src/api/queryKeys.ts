export const queryKeys = {
  characters: {
    all: ['characters'] as const,
    detail: (id: string) => ['characters', id] as const,
  },
  films: {
    all: ['films'] as const,
    detail: (id: string) => ['films', id] as const,
  },
  planets: {
    detail: (url: string) => ['planets', url] as const,
  },
  species: {
    detail: (url: string) => ['species', url] as const,
  },
  vehicles: {
    detail: (url: string) => ['vehicles', url] as const,
  },
  starships: {
    detail: (url: string) => ['starships', url] as const,
  },
};