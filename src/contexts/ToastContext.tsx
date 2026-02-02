import { AnimatePresence } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Toast, TOAST_DURATION_MS, TOAST_SLIDE_DURATION_S } from '../components/Toast';

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), TOAST_DURATION_MS);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {message ? (
          <Toast
            key={message}
            message={message}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: TOAST_SLIDE_DURATION_S }}
          />
        ) : null}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
