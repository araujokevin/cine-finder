import { BrowserRouter } from 'react-router-dom';
import { MovieProvider } from '../contexts/MovieProvider';

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <MovieProvider>{children}</MovieProvider>
    </BrowserRouter>
  );
}
