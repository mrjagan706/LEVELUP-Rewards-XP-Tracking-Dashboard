
const L = [
  [44, 142, -60],
  [38, 118, -45],
  [38, 94, -30],
  [44, 72, -10],
  [56, 54, 15],
  [72, 42, 40]
];

const Defs = () => (
  <defs>
    <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#fff4c9" />
      <stop offset=".3" stopColor="#ffe08a" />
      <stop offset=".6" stopColor="#f5c451" />
      <stop offset="1" stopColor="#98600e" />
    </linearGradient>

    <linearGradient id="goldDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#8e5d16" />
      <stop offset="1" stopColor="#281a08" />
    </linearGradient>

    <radialGradient id="gh">
      <stop offset="0" stopColor="#f5c451" stopOpacity=".55" />
      <stop offset=".55" stopColor="#f5c451" stopOpacity=".16" />
      <stop offset="1" stopColor="#f5c451" stopOpacity="0" />
    </radialGradient>

    <filter id="goldGlow">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <linearGradient id="purpleGem" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#d9ccff" />
      <stop offset=".5" stopColor="#8b6ff0" />
      <stop offset="1" stopColor="#45239d" />
    </linearGradient>
  </defs>
);

export function Emblem({ n, size = 260 }) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={size * 1.1}
      role="img"
      aria-label={n ? `Level ${n} emblem` : 'Trophy'}
      style={{ maxWidth: '100%', overflow: 'visible' }}
    >
      <Defs />

      <circle cx="100" cy="100" r="98" fill="url(#gh)" />

      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke="#f5c451"
        strokeOpacity=".16"
        strokeDasharray="3 7"
      />

      {L.map(([x, y, r], i) => (
        <g key={i}>
          <ellipse
            cx={x}
            cy={y}
            rx="11"
            ry="5"
            transform={`rotate(${r} ${x} ${y})`}
            fill="url(#gg)"
          />
          <ellipse
            cx={200 - x}
            cy={y}
            rx="11"
            ry="5"
            transform={`rotate(${-r} ${200 - x} ${y})`}
            fill="url(#gg)"
          />
        </g>
      ))}

      <polygon
        points="100,35 153,65 153,125 100,155 47,125 47,65"
        fill="url(#gg)"
        filter="url(#goldGlow)"
      />

      <polygon
        points="100,43 145,69 145,121 100,147 55,121 55,69"
        fill="#0b0c17"
        stroke="#ffe08a"
        strokeWidth="1.5"
      />

      <polygon
        points="100,51 137,73 137,117 100,139 63,117 63,73"
        fill="none"
        stroke="#f5c451"
        strokeOpacity=".35"
      />

      {n ? (
        <>
          <text
            x="100"
            y="86"
            textAnchor="middle"
            fill="#f5c451"
            fontSize="11"
            fontWeight="700"
            letterSpacing="3"
          >
            LEVEL
          </text>

          <text
            x="100"
            y="124"
            textAnchor="middle"
            fill="#fff4c9"
            fontSize="40"
            fontWeight="800"
          >
            {String(n).padStart(2, '0')}
          </text>
        </>
      ) : (
        <polygon
          points="100,70 108,89 129,89 112,101 119,122 100,110 81,122 88,101 71,89 92,89"
          fill="url(#gg)"
          filter="url(#goldGlow)"
        />
      )}

      <ellipse
        cx="100"
        cy="168"
        rx="62"
        ry="13"
        fill="#2a1d05"
        stroke="url(#gg)"
        strokeWidth="2.5"
      />

      <ellipse
        cx="100"
        cy="160"
        rx="62"
        ry="13"
        fill="#17120a"
        stroke="url(#gg)"
        strokeWidth="2.5"
      />

      <ellipse
        cx="100"
        cy="185"
        rx="80"
        ry="10"
        fill="none"
        stroke="#f5c451"
        strokeOpacity=".5"
      />
    </svg>
  );
}

export function Chest({ size = 150 }) {
  return (
    <svg
      viewBox="0 0 160 120"
      width={size}
      height={size * 0.75}
      role="img"
      aria-label="Reward chest"
      style={{ maxWidth: '100%', overflow: 'visible' }}
    >
      <Defs />

      <ellipse cx="80" cy="108" rx="70" ry="9" fill="url(#gh)" />

      <ellipse
        cx="80"
        cy="56"
        rx="65"
        ry="48"
        fill="url(#gh)"
      />

      <path
        d="M24 52 Q24 14 80 14 Q136 14 136 52Z"
        fill="url(#goldDark)"
        stroke="url(#gg)"
        strokeWidth="3"
      />

      <path
        d="M30 49 Q34 20 80 20 Q126 20 130 49"
        fill="none"
        stroke="#ffe9a8"
        strokeOpacity=".55"
        strokeWidth="2"
      />

      <rect
        x="24"
        y="52"
        width="112"
        height="52"
        rx="6"
        fill="url(#goldDark)"
        stroke="url(#gg)"
        strokeWidth="3"
      />

      <rect
        x="50"
        y="14"
        width="10"
        height="90"
        fill="url(#gg)"
      />

      <rect
        x="100"
        y="14"
        width="10"
        height="90"
        fill="url(#gg)"
      />

      <rect
        x="70"
        y="48"
        width="20"
        height="22"
        rx="4"
        fill="url(#gg)"
      />

      <circle cx="80" cy="58" r="3.5" fill="#2a1d05" />

      <polygon
        points="14,96 24,80 36,96 30,108 18,108"
        fill="url(#purpleGem)"
        stroke="#d9ccff"
      />

      <polygon
        points="128,98 138,84 150,98 144,108 132,108"
        fill="url(#purpleGem)"
        stroke="#d9ccff"
      />

      <ellipse cx="62" cy="14" rx="9" ry="5" fill="url(#gg)" />
      <ellipse cx="96" cy="13" rx="9" ry="5" fill="url(#gg)" />
    </svg>
  );
}
