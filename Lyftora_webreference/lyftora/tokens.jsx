/* Lyftora design tokens (mirror of docs/design-system/tokens) */

const L = {
  // Brand
  bg: '#0A0E1A',
  primary: '#00D4AA',
  secondary: '#7C6AF7',
  warning: '#FFB020',
  error: '#FF4D6A',

  // Text
  text: '#FFFFFF',
  text2: '#A0A0B0',
  text3: '#6B7280',
  textInv: '#0A0E1A',

  // Surfaces
  sBase: '#0A0E1A',
  sLow: '#111827',
  sContainer: '#1A2235',
  sHigh: '#243045',
  sHighest: '#2E3A50',

  // Borders (rgba)
  bSubtle: 'rgba(255, 255, 255, 0.06)',
  bDefault: 'rgba(255, 255, 255, 0.10)',
  bStrong: 'rgba(255, 255, 255, 0.16)',
  bAccent: 'rgba(0, 212, 170, 0.30)',
  bAI: 'rgba(124, 106, 247, 0.30)',

  // Surface tints
  aiSurface: 'rgba(124, 106, 247, 0.10)',
  primarySurface: 'rgba(0, 212, 170, 0.10)',
  warnSurface: 'rgba(255, 176, 32, 0.10)',
  errSurface: 'rgba(255, 77, 106, 0.10)',
  glass: 'rgba(10, 14, 26, 0.80)',

  // Shadows
  shMd: '0 4px 12px rgba(0,0,0,0.20)',
  shLg: '0 8px 24px rgba(0,0,0,0.25)',
  shGlow: '0 0 16px rgba(0,212,170,0.25)',
  shGlowAI: '0 0 16px rgba(124,106,247,0.25)',
};

// Font stacks
const F = {
  head: "'DM Sans', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  label: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// Quick type helper
const T = {
  displayLg: { fontFamily: F.head, fontSize: 32, lineHeight: '38px', fontWeight: 700, letterSpacing: -0.5 },
  displayMd: { fontFamily: F.head, fontSize: 28, lineHeight: '34px', fontWeight: 700, letterSpacing: -0.3 },
  headlineLg: { fontFamily: F.head, fontSize: 24, lineHeight: '30px', fontWeight: 600, letterSpacing: -0.2 },
  headlineMd: { fontFamily: F.head, fontSize: 20, lineHeight: '26px', fontWeight: 600 },
  titleLg: { fontFamily: F.body, fontSize: 18, lineHeight: '24px', fontWeight: 600 },
  titleMd: { fontFamily: F.body, fontSize: 16, lineHeight: '22px', fontWeight: 600 },
  bodyLg: { fontFamily: F.body, fontSize: 16, lineHeight: '24px', fontWeight: 400 },
  bodyMd: { fontFamily: F.body, fontSize: 14, lineHeight: '20px', fontWeight: 400 },
  bodySm: { fontFamily: F.body, fontSize: 12, lineHeight: '16px', fontWeight: 400 },
  labelLg: { fontFamily: F.label, fontSize: 14, lineHeight: '18px', fontWeight: 500, letterSpacing: 0.5 },
  labelMd: { fontFamily: F.label, fontSize: 12, lineHeight: '16px', fontWeight: 500, letterSpacing: 0.8, textTransform: 'uppercase' },
  labelSm: { fontFamily: F.label, fontSize: 10, lineHeight: '14px', fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase' },
  mono: { fontFamily: F.mono, fontSize: 14, lineHeight: '20px', fontWeight: 700 },
};

Object.assign(window, { L, F, T });
