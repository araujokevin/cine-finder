import { HeartIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { ButtonDefault } from '../ButtonDefault/ButtonDefault';
import { useMovieContext } from '../../contexts/useMovieContext';

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { state } = useMovieContext();

  const favoritesCount = state.favoriteMovies.length;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  function handleToggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.favorites}>
          <Link to='/favorites' aria-label='Favoritos' title='Favoritos'>
            <HeartIcon />

            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </Link>
        </li>

        <li>
          <ButtonDefault
            className={styles.btnTheme}
            onClick={handleToggleTheme}
            aria-label='Alternar tema'
            title='Alternar tema'
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </ButtonDefault>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
