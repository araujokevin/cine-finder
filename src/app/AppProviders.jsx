import { BrowserRouter } from 'react-router-dom';
import { MovieProvider } from '../contexts/MovieContext';

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <MovieProvider>{children}</MovieProvider>
    </BrowserRouter>
  );
}
