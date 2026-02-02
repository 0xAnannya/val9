import confetti from 'canvas-confetti';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { getRandomNoMessage, toastMessageYes } from '../constants/toastMessages';
import { Decorations } from './Decorations';
import { HeartButton } from './HeartButton';
import styles from './ValentinePage.module.css';

const PROXIMITY_THRESHOLD_PX = 90;
const MIN_DISTANCE_FROM_CURSOR_PX = 120;
const NO_BUTTON_WIDTH = 120;
const NO_BUTTON_HEIGHT = 110;
const PADDING_PX = 40;

function getRandomPosition(
  mouseX: number,
  mouseY: number,
  viewportWidth: number,
  viewportHeight: number
): { x: number; y: number } {
  const minX = PADDING_PX;
  const maxX = Math.max(minX, viewportWidth - NO_BUTTON_WIDTH - PADDING_PX);
  const minY = PADDING_PX;
  const maxY = Math.max(minY, viewportHeight - NO_BUTTON_HEIGHT - PADDING_PX);

  let x: number;
  let y: number;
  let attempts = 0;
  const maxAttempts = 20;

  do {
    x = minX + Math.random() * (maxX - minX);
    y = minY + Math.random() * (maxY - minY);
    const distFromMouse = Math.hypot(x + NO_BUTTON_WIDTH / 2 - mouseX, y + NO_BUTTON_HEIGHT / 2 - mouseY);
    if (distFromMouse >= MIN_DISTANCE_FROM_CURSOR_PX) break;
    attempts++;
  } while (attempts < maxAttempts);

  return { x, y };
}

function getInitialNoPosition(viewportWidth: number, viewportHeight: number): { x: number; y: number } {
  const centerX = (viewportWidth - NO_BUTTON_WIDTH) / 2;
  const centerY = (viewportHeight - NO_BUTTON_HEIGHT) / 2;
  return {
    x: centerX + 100,
    y: centerY + 80,
  };
}

function getInitialNoPositionSSR(): { x: number; y: number } {
  if (typeof window === 'undefined') return { x: 400, y: 320 };
  return getInitialNoPosition(window.innerWidth, window.innerHeight);
}

export function ValentinePage() {
  const { showToast } = useToast();
  const [yesClicked, setYesClicked] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState(getInitialNoPositionSSR);
  const [viewportSize, setViewportSize] = useState(() =>
    typeof window === 'undefined' ? { w: 0, h: 0 } : { w: window.innerWidth, h: window.innerHeight }
  );

  const updateViewport = useCallback(() => {
    setViewportSize({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  useEffect(() => {
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, [updateViewport]);

  useEffect(() => {
    if (yesClicked || viewportSize.w === 0 || viewportSize.h === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const btnCenterX = noButtonPosition.x + NO_BUTTON_WIDTH / 2;
      const btnCenterY = noButtonPosition.y + NO_BUTTON_HEIGHT / 2;
      const distance = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

      if (distance < PROXIMITY_THRESHOLD_PX) {
        setNoButtonPosition(
          getRandomPosition(mouseX, mouseY, viewportSize.w, viewportSize.h)
        );
        showToast(getRandomNoMessage().message);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [yesClicked, noButtonPosition, viewportSize.w, viewportSize.h, showToast]);

  const handleYesClick = useCallback(() => {
    setYesClicked(true);
    setNoButtonPosition(getInitialNoPosition(viewportSize.w, viewportSize.h));
    showToast(toastMessageYes);
    const fire = (options: confetti.Options) =>
      confetti({
        origin: { x: 0.5, y: 0.6 },
        spread: 100,
        startVelocity: 35,
        ...options,
      });
    const colors = ['#c41e3a', '#8b2a2a', '#e8a0a0', '#f5c6c6'];
    fire({ colors, particleCount: 80 });
    fire({ colors, particleCount: 60, angle: 60, spread: 55 });
    fire({ colors, particleCount: 60, angle: 120, spread: 55 });
  }, [showToast, viewportSize.w, viewportSize.h]);

  const handleRestart = useCallback(() => {
    setYesClicked(false);
    setNoButtonPosition(getInitialNoPosition(viewportSize.w, viewportSize.h));
  }, [viewportSize.w, viewportSize.h]);

  return (
    <div className={styles.page}>
      <div className={styles.woodBg} aria-hidden />
      <Decorations />

      <main className={styles.main}>
        <h1 className={styles.headline}>
          {yesClicked ? 'See you on 14th, DEE!' : 'Will you be my Valentine, Dhairya ?'}
        </h1>
        <div className={styles.heartDivider} aria-hidden>
          <span className={styles.heartIcon}>♥</span>
        </div>
        <div className={styles.buttons}>
          <div className={styles.yesWrapper}>
            <HeartButton variant="yes" label="Yes" onClick={handleYesClick} />
          </div>
          <motion.div
            className={styles.noWrapper}
            initial={false}
            animate={{
              x: noButtonPosition.x,
              y: noButtonPosition.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: NO_BUTTON_WIDTH,
              height: NO_BUTTON_HEIGHT,
            }}
          >
            <HeartButton variant="no" label="No" onClick={() => {}} />
          </motion.div>
        </div>
        {yesClicked && (
          <button
            type="button"
            className={styles.restartButton}
            onClick={handleRestart}
            aria-label="Restart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        )}
      </main>
      <span className={styles.travelText}>lets travel the world together</span>
    </div>
  );
}
