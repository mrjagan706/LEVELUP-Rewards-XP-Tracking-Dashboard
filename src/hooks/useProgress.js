
import { useEffect, useState } from 'react';
import { SEED_HISTORY, levelFor } from '../data/data';

const KEY = 'veloop-demo-v2';
const MAX_PLAYS = 3;

const today = () => new Date().toDateString();

const seed = () => ({
  xp: 6420,
  ves: 35,
  gems: 0,
  lv: {},
  claimed: {},
  history: [...SEED_HISTORY],
  plays: { date: today(), n: 0 },
  best: 0,
  levelUp: null,
});

function load() {
  try {
    const saved = localStorage.getItem(KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      const initial = seed();

      return {
        ...initial,
        ...parsed,
        lv: parsed.lv || {},
        claimed: parsed.claimed || {},
        history: Array.isArray(parsed.history)
          ? parsed.history
          : initial.history,
        plays: parsed.plays || initial.plays,
      };
    }
  } catch {
    // Use default demo data if saved data is unavailable.
  }

  return seed();
}

const add = (p, xp, label, cat, ves = 0) => {
  const safeXP = Math.max(0, Number(xp) || 0);
  const safeVes = Math.max(0, Number(ves) || 0);

  const before = levelFor(p.xp).n;
  const after = levelFor(p.xp + safeXP).n;

  const time =
    'Today, ' +
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return {
    ...p,
    xp: p.xp + safeXP,
    ves: p.ves + safeVes,
    levelUp: after > before ? after : p.levelUp,

    history: [
      {
        id: Date.now() + Math.random(),
        label,
        cat,
        xp: safeXP,
        ves: safeVes,
        time,
        status: 'Completed',
      },
      ...p.history,
    ],
  };
};

export default function useProgress() {
  const [s, setS] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      // Storage may be unavailable.
    }
  }, [s]);

  const plays =
    s.plays.date === today() ? s.plays.n : 0;

  const isDone = (o) =>
    o.type === 'daily'
      ? s.claimed[o.id] === today()
      : !!s.claimed[o.id];

  const claimed = (p, o) =>
    o.type === 'daily'
      ? p.claimed[o.id] === today()
      : !!p.claimed[o.id];

  const claim = (o) => {
    setS((p) => {
      if (
        !o ||
        o.type === 'soon' ||
        claimed(p, o) ||
        !Number.isFinite(Number(o.xp)) ||
        Number(o.xp) < 0
      ) {
        return p;
      }

      const updated = add(
        p,
        o.xp,
        o.title,
        o.type === 'daily' ? 'Daily' : 'Task'
      );

      return {
        ...updated,
        claimed: {
          ...p.claimed,
          [o.id]: o.type === 'daily' ? today() : true,
        },
      };
    });
  };

  const startGame = () => {
    setS((p) => {
      const currentPlays =
        p.plays.date === today() ? p.plays.n : 0;

      if (currentPlays >= MAX_PLAYS) return p;

      return {
        ...p,
        plays: {
          date: today(),
          n: currentPlays + 1,
        },
      };
    });
  };

  const finishGame = (score, xp, ves) => {
    setS((p) => ({
      ...add(
        p,
        xp,
        'XP Catcher Reward',
        'Game',
        ves
      ),
      best: Math.max(
        p.best,
        Number(score) || 0
      ),
    }));
  };

  const claimLevel = (l) => {
    setS((p) => {
      if (
        !l ||
        p.lv[l.n] ||
        levelFor(p.xp).n < l.n
      ) {
        return p;
      }

      const ves = Math.max(0, Number(l.ves) || 0);
      const gems = Math.max(0, Number(l.gems) || 0);

      return {
        ...p,

        lv: {
          ...p.lv,
          [l.n]: 1,
        },

        ves: p.ves + ves,
        gems: p.gems + gems,

        history: [
          {
            id: Date.now(),
            label: 'Level ' + l.n + ' Reward',
            cat: 'Level',
            xp: 0,
            ves,
            gems,
            time:
              'Today, ' +
              new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            status: 'Completed',
          },
          ...p.history,
        ],
      };
    });
  };

  const dismissLevelUp = () => {
    setS((p) => ({
      ...p,
      levelUp: null,
    }));
  };

  const reset = () => setS(seed());

  return {
    s,
    plays,
    isDone,
    claim,
    startGame,
    finishGame,
    claimLevel,
    dismissLevelUp,
    reset,
  };
}
