
import { LEVELS } from '../data/data';
import { Badge, Token } from './Bits';
import { Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import s from './ui.module.css';

export default function LevelUpModal({ level, onClose }) {
  if (!level) return null;

  const l = LEVELS.find((x) => x.n === level);

  return (
    <div
      className={s.modal}
      role="dialog"
      aria-modal="true"
      aria-label="Level up celebration"
    >
      <div
        className={s.mbox}
        style={{
          width: 'min(92vw, 460px)',
          textAlign: 'center',
          padding: '32px 24px',
          border: '1px solid #f5c45188',
          boxShadow: '0 0 50px #f5c45130',
          background: 'linear-gradient(160deg, #171426, #090a13 75%)'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            color: '#f5c451',
            letterSpacing: '3px',
            fontWeight: 800,
            fontSize: 13
          }}
        >
          <Sparkles size={18} />
          LEVEL UP
          <Sparkles size={18} />
        </div>

        <div className="mt-3">
          <Trophy size={42} color="#f5c451" />
        </div>

        <h2
          className="fw-bold mt-2"
          style={{
            color: '#f5c451',
            fontSize: '2rem',
            textShadow: '0 0 20px #f5c45155'
          }}
        >
          Congratulations!
        </h2>

        <div className={s.mut}>
          You have reached a new level
        </div>

        <div
          className={`d-flex justify-content-center my-4 ${s.reveal}`}
        >
          <Badge n={level} size={150} />
        </div>

        <div className="h4 fw-bold">
          {l?.name || `Level ${level}`}
        </div>

        <div
          className="d-flex align-items-center justify-content-center gap-2 my-3"
          style={{
            background: '#f5c45112',
            border: '1px solid #f5c45144',
            borderRadius: 14,
            padding: '14px'
          }}
        >
          <CheckCircle2 size={22} color="#f5c451" />
          <div>
            <div className={s.mut}>Level Reward</div>
            <div className="fw-bold gold">{l?.reward || 'New milestone unlocked'}</div>
          </div>
        </div>

        {l?.ves > 0 && (
          <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
            <Token k="coin" size={30} />
            <b>+{l.ves} VEs</b>
          </div>
        )}

        {l?.gems > 0 && (
          <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
            <Token k="gem" size={30} />
            <b>+{l.gems} Gems</b>
          </div>
        )}

        <button
          className={`${s.btn} w-100 mt-3`}
          autoFocus
          onClick={onClose}
        >
          Continue
        </button>

        <div className={`${s.mut} small mt-3`}>
          Keep earning XP and unlock your next milestone!
        </div>
      </div>
    </div>
  );
}
