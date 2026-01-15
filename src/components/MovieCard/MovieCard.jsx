import { StarIcon } from 'lucide-react';
import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import { getVoteColor } from '../../utils/getVoteColor';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

function MovieCard({ movie }) {
  const { id, title, release_date, vote_average, poster_path } = movie;

  return (
    <div className={styles.movie}>
      <span
        className={styles.movieRating}
        style={{ color: getVoteColor(vote_average) }}
      >
        {vote_average ? vote_average.toFixed(1) : 'N/A'}{' '}
        <StarIcon size={16} fill='#d1df13ff' stroke='none' />
      </span>

      <FavoriteButton movie={movie} className={styles.btnFavorite} />

      <Link to={`/details/${id}`}>
        <img
          src={poster_path ? IMG_PATH + poster_path : '/no_image.png'}
          alt={`Poster de ${title}`}
        />
      </Link>

      <div className={styles.movieInfo}>
        <h3>{title}</h3>
        <p>{release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
