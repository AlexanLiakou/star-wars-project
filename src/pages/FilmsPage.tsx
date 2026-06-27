import { useFilms } from '../hooks/useFilms';
import { idFromUrl } from '../helpers/helpers';
import { Link } from 'react-router-dom';
import DetailsBox from '../components/DetailsBox';
import DetailBlock from '../components/DetailBlock';
import Spinner from '../components/Spinner';

const FilmsPage = () => {
    const { data, isLoading, isError, error } = useFilms();
    const films = data ?? [];
    const sorted = [...films].sort((a, b) => a.episode_id - b.episode_id);

    if (isLoading) return (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50'>
            <Spinner />
            <p className='text-star-yellow font-bold mt-4'>Loading films...</p>
        </div>
    );

    if (isError) return <p className='text-star-mustard text-5xl text-center font-bold'>{error?.message ?? 'Something went wrong'}</p>

    return (
        <section>
            <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Beloved Movies</h2>
            <div className='flex flex-wrap gap-5 mb-5'>
                {
                    films.length > 0 ?

                    sorted.map((film) =>
                        <Link key={film.url} to={`/films/${idFromUrl(film.url)}`}>
                            <DetailsBox>
                                    <DetailBlock label={'Title'} value={film.title}/>
                                    <DetailBlock label={'Director'} value={film.director}/>
                                    <DetailBlock label={'Released'} value={new Date(film.release_date).getFullYear()}/>
                            </DetailsBox>
                        </Link> 
                    )
                    :
                    <p className="text-star-yellow text-xl font-bold italic mt-5">No films found</p>
                }
            </div>  
        </section>
    );
}

export default FilmsPage;