import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/Homepage";
import Header from "./components/Header";
import CharactersPage from "./pages/CharactersPage";
import FilmsPage from './pages/FilmsPage';
import NotFoundPage from "./pages/NotFound";
import FavouritesPage from './pages/FavouritesPage';
import CharacterDetailsPage from './pages/CharacterDetailsPage';
import FilmDetailsPage from './pages/FilmDetailsPage';
const App = () => {

  return (
    <div className="min-h-screen font-orbitron bg-black p-15">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/characters" element={<CharactersPage/>}/>
        <Route path="/characters/:name" element={<CharacterDetailsPage/>} />
        <Route path="/films" element={<FilmsPage/>}/>
        <Route path="/films/:title" element={<FilmDetailsPage/>} />
        <Route path="/favourites" element={<FavouritesPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  )
}

export default App;