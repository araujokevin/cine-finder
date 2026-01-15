import { createContext, useContext, useEffect, useReducer } from 'react';
import movieReducer, { initialState } from '../reducers/movieReducer';
import { useLocation } from 'react-router-dom';

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const location = useLocation();
  // 🔹 Recupera favoritos salvos ao iniciar o app
  const savedFavorites =
    JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  // 🔹 Passa favoritos salvos para o estado inicial
  const [state, dispatch] = useReducer(movieReducer, {
    ...initialState,
    favoriteMovies: savedFavorites,
  });

  // 🔹 Salva favoritos no localStorage sempre que mudar
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

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext deve ser usado dentro de MovieProvider');
  }
  return context;
}
