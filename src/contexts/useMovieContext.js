import { useContext } from 'react';
import { MovieContext } from './MovieContext';

export function useMovieContext() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovieContext deve ser usado dentro de MovieProvider');
  }

  return context;
}
