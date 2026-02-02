import { motion } from 'framer-motion';
import styles from './Toast.module.css';

export const TOAST_DURATION_MS = 3000;
export const TOAST_SLIDE_DURATION_S = 0.3;

interface ToastProps {
  message: string;
}

function ToastContent({ message }: ToastProps) {
  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  );
}

export const Toast = motion(ToastContent);
