
import { LEVELS, levelFor } from '../data/data';
import { Emblem } from './Art';
import { Token } from './Bits';
import {
  Trophy,
  Sparkles,
  RotateCcw,
  Home,
  TrendingUp,
  Crown
} from 'lucide-react';

import s from './ui.module.css';

const C = [
  ['6%', '10%', '#8b6ff0'],
  ['14%', '4%', '#f5c451'],
  ['22%', '14%', '#2fd37a'],
  ['34%', '6%', '#ff5a5a'],
  ['46%', '12%', '#7aa2f7'],
  ['58%', '5%', '#f5c451'],
  ['70%', '13%', '#8b6ff0'],
  ['82%', '6%', '#2fd37a'],
  ['92%', '12%', '#ff9a3c'],
  ['10%', '30%', '#f5c451'],
  ['90%', '28%', '#7aa2f7'],
  ['4%', '46%', '#2fd37a'],
  ['95%', '48%', '#8b6ff0']
];

export default function Result({ r, xp, go, replay }) {
  const cur = levelFor(xp);
  const next = LEVELS.find((l) => l.n === cur.n + 1);
  const pct = next
    ? Math.min(100, (xp / next.min) * 100)
    : 100;

  if (!r) {
    return (
      <div className={`${s.card} text-center py-5`}>
        <Trophy size={60} color="#f5c451" />

        <h2 className="justify-content-center mt-3">
          NO CHALLENGE PLAYED YET
        </h2>

        <p className={s.mut}>
          Start your XP Catcher challenge to see your results here.
        </p>

        <button
          className={s.btn}
          onClick={() => go('game')}
        >
          Play XP Catcher
        </button>
      </div>
    );
  }

  return (
    <div className="row g-3 align-items-stretch">

      {/* Celebration Panel */}
      <div className="col-xl-5">
        <div
          className={`${s.card} text-center h-100`}
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 480,
            background: 'radial-gradient(circle at center,#30220d,#11111b 65%)',
            border: '1px solid #f5c45155',
            padding: 25
          }}
        >
          {C.map(([x, y, c], i) => (
            <span
              key={i}
              className={s.cf}
              style={{
                left: x,
                top: y,
                background: c,
                transform: `rotate(${i * 37}deg)`
              }}
            />
          ))}

          <div className="position-relative">
            <Sparkles size={28} color="#f5c451" />

            <div className="hl mt-3">
              CHALLENGE<br />COMPLETE!
            </div>

            <p className={s.mut}>
              Amazing performance! Keep going.
            </p>

            <div
              className={s.reveal}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 300
              }}
            >
              <Emblem size={280} />
            </div>

            <div className="gold fw-bold fs-4">
              <Trophy size={22} className="me-2" />
              WELL PLAYED!
            </div>

            {r.nb && (
              <div className="badge text-bg-warning mt-3 p-2">
                NEW PERSONAL BEST!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="col-xl-7">
        <div className={`${s.card} h-100`}>

          <div className="text-center mb-4">
            <div className={s.mut}>
              YOUR FINAL SCORE
            </div>

            <div className="big gold">
              {r.sc}
            </div>

            {r.nb && (
              <span className="badge text-bg-warning">
                New Best Score!
              </span>
            )}
          </div>

          <h2>
            <Sparkles size={19} className="me-2" />
            YOUR REWARDS
          </h2>

          <div className="row g-3 my-2">

            <div className="col-sm-6">
              <div
                className="text-center p-3 h-100"
                style={{
                  borderRadius: 17,
                  background: 'linear-gradient(145deg,#211a36,#11111b)',
                  border: '1px solid #8b6ff055'
                }}
              >
                <Token k="xp" size={65} />

                <div className="fs-3 fw-bold mt-2" style={{ color: '#b69aff' }}>
                  +{r.xp} XP
                </div>

                <div className={s.tag}>
                  Experience Earned
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div
                className="text-center p-3 h-100"
                style={{
                  borderRadius: 17,
                  background: 'linear-gradient(145deg,#30220d,#11111b)',
                  border: '1px solid #f5c45155'
                }}
              >
                <Token k="coin" size={65} />

                <div className="fs-3 fw-bold gold mt-2">
                  +{r.ves} VEs
                </div>

                <div className={s.tag}>
                  VE Coins Earned
                </div>
              </div>
            </div>

          </div>

          <h2 className="mt-4">
            <TrendingUp size={19} className="me-2" />
            LEVEL PROGRESS
          </h2>

          <div className="d-flex justify-content-between small mb-2">
            <span className="gold">
              <Crown size={15} className="me-1" />
              Level {String(cur.n).padStart(2, '0')}
            </span>

            <span className={s.mut}>
              {next
                ? `Level ${String(next.n).padStart(2, '0')}`
                : 'Maximum Level'}
            </span>
          </div>

          <div
            className={s.bar}
            role="progressbar"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={s.fill}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className={`${s.mut} small text-center mt-2 mb-4`}>
            {xp.toLocaleString()} / {next ? next.min.toLocaleString() : xp.toLocaleString()} XP
            {' · '}
            {Math.round(pct)}%
          </div>

          <div className="row g-2">
            <div className="col-sm-6">
              <button
                className={`${s.btn} w-100`}
                onClick={replay}
              >
                <RotateCcw size={17} className="me-2" />
                Play Again
              </button>
            </div>

            <div className="col-sm-6">
              <button
                className={`${s.btn} ${s.ghost} w-100`}
                onClick={() => go('home')}
              >
                <Home size={17} className="me-2" />
                Dashboard
              </button>
            </div>
          </div>

          <div className={`${s.tag} mt-3 text-center`}>
            Game rewards are demo values stored locally.
          </div>

        </div>
      </div>
    </div>
  );
}
