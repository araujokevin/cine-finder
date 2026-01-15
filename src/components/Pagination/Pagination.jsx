import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../Container/Container';

import styles from './Pagination.module.css';
import { useMovieContext } from '../../contexts/useMovieContext';
import { ButtonDefault } from '../ButtonDefault/ButtonDefault';

function Pagination() {
  const { dispatch, state } = useMovieContext();

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > state.totalPagesCount) return;
    dispatch({ type: 'SET_PAGE', payload: newPage });
  }
  return (
    <Container>
      <div className={styles.pagination}>
        <ButtonDefault
          className={styles.btn}
          disabled={state.currentPage === 1}
          onClick={() => handlePageChange(state.currentPage - 1)}
        >
          <ArrowLeft />
        </ButtonDefault>

        <ButtonDefault
          className={styles.btn}
          onClick={() => handlePageChange(state.currentPage + 1)}
          disabled={state.currentPage === state.totalPagesCount}
        >
          <ArrowRight />
        </ButtonDefault>
      </div>
      <div className={styles.results}>
        <p>
          Página {state.currentPage} de {state.totalPagesCount}
        </p>
      </div>
    </Container>
  );
}

export default Pagination;
