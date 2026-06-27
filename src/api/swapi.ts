import type {Character, Film } from '../models/swapi';

const BASE = 'https://swapi.info/api';

export const fetchCharacters = async (): Promise<Character[]> => {
  const res = await fetch(`${BASE}/people`)
  if (!res.ok) throw new Error('Failed to fetch characters')
  return res.json();
};

export const fetchCharacter = async (id: string): Promise<Character> => {
  const res = await fetch(`${BASE}/people/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch character ${id}`)
  return res.json();
};

export const fetchFilms = async (): Promise<Film[]> => {
  const res = await fetch(`${BASE}/films`)
  if (!res.ok) throw new Error('Failed to fetch films')
  return res.json();
};

export const fetchFilm = async (id: string): Promise<Film> => {
  const res = await fetch(`${BASE}/films/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch film ${id}`)
  return res.json();
};

export const fetchByUrl = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}`)
  return res.json();
};