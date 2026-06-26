import { Link } from "react-router-dom";

const Header = () => {
    return (
    <header className="flex justify-between mb-40">
        <p className="text-star-yellow text-3xl md:text-5xl font-bold">Star Wars</p>
        <Link className="text-star-creme text-xl md:text-2xl hover:opacity-75 hover:text-star-yellow" to='/'>Home</Link>
    </header>
    );
}

export default Header;