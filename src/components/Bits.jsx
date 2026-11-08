
import { Info as InfoIcon } from 'lucide-react';
import s from './ui.module.css';

export const Badge = ({ n, size = 96, locked = false }) => (
  <div
    className={`${s.bw} ${locked ? s.locked : ''}`}
    style={{ width: size, height: size }}
    aria-label={`Level ${n}${locked ? ', locked' : ''}`}
  >
    <div
      className={s.badge}
      style={{
        '--size': `${size}px`,
        width: '100%',
        height: '100%',
        filter: locked ? 'grayscale(1)' : 'drop-shadow(0 0 12px #f5c45155)'
      }}
    >
      <div>
        <small>LEVEL</small>
        <b>{String(n).padStart(2, '0')}</b>
      </div>
    </div>
  </div>
);

export const Token = ({ k, size = 34 }) => {
  const valid = ['xp', 'coin', 'gem'].includes(k);

  if (!valid) return null;

  return (
    <span
      className={`${s.tk} ${s[k]}`}
      style={{
        '--s': `${size}px`,
        width: size,
        height: size,
        flexShrink: 0
      }}
      role="img"
      aria-label={k === 'xp' ? 'XP token' : k === 'coin' ? 'VE coin' : 'Gem'}
    >
      {k === 'xp' ? 'XP' : k === 'coin' ? 'V' : ''}
    </span>
  );
};

export const Info = ({ text }) => (
  <span className={s.info}>
    <button
      type="button"
      aria-label="More information"
      title={text}
    >
      <InfoIcon size={16} />
    </button>
    <span role="tooltip" className={s.tip}>
      {text}
    </span>
  </span>
);
