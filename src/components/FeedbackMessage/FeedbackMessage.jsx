import styles from './FeedbackMessage.module.css';

function FeedbackMessage({ title, message, icon: Icon, variant = 'info' }) {
  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      {Icon && (
        <div className={styles.icon}>
          <Icon size={32} />
        </div>
      )}

      {title && <h3 className={styles.title}>{title}</h3>}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default FeedbackMessage;
