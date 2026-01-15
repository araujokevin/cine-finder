import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import FeedbackMessage from '../../components/FeedbackMessage/FeedbackMessage';

import { Film, Home, Heart } from 'lucide-react';
import styles from './PageNotFound.module.css';

function PageNotFound() {
  return (
    <MainTemplate>
      <Container>
        <FeedbackMessage
          variant='empty'
          icon={Film}
          title='404 — Cena não encontrada'
          message='Opa! Parece que essa página saiu de cartaz ou nunca chegou aos cinemas.'
        />

        <div className={styles.actions}>
          <Link to='/' className={styles.link}>
            <Home size={18} />
            Página principal
          </Link>

          <Link to='/favorites' className={styles.link}>
            <Heart size={18} />
            Favoritos
          </Link>
        </div>
      </Container>
    </MainTemplate>
  );
}

export default PageNotFound;
