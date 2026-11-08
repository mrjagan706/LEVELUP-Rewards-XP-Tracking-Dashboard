
import { Check, Lock, Target, Crown } from 'lucide-react';
import { LEVELS, levelFor } from '../data/data';
import { Badge, Info } from './Bits';
import s from './ui.module.css';

export default function Roadmap({ xp }) {
  const cur = levelFor(xp).n;

  return (
    <div className={s.card}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">
            <Target size={19} className="me-2" />
            LEVEL ROADMAP
            <Info text="Complete each XP requirement to unlock the next level. Reward values are demo placeholders." />
          </h2>
          <div className={s.mut}>
            Your journey to the next level
          </div>
        </div>

        <div className={s.tag}>
          {LEVELS.length} Levels
        </div>
      </div>

      <div className={s.road}>
        {LEVELS.map((l) => {
          const completed = l.n < cur;
          const current = l.n === cur;
          const next = l.n === cur + 1;
          const locked = l.n > cur + 1;

          const status = completed
            ? 'Completed'
            : current
            ? 'Current Level'
            : next
            ? 'Next Goal'
            : 'Locked';

          return (
            <div
              key={l.n}
              tabIndex={0}
              className={`${s.lv} ${current ? s.cur : ''} ${next ? s.next : ''}`}
              title={`Requires ${l.min.toLocaleString()} XP`}
              style={{
                minWidth: 125,
                padding: '18px 12px',
                borderRadius: 16,
                textAlign: 'center',
                background: current
                  ? 'linear-gradient(145deg, #29200d, #11111b)'
                  : '#0a0b15',
                border: current
                  ? '1px solid #f5c451'
                  : '1px solid #f5c45130',
                boxShadow: current
                  ? '0 0 22px #f5c45120'
                  : 'none',
                opacity: locked ? 0.55 : 1,
                transition: 'all .2s ease'
              }}
            >
              <div className="d-flex justify-content-center mb-2">
                <Badge
                  n={l.n}
                  size={68}
                  locked={locked}
                />
              </div>

              <div className="fw-bold mb-1">
                {l.name}
              </div>

              <div className={`${s.tag} mb-2`}>
                {l.min.toLocaleString()} XP
              </div>

              <div
                className="small fw-semibold d-flex align-items-center justify-content-center gap-1"
                style={{
                  color: completed || current
                    ? '#f5c451'
                    : next
                    ? '#8b6ff0'
                    : '#85899c'
                }}
              >
                {completed && <Check size={14} />}
                {current && <Crown size={14} />}
                {locked && <Lock size={13} />}
                {next && <Target size={14} />}
                {status}
              </div>

              <div className={`${s.tag} mt-2`}>
                {l.reward}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
