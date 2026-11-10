import { useState } from 'react';
import {
  Users,
  ClipboardList,
  Gamepad2,
  Flame,
  Gift,
  ChevronRight,
  History,
  TrendingUp,
  Sparkles
} from 'lucide-react';

import { Info, Token } from './Bits';
import s from './ui.module.css';

const TONE = {
  Referral: '#2f9e4f',
  Task: '#8a6d1e',
  Game: '#6d3fd6',
  Daily: '#d9531e',
  Level: '#b8862b'
};

const IC = {
  Referral: Users,
  Task: ClipboardList,
  Game: Gamepad2,
  Daily: Flame,
  Level: Gift
};

export default function Activity({
  items,
  onStart,
  limit = 20,
  full
}) {
  const [f, setF] = useState('All');

  const list = items
    .filter((a) => f === 'All' || a.cat === f)
    .slice(0, limit);

  return (
    <div className={s.card}>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <h2 className="mb-1">
            <History size={19} className="me-2" />
            RECENT ACTIVITY
            <Info text="A log of XP and rewards earned. Demo history is stored in your browser only." />
          </h2>

          <div className={`${s.mut} small`}>
            Track your latest achievements and rewards.
          </div>
        </div>

        {full && (
          <select
            aria-label="Filter by category"
            className="form-select form-select-sm w-auto bg-dark text-white"
            value={f}
            onChange={(e) => setF(e.target.value)}
          >
            {['All', 'Game', 'Task', 'Daily', 'Referral', 'Level'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        )}
      </div>

      {list.length === 0 ? (
        <div className="text-center py-5">
          <Sparkles size={42} color="#f5c451" />
          <h3 className="h5 mt-3">Your XP journey starts here!</h3>

          <p className={s.mut}>
            Complete activities to see your achievements here.
          </p>

          <button className={s.btn} onClick={onStart}>
            Start Earning XP <ChevronRight size={17} />
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {list.map((a) => {
            const I = IC[a.cat] || Gift;

            return (
              <div
                className={s.row}
                key={a.id}
                style={{
                  padding: 15,
                  borderRadius: 14,
                  border: '1px solid #f5c45125',
                  background: 'linear-gradient(110deg,#151522,#0c0d17)',
                  minWidth: 0
                }}
              >
                <span
                  className={s.ico}
                  style={{
                    background: TONE[a.cat] || '#1a1b2a',
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <I size={23} color="#fff" />
                </span>

                <div className={s.grow} style={{ minWidth: 0 }}>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    {a.xp > 0 && (
                      <span className="gold fw-bold">
                        +{a.xp} XP
                      </span>
                    )}

                    {a.ves > 0 && (
                      <span className="fw-bold" style={{ color: '#f5c451' }}>
                        +{a.ves} VEs
                      </span>
                    )}
                  </div>

                  <div className="fw-semibold mt-1">
                    {a.label}
                  </div>

                  <div className={`${s.tag} mt-1`}>
                    {a.time} · {a.status}
                  </div>
                </div>

                <ChevronRight
                  size={20}
                  color="#f5c451"
                  style={{ flexShrink: 0 }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Summary({ items }) {
  const today = items.filter((a) =>
    a.time.startsWith('Today')
  );

  const txp = today.reduce((a, b) => a + b.xp, 0);
  const tves = today.reduce((a, b) => a + (b.ves || 0), 0);

  return (
    <div className={s.card}>
      <h2 className="mb-1">
        <TrendingUp size={19} className="me-2" />
        TODAY&apos;S SUMMARY
      </h2>

      <p className={`${s.mut} small mb-3`}>
        Your earning progress for today.
      </p>

      <div
        className="d-flex align-items-center gap-3 mb-3"
        style={{
          padding: 18,
          borderRadius: 15,
          background: 'linear-gradient(120deg,#211b10,#11111b)',
          border: '1px solid #f5c45140'
        }}
      >
        <Token k="xp" size={48} />

        <div className="flex-fill">
          <div className="fs-3 fw-bold gold">
            {txp.toLocaleString()} XP
          </div>
          <div className={s.tag}>Total XP Earned Today</div>
        </div>
      </div>

      <div
        className="d-flex align-items-center gap-3"
        style={{
          padding: 18,
          borderRadius: 15,
          background: 'linear-gradient(120deg,#211b10,#11111b)',
          border: '1px solid #f5c45140'
        }}
      >
        <Token k="coin" size={48} />

        <div className="flex-fill">
          <div className="fs-3 fw-bold gold">
            {tves.toLocaleString()} VEs
          </div>
          <div className={s.tag}>Total VE Coins Earned Today</div>
        </div>
      </div>
    </div>
  );
}