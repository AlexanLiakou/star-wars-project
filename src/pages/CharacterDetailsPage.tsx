import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useStarWars } from '../context/StarWarsContext';
import type {ResolvedCharacter} from '../models/swapi';
import DetailBlock from '../components/DetailBlock';

const CharacterDetailsPage = () => {
    const { characters } = useStarWars();
    const { name } = useParams();
    const [character, setCharacter] = useState<ResolvedCharacter | undefined>(characters.find((c) => c.name === name));
    console.log(character);
    return (
    <section>
        <h1 className="text-star-yellow text-xl md:text-5xl font-bold">{character?.name}</h1>
        <div className='border border-star-mustard rounded-md p-8 mt-10'>
            <div className='grow flex flex-col gap-4 items-center md:items-start justify-center'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center ">Personal Information</h2>
                <DetailBlock label={'Gender'} value={character?.gender}/>
                <DetailBlock label={'Homeworld'} value={character?.homeworld.name}/>
                <DetailBlock label={'Species'} value={character!.species.length > 0 ? character?.species.map(sp => sp.name).join(", ") : 'Unknown'}/>
                <DetailBlock label={'Year of Birth'} value={character?.birth_year}/>
                <DetailBlock label={'Height'} value={`${character?.height} cm`}/>
                <DetailBlock label={'Weight'} value={`${character?.mass} kg`}/>
                <DetailBlock label={'Eye Color'} value={character?.eye_color}/>
                <DetailBlock label={'Hair Color'} value={character?.hair_color}/>
                <DetailBlock label={'Skin Color'} value={character?.skin_color}/>
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Films</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {character?.films && character?.films.map((film) => <p className='text-star-green'>{film.title}</p>)}
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Starships</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {character?.starships && character?.starships.map((ship) => <p className='text-star-green'>{ship.name}</p>)}
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Vehicles</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {character?.vehicles && character?.vehicles.map((vehicle) => <p className='text-star-green'>{vehicle.name}</p>)}
            </div>
            {/* <DetailBlock label={'Appears In'} value={character!.films.length > 0 ? character?.films.map(film => film.title).join(", ") : 'None'}/> */}
        </div>   
    </section>
    );
}

export default CharacterDetailsPage;