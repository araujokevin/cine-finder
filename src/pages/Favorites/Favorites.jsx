import { HeartOffIcon } from 'lucide-react';
import DisplayMovies from '../../components/DisplayMovies/DisplayMovies';
import FeedbackMessage from '../../components/FeedbackMessage/FeedbackMessage';

import MovieCard from '../../components/MovieCard/MovieCard';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import { useMovieContext } from '../../contexts/MovieContext';

import styles from './Favorites.module.css';

export default function Favorites() {
  const { state } = useMovieContext();
  const totalFavorites = state.favoriteMovies.length;

  return (
    <>
      <MainTemplate>
        <div className={styles.favorites}>
          <h2>
            Filmes favoritos{' '}
            {totalFavorites > 0 && (
              <span className={styles.count}>{totalFavorites}</span>
            )}
          </h2>
        </div>

        <DisplayMovies>
          {totalFavorites === 0 && (
            <FeedbackMessage
              variant='empty'
              icon={HeartOffIcon}
              title='Nenhum favorito ainda'
              message='Adicione filmes aos favoritos para vê-los aqui.'
            />
          )}

          {state.favoriteMovies.map(m => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </DisplayMovies>
      </MainTemplate>
    </>
  );
}
