export const initialState = {
  searchQuery: '',
  searchedMovies: [],
  popularMovies: [],
  totalResultsCount: 0,
  totalPagesCount: 0,
  currentPage: 1,
  favoriteMovies: [],
  isLoading: false,
};

export default function appReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_SEARCHED_MOVIES':
      return { ...state, searchedMovies: action.payload };

    case 'SET_TOTAL_RESULTS_COUNT':
      return { ...state, totalResultsCount: action.payload };
    case 'SET_TOTAL_PAGES_COUNT':
      return { ...state, totalPagesCount: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_POPULAR_MOVIES':
      return { ...state, popularMovies: action.payload };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'RESET_SEARCH':
      return {
        ...state,
        searchQuery: '',
        searchedMovies: [],
        totalResultsCount: 0,
        totalPagesCount: 0,
        currentPage: 1,
      };

    case 'TOGGLE_FAVORITE': {
      const movieExists = state.favoriteMovies.find(
        (f) => f.id === action.payload.id
      );
      return {
        ...state,
        favoriteMovies: movieExists
          ? state.favoriteMovies.filter((f) => f.id !== action.payload.id)
          : [...state.favoriteMovies, action.payload],
      };
    }

    default:
      return state;
  }
}
