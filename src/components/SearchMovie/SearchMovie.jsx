import { useEffect, useState } from 'react';
import Container from '../Container/Container';
import styles from './SearchMovie.module.css';
import { useMovieContext } from '../../contexts/useMovieContext';
import tmdbApi from '../../services/tmdbApi';

function SearchMovie() {
  const { dispatch, state } = useMovieContext();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.trim() === '') {
      dispatch({ type: 'RESET_SEARCH' }); // limpa tudo se o campo estiver vazio
      return;
    }

    // 🔹 sempre que o texto da busca mudar, reseta a página
    dispatch({ type: 'SET_PAGE', payload: 1 });
  }, [query, dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (query.trim() === '') return;

    const handleSearchMovies = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_QUERY', payload: query });

        const data = await tmdbApi.searchMovies(
          query,
          state.currentPage,
          signal,
        );

        dispatch({
          type: 'SET_SEARCHED_MOVIES',
          payload: data.results || [],
        });

        dispatch({
          type: 'SET_TOTAL_RESULTS_COUNT',
          payload: data.total_results || 0,
        });

        dispatch({
          type: 'SET_TOTAL_PAGES_COUNT',
          payload: data.total_pages || 0,
        });

        console.log('Total de páginas:', data.total_pages);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    handleSearchMovies();

    return () => controller.abort();
  }, [query, state.currentPage, dispatch]);

  return (
    <Container>
      <div className={styles.searchMovie}>
        <div className={styles.form}>
          <input
            type='text'
            placeholder='Buscar filmes pelo título (ex.: The matrix)'
            className={styles.inputSearch}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <p className={styles.numResults}>
          Resultados:
          {query && !state.isLoading && (
            <span>
              {state.totalResultsCount > 0
                ? `${state.totalResultsCount} filmes encontrados`
                : 'Nenhum filme encontrado'}
            </span>
          )}
        </p>
      </div>
    </Container>
  );
}

export default SearchMovie;
