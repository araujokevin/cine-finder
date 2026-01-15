import { useEffect, useState } from 'react';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import DisplayMovies from '../../components/DisplayMovies/DisplayMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import tmdbApi from '../../services/tmdbApi';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filmes populares
  useEffect(() => {
    async function fetchPopularMovies() {
      setIsLoading(true);
      const data = await tmdbApi.getPopularMovies();
      setPopularMovies(data.results);
      setIsLoading(false);
    }
    fetchPopularMovies();
  }, []);

  // Buscar filmes automaticamente quando o usuário digita
  useEffect(() => {
    if (query.trim() !== '') {
      handleSearchMovies(query);
    }
  }, [query]);

  // Função de busca
  async function handleSearchMovies(query) {
    setIsLoading(true);
    const data = await tmdbApi.searchMovies(query);
    console.log(data);
    setSearchResults(data.results || []);
    setIsLoading(false);
  }

  const moviesToShow = query ? searchResults : popularMovies;

  return (
    <MainTemplate>
      <SearchMovie
        query={query}
        setQuery={setQuery}
        totalResults={moviesToShow.length}
      />
      <DisplayMovies>
        {isLoading && <Loader />}
        {!isLoading &&
          moviesToShow.map((m) => <MovieCard key={m.id} movie={m} />)}
      </DisplayMovies>
      <Pagination />
    </MainTemplate>
  );
}
