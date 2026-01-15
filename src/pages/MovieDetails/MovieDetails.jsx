import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';

import styles from './MovieDetails.module.css';
import { useEffect, useState } from 'react';
import tmdbApi from '../../services/tmdbApi';
import Loader from '../../components/Loader/Loader';
import { FavoriteButton } from '../../components/FavoriteButton/FavoriteButton';
import { ButtonDefault } from '../../components/ButtonDefault/ButtonDefault';
import { AlertCircleIcon, ArrowLeftIcon } from 'lucide-react';
import FeedbackMessage from '../../components/FeedbackMessage/FeedbackMessage';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

function MovieDetails() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleGoBack() {
    navigate('/');
  }

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await tmdbApi.getMovieDetails(id);

        if (!data) {
          throw new Error('Filme não encontrado');
        }

        setMovie(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  // Atualiza o título
  useEffect(() => {
    if (!movie) return;
    document.title = `Filme | ${movie.title}`;

    return () => {
      document.title = 'CineFinder';
    };
  }, [movie]);

  return (
    <MainTemplate>
      {isLoading && <Loader />}

      {error && (
        <Container>
          <FeedbackMessage
            variant='error'
            icon={AlertCircleIcon}
            title='Erro ao carregar o filme'
            message={error}
          />
        </Container>
      )}

      {!isLoading && !error && movie && (
        <div
          className={styles.backdropContainer}
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(${IMG_PATH}${movie.backdrop_path})`
              : 'none',
          }}
        >
          <div className={styles.backdropOverlay}></div>

          <Container>
            <article className={styles.movieDetails}>
              <div className={styles.poster}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/no_image.png'
                  }
                  alt={movie.title}
                />
              </div>

              <div className={styles.info}>
                <div className={styles.actions}>
                  <ButtonDefault
                    onClick={handleGoBack}
                    aria-label='Voltar para Home'
                  >
                    <ArrowLeftIcon size={20} />
                  </ButtonDefault>

                  <FavoriteButton
                    movie={movie}
                    className={styles.btnFavorite}
                  />
                </div>
                <h1 className={styles.title}>{movie.title}</h1>

                <p className={styles.overview}>
                  <em>{movie.overview}</em>
                </p>

                <dl className={styles.detailsList}>
                  <div>
                    <dt className={styles.term}>Orçamento</dt>
                    <dd>
                      {movie.budget
                        ? `$${movie.budget.toLocaleString()}`
                        : 'N/A'}
                    </dd>
                  </div>

                  <div>
                    <dt className={styles.term}>Bilheteria</dt>
                    <dd>
                      {movie.revenue
                        ? `$${movie.revenue.toLocaleString()}`
                        : 'N/A'}
                    </dd>
                  </div>

                  <div>
                    <dt className={styles.term}>Gêneros</dt>
                    <dd>
                      {movie.genres?.map(g => g.name).join(', ') || 'N/A'}
                    </dd>
                  </div>

                  <div>
                    <dt className={styles.term}>Nota</dt>
                    <dd>{movie.vote_average}/10</dd>
                  </div>
                </dl>

                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>
                    Diretor e Principais Atores
                  </h2>

                  <p className={styles.director}>
                    {movie.credits?.crew?.find(p => p.job === 'Director')
                      ?.name || 'N/A'}
                  </p>

                  <p className={styles.cast}>
                    Elenco:{' '}
                    {movie.credits?.cast
                      ?.slice(0, 5)
                      .map(a => a.name)
                      .join(', ') || 'N/A'}
                  </p>
                </section>
              </div>
            </article>
          </Container>
        </div>
      )}
    </MainTemplate>
  );
}

export default MovieDetails;
