import React from 'react';

/**
 * Transparent-Filled White-Lined Vector Rocket
 * Faithfully matches the user's reference line-art rocket design:
 * - Bullet fuselage with pointed apex and smooth aerodynamic contours
 * - Curved nose cone divider arc
 * - Concentric double-ring circular porthole window
 * - Swept aerodynamic side wing fins
 * - Stepped two-tier rectangular engine base / nozzle
 * - 100% transparent-filled body, fins, window, and nozzle
 * - Clean, crisp pure white outline strokes (#ffffff)
 * - Soft luminous white glow filter for high-contrast clarity on dark STRIKE theme
 */
export const RocketSvg = ({
  thrustLevel = 'cruising', // 'none' | 'cruising' | 'launch'
  className = '',
  width = 54,
  height = 92,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`minimal-white-lined-rocket ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Soft luminous white glow for high-contrast visibility against dark backgrounds */}
        <filter id="whiteLineGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ffffff" floodOpacity="0.45" />
        </filter>
      </defs>

      <g filter="url(#whiteLineGlow)">
        {/* ================= 1. SIDE FINS (TRANSPARENT-FILLED, WHITE LINES) ================= */}
        {/* Left Swept Aerodynamic Fin */}
        <path
          d="M 31 80
             L 14 95
             L 17 127
             L 35 116 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Right Swept Aerodynamic Fin */}
        <path
          d="M 69 80
             L 86 95
             L 83 127
             L 65 116 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ================= 2. STEPPED ENGINE NOZZLE (TRANSPARENT-FILLED, WHITE LINES) ================= */}
        {/* Upper Nozzle Collar */}
        <rect
          x="37"
          y="122"
          width="26"
          height="10"
          rx="1.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Lower Exhaust Nozzle */}
        <rect
          x="42"
          y="132"
          width="16"
          height="8"
          rx="1.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* ================= 3. MAIN FUSELAGE (TRANSPARENT-FILLED, WHITE LINES) ================= */}
        <path
          d="M 50 16
             C 66 42 73 80 65 122
             L 35 122
             C 27 80 34 42 50 16 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Nose Cone Divider Arc */}
        <path
          d="M 40 40 Q 50 46 60 40"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ================= 4. CONCENTRIC DOUBLE-CIRCLE PORTHOLE WINDOW ================= */}
        {/* Outer Circular Frame */}
        <circle
          cx="50"
          cy="68"
          r="14"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
        />

        {/* Inner Circular Window Pane */}
        <circle
          cx="50"
          cy="68"
          r="9.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
        />

        {/* ================= 5. EXHAUST THRUST DASHES (ONLY WHEN FLYING/LAUNCHING) ================= */}
        {thrustLevel !== 'none' && (
          <g
            className="rocket-exhaust-lines"
            stroke="#ffffff"
            strokeWidth="2.8"
            strokeLinecap="round"
          >
            {/* Center Main Thrust Line */}
            <line
              x1="50"
              y1="144"
              x2="50"
              y2={thrustLevel === 'launch' ? '162' : '154'}
              className="exhaust-line-center"
            />
            {/* Left Thrust Line */}
            <line
              x1="45"
              y1="144"
              x2="45"
              y2={thrustLevel === 'launch' ? '156' : '150'}
              className="exhaust-line-left"
            />
            {/* Right Thrust Line */}
            <line
              x1="55"
              y1="144"
              x2="55"
              y2={thrustLevel === 'launch' ? '156' : '150'}
              className="exhaust-line-right"
            />
          </g>
        )}
      </g>
    </svg>
  );
};

