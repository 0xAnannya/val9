import styles from './Decorations.module.css';

const CONFETTI_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  left: `${5 + (i * 4.2) % 90}%`,
  top: `${10 + (i * 7) % 80}%`,
  delay: i * 0.2,
}));

export function Decorations() {
  return (
    <>
      {/* Top garland */}
      <div className={styles.garland} aria-hidden>
        <svg viewBox="0 0 1200 80" className={styles.garlandSvg}>
          <path
            className={styles.vine}
            d="M 0 45 Q 150 20 300 45 T 600 45 T 900 45 T 1200 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
          />
          <path
            className={styles.vine2}
            d="M 0 55 Q 200 75 400 55 T 800 55 T 1200 55"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
          />
          {/* Small roses along garland */}
          {[120, 300, 480, 660, 840, 1020].map((x) => (
            <g key={x} transform={`translate(${x}, 40)`}>
              <circle r="12" fill="#8b2a2a" opacity={0.9} />
              <circle r="8" fill="#a63d3d" transform="translate(-4,-4)" />
              <circle r="8" fill="#a63d3d" transform="translate(4,-4)" />
            </g>
          ))}
          {/* Small hearts on garland */}
          {[200, 400, 600, 800, 1000].map((x) => (
            <path
              key={x}
              className={styles.garlandHeart}
              d="M 0 0 C -4 -6 4 -6 0 0 C 4 -6 8 -6 4 0 C 4 4 0 6 0 0"
              transform={`translate(${x}, 35) scale(2)`}
              fill="#c41e3a"
            />
          ))}
        </svg>
      </div>

      {/* Corner: gift box with bow - upper left */}
      <div className={styles.giftBox}>
        <svg viewBox="0 0 60 70" className={styles.giftSvg}>
          <rect x="10" y="25" width="40" height="35" fill="#8b2a2a" stroke="#6b1a1a" strokeWidth="1" />
          <path d="M 30 25 L 30 60 M 10 42 L 50 42" stroke="#6b1a1a" strokeWidth="2" fill="none" />
          <ellipse cx="30" cy="22" rx="12" ry="6" fill="#a63d3d" />
          <path d="M 18 22 L 30 8 L 42 22 M 30 8 L 30 22" fill="#c41e3a" stroke="#8b2a2a" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Envelope with heart seal - upper right */}
      <div className={styles.envelope}>
        <svg viewBox="0 0 50 40" className={styles.envelopeSvg}>
          <path d="M 5 10 L 25 25 L 45 10 L 25 20 Z" fill="#f5f0e8" stroke="#d4c4a8" strokeWidth="0.5" />
          <circle cx="25" cy="18" r="6" fill="#c41e3a" />
          <path d="M 25 15 C 25 15 22 13 22 15 C 22 17 25 19 25 19 C 25 19 28 17 28 15 C 28 13 25 15 25 15 Z" fill="#8b2a2a" />
        </svg>
      </div>

      {/* Candle - lower right */}
      <div className={styles.candle}>
        <svg viewBox="0 0 40 70" className={styles.candleSvg}>
          <rect x="12" y="15" width="16" height="50" fill="#f5f0e8" stroke="#e0d5c4" strokeWidth="0.5" />
          <ellipse cx="20" cy="15" rx="8" ry="3" fill="#e8dcc8" />
          <path d="M 20 8 L 20 0 Q 22 5 20 8 Q 18 5 20 0 Z" fill="#f0e050" opacity={0.9} />
          <path d="M 20 8 L 20 0" stroke="#e8c030" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Roses - lower left */}
      <div className={styles.roses}>
        <svg viewBox="0 0 80 50" className={styles.rosesSvg}>
          <ellipse cx="25" cy="30" rx="8" ry="12" fill="#2d5016" />
          <circle cx="25" cy="18" r="10" fill="#8b2a2a" />
          <circle cx="22" cy="15" r="5" fill="#a63d3d" />
          <circle cx="28" cy="16" r="5" fill="#a63d3d" />
          <ellipse cx="55" cy="32" rx="8" ry="12" fill="#2d5016" />
          <circle cx="55" cy="20" r="10" fill="#8b2a2a" />
          <circle cx="52" cy="17" r="5" fill="#a63d3d" />
          <circle cx="58" cy="18" r="5" fill="#a63d3d" />
        </svg>
      </div>

      {/* Scattered small hearts */}
      <div className={styles.scatteredHearts} aria-hidden>
        {[
          { left: '8%', top: '25%', size: 12, rot: -10 },
          { left: '92%', top: '30%', size: 10, rot: 15 },
          { left: '15%', top: '75%', size: 14, rot: 5 },
          { left: '88%', top: '70%', size: 11, rot: -8 },
          { left: '50%', top: '20%', size: 8, rot: 0 },
          { left: '25%', top: '50%', size: 9, rot: 12 },
          { left: '75%', top: '55%', size: 10, rot: -5 },
        ].map((item, i) => (
          <span
            key={i}
            className={styles.smallHeart}
            style={{
              left: item.left,
              top: item.top,
              width: item.size,
              height: item.size,
              transform: `rotate(${item.rot}deg)`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* User rose image – 3 placements */}
      <img
        src="/rose.png"
        alt=""
        className={styles.roseImage}
        style={{ top: '85px', left: '15%', width: '72px', height: '72px', transform: 'rotate(-8deg)' }}
      />
      <img
        src="/rose.png"
        alt=""
        className={styles.roseImage}
        style={{ top: '50%', right: '12%', width: '64px', height: '64px', transform: 'translateY(-50%) rotate(5deg)' }}
      />
      <img
        src="/rose.png"
        alt=""
        className={styles.roseImage}
        style={{ bottom: '70px', left: '12%', width: '80px', height: '80px', transform: 'rotate(-12deg)' }}
      />

      {/* User envelope image – placements */}
      <img
        src="/envelope.png"
        alt=""
        className={styles.envelopeImage}
        style={{ top: '100px', right: '18%', width: '56px', height: '56px', transform: 'rotate(6deg)' }}
      />
      <img
        src="/envelope.png"
        alt=""
        className={styles.envelopeImage}
        style={{ top: '45%', left: '8%', width: '52px', height: '52px', transform: 'translateY(-50%) rotate(-10deg)' }}
      />
      <img
        src="/envelope.png"
        alt=""
        className={styles.envelopeImage}
        style={{ bottom: '90px', right: '20%', width: '60px', height: '60px', transform: 'rotate(8deg)' }}
      />

      {/* Confetti / sparkles */}
      <div className={styles.confetti} aria-hidden>
        {CONFETTI_POSITIONS.map((pos, i) => (
          <span
            key={i}
            className={styles.confettiPiece}
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: `${pos.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
