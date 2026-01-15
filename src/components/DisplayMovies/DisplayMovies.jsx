import Container from '../Container/Container';

import styles from './DisplayMovies.module.css';

function DisplayMovies({ children }) {
  return (
    <Container>
      <div className={styles.grid}>{children}</div>
    </Container>
  );
}

export default DisplayMovies;
