import { useParams, Link } from 'react-router-dom';
import { useCharacter, useCharacterRelations } from '../hooks/useCharacters';
import { idFromUrl } from '../helpers/helpers';
import DetailBlock from '../components/DetailBlock';
import Spinner from '../components/Spinner';
import FavouriteButton from '../components/FavouriteButton';

const CharacterDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: character, isLoading, isError, error } = useCharacter(id!);
    const relations = useCharacterRelations(character);

    if (isLoading) return (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50'>
            <Spinner />
            <p className='text-star-yellow font-bold mt-4'>Loading character...</p>
        </div>
    );

    if (isError) return <p className='text-star-mustard text-5xl text-center font-bold'>{error?.message ?? 'Something went wrong'}</p>

    return (
    <section>
        <div className='flex items-center flex-col md:flex-row md:justify-between'>
            <h1 className="text-star-yellow text-xl md:text-5xl font-bold">{character?.name}</h1>
            <FavouriteButton
                favourite={{
                    id: idFromUrl(character!.url),
                    name: character!.name,
                    type: 'character'
                }}
            />
        </div>
        <div className='border border-star-mustard rounded-md p-8 my-10'>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center ">Personal Information</h2>
                <DetailBlock label={'Gender'} value={character?.gender}/>
                <DetailBlock label={'Homeworld'} value={relations.homeworld.isLoading ? 'Loading...' : relations.homeworld.isError ? 'Failed to load' : relations.homeworld.data?.name ?? 'Unknown'}/>
                <DetailBlock label="Species" value={relations.species.isLoading ? 'Loading...' : relations.species.isError ? 'Failed to load' : relations.species.data.map(sp => sp.name).join(', ') || 'Unknown'} />
                <DetailBlock label={'Year of Birth'} value={character?.birth_year}/>
                <DetailBlock label={'Height'} value={`${character?.height} cm`}/>
                <DetailBlock label={'Weight'} value={`${character?.mass} kg`}/>
                <DetailBlock label={'Eye Color'} value={character?.eye_color}/>
                <DetailBlock label={'Hair Color'} value={character?.hair_color}/>
                <DetailBlock label={'Skin Color'} value={character?.skin_color}/>
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Films</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                    {relations.films.isLoading ? (
                        <p className="text-star-yellow text-xl font-bold italic mt-5">Loading...</p> 
                    ) : relations.films.isError ? (
                        <p className="text-star-yellow text-xl font-bold italic mt-5">Failed to load films</p>
                    ) : relations.films.data.length > 0 ? (                       
                            relations.films.data.sort((a, b) => a.episode_id - b.episode_id)
                            .map(f => (
                            <Link className='text-star-green cursor-pointer hover:text-star-mustard' key={f.url} to={`/films/${idFromUrl(f.url)}`}>{f.title}</Link>
                            ))
                        )
                        :
                        <p className="text-star-yellow text-xl font-bold italic mt-5">No films found</p>      
                    }
            </div>
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
                        <p className="text-star-yellow text-xl font-bold italic mt-5">No starships found</p> 
                }
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Vehicles</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {relations.vehicles.isLoading ? (
                        <p className="text-star-yellow text-xl font-bold italic mt-5">Loading...</p>
                    ) : relations.vehicles.isError ? (
                        <p className="text-star-yellow text-xl font-bold italic mt-5">Failed to load vehicles</p>
                    ) : relations.vehicles.data.length > 0 ? (     
                            relations.vehicles.data.map(v => (
                                <p className='text-star-green' key={v.url}><span className='text-star-blue'>{v.name}</span> - {v.model}</p>
                            ))                           
                        )
                        :
                        <p className="text-star-yellow text-xl font-bold italic mt-5">No starships found</p> 
                }
            </div>
        </div>
        <Link className='rounded-md p-5 !bg-star-creme text-black font-bold cursor-pointer hover:!bg-star-yellow' to="/characters">← Back to Characters</Link>  
    </section>
    );
}

export default CharacterDetailsPage;