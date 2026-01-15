import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import DisplayMovies from '../../components/DisplayMovies/DisplayMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import tmdbApi from '../../services/tmdbApi';
import { useMovieContext } from '../../contexts/useMovieContext';
import FeedbackMessage from '../../components/FeedbackMessage/FeedbackMessage';
import { SearchXIcon } from 'lucide-react';

export default function Home() {
  const { state, dispatch } = useMovieContext();

  useEffect(() => {
    async function fetchPopularMovies() {
      dispatch({ type: 'SET_LOADING', payload: true });

      const data = await tmdbApi.getPopularMovies();

      dispatch({
        type: 'SET_POPULAR_MOVIES',
        payload: data.results,
      });

      dispatch({ type: 'SET_LOADING', payload: false });
    }

    fetchPopularMovies();
  }, [dispatch]);

  const isSearching = state.searchQuery.trim() !== '';
  const moviesToShow = isSearching ? state.searchedMovies : state.popularMovies;

  return (
    <MainTemplate>
      <SearchMovie />
      <DisplayMovies>
        {state.isLoading && <Loader />}

        {!state.isLoading &&
          moviesToShow &&
          moviesToShow.map(m => <MovieCard key={m.id} movie={m} />)}

        {!state.isLoading && moviesToShow?.length === 0 && (
          <FeedbackMessage
            variant='empty'
            icon={SearchXIcon}
            title='Nenhum filme encontrado'
            message='Tente buscar por outro título'
          />
        )}
      </DisplayMovies>
      {state.totalResultsCount > 20 && <Pagination />}
    </MainTemplate>
  );
}
