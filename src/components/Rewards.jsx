
import {
  TrendingUp,
  Target,
  Gift,
  Sparkles,
  Crown,
  CheckCircle2,
  Star
} from 'lucide-react';

import { levelFor } from '../data/data';
import { Emblem } from './Art';
import { Token } from './Bits';
import s from './ui.module.css';

export default function Rewards({ xp, claimed, claimLevel }) {
  const l = levelFor(xp);
  const done = !!claimed[l.n];

  return (
    <div className="row g-3 align-items-stretch">

      {/* Level Celebration */}
      <div className="col-xl-6">
        <div
          className={`${s.card} text-center h-100`}
          style={{
            background: 'radial-gradient(circle at center,#30220d 0%,#11111b 55%,#0b0c14 100%)',
            border: '1px solid #f5c45155',
            padding: 28
          }}
        >
          <div className="d-flex justify-content-center align-items-center gap-2 gold fw-bold">
            <Sparkles size={20} />
            LEVEL UP CELEBRATION
            <Sparkles size={20} />
          </div>

          <h2 className="mt-3 mb-1">
            Congratulations!
          </h2>

          <p className={s.mut}>
            You have reached a new milestone.
          </p>

          <div
            className={`${s.reveal} mt-3`}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 310
            }}
          >
            <Emblem n={l.n} size={280} />
          </div>

          <div className="mt-3">
            <div className="gold fw-bold fs-3">
              LEVEL {l.n}
            </div>
            <div className={s.mut}>
              {l.name}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <Star size={18} color="#f5c451" />
            <Star size={18} color="#f5c451" />
            <Star size={18} color="#f5c451" />
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="col-xl-6">
        <div className={`${s.card} h-100`}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Gift size={22} color="#f5c451" />
            <h2 className="m-0">
              LEVEL {l.n} REWARDS
            </h2>
          </div>

          <p className={`${s.mut} mb-4`}>
            Your achievements deserve exciting rewards!
          </p>

          <div className="row g-3 mb-4">

            <div className="col-sm-6">
              <div
                className="text-center h-100"
                style={{
                  padding: 20,
                  borderRadius: 17,
                  background: 'linear-gradient(145deg,#2a210f,#11111b)',
                  border: '1px solid #f5c45155'
                }}
              >
                <Token k="coin" size={80} />

                <div className="fs-3 fw-bold gold mt-2">
                  +{l.ves}
                </div>

                <div className="fw-semibold">
                  VE Coins
                </div>

                <div className={s.tag}>
                  Demo Reward
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div
                className="text-center h-100"
                style={{
                  padding: 20,
                  borderRadius: 17,
                  background: 'linear-gradient(145deg,#17251c,#11111b)',
                  border: '1px solid #2fd37a55'
                }}
              >
                <Token k="gem" size={80} />

                <div className="fs-3 fw-bold mt-2" style={{ color: '#2fd37a' }}>
                  +{l.gems}
                </div>

                <div className="fw-semibold">
                  Gems
                </div>

                <div className={s.tag}>
                  Demo Reward
                </div>
              </div>
            </div>

          </div>

          <h2 className="mb-3">
            LEVEL BENEFITS
          </h2>

          {[
            [TrendingUp, 'Higher daily XP limit'],
            [Target, 'Access to new challenges'],
            [Gift, 'Better reward opportunities']
          ].map(([I, t]) => (
            <div
              className={s.row}
              key={t}
              style={{
                padding: '14px 10px',
                borderBottom: '1px solid #f5c45120'
              }}
            >
              <I size={21} color="#f5c451" />
              <span className="flex-fill">{t}</span>
              <span className={s.tag}>Concept</span>
            </div>
          ))}

          <button
            className={`${s.btn} w-100 mt-4`}
            disabled={done}
            onClick={() => claimLevel(l)}
            style={{
              minHeight: 52,
              fontSize: 16,
              opacity: done ? 0.65 : 1
            }}
          >
            {done ? (
              <>
                <CheckCircle2 size={19} className="me-2" />
                Rewards Claimed
              </>
            ) : (
              <>
                <Crown size={19} className="me-2" />
                CLAIM REWARDS
              </>
            )}
          </button>

          <div className={`${s.tag} mt-3 text-center`}>
            Demo rewards are stored locally. Real reward crediting requires a connected backend.
          </div>
        </div>
      </div>

    </div>
  );
}
