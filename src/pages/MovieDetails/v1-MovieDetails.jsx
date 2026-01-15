import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';

import styles from './MovieDetails.module.css';
import { useEffect, useState } from 'react';
import tmdbApi from '../../services/tmdbApi';
import Loader from '../../components/Loader/Loader';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      const data = await tmdbApi.getMovieDetails(id);
      setMovie(data);
      console.log(data);
      setIsLoading(false);
    }

    fetchMovie();
  }, [id]);

  return (
    <>
      <MainTemplate>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <div
              className={styles.backdropContainer}
              style={{
                backgroundImage: movie?.backdrop_path
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
                      alt="Poster do filme"
                    />
                  </div>
                  <div className={styles.info}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <p className={styles.overview}>
                      <em>{movie.overview}</em>
                    </p>
                    <dl className={styles.detailsList}>
                      <div>
                        <dt className={styles.term}>Budget</dt>
                        <dd>XXXXXXX</dd>
                      </div>
                      <div>
                        <dt className={styles.term}>Revenue</dt>
                        <dd>$00000000</dd>
                      </div>
                      <div>
                        <dt className={styles.term}>Gêneros</dt>
                        <dd>Action, drama</dd>
                      </div>
                      <div>
                        <dt className={styles.term}>Nota</dt>
                        <dd>X/10</dd>
                      </div>
                    </dl>
                    <section className={styles.section}>
                      <h2 className={styles.sectionTitle}>
                        Diretor e Principais Atores
                      </h2>
                      <p className={styles.director}>Director name</p>
                      <p className={styles.cast}>Elenco:actors name</p>
                    </section>
                  </div>
                </article>
              </Container>
            </div>
          </>
        )}
      </MainTemplate>
    </>
  );
}

export default MovieDetails;
