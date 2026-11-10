import {
  Check,
  Play,
  ClipboardList,
  Users,
  Gamepad2,
  Flame,
  Magnet,
  CalendarCheck,
  UserCheck,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Sparkles,
  Lock
} from 'lucide-react';

import { EARN } from '../data/data';
import { Info } from './Bits';
import s from './ui.module.css';

const IC = {
  watch: Play,
  tasks: ClipboardList,
  refer: Users,
  minigames: Gamepad2,
  streak: Flame,
  catcher: Magnet,
  login: CalendarCheck,
  profile: UserCheck
};

const Ic = ({ o, size = 24 }) => {
  const I = IC[o.id] || Sparkles;

  return (
    <span
      className={s.ico}
      style={{
        background: `linear-gradient(145deg, ${o.tone || '#8b6ff0'}, #171827)`,
        width: 52,
        height: 52,
        borderRadius: 15,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 5px 18px #0005'
      }}
    >
      <I size={size} color="#fff" />
    </span>
  );
};

export function Tiles({ go }) {
  return (
    <div className={s.card}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-1">
            <Sparkles size={19} className="me-2" />
            EARN MORE
            <Info text="Explore ways to earn XP. Amounts are demo values until officially configured." />
          </h2>
          <div className={`${s.mut} small`}>
            Explore activities and unlock exciting rewards.
          </div>
        </div>

        <button
          className={`${s.btn} ${s.ghost}`}
          onClick={() => go('earn')}
          aria-label="View all earning activities"
        >
          <ArrowRight size={19} />
        </button>
      </div>

      <div className="row g-3 mt-2">
        {EARN.slice(0, 6).map((o) => (
          <div className="col-6 col-md-4 col-xl-2" key={o.id}>
            <button
              className={s.tile}
              onClick={() => go(o.type === 'link' ? 'game' : 'earn')}
              style={{
                width: '100%',
                minHeight: 135,
                padding: 16,
                borderRadius: 17,
                border: '1px solid #f5c45135',
                background: 'linear-gradient(145deg,#151522,#0b0c16)',
                transition: 'all .2s ease'
              }}
            >
              <Ic o={o} size={25} />
              <div className="mt-3 small fw-bold">
                {o.title}
              </div>
              <div className={`${s.mut} mt-1`} style={{ fontSize: 11 }}>
                {o.type === 'soon' ? 'Coming Soon' : 'Explore Activity'}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Earn({ isDone, claim, go }) {
  return (
    <div className={s.card}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-1">
            <Sparkles size={20} className="me-2" />
            EARN &amp; LEVEL UP
            <Info text="Complete activities, earn XP, and climb levels. Amounts are demo values." />
          </h2>
          <div className={s.mut}>
            Complete activities. Earn XP. Unlock rewards.
          </div>
        </div>

        <span className={s.tag}>XP ACTIVITIES</span>
      </div>

      <div className="row g-3 mt-2">
        {EARN.map((o) => {
          const d = isDone(o);

          const act = () =>
            o.type === 'link' ? go('game') : claim(o);

          const disabled = o.type === 'soon' || d;

          return (
            <div className="col-xl-6" key={o.id}>
              <button
                className={s.row}
                onClick={act}
                disabled={disabled}
                style={{
                  width: '100%',
                  minHeight: 105,
                  padding: 17,
                  borderRadius: 16,
                  border: '1px solid #f5c45130',
                  background: 'linear-gradient(120deg,#141522,#0c0d17)',
                  opacity: o.type === 'soon' ? 0.65 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  transition: 'all .2s ease'
                }}
              >
                <Ic o={o} size={25} />

                <div className={s.grow} style={{ textAlign: 'left' }}>
                  <div className="fw-bold mb-1">
                    {o.title}
                    {o.type === 'soon' && (
                      <span className="badge text-bg-secondary ms-2">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <div className={`${s.mut} small mb-2`}>
                    {o.desc}
                  </div>

                  <div className="small fw-bold gold">
                    {o.type === 'link' ? 'Up to ' : ''}
                    +{o.xp} XP
                    <span className={s.mut}>
                      {' '}(demo)
                    </span>
                  </div>
                </div>

                <span
                  className="d-flex align-items-center gap-1"
                  style={{
                    color: d ? '#2fd37a' : '#f5c451',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {d ? (
                    <>
                      <Check size={17} />
                      <span className="small fw-bold">Done</span>
                    </>
                  ) : o.type === 'soon' ? (
                    <Lock size={17} />
                  ) : (
                    <ChevronRight size={23} />
                  )}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div
        className={`${s.row} mt-4`}
        style={{
          border: '1px solid #f5c45145',
          borderRadius: 15,
          background: '#f5c4510b',
          padding: 18
        }}
      >
        <div className={s.grow}>
          <div className="fw-bold gold">
            Keep Moving Forward!
          </div>
          <div className={`${s.mut} small`}>
            Every activity brings you one step closer to your next level.
          </div>
        </div>
        <BarChart3 size={34} color="#f5c451" />
      </div>
    </div>
  );
}