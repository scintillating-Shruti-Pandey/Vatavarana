export const PaintedHumidity = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}>
    <defs>
      <radialGradient id="water-grad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#a8c0ff" />
        <stop offset="100%" stopColor="#3f2b96" />
      </radialGradient>
      <filter id="soft-glow-water" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Base droplet shape */}
    <path d="M50 15 C 50 15, 20 50, 20 70 C 20 86.5, 33.5 100, 50 100 C 66.5 100, 80 86.5, 80 70 C 80 50, 50 15, 50 15 Z" fill="url(#water-grad)" filter="url(#soft-glow-water)" opacity="0.85" />
    {/* Highlight reflection */}
    <path d="M35 80 C 28 70, 32 55, 32 55" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.5" filter="url(#soft-glow-water)" />
  </svg>
);

export const PaintedWind = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}>
    <defs>
      <linearGradient id="wind-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e0c3fc" />
        <stop offset="100%" stopColor="#8ec5fc" />
      </linearGradient>
      <filter id="wind-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Swooping wind lines that taper visually by varying curves */}
    <path d="M10 35 Q 35 15, 65 35 T 90 25" stroke="url(#wind-grad)" strokeWidth="9" strokeLinecap="round" filter="url(#wind-blur)" opacity="0.9" />
    <path d="M20 60 Q 50 45, 85 65 T 95 45" stroke="url(#wind-grad)" strokeWidth="6" strokeLinecap="round" filter="url(#wind-blur)" opacity="0.75" />
    <path d="M30 85 Q 50 75, 70 85 T 80 70" stroke="url(#wind-grad)" strokeWidth="4" strokeLinecap="round" filter="url(#wind-blur)" opacity="0.6" />
  </svg>
);

export const PaintedVisibility = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}>
    <defs>
      <radialGradient id="eye-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#96deda" />
        <stop offset="100%" stopColor="#50c9c3" />
      </radialGradient>
      <filter id="eye-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Soft painted eye background */}
    <path d="M10 50 C 30 20, 70 20, 90 50 C 70 80, 30 80, 10 50 Z" fill="#ffffff" opacity="0.8" filter="url(#eye-blur)" />
    {/* Eye outline */}
    <path d="M10 50 C 30 20, 70 20, 90 50 C 70 80, 30 80, 10 50 Z" stroke="#8ec5fc" strokeWidth="4" opacity="0.6" filter="url(#eye-blur)" />
    {/* Painted iris */}
    <circle cx="50" cy="50" r="16" fill="url(#eye-grad)" filter="url(#eye-blur)" opacity="0.9" />
    {/* Iris highlight */}
    <circle cx="54" cy="46" r="4" fill="#ffffff" opacity="0.9" filter="url(#eye-blur)" />
  </svg>
);

export const PaintedPressure = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}>
    <defs>
      <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff9a9e" />
        <stop offset="100%" stopColor="#fecfef" />
      </linearGradient>
      <filter id="gauge-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Painted gauge arc */}
    <path d="M20 80 A 40 40 0 1 1 80 80" fill="none" stroke="url(#gauge-grad)" strokeWidth="12" strokeLinecap="round" filter="url(#gauge-blur)" opacity="0.9" />
    {/* Center pivot */}
    <circle cx="50" cy="50" r="7" fill="#ff9a9e" filter="url(#gauge-blur)" opacity="0.9" />
    {/* Painted needle pointing right */}
    <path d="M50 50 L 70 30" stroke="#ff9a9e" strokeWidth="6" strokeLinecap="round" filter="url(#gauge-blur)" opacity="0.9" />
    <path d="M25 70 L 32 63" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7" filter="url(#gauge-blur)" />
    <path d="M75 70 L 68 63" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7" filter="url(#gauge-blur)" />
    <path d="M50 18 L 50 25" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.7" filter="url(#gauge-blur)" />
  </svg>
);

export const PaintedMapPin = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}>
    <defs>
      <radialGradient id="pin-grad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#d8b4fe" />
        <stop offset="100%" stopColor="#9333ea" />
      </radialGradient>
      <filter id="pin-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path d="M50 10 C 25 10, 20 40, 50 90 C 80 40, 75 10, 50 10 Z" fill="url(#pin-grad)" filter="url(#pin-blur)" opacity="0.85" />
    <circle cx="50" cy="35" r="12" fill="#ffffff" opacity="0.9" filter="url(#pin-blur)" />
    <path d="M40 25 C 35 25, 30 35, 35 45" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" filter="url(#pin-blur)" />
  </svg>
);

export const PaintedSun = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}>
    <defs>
      <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#f59e0b" />
      </radialGradient>
      <filter id="sun-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="20" fill="url(#sun-grad)" filter="url(#sun-blur)" opacity="0.9" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <path key={i} d={`M 50 20 L 50 10`} stroke="url(#sun-grad)" strokeWidth="6" strokeLinecap="round" filter="url(#sun-blur)" opacity="0.85" transform={`rotate(${angle} 50 50)`} />
    ))}
    <circle cx="45" cy="45" r="6" fill="#ffffff" opacity="0.6" filter="url(#sun-blur)" />
  </svg>
);
