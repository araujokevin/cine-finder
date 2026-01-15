import { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';

import { MovieContext } from './MovieContext';
import movieReducer, { initialState } from '../reducers/movieReducer';

export function MovieProvider({ children }) {
  const location = useLocation();

  // 🔹 Recupera favoritos salvos ao iniciar o app
  const savedFavorites =
    JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  const [state, dispatch] = useReducer(movieReducer, {
    ...initialState,
    favoriteMovies: savedFavorites,
  });

  // 🔹 Salva favoritos no localStorage
  useEffect(() => {
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(state.favoriteMovies),
    );
  }, [state.favoriteMovies]);

  // 🔹 Limpa busca ao mudar de rota
  useEffect(() => {
    dispatch({ type: 'RESET_SEARCH' });
  }, [location.pathname]);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}
