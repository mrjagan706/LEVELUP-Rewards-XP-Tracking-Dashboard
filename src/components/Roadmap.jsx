
import {
  Check, Lock, Target, Crown, Shield, Compass,
  Award, Flame, Gem, Star, Trophy, Zap
} from 'lucide-react';

import { LEVELS, levelFor } from '../data/data';
import s from './ui.module.css';

const BADGES = [
  { icon: Shield, color: '#a5b4fc', glow: '#6366f1', shape: 'shield' },
  { icon: Compass, color: '#67e8f9', glow: '#0891b2', shape: 'circle' },
  { icon: Award, color: '#86efac', glow: '#16a34a', shape: 'diamond' },
  { icon: Flame, color: '#fdba74', glow: '#ea580c', shape: 'shield' },
  { icon: Gem, color: '#f9a8d4', glow: '#db2777', shape: 'diamond' },
  { icon: Crown, color: '#fde68a', glow: '#d97706', shape: 'crown' },
  { icon: Star, color: '#c4b5fd', glow: '#7c3aed', shape: 'circle' },
  { icon: Trophy, color: '#fcd34d', glow: '#ca8a04', shape: 'crown' }
];

function LevelEmblem({ level, index, locked, completed, current }) {
  const config = BADGES[index % BADGES.length];
  const Icon = config.icon;

  const badgeSize = 'clamp(76px, 9vw, 106px)';

  return (
    <div style={{
      width: badgeSize,
      height: badgeSize,
      margin: '0 auto',
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      borderRadius: config.shape === 'diamond' ? 26 : '50%',
      transform: config.shape === 'diamond' ? 'rotate(45deg)' : 'none',
      background: `linear-gradient(145deg, ${config.glow}, #11121f 75%)`,
      border: `2px solid ${config.color}`,
      boxShadow: current
        ? `0 0 30px ${config.glow}99, inset 0 0 20px ${config.glow}55`
        : `0 0 15px ${config.glow}44`,
      opacity: locked ? 0.4 : 1,
      filter: locked ? 'grayscale(0.8)' : 'none',
      transition: 'all .3s ease',
      flexShrink: 0
    }}>
      <div style={{
        width: '83%',
        height: '83%',
        borderRadius: config.shape === 'diamond' ? 20 : '50%',
        transform: config.shape === 'diamond' ? 'rotate(-45deg)' : 'none',
        background: 'radial-gradient(circle at 35% 25%, #34364d, #090a13 75%)',
        border: `1px solid ${config.color}88`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
      }}>
        <Icon
          size={30}
          color={config.color}
          strokeWidth={1.8}
        />

        <span style={{
          fontSize: 17,
          fontWeight: 900,
          color: '#fff',
          letterSpacing: 1
        }}>
          {String(level).padStart(2, '0')}
        </span>
      </div>

      {current && (
        <div style={{
          position: 'absolute',
          top: -9,
          right: -7,
          background: '#f5c451',
          color: '#17120a',
          borderRadius: 20,
          padding: '4px 7px',
          fontSize: 9,
          fontWeight: 900,
          transform: config.shape === 'diamond' ? 'rotate(-45deg)' : 'none'
        }}>
          LIVE
        </div>
      )}

      {completed && (
        <div style={{
          position: 'absolute',
          bottom: -5,
          right: -5,
          background: '#16a34a',
          border: '2px solid #090a13',
          borderRadius: '50%',
          padding: 4,
          display: 'grid',
          placeItems: 'center'
        }}>
          <Check size={14} color="#fff" />
        </div>
      )}
    </div>
  );
}

