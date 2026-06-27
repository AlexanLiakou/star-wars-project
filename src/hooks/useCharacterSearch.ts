import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacters } from '../api/swapi'
import { queryKeys } from '../api/queryKeys'
import { useDebounce } from './useDebounce'

const PAGE_SIZE = 10

export const useCharacterSearch = (searchTerm: string, page: number) => {

    const debouncedTerm = useDebounce(searchTerm, 300)

    const { data: allCharacters = [], isLoading, isError, error } = useQuery({
    queryKey: queryKeys.characters.all,
    queryFn: fetchCharacters,
    });

    // useMemo ensures we only re-filter when the debounced term or data changes
    const filteredCharacters = useMemo(() => {
    if (!debouncedTerm.trim()) return allCharacters;

    const lower = debouncedTerm.toLowerCase()
    return allCharacters.filter(c =>
        c.name.toLowerCase().includes(lower)
    )
    }, [allCharacters, debouncedTerm]);

    // Paginating filtered results
    const start = (page - 1) * PAGE_SIZE;
    const paginated  = filteredCharacters.slice(start, start + PAGE_SIZE);
    const totalPages = Math.ceil(filteredCharacters.length / PAGE_SIZE);

    return {
        data: paginated,
        totalPages,
        total: filteredCharacters.length,
        isLoading,
        isError,
        error,
        isSearching: debouncedTerm.trim().length > 0,
        isPending: searchTerm !== debouncedTerm,
    }
}