import type { Favourite } from '../hooks/useFavourites';
import { useFavourites } from '../hooks/useFavourites';

type Props = {
  favourite: Favourite
};

const FavouriteButton = ({ favourite }: Props) => {
    const { toggleFavourite, isFavourite } = useFavourites();
    const active = isFavourite(favourite.id, favourite.type);

    return (
        <button
            onClick={e => {
            e.preventDefault();
            toggleFavourite(favourite);
            }}
            className={`rounded-md px-4 py-2 font-bold transition-colors cursor-pointer
            ${active
                ? 'bg-star-yellow text-black hover:bg-star-mustard'
                : 'bg-star-creme text-black hover:bg-star-yellow'
            }`}
        >
            {active ? '★ Favourite' : '☆ Add to Favourites'}
        </button>
    )
}

export default FavouriteButton;