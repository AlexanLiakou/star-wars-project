import { Link } from 'react-router-dom';
import { useCharacterListRelations, useCharacters } from '../hooks/useCharacters';
import { useFilms } from '../hooks/useFilms';
import { idFromUrl } from '../helpers/helpers';
import { useFavourites } from '../hooks/useFavourites';
import DetailsBox from "../components/DetailsBox";
import DetailBlock from '../components/DetailBlock';
import Spinner from '../components/Spinner';

const Homepage = () => {
    const { data: characters, isLoading: charsLoading, isError: charsError, error: charsErrorObject } = useCharacters(1);
    const { homeworldMap, speciesMap, isLoading: relationsLoading } = useCharacterListRelations(characters);
    const { data: films, isLoading: filmsLoading, isError: filmsError, error: filmsErrorObject } = useFilms();
    const { favourites } = useFavourites();

    
    const previewCharacters = characters.slice(0, 5);
    const previewFilms = films?.slice(0, 3) ?? [];
    const previewFavourites = favourites?.slice(0, 5);

    if (filmsLoading || charsLoading) return (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50'>
            <Spinner />
            <p className='text-star-yellow font-bold mt-4'>In a galaxy far away...</p>
        </div>
    );

    if (charsError) return <p className='text-star-mustard text-5xl text-center font-bold'>{charsErrorObject?.message ?? 'Something went wrong'}</p>
    if (filmsError) return <p className='text-star-mustard text-5xl text-center font-bold'>{filmsErrorObject?.message ?? 'Something went wrong'}</p>

    return (
        <>
            <section>
                <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Beloved Franchise Characters</h2>
                <div className='flex flex-wrap gap-5 mb-5'>
                    { characters.length > 0 ? (
                        previewCharacters.map((character) => {
                            const species = character.species.map(url => speciesMap[url]).filter(Boolean);
                            const homeworld = homeworldMap[character.homeworld];
                            return (
                                <Link key={character.url} to={`/characters/${idFromUrl(character.url)}`}>
                                <DetailsBox>
                                    <DetailBlock label={'Name'} value={character.name}/>
                                    <DetailBlock label={'Homeworld'} value={relationsLoading ? '...' : (homeworld?.name ?? 'Unknown')}/>
                                    <DetailBlock label={'Species'} value={relationsLoading ? '...' : (species.length > 0 ? species.map(s => s.name).join(', ') : 'Unknown')}/>
                                </DetailsBox> 
                            </Link>
                            )
                        })
                    ) :
                    <p className="text-star-yellow text-xl font-bold italic mt-5">No characters found</p>      
                    }
                </div>
                {characters.length > 0 && <Link className='text-star-creme italic text-lg hover:opacity-75 hover:text-star-yellow' to={'/characters'}>See More</Link>}
            </section>
            <section className="mt-15">
                <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Beloved Movies</h2>
                <div className='flex flex-wrap gap-5 mb-5'>
                    {films.length > 0 ? (
                        previewFilms.map(film => (
                            <Link key={film.url} to={`/films/${idFromUrl(film.url)}`}>
                                <DetailsBox>
                                    <DetailBlock label={'Title'} value={film.title}/>
                                    <DetailBlock label={'Director'} value={film.director}/>
                                    <DetailBlock label={'Released'} value={new Date(film.release_date).getFullYear()}/>
                                </DetailsBox> 
                            </Link>
                        ))
                    ) :
                    <p className="text-star-yellow text-xl font-bold italic mt-5">No films found</p>      
                    }
                </div>
                {films.length > 0 && <Link className='text-star-creme italic text-lg hover:opacity-75 hover:text-star-yellow' to={'/films'}>See More</Link>}
            </section>
            <section className="mt-15">
                <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Your Favourites</h2>
                <div className='flex flex-wrap gap-5 mb-5'>
                    {favourites.length > 0  ? (
                        previewFavourites.map((fav) => {
                            return (
                                <Link key={`${fav.type}-${fav.id}`} to={`/${fav.type === 'character' ? 'characters' : 'films'}/${fav.id}`}>
                                <DetailsBox>
                                    <DetailBlock label={'Name/Title'} value={fav.name}/>
                                    <DetailBlock label={'Type'} value={fav.type}/>
                                </DetailsBox> 
                            </Link>
                            )
                        })
                    ) :
                    <p className="text-star-yellow text-xl font-bold italic mt-5">No favourites found</p>      
                }
                </div>
                {favourites.length > 0 && <Link className='text-star-creme italic text-lg hover:opacity-75 hover:text-star-yellow' to={'/favourites'}>See More</Link>}
            </section>
        </>
    );
}

export default Homepage;