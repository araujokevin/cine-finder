import { HeartIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useMovieContext } from '../../contexts/MovieContext';

import styles from './styles.module.css';

export function FavoriteButton({ movie, size = 20, className = '' }) {
  const { state, dispatch } = useMovieContext();

  const isFav = state.favoriteMovies.some(f => f.id === movie.id);

  function handleToggle(e) {
    e.stopPropagation();
    e.preventDefault();

    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: movie,
    });

    if (isFav) {
      toast.error(`❌ "${movie.title}" removido dos favoritos`);
    } else {
      toast.success(`❤️ "${movie.title}" adicionado aos favoritos`);
    }
  }

  return (
    <button
      className={`${styles.button} ${isFav ? styles.active : ''} ${className}`}
      onClick={handleToggle}
      aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <HeartIcon
        size={size}
        fill={isFav ? '#e63946' : 'none'}
        stroke={isFav ? '#e63946' : 'currentColor'}
      />
    </button>
  );
}
