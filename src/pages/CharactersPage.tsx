import { Link } from 'react-router-dom';
import { useStarWars } from '../context/StarWarsContext';
import type {ResolvedCharacter} from '../models/swapi';
import DetailsBox from '../components/DetailsBox';
import DetailBlock from '../components/DetailBlock';

const CharactersPage = () => {
    const { characters } = useStarWars();
    console.log(characters)
    return (
        <section>
            <h2 className="text-star-yellow text-xl md:text-3xl font-bold">Beloved Franchise Characters</h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mb-5'>
                {
                    characters ?

                    characters.map((character:ResolvedCharacter) =>
                        <Link to={`/characters/${character.name}`}>
                            <DetailsBox>
                                <DetailBlock label={'Name'} value={character.name}/>
                                <DetailBlock label={'Homeworld'} value={character.homeworld.name}/>
                                <DetailBlock label={'Species'} value={character.species.length > 0 ? character.species.map(sp => sp.name).join(", ") : 'Unknown'}/>
                            </DetailsBox>
                        </Link> 
                    )

                    :

                    <p className='mt-10 text-star-yellow text-base font-bold italic'>No characters found.</p>
                }
            </div>  
        </section>
    );
}

export default CharactersPage;