
import { Chest } from './Art';
import { Flame, ClipboardList, Zap, ArrowRight, Info as InfoIcon } from 'lucide-react';
import { LEVELS, levelFor } from '../data/data';
import { Badge, Info, Token } from './Bits';
import s from './ui.module.css';

export default function Hero({ xp, tasksDone, tasksTotal, todayXP }) {
  const cur = levelFor(xp);
  const next = LEVELS.find((l) => l.n === cur.n + 1);
  const pct = next ? Math.min(100, (xp / next.min) * 100) : 100;

  const stats = [
    {
      icon: <Token k="xp" size={38} />,
      title: 'XP Earned',
      value: `${todayXP} XP`,
      color: '#b99aff'
    },
    {
      icon: <ClipboardList size={32} color="#f5c451" />,
      title: 'Tasks Done',
      value: `${tasksDone} / ${tasksTotal}`,
      color: '#f5c451'
    },
    {
      icon: <Flame size={34} color="#ff792e" />,
      title: 'Streak',
      value: '7 Days',
      color: '#ff792e'
    }
  ];

  return (
    <div className={s.card} style={{
      padding: '26px',
      background: 'linear-gradient(145deg,#151323,#090a13)',
      border: '1px solid #f5c45155',
      boxShadow: '0 0 30px #f5c45112'
    }}>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 style={{
            color: '#fff',
            textTransform: 'none',
            letterSpacing: '0',
            fontSize: '1.35rem',
            marginBottom: '6px'
          }}>
            Good Morning, VeLooper! 👋
          </h2>
          <p className={s.mut} style={{ margin: 0 }}>
            Level up your journey and unlock epic rewards every day.
          </p>
        </div>
        <div style={{
          background: '#f5c45115',
          border: '1px solid #f5c45155',
          borderRadius: '12px',
          padding: '9px 13px',
          color: '#f5c451',
          fontSize: '13px',
          fontWeight: 700
        }}>
          <Zap size={15} style={{ display: 'inline', marginRight: 5 }} />
          LEVEL PROGRESS
        </div>
      </div>

      <div className="d-flex align-items-center gap-4 flex-wrap"
        style={{
          background: 'linear-gradient(110deg,#11121d,#0b0c16)',
          border: '1px solid #f5c45145',
          borderRadius: '16px',
          padding: '20px'
        }}>

        <Badge n={cur.n} size={112} />

        <div className="flex-fill" style={{ minWidth: '180px' }}>
          <div className={s.mut} style={{ fontSize: '13px' }}>
            CURRENT LEVEL
            <Info text="XP helps you progress through levels. Higher levels may unlock rewards according to the platform's level system. Values are demo data." />
          </div>

          <div style={{
            fontSize: 'clamp(2rem,4vw,3rem)',
            fontWeight: 800,
            color: '#f5c451',
            lineHeight: 1.2
          }}>
            LEVEL {String(cur.n).padStart(2, '0')}
          </div>

          <div className={s.mut}>{cur.name}</div>
        </div>

        <div className="text-lg-end">
          <div className={s.mut} style={{ fontSize: '13px' }}>
            TOTAL EXPERIENCE
          </div>
          <div style={{
            fontSize: 'clamp(1.7rem,3vw,2.4rem)',
            fontWeight: 800,
            color: '#fff'
          }}>
            {xp.toLocaleString()} <span style={{ color: '#f5c451', fontSize: '1rem' }}>XP</span>
          </div>
          <div className={s.mut} style={{ fontSize: '13px' }}>
            {next ? `${(next.min - xp).toLocaleString()} XP to Level ${next.n}` : 'Maximum level reached'}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="d-flex justify-content-between mb-2">
          <span className={s.mut}>Level {String(cur.n).padStart(2, '0')}</span>
          <span className={s.gold} style={{ fontWeight: 700 }}>
            {Math.round(pct)}% Completed
          </span>
          <span className={s.mut}>Level {next ? String(next.n).padStart(2, '0') : '--'}</span>
        </div>

        <div className={s.bar} style={{ height: '14px' }}>
          <div className={s.fill} style={{ width: `${pct}%` }} />
        </div>

        <div className="text-center mt-2 small" style={{ color: '#c1c3d0' }}>
          {xp.toLocaleString()} / {next ? next.min.toLocaleString() : xp.toLocaleString()} XP
        </div>
      </div>

      <div className="mt-4">
        <h2 style={{
          color: '#f5c451',
          fontSize: '14px',
          letterSpacing: '1px'
        }}>
          <Zap size={16} style={{ display: 'inline', marginRight: 7 }} />
          TODAY'S BOOST
        </h2>

        <div className="row g-3 mt-1">
          {stats.map((item) => (
            <div className="col-12 col-sm-4" key={item.title}>
              <div style={{
                background: 'linear-gradient(145deg,#151624,#0b0c17)',
                border: '1px solid #f5c45135',
                borderRadius: '15px',
                padding: '18px 10px',
                textAlign: 'center',
                height: '100%'
              }}>
                <div className="mb-2">{item.icon}</div>
                <div className={s.mut} style={{ fontSize: '12px' }}>
                  {item.title}
                </div>
                <div style={{
                  color: item.color,
                  fontSize: '20px',
                  fontWeight: 800,
                  marginTop: '5px'
                }}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export function RewardsPromo({ level, go }) {
  const l = LEVELS.find((x) => x.n === level) || LEVELS[0];

  return (
    <div className={`${s.card} d-flex flex-column justify-content-between`}
      style={{
        background: 'radial-gradient(circle at top,#241b13,#0b0c16 70%)',
        border: '1px solid #f5c45165',
        padding: '24px'
      }}>

      <div>
        <div className={s.gold} style={{
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '2px'
        }}>
          EXCLUSIVE REWARDS
        </div>

        <h2 style={{
          marginTop: '10px',
          color: '#fff',
          fontSize: '1.2rem'
        }}>
          Level {String(l.n).padStart(2, '0')} Rewards
        </h2>

        <p className={s.mut}>
          Amazing rewards await you!
        </p>
      </div>

      <div className="d-flex align-items-center justify-content-center gap-2 my-3 flex-wrap">
        <Chest size={135} />

        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Token k="coin" size={30} />
            <b style={{ color: '#f5c451' }}>+{l.ves} VEs</b>
          </div>

          {l.gems > 0 && (
            <div className="d-flex align-items-center gap-2">
              <Token k="gem" size={30} />
              <b style={{ color: '#b99aff' }}>+{l.gems} Gems</b>
            </div>
          )}
        </div>
      </div>

      <div className={s.tag} style={{ marginBottom: '12px' }}>
        Demo reward values – not official.
      </div>

      <button className={s.btn} onClick={() => go('rewards')}>
        View Rewards <ArrowRight size={16} style={{ display: 'inline', marginLeft: 5 }} />
      </button>
    </div>
  );
}
