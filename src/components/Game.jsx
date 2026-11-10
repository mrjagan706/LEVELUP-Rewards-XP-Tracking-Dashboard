import { useEffect, useRef, useState } from 'react';
import { Token } from './Bits';
import s from './ui.module.css';

const DUR = 20;
const MAX = 3;

const calc = (sc) => ({
  xp: Math.min(30, Math.floor(sc / 4)),
  ves: Math.floor(sc / 8)
});

export default function Game({
  plays,
  best,
  startGame,
  finishGame,
  onDone,
  autoStart
}) {
  const [phase, setPhase] = useState('intro');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(DUR);
  const [mult, setMult] = useState(1);

  const cv = useRef(null);
  const fin = useRef(finishGame);
  const bestRef = useRef(best);
  const doneRef = useRef(onDone);
  const auto = useRef(autoStart);

  fin.current = finishGame;
  bestRef.current = best;
  doneRef.current = onDone;

  const left = Math.max(0, MAX - plays);

  const start = () => {
    if (left <= 0) return;

    startGame();
    setScore(0);
    setTime(DUR);
    setMult(1);
    setPhase('play');
  };

  useEffect(() => {
    if (auto.current) {
      auto.current = false;
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'play') return undefined;

    const c = cv.current;
    if (!c) return undefined;

    const ctx = c.getContext('2d');
    const W = (c.width = 360);
    const H = (c.height = 440);

    let px = W / 2;
    let items = [];
    let sc = 0;
    let combo = 0;
    let spawn = 0;
    let raf;
    let last = performance.now();

    const t0 = last;

    const move = (e) => {
      const r = c.getBoundingClientRect();
      px = Math.max(
        48,
        Math.min(W - 48, ((e.clientX - r.left) / r.width) * W)
      );
    };

    const key = (e) => {
      if (e.key === 'ArrowLeft') {
        px = Math.max(48, px - 30);
      }

      if (e.key === 'ArrowRight') {
        px = Math.min(W - 48, px + 30);
      }
    };

    const T = [
      { k: 'coin', p: 5, t: 'V' },
      { k: 'xp', p: 10, t: 'XP' },
      { k: 'gem', p: 15, t: '' }
    ];

    const draw = (i) => {
      const st = ctx.createLinearGradient(0, i.y - 60, 0, i.y);

      st.addColorStop(0, 'rgba(0,0,0,0)');
      st.addColorStop(
        1,
        i.k === 'xp'
          ? '#8b6ff066'
          : i.k === 'gem'
          ? '#2fd37a55'
          : '#f5c45166'
      );

      ctx.fillStyle = st;
      ctx.fillRect(i.x - 8, i.y - 60, 16, 60);

      if (i.k === 'gem') {
        ctx.fillStyle = '#2fd37a';
        ctx.beginPath();
        ctx.moveTo(i.x, i.y - 17);
        ctx.lineTo(i.x + 15, i.y);
        ctx.lineTo(i.x, i.y + 17);
        ctx.lineTo(i.x - 15, i.y);
        ctx.closePath();
        ctx.fill();
        return;
      }

      const xp1 = i.k === 'xp';

      const gr = ctx.createRadialGradient(
        i.x - 5, i.y - 5, 2,
        i.x, i.y, 18
      );

      gr.addColorStop(0, xp1 ? '#c9b5ff' : '#ffe08a');
      gr.addColorStop(1, xp1 ? '#5b34c7' : '#b8862b');

      ctx.fillStyle = gr;
      ctx.shadowBlur = 12;
      ctx.shadowColor = xp1 ? '#8b6ff0' : '#f5c451';

      ctx.beginPath();
      ctx.arc(i.x, i.y, 17, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = xp1 ? '#fff' : '#5a3d00';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(i.t, i.x, i.y + 4);
    };

    const loop = (now) => {
      const dt = (now - last) / 1000;
      const el = (now - t0) / 1000;

      last = now;

      if (el >= DUR) {
        const r = calc(sc);

        fin.current(sc, r.xp, r.ves);

        doneRef.current({
          sc,
          ...r,
          nb: sc > bestRef.current
        });

        setPhase('intro');
        return;
      }

      setTime(Math.ceil(DUR - el));
      spawn -= dt;

      if (spawn <= 0) {
        spawn = 0.45;

        const t =
          T[Math.random() < 0.5 ? 0 : Math.random() < 0.6 ? 1 : 2];

        items.push({
          ...t,
          x: 30 + Math.random() * (W - 60),
          y: -20,
          v: 140 + Math.random() * 80 + el * 4
        });
      }

      ctx.clearRect(0, 0, W, H);

      items = items.filter((i) => {
        i.y += i.v * dt;

        if (
          i.y > H - 70 &&
          i.y < H - 30 &&
          Math.abs(i.x - px) < 48
        ) {
          combo += 1;

          const m = combo >= 5 ? 2 : 1;

          sc += i.p * m;
          setScore(sc);
          setMult(m);

          return false;
        }

        if (i.y > H + 20) {
          combo = 0;
          setMult(1);
          return false;
        }

        draw(i);
        return true;
      });

      ctx.strokeStyle = '#f5c451';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#f5c451';

      ctx.beginPath();
      ctx.ellipse(px, H - 50, 48, 13, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(px - 48, H - 50);
      ctx.quadraticCurveTo(px, H + 10, px + 48, H - 50);
      ctx.stroke();

      ctx.lineWidth = 1;

      for (let k = -3; k <= 3; k++) {
        ctx.beginPath();
        ctx.moveTo(px + k * 14, H - 48);
        ctx.lineTo(px + k * 6, H - 22);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(loop);
    };

    c.addEventListener('pointermove', move);
    c.addEventListener('pointerdown', move);
    window.addEventListener('keydown', key);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener('pointermove', move);
      c.removeEventListener('pointerdown', move);
      window.removeEventListener('keydown', key);
    };
  }, [phase]);

  const timer = `00:${String(time).padStart(2, '0')}`;

  return (
    <div className="row g-3 align-items-stretch">

      <div className="col-xl-8">
        <div
          className={s.card}
          style={{
            background: 'radial-gradient(circle at top,#211a36,#0b0c15 65%)',
            border: '1px solid #f5c45155',
            minHeight: 500
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <div>
              <h2 className="mb-1">XP CATCHER</h2>
              <div className={s.mut}>
                Catch rewards. Build your score. Level up!
              </div>
            </div>
            <span className={s.tag}>DAILY MINI GAME</span>
          </div>

          {phase === 'intro' && (
            <div className="text-center py-5">
              <div className="d-flex justify-content-center align-items-center gap-4 mb-4 flex-wrap">
                <Token k="xp" size={75} />
                <Token k="coin" size={75} />
                <Token k="gem" size={75} />
              </div>

              <h2 className="mb-2">Ready for the Challenge?</h2>
              <p className={s.mut}>
                Catch falling XP orbs, VE coins and gems.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap my-4">
                <div className={s.tag}>20 Seconds</div>
                <div className={s.tag}>3 Daily Plays</div>
                <div className={s.tag}>2X Combo</div>
              </div>

              <button
                className={s.btn}
                disabled={left <= 0}
                onClick={start}
                style={{ minWidth: 190, minHeight: 48 }}
              >
                {left <= 0 ? 'New Challenge Tomorrow' : '▶ Start Game'}
              </button>

              <div className={`${s.mut} small mt-3`}>
                {left} plays remaining today
              </div>
            </div>
          )}

          {phase === 'play' && (
            <>
              <div
                className="d-flex justify-content-around align-items-center gap-2 flex-wrap mb-3"
                style={{
                  background: '#090a14',
                  border: '1px solid #f5c45140',
                  padding: 15,
                  borderRadius: 15
                }}
              >
                <div className="text-center">
                  <div className={s.mut}>SCORE</div>
                  <div className="fs-3 fw-bold gold">{score}</div>
                </div>

                <div className="text-center">
                  <div className={s.mut}>MULTIPLIER</div>
                  <div className="fs-3 fw-bold" style={{ color: '#b69aff' }}>
                    {mult}X
                  </div>
                </div>

                <div className="text-center">
                  <div className={s.mut}>TIME LEFT</div>
                  <div className="fs-3 fw-bold gold">⏱ {timer}</div>
                </div>
              </div>

              <div
                style={{
                  maxWidth: 420,
                  margin: '0 auto',
                  padding: 8,
                  borderRadius: 20,
                  background: 'linear-gradient(145deg,#f5c451,#8b6ff0)',
                  boxShadow: '0 0 30px #8b6ff033'
                }}
              >
                <canvas
                  ref={cv}
                  className={s.cv}
                  aria-label="XP Catcher game area"
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: 14,
                    background: '#080914',
                    touchAction: 'none'
                  }}
                />
              </div>

              <div className={`${s.mut} small text-center mt-3`}>
                Move your mouse or finger to catch falling rewards.
              </div>
            </>
          )}
        </div>
      </div>

      <div className="col-xl-4">
        <div className={s.card} style={{ height: '100%' }}>
          <h2>GAME INSTRUCTIONS</h2>

          <p className={s.mut}>
            Catch as many rewards as possible before the timer ends.
          </p>

          {[
            ['🟡', 'VE Coin', '+5 Points'],
            ['🟣', 'XP Orb', '+10 Points'],
            ['💎', 'Gem', '+15 Points']
          ].map(([emoji, name, points]) => (
            <div className={s.row} key={name}>
              <span style={{ fontSize: 25 }}>{emoji}</span>
              <div className={s.grow}>
                <div className="fw-bold">{name}</div>
                <div className={s.mut}>{points}</div>
              </div>
            </div>
          ))}

          <div
            className="mt-3 p-3 rounded-3"
            style={{
              background: '#171329',
              border: '1px solid #8b6ff055'
            }}
          >
            <div className="fw-bold" style={{ color: '#b69aff' }}>
              ⚡ Combo Bonus
            </div>
            <div className={`${s.mut} small mt-1`}>
              Catch 5 rewards in a row to activate the 2X multiplier.
            </div>
          </div>

          <h2 className="mt-4">YOUR PERFORMANCE</h2>

          <div className={s.row}>
            <span className={s.grow}>Best Score</span>
            <b className="gold">{best}</b>
          </div>

          <div className={s.row}>
            <span className={s.grow}>Daily Plays</span>
            <b>{plays} / {MAX}</b>
          </div>

          <div className={s.row}>
            <span className={s.grow}>Remaining Plays</span>
            <b className="gold">{left}</b>
          </div>

          <div className={`${s.tag} mt-3`}>
            Demo game. Rewards are processed locally, not credited to a real account.
          </div>
        </div>
      </div>

    </div>
  );
}