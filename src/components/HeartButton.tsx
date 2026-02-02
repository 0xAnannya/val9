import type { ButtonHTMLAttributes } from 'react';
import styles from './HeartButton.module.css';

export type HeartVariant = 'yes' | 'no';

interface HeartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: HeartVariant;
  label: string;
}

export function HeartButton({ variant, label, className = '', ...props }: HeartButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.heart} ${styles[variant]} ${className}`.trim()}
      aria-label={label}
      {...props}
    >
      <span className={styles.label}>{label}</span>
    </button>
  );
}
