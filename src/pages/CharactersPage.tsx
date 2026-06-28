import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCharacterListRelations } from '../hooks/useCharacters';
import { useCharacterSearch } from '../hooks/useCharacterSearch'
import { idFromUrl } from '../helpers/helpers';
import DetailsBox from '../components/DetailsBox';
import DetailBlock from '../components/DetailBlock';
import Spinner from '../components/Spinner';

const CharactersPage = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: characters, isLoading, isError, totalPages, total, isSearching, isPending, error } = useCharacterSearch(searchTerm, page);

    const { homeworldMap, speciesMap, isLoading: relationsLoading, isError: relationsError } = useCharacterListRelations(characters);

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        setPage(1)
    };

    if (isLoading) return (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50'>
            <Spinner />
            <p className='text-star-yellow font-bold mt-4'>Loading characters...</p>
        </div>
    );

    if (isError) return <p className='text-star-mustard text-5xl text-center font-bold'>{error?.message ?? 'Something went wrong'}</p>

    return (
        <section className='overflow-hidden'>
            <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Beloved Franchise Characters</h2>
            <div className='my-10 w-full'>
                <input
                    className='bg-star-creme md:w-100 text-black p-3 rounded-md'
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={e => handleSearch(e.target.value)}
                />
            </div>
            {isSearching && (
                <p className='text-star-creme text-lg font-bold'>
                    {total === 0
                        ? `No characters found for "${searchTerm}"`
                        : `${total} result${total === 1 ? '' : 's'} for "${searchTerm}"`
                    }
                </p>
            )}
            <div className='relative'>
                {(relationsLoading || isPending) && (
                    <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10 rounded-md'>
                        <Spinner />
                        <p className='text-star-yellow font-bold mt-4'>
                            {isPending ? 'Searching...' : 'Loading details...'}
                        </p>
                    </div>
                )}
                {relationsError && (
                    <p className='text-star-yellow font-bold text-center mt-4'>
                        Failed to load some character details.
                    </p>
                )}
                <div className='flex flex-wrap gap-5 mb-5'>
                    {characters.length > 0 ? (
                        characters.map((character) => {
                            const homeworld = homeworldMap[character.homeworld];
                            const species   = character.species.map(url => speciesMap[url]).filter(Boolean);

                            return (
                                <Link key={character.url} to={`/characters/${idFromUrl(character.url)}`}>
                                    <DetailsBox>
                                        <DetailBlock label={'Name'} value={character.name}/>
                                        <DetailBlock label={'Homeworld'} value={homeworld?.name ?? 'Unknown'}/>
                                        <DetailBlock label={'Species'} value={species.map(s => s.name).join(', ') || 'Unknown'}/>
                                    </DetailsBox>
                                </Link>
                            )
                        })
                    ) : (
                        <p className='mt-10 text-star-yellow text-base font-bold italic'>No characters found.</p>
                    )}
                </div>
            </div>

            {totalPages > 1 &&
                <div className='mt-10 flex items-center gap-2 justify-start md:gap-5'>
                    <button
                        className='rounded-md p-5 bg-star-creme text-black font-bold cursor-pointer hover:bg-star-yellow disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none'
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 1}
                    >
                        &#8592;
                    </button>

                    <span className='text-star-creme text-lg'>{page} / {totalPages}</span>

                    <button
                        className='rounded-md p-5 bg-star-creme text-black font-bold cursor-pointer hover:bg-star-yellow disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none'
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages}
                    >
                        &#8594;
                    </button>
                </div>
            }
        </section>
    );
}

export default CharactersPage;