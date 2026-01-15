import { FilmIcon } from 'lucide-react';
import Navbar from '../Navbar/Navbar';

import styles from './Header.module.css';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.header}>
          <Link to='/' className={styles.logo} aria-label='Página inicial'>
            <FilmIcon />
            <span>CineFinder</span>
          </Link>

          <Navbar />
        </div>
      </Container>
    </header>
  );
}

export default Header;
