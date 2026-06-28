import { Link } from 'react-router-dom'
import { useFavourites } from '../hooks/useFavourites'
import DetailsBox from '../components/DetailsBox';
import DetailBlock from '../components/DetailBlock';

const FavouritesPage = () => {
  const { favourites, toggleFavourite } = useFavourites();

    if (favourites.length === 0) return (
      <h2 className='text-star-yellow text-xl md:text-3xl font-bold text-center'>You haven't added any favourites yet.</h2>
    );

  return (
    <section>
      <h2 className='text-star-yellow text-xl md:text-3xl font-bold'>Your Favourites</h2>
      <div className='flex flex-wrap gap-5 mb-5'>
        {favourites.map(fav => (
          <div key={`${fav.type}-${fav.id}`} className='flex flex-col gap-3'>
            <Link
                key={`${fav.type}-${fav.id}`}
                to={`/${fav.type === 'character' ? 'characters' : 'films'}/${fav.id}`}
                className='text-star-creme font-bold hover:text-star-yellow flex flex-col gap-3'
            >
               <DetailsBox>
                    <DetailBlock label={'Name/Title'} value={fav.name}/>
                    <DetailBlock label={'Type'} value={fav.type}/>
                </DetailsBox> 
            </Link>
            <button
              onClick={() => toggleFavourite(fav)}
              className='rounded-md px-4 py-2 bg-star-creme text-black font-bold cursor-pointer hover:bg-star-yellow'
            >
              ★ Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FavouritesPage;