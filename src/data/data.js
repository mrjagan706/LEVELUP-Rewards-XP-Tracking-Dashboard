
// DEMO DATA ONLY – not official VELOOP reward rules.
// Replace with backend data when available.

const RAW = [
  { n: 1, name: 'Starter', min: 0, ves: 50, gems: 0 },
  { n: 2, name: 'Explorer', min: 500, ves: 100, gems: 0 },
  { n: 3, name: 'Achiever', min: 1500, ves: 150, gems: 10 },
  { n: 4, name: 'Climber', min: 3500, ves: 200, gems: 10 },
  { n: 5, name: 'Elite', min: 5500, ves: 500, gems: 25 },
  { n: 6, name: 'Master', min: 8000, ves: 800, gems: 30 },
  { n: 7, name: 'Champion', min: 11000, ves: 1000, gems: 50 },
  { n: 8, name: 'Legend', min: 15000, ves: 2000, gems: 100 },
];

export const LEVELS = RAW.map((l) => ({
  ...l,
  reward: `${l.ves} VEs${l.gems ? ` + ${l.gems} Gems` : ''} (demo)`,
}));

export const levelFor = (xp) =>
  [...LEVELS].reverse().find((l) => xp >= l.min) || LEVELS[0];

// Demo earning activities.
// daily/once = locally claimable
// link = opens game
// soon = coming soon, not connected

export const EARN = [
  {
    id: 'watch',
    title: 'Watch & Earn',
    desc: 'Watch videos and earn rewards',
    xp: 50,
    type: 'soon',
    tone: '#8b6ff0',
  },
  {
    id: 'tasks',
    title: 'Daily Missions',
    desc: 'Complete daily tasks',
    xp: 30,
    type: 'daily',
    tone: '#2f9e4f',
  },
  {
    id: 'refer',
    title: 'Refer & Earn',
    desc: 'Invite friends and earn rewards',
    xp: 100,
    type: 'soon',
    tone: '#e08a1e',
  },
  {
    id: 'minigames',
    title: 'Mini Games',
    desc: 'Play games and earn XP',
    xp: 30,
    type: 'link',
    tone: '#3a5bd9',
  },
  {
    id: 'streak',
    title: 'Streak Bonus',
    desc: 'Maintain your daily streak',
    xp: 25,
    type: 'daily',
    tone: '#d9531e',
  },
  {
    id: 'catcher',
    title: 'XP Catcher',
    desc: 'Catch XP orbs and coins',
    xp: 30,
    type: 'link',
    tone: '#3a5bd9',
  },
  {
    id: 'login',
    title: 'Daily Login Bonus',
    desc: 'Check in once per day',
    xp: 10,
    type: 'daily',
    tone: '#8a6d1e',
  },
  {
    id: 'profile',
    title: 'Complete Profile',
    desc: 'One-time profile completion bonus',
    xp: 50,
    type: 'once',
    tone: '#8a6d1e',
  },
];

export const SEED_HISTORY = [
  {
    id: 1,
    label: 'Referral Bonus',
    cat: 'Referral',
    xp: 20,
    ves: 0,
    time: 'Today, 10:45 AM',
    status: 'Completed',
  },
  {
    id: 2,
    label: 'Daily Mission Completed',
    cat: 'Task',
    xp: 50,
    ves: 0,
    time: 'Today, 09:12 AM',
    status: 'Completed',
  },
  {
    id: 3,
    label: 'Mini Game Win',
    cat: 'Game',
    xp: 75,
    ves: 25,
    time: 'Today, 08:30 AM',
    status: 'Completed',
  },
  {
    id: 4,
    label: 'XP Catcher Reward',
    cat: 'Game',
    xp: 0,
    ves: 10,
    time: 'Today, 07:50 AM',
    status: 'Completed',
  },
  {
    id: 5,
    label: 'Streak Bonus',
    cat: 'Daily',
    xp: 25,
    ves: 0,
    time: 'Today, 07:20 AM',
    status: 'Completed',
  },
];
