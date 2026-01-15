const API_KEY = import.meta.env.VITE_TMDB_KEY; // coloque em .env
const BASE = 'https://api.themoviedb.org/3';

export default {
  async searchMovies(query, page = 1) {
    if (!query) return { results: [], total_results: 0 };

    const url = `${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar filmes: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro em searchMovies:', error);
      return { results: [], total_results: 0 };
    }
  },

  async getMovieDetails(id) {
    const url = `${BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar detalhes do filme: ${response.statusText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro em getMovieDetails:', error);
      return null;
    }
  },

  async getPopularMovies(page = 1) {
    const url = `${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar filmes populares: ${response.statusText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro em getPopularMovies:', error);
      return { results: [], total_results: 0 };
    }
  },
};
