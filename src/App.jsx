import { useEffect, useState } from 'react';
import { Home, Coins, Gamepad2, Gift, Trophy, Wallet, User, Activity as Act, RotateCcw } from 'lucide-react';
import useProgress from './hooks/useProgress';
import { EARN, levelFor } from './data/data';
import Hero, { RewardsPromo } from './components/Hero';
import Roadmap from './components/Roadmap';
import Earn, { Tiles } from './components/Earn';
import Activity, { Summary } from './components/Activity';
import Result from './components/Result';
import Game from './components/Game';
import Rewards from './components/Rewards';
import { Token } from './components/Bits';
import LevelUpModal from './components/LevelUpModal';
import s from './components/ui.module.css';
const NAV = [['home', Home, 'Home'], ['earn', Coins, 'Earn'], ['game', Gamepad2, 'XP Catcher'], ['result', Trophy, 'Last Result'], ['rewards', Gift, 'Rewards'], ['activity', Act, 'Activity'], ['wallet', Wallet, 'Wallet'], ['profile', User, 'Profile']];
const MOB = ['home', 'earn', 'game', 'rewards', 'wallet'];
export default function App() {
  const p = useProgress();
  const [view, setView] = useState('home');
  const [last, setLast] = useState(null);
  const [auto, setAuto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(new URLSearchParams(location.search).has('error')); // ?error=1 demos the error state
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, [err]);
  const retry = () => { history.replaceState(null, '', location.pathname); setLoading(true); setErr(false); };
  const claimable = EARN.filter((o) => o.type === 'daily' || o.type === 'once');
  const todayXP = p.s.history.filter((a) => a.time.startsWith('Today')).reduce((a, b) => a + b.xp, 0);
  const lvl = levelFor(p.s.xp).n;
  const go = (v) => { setAuto(false); setView(v); window.scrollTo(0, 0); };
  const body = {
    home: <div className="d-grid gap-3"><div className="row g-3"><div className="col-xl-8"><Hero xp={p.s.xp} tasksDone={claimable.filter(p.isDone).length} tasksTotal={claimable.length} todayXP={todayXP} /></div>
      <div className="col-xl-4"><RewardsPromo level={lvl} go={go} /></div></div><Tiles go={go} />
      <div className="row g-3"><div className="col-xl-7"><Roadmap xp={p.s.xp} /></div><div className="col-xl-5"><Activity items={p.s.history} limit={4} onStart={() => go('earn')} /></div></div></div>,
    earn: <Earn isDone={p.isDone} claim={p.claim} go={go} />,
    game: <Game plays={p.plays} best={p.s.best} xp={p.s.xp} startGame={p.startGame} finishGame={p.finishGame} autoStart={auto} onDone={(r) => { setLast(r); go('result'); }} />,
    wallet: <div className="row g-3">{[['xp', 'XP', p.s.xp.toLocaleString()], ['coin', 'VEs', p.s.ves], ['gem', 'Gems', p.s.gems]].map(([k, n, v]) => <div className="col-md-4" key={k}><div className={`${s.card} text-center`}><Token k={k} size={80} /><div className="big gold mt-2">{v}</div><div className={s.mut}>{n}</div></div></div>)}<div className="col-12"><div className={s.tag}>Demo balances stored in this browser. A real wallet needs the VELOOP backend (not connected).</div></div></div>,
    profile: <div className={s.card}><h2>Profile</h2><p className={s.mut}>Coming soon. Profile data needs the VELOOP backend, which is not connected.</p></div>,
    result: <Result r={last} xp={p.s.xp} go={go} replay={() => { go('game'); setAuto(true); }} />,
    rewards: <Rewards xp={p.s.xp} claimed={p.s.lv} claimLevel={p.claimLevel} />,
    activity: <div className="row g-3"><div className="col-xl-8"><Activity full items={p.s.history} onStart={() => go('earn')} /></div><div className="col-xl-4"><Summary items={p.s.history} /></div></div>,
  }[view];
  return (
    <div className={s.shell}>
      <nav className={s.side} aria-label="Main"><div className={s.logo}>VELOOP</div>
        {NAV.map(([v, I, t]) => <button key={v} className={`${s.navbtn} ${view === v ? s.active : ''}`} onClick={() => go(v)}><I size={20} /> {t}</button>)}
        <button className={`${s.navbtn} mt-auto`} onClick={p.reset}><RotateCcw size={18} /> Reset demo</button></nav>
      <div className={s.wrap}>
        <header className={s.head}><h1>{view === 'home' ? 'Good Morning, VeLooper! 👋' : NAV.find((n) => n[0] === view)[2]}</h1>
          <span className={s.chip}><Token k="xp" size={26} />{p.s.xp.toLocaleString()}</span><span className={s.chip}><Token k="coin" size={26} />{p.s.ves}</span><span className={s.chip}><Token k="gem" size={26} />{p.s.gems}</span></header>
        <main className={s.main}>
          <p className={s.mut}>Level up your journey and unlock epic rewards every day. <small>(Demo data – not official reward rules.)</small></p>
          {err ? <div className={s.card}><h2>Unable to Load Level Progress</h2><p>We couldn&apos;t load your level information right now.</p><button className={s.btn} onClick={retry}>Try Again</button></div>
            : loading ? <div className="d-grid gap-3"><div className={s.skel} /><div className={s.skel} /><div className={s.skel} /></div> : body}
        </main>
      </div>
      <nav className={s.nav} aria-label="Mobile">{NAV.filter(([v]) => MOB.includes(v)).map(([v, I, t]) => <button key={v} className={view === v ? s.active : ''} onClick={() => go(v)}><I size={20} />{t}</button>)}</nav>
      <LevelUpModal level={p.s.levelUp} onClose={() => { p.dismissLevelUp(); go('rewards'); }} />
    </div>
  );
}