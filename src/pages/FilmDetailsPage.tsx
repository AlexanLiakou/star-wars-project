import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useStarWars } from '../context/StarWarsContext';
import type {ResolvedFilm} from '../models/swapi';
import DetailBlock from '../components/DetailBlock';

const FilmDetailsPage = () => {
    const { films } = useStarWars();
    const { title } = useParams();
    const [film, setFilm] = useState<ResolvedFilm | undefined>(films.find((f) => f.title === title));
    console.log(film);
    return (
    <section>
        <h1 className="text-star-yellow text-xl md:text-5xl font-bold">{film?.title}</h1>
        <div className='border border-star-mustard rounded-md p-8 mt-10'>
            <div className='grow flex flex-col gap-4 items-center md:items-start justify-center'>
                <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center ">General Information</h2>
                <DetailBlock label={'Released'} value={new Date(film!.release_date).getFullYear()}/>
                <DetailBlock label={'Director'} value={film?.director}/>
                <DetailBlock label={'Producer/s'} value={film?.producer}/>
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Characters</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {film?.characters && film?.characters.map((character) => <p className='text-star-green'>{character.name}</p>)}
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Planets</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {film?.planets && film?.planets.map((planet) => <p className='text-star-green'>{planet.name}</p>)}
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Species</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {film?.species && film?.species.map((s) => <p className='text-star-green'>{s.name}</p>)}
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Starships</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {film?.starships && film?.starships.map((starship) => <p className='text-star-green'>{starship.name}</p>)}
            </div>
            <h2 className="text-star-creme text-xl md:text-3xl font-bold text-center mt-10 mb-5">Vehicles</h2>
            <div className='grow flex flex-col gap-4 items-center justify-center'>
                {film?.vehicles && film?.vehicles.map((vehicle) => <p className='text-star-green'>{vehicle.name}</p>)}
            </div>
        </div>     
    </section>
    );
}

export default FilmDetailsPage ;