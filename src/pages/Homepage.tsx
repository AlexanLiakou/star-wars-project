import { Link } from 'react-router-dom';
import { useStarWars } from '../context/StarWarsContext';
import type { ResolvedCharacter, ResolvedFilm } from '../models/swapi';
import DetailsBox from "../components/DetailsBox";
import DetailBlock from '../components/DetailBlock';

const Homepage = () => {
    const { characters, films } = useStarWars();

    return (
        <>
            <section>
                <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Beloved Franchise Characters</h2>
                <div className='flex flex-wrap gap-5 mb-5'>
                    {
                        characters ?

                        characters.slice(0, 5).map((character:ResolvedCharacter) =>
                            <DetailsBox>
                                <DetailBlock label={'Name'} value={character.name}/>
                                <DetailBlock label={'Homeworld'} value={character.homeworld.name}/>
                                <DetailBlock label={'Species'} value={character.species.length > 0 ? character.species.map(sp => sp.name).join(", ") : 'Unknown'}/>
                            </DetailsBox> 
                        )

                        :

                        <p className='mt-10 text-star-yellow text-base font-bold italic'>No characters found.</p>
                    }
                </div>
                {characters && <Link className='text-star-creme italic text-lg hover:opacity-75 hover:text-star-yellow' to={'/characters'}>See More</Link>}
            </section>
            <section className="mt-15">
                <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Beloved Movies</h2>
                <div className='flex flex-wrap gap-5 mb-5'>
                    {
                        films ?

                        films.slice(0, 5).map((film:ResolvedFilm) =>
                            <DetailsBox>
                                    <DetailBlock label={'Title'} value={film.title}/>
                                    <DetailBlock label={'Director'} value={film.director}/>
                                    <DetailBlock label={'Released'} value={new Date(film.release_date).getFullYear()}/>
                            </DetailsBox> 
                        )

                        :

                        <p className='mt-10 text-star-yellow text-base font-bold italic'>No films found.</p>
                    }
                </div>
                {characters && <Link className='text-star-creme italic text-lg hover:opacity-75 hover:text-star-yellow' to={'/films'}>See More</Link>}
            </section>
            <section className="mt-15">
                <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Your Favourites</h2>
                <p className='mt-10 text-star-yellow text-base font-bold italic'>No favourites found.</p>
            </section>
        </>
    );
}

export default Homepage;