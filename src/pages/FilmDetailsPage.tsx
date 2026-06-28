import { useParams, Link } from 'react-router-dom';
import { useFilm, useFilmRelations } from '../hooks/useFilms';
import { idFromUrl } from '../helpers/helpers';
import DetailBlock from '../components/DetailBlock';
import Spinner from '../components/Spinner';
import FavouriteButton from '../components/FavouriteButton';

const FilmDetailsPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data: film, isLoading, isError, error } = useFilm(id!)
    const relations = useFilmRelations(film)

    if (isLoading) return (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50'>
            <Spinner />
            <p className='text-star-yellow font-bold mt-4'>Loading film...</p>
        </div>
    );

    if (isError) return <p className='text-star-mustard text-5xl text-center font-bold'>{error?.message ?? 'Something went wrong'}</p>
    console.log(film);
    return (
    <section>
         <div className='flex items-center flex-col md:flex-row md:justify-between'>
            <h1 className="text-star-yellow text-xl md:text-5xl font-bold">{film?.title}</h1>
            <FavouriteButton
                favourite={{
                    id: idFromUrl(film!.url),
                    name: film!.title,
                    type: 'film'
                }}
            />
        </div>
        <div className='border border-star-mustard rounded-md p-8 my-10 grid grid-cols-1 md:grid-cols-2'>
            <div className='grow flex flex-col gap-4 items-center mb-10'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10">General Information</h2>
                <DetailBlock label={'Released'} value={new Date(film!.release_date).getFullYear()}/>
                <DetailBlock label={'Director'} value={film?.director}/>
                <DetailBlock label={'Producer/s'} value={film?.producer}/>
            </div>
            <div className='mb-10'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Introduction</h2>
                <div className='flex items-center justify-center'><p style={{maxWidth: 500}} className='text-star-green text-lg'>{film?.opening_crawl}</p></div>
            </div>
            <div className='mb-10'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Vehicles</h2>
                <div className='grow flex flex-col gap-4 items-center justify-center'>
                    {relations.vehicles.isLoading ? (
                            <p className="text-star-yellow text-xl font-bold italic mt-5">Loading...</p> 
                        ) : relations.vehicles.isError ? (
                            <p className="text-star-yellow text-xl font-bold italic mt-5">Failed to load vehicles</p>
                        ) : relations.vehicles.data.length > 0 ?(                           
                                relations.vehicles.data.map(v => (
                                    <p className='text-star-green' key={v.url}><span className='text-star-blue'>{v.name}</span> - {v.model}</p>
                                ))
                        )
                        :
                        <p className="text-star-yellow text-xl font-bold italic mt-5">No vehicles found</p> 
                    }            
                </div>
            </div>
            <div className='mb-10'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Starships</h2>
                <div className='grow flex flex-col gap-4 items-center justify-center'>
                    {relations.starships.isLoading ? (
                            <p className="text-star-yellow text-xl font-bold italic mt-5">Loading...</p> 
                        ) : relations.starships.isError ? (
                            <p className="text-star-yellow text-xl font-bold italic mt-5">Failed to load starships</p>
                        ) : relations.starships.data.length > 0 ? (                       
                                relations.starships.data.map(s => (
                                    <p className='text-star-green' key={s.url}><span className='text-star-blue'>{s.name}</span> - {s.model}</p>
                                ))                           
                        )
                        :
                        <p className="text-star-yellow text-xl font-bold italic mt-5">No planets found</p>        
                    }            
                </div>
            </div>
            <div className='mb-10'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Characters</h2>
                <div className='grow flex flex-col gap-4 items-center justify-center'>
                    {relations.characters.isLoading ? (
                        <p className="text-star-yellow text-xl font-bold italic mt-5">Loading...</p> 
                        ) : relations.characters.isError ? (
                        <p className="text-star-yellow text-xl font-bold italic mt-5">Failed to load characters</p>
                        ) : relations.characters.data.length > 0 ?
                            (
                            relations.characters.data
                                .map(c => (
                                    <Link className='text-star-green cursor-pointer hover:text-star-mustard' key={c.url} to={`/characters/${idFromUrl(c.url)}`}>
                                        {c.name}
                                    </Link>
                                ))
                    )
                    :
                    <p className="text-star-yellow text-xl font-bold italic mt-5">No characters found</p>        
                }
                </div>
            </div>
            <div className='mb-10'>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Species</h2>
                <div className='grow flex flex-col gap-4 items-center justify-center'>
                    {relations.species.isLoading ? (
                            <p className="text-star-yellow text-xl font-bold italic mt-5">Loading...</p> 
                        ) : relations.species.isError ? (
                            <p className="text-star-yellow text-xl font-bold italic mt-5">Failed to load species</p>
                        ) :  relations.species.data.length > 0 ? ( 
                                relations.species.data.map(s => (
                                    <p className='text-star-green' key={s.url}>{s.name}</p>
                                ))
                        )
                        :
                        <p className="text-star-yellow text-xl font-bold italic mt-5">No planets found</p>        
                    }
                </div>
            </div>
            <div className='mb-10'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Planets</h2>
                <div className='grow flex flex-col gap-4 items-center justify-center'>
                    {relations.planets.isLoading ? (
                        <p className="text-star-yellow text-xl font-bold italic mt-5">Loading...</p> 
                    ) : relations.planets.isError ? (
                        <p className="text-star-yellow text-xl font-bold italic mt-5">Failed to load planets</p>
                    ) : relations.planets.data.length > 0 ?
                    (
                        relations.planets.data.map(p => (
                            <p key={p.url} className='text-star-green'>{p.name}</p>
                        ))
                    )
                    :
                    <p className="text-star-yellow text-xl font-bold italic mt-5">No planets found</p>        
                }
                </div>
            </div>
        </div>
        <Link className='rounded-md p-5 !bg-star-creme text-black font-bold cursor-pointer hover:!bg-star-yellow' to="/films">← Back to Films</Link>       
    </section>
    );
}

export default FilmDetailsPage ;