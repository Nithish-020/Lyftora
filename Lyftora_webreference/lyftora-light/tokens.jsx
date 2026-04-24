/* Lyftora LIGHT tokens — mirrors the Design System.html aesthetic
   Cream surfaces · ink type · lime primary · coral for emphasis · violet for AI */

const LL = {
  // Surfaces (cream world)
  bg: '#F4EFE4',          // cream
  bg2: '#EFE8D8',         // cream-2
  sBase: '#F4EFE4',
  sLow: '#EFE8D8',
  sContainer: '#FFFFFF',  // pure white cards lift off cream
  sHigh: '#EFE8D8',
  sHighest: '#E7DFCC',
  ink: '#0E0E12',
  ink2: '#1A1A22',

  // Accents
  primary: '#D6FF4D',     // lime — primary action
  primaryDeep: '#B8E03A', // on lime buttons
  coral: '#FF5A3C',       // emphasis, italic serif, PR
  violet: '#7B5CFF',      // AI only
  sky: '#6EE0FF',
  warning: '#FF5A3C',     // coral for warnings too
  error: '#FF5A3C',

  // Text
  text: '#0E0E12',        // ink
  text2: '#6B6A63',       // muted
  text3: '#A09F96',
  textInv: '#F4EFE4',
  textOnLime: '#0E0E12',

  // Borders (on cream)
  bSubtle: 'rgba(14,14,18,0.08)',
  bDefault: 'rgba(14,14,18,0.14)',
  bStrong: 'rgba(14,14,18,0.22)',
  bAccent: 'rgba(214,255,77,0.55)',
  bAI: 'rgba(123,92,255,0.35)',
  bCoral: 'rgba(255,90,60,0.35)',

  // Surface tints
  aiSurface: 'rgba(123,92,255,0.08)',
  primarySurface: 'rgba(214,255,77,0.32)',   // lime wash
  coralSurface: 'rgba(255,90,60,0.10)',
  skySurface: 'rgba(110,224,255,0.14)',

  glass: 'rgba(244,239,228,0.82)',
  glassInk: 'rgba(14,14,18,0.70)',

  // Shadows (soft, organic — design system style)
  shSm: '0 4px 10px -4px rgba(14,14,18,0.12)',
  shMd: '0 14px 26px -14px rgba(14,14,18,0.18)',
  shLg: '0 40px 60px -30px rgba(14,14,18,0.25)',
  shGlow: '0 0 24px rgba(214,255,77,0.55)',
  shGlowAI: '0 0 20px rgba(123,92,255,0.35)',
  shCoral: '0 0 24px rgba(255,90,60,0.30)',
};

// Font stacks — straight from Design System
const FL = {
  serif: "'Instrument Serif', Georgia, 'Times New Roman', serif",
  sans: "'Space Grotesk', system-ui, sans-serif",
  mono: "'Geist Mono', ui-monospace, 'JetBrains Mono', monospace",
};

// Type helpers — Instrument Serif leads display; Space Grotesk for body
const TL = {
  // Serif display — italic coral is the hero move
  displayXl: { fontFamily: FL.serif, fontSize: 48, lineHeight: 0.95, fontWeight: 400, letterSpacing: -1.2 },
  displayLg: { fontFamily: FL.serif, fontSize: 38, lineHeight: 0.95, fontWeight: 400, letterSpacing: -0.8 },
  displayMd: { fontFamily: FL.serif, fontSize: 30, lineHeight: 1.0,  fontWeight: 400, letterSpacing: -0.5 },
  headlineLg: { fontFamily: FL.serif, fontSize: 26, lineHeight: 1.05, fontWeight: 400, letterSpacing: -0.3 },
  headlineMd: { fontFamily: FL.serif, fontSize: 22, lineHeight: 1.1,  fontWeight: 400, letterSpacing: -0.2 },

  // Sans titles for UI density
  titleLg: { fontFamily: FL.sans, fontSize: 17, lineHeight: '22px', fontWeight: 600, letterSpacing: -0.2 },
  titleMd: { fontFamily: FL.sans, fontSize: 15, lineHeight: '20px', fontWeight: 600 },
  titleSm: { fontFamily: FL.sans, fontSize: 13, lineHeight: '18px', fontWeight: 600 },

  bodyLg: { fontFamily: FL.sans, fontSize: 15, lineHeight: '22px', fontWeight: 400 },
  bodyMd: { fontFamily: FL.sans, fontSize: 13, lineHeight: '19px', fontWeight: 400 },
  bodySm: { fontFamily: FL.sans, fontSize: 12, lineHeight: '16px', fontWeight: 400 },

  // Mono kickers — all-caps, loose tracking (design system "kicker" look)
  labelLg: { fontFamily: FL.mono, fontSize: 12, lineHeight: '16px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' },
  labelMd: { fontFamily: FL.mono, fontSize: 11, lineHeight: '14px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' },
  labelSm: { fontFamily: FL.mono, fontSize: 10, lineHeight: '13px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase' },

  // Mono data (weights, times, counts)
  mono:   { fontFamily: FL.mono, fontSize: 14, lineHeight: '18px', fontWeight: 500 },
  monoLg: { fontFamily: FL.mono, fontSize: 20, lineHeight: '24px', fontWeight: 500 },
  monoXl: { fontFamily: FL.mono, fontSize: 32, lineHeight: '36px', fontWeight: 500, letterSpacing: -0.5 },
};

// Radius scale (from DS)
const RL = { sm: 12, md: 20, lg: 28, xl: 40, pill: 999 };

Object.assign(window, { LL, FL, TL, RL });
