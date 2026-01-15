// src/utils/getVoteColor.js
export function getVoteColor(vote) {
  if (vote >= 7) {
    return 'var(--success)'; // verde
  }

  if (vote >= 5) {
    return 'var(--warning)'; // amarelo
  }

  return 'var(--error)'; // vermelho
}
