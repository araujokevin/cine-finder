import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorites from '../../pages/Favorites/Favorites';
import MovieDetails from '../../pages/MovieDetails/MovieDetails';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import { Home } from 'lucide-react';

export function MainRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='favorites' element={<Favorites />} />
      <Route path='details/:id' element={<MovieDetails />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}
