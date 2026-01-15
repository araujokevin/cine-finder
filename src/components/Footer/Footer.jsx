import { Link } from 'react-router-dom';
import { FilmIcon } from 'lucide-react';
import Container from '../Container/Container';

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.footer}>
          <Link to='/' className={styles.logo}>
            <FilmIcon />
            <span>CineFinder</span>
          </Link>

          <p className={styles.copy}>
            © {new Date().getFullYear()} CineFinder. Todos os direitos
            reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