export default function Roadmap({ xp }) {
  const cur = levelFor(xp).n;

  const currentLevel = LEVELS.find(l => l.n === cur);
  const nextLevel = LEVELS.find(l => l.n === cur + 1);

  const progress = nextLevel && currentLevel
    ? Math.min(100, Math.max(0,
        ((xp - currentLevel.min) /
        (nextLevel.min - currentLevel.min)) * 100
      ))
    : 100;

  return (
    <div
      className={s.card}
      style={{
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        padding: 'clamp(14px, 2.5vw, 26px)',
        background: 'linear-gradient(145deg, #151426, #090a13 70%)',
        border: '1px solid #f5c45155',
        borderRadius: 22,
        overflow: 'hidden'
      }}
    >

      {/* Heading */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
        marginBottom: 24
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            color: '#f5c451',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 3,
            marginBottom: 7
          }}>
            YOUR ACHIEVEMENT JOURNEY
          </div>

          <h2 style={{
            color: '#fff',
            fontSize: 'clamp(19px, 2vw, 25px)',
            margin: 0,
            letterSpacing: 1
          }}>
            LEVEL PROGRESSION
          </h2>

          <p className={s.mut} style={{
            margin: '7px 0 0',
            fontSize: 13
          }}>
            Every milestone brings you closer to greatness.
          </p>
        </div>

        <div style={{
          background: '#f5c45118',
          border: '1px solid #f5c45155',
          padding: '10px 16px',
          borderRadius: 12,
          color: '#f5c451',
          fontWeight: 800,
          fontSize: 13
        }}>
          {LEVELS.length} LEVELS
        </div>
      </div>

      {/* Current XP summary */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
        background: 'linear-gradient(110deg, #29200e, #151321)',
        border: '1px solid #f5c45144',
        padding: 'clamp(12px, 2vw, 17px)',
        borderRadius: 16,
        marginBottom: 27
      }}>
        <div>
          <div style={{
            color: '#aaa6b9',
            fontSize: 11,
            letterSpacing: 1.5,
            fontWeight: 700
          }}>
            CURRENT EXPERIENCE
          </div>

          <div style={{
            color: '#f5c451',
            fontSize: 'clamp(23px, 3vw, 29px)',
            fontWeight: 900
          }}>
            {xp.toLocaleString()} <span style={{ fontSize: 13 }}>XP</span>
          </div>
        </div>

        <div style={{
          textAlign: 'right'
        }}>
          <div style={{
            color: '#aaa6b9',
            fontSize: 11
          }}>
            CURRENT LEVEL
          </div>

          <div style={{
            color: '#fff',
            fontSize: 23,
            fontWeight: 900
          }}>
            {String(cur).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Progress to next level */}
      {nextLevel && (
        <div style={{ marginBottom: 30 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 10,
            fontSize: 12
          }}>
            <span style={{
              color: '#f5c451',
              fontWeight: 800
            }}>
              NEXT: {nextLevel.name}
            </span>

            <span className={s.mut}>
              {Math.round(progress)}% COMPLETE
            </span>
          </div>

          <div style={{
            height: 12,
            background: '#252336',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid #f5c45133'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: 20,
              background: 'linear-gradient(90deg, #b8862b, #ffe08a)',
              boxShadow: '0 0 15px #f5c45188',
              transition: 'width .5s ease'
            }} />
          </div>

          <div className={s.mut} style={{
            fontSize: 11,
            marginTop: 8
          }}>
            {Math.max(0, nextLevel.min - xp).toLocaleString()} XP remaining to unlock {nextLevel.name}
          </div>
        </div>
      )}

      {/* Responsive Level Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 145px), 1fr))',
        gap: 16,
        width: '100%',
        minWidth: 0,
        padding: '12px 4px 20px',
        boxSizing: 'border-box'
      }}>
        {LEVELS.map((l, index) => {
          const completed = l.n < cur;
          const current = l.n === cur;
          const next = l.n === cur + 1;
          const locked = l.n > cur + 1;

          const status = completed
            ? 'COMPLETED'
            : current
            ? 'YOUR LEVEL'
            : next
            ? 'NEXT GOAL'
            : 'LOCKED';

          const accent = BADGES[index % BADGES.length].color;

          return (
            <div
              key={l.n}
              style={{
                width: '100%',
                minWidth: 0,
                boxSizing: 'border-box',
                position: 'relative',
                padding: '21px 10px 17px',
                textAlign: 'center',
                borderRadius: 19,
                background: current
                  ? 'linear-gradient(155deg, #30230e, #171321 75%)'
                  : 'linear-gradient(155deg, #191a2b, #0c0d18)',
                border: current
                  ? '1px solid #f5c451'
                  : next
                  ? '1px solid #8b6ff088'
                  : '1px solid #ffffff18',
                boxShadow: current
                  ? '0 0 25px #f5c45122, inset 0 0 20px #f5c4510c'
                  : '0 5px 18px #00000033',
                opacity: locked ? 0.65 : 1,
                transition: 'transform .25s ease, box-shadow .25s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 10,
                left: 10,
                fontSize: 9,
                fontWeight: 900,
                color: accent,
                letterSpacing: 1
              }}>
                LVL {String(l.n).padStart(2, '0')}
              </div>

              <div style={{ marginTop: 12 }}>
                <LevelEmblem
                  level={l.n}
                  index={index}
                  locked={locked}
                  completed={completed}
                  current={current}
                />
              </div>

              <h3 style={{
                color: current ? '#ffe08a' : '#fff',
                fontSize: 16,
                fontWeight: 900,
                margin: '18px 0 5px',
                overflowWrap: 'anywhere'
              }}>
                {l.name}
              </h3>

              <div style={{
                color: '#aaa6b9',
                fontSize: 12,
                marginBottom: 15
              }}>
                {l.min.toLocaleString()} XP
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 1,
                color: completed ? '#86efac'
                  : current ? '#f5c451'
                  : next ? '#c4b5fd' : '#999',
                background: completed ? '#16a34a20'
                  : current ? '#f5c45118'
                  : next ? '#8b6ff020' : '#ffffff0c',
                borderRadius: 30,
                padding: '7px 10px',
                maxWidth: '100%',
                flexWrap: 'wrap'
              }}>
                {completed && <Check size={12} />}
                {current && <Crown size={12} />}
                {next && <Target size={12} />}
                {locked && <Lock size={12} />}
                {status}
              </div>

              <div style={{
                height: 1,
                background: '#ffffff18',
                margin: '16px 0 12px'
              }} />

              <div style={{
                color: '#aaa6b9',
                fontSize: 10,
                letterSpacing: 1,
                marginBottom: 7
              }}>
                LEVEL REWARD
              </div>

              <div style={{
                color: '#f5c451',
                fontSize: 12,
                fontWeight: 800,
                minHeight: 20,
                overflowWrap: 'anywhere'
              }}>
                {l.reward}
              </div>
            </div>
          );
        })}
      </div>

      <div className={s.mut} style={{
        fontSize: 11,
        textAlign: 'center',
        marginTop: 4
      }}>
        <Zap
          size={13}
          style={{
            verticalAlign: 'middle',
            color: '#f5c451'
          }}
        />
        {' '}Explore all your level achievements.
      </div>

    </div>
  );
}
