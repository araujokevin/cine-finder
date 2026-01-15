import styles from './ButtonDefault.module.css';

export function ButtonDefault({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
