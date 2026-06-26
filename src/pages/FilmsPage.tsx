import { Link } from 'react-router-dom';
import { useStarWars } from '../context/StarWarsContext';
import type {ResolvedFilm} from '../models/swapi';
import DetailsBox from '../components/DetailsBox';
import DetailBlock from '../components/DetailBlock';

const FilmsPage = () => {
    const { films} = useStarWars();
    console.log(films)
    return (
    <section>
        <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Beloved Movies</h2>
        <div className='flex flex-wrap gap-5 mb-5'>
            {
                films ?

                films.map((film:ResolvedFilm) =>
                    <Link to={`/films/${film.title}`}>
                        <DetailsBox>
                                <DetailBlock label={'Title'} value={film.title}/>
                                <DetailBlock label={'Director'} value={film.director}/>
                                <DetailBlock label={'Released'} value={new Date(film.release_date).getFullYear()}/>
                        </DetailsBox>
                    </Link> 
                )

                :

                <p className='mt-10 text-star-yellow text-base font-bold italic'>No films found.</p>
            }
        </div>  
    </section>
    );
}

export default FilmsPage;