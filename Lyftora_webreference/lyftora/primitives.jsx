/* Shared primitives: cards, chips, progress rings, buttons, placeholder imagery */

function Card({ children, style, variant = 'surface', onClick }) {
  const bg = {
    surface: L.sContainer,
    elevated: L.sContainer,
    ai: L.aiSurface,
    outlined: 'transparent',
    low: L.sLow,
  }[variant];
  const border = {
    ai: `1px solid ${L.bAI}`,
    outlined: `1px solid ${L.bDefault}`,
  }[variant];
  const shadow = variant === 'elevated' ? L.shMd : undefined;
  return (
    <div onClick={onClick} style={{
      background: bg, borderRadius: 12, padding: 16,
      border, boxShadow: shadow,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

function Chip({ label, active, leading, onClick, style, color }) {
  return (
    <button onClick={onClick} style={{
      height: 30, padding: '0 12px', borderRadius: 9999,
      background: active ? (color || L.primary) : L.sHigh,
      color: active ? L.textInv : L.text2,
      border: 'none', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 6,
      ...T.labelMd,
      fontWeight: 600,
      ...style,
    }}>
      {leading && <span className="mi" style={{ fontSize: 14 }}>{leading}</span>}
      {label}
    </button>
  );
}

function Btn({ label, variant = 'primary', size = 'md', icon, onClick, style, trailing, block }) {
  const h = { sm: 36, md: 44, lg: 52 }[size];
  const v = {
    primary: { bg: L.primary, color: L.textInv, border: 'none', shadow: L.shGlow },
    secondary: { bg: 'transparent', color: L.primary, border: `1px solid ${L.bAccent}` },
    ghost: { bg: 'transparent', color: L.text2, border: 'none' },
    ai: { bg: L.aiSurface, color: L.secondary, border: `1px solid ${L.bAI}` },
    danger: { bg: L.errSurface, color: L.error, border: 'none' },
    dark: { bg: L.sHigh, color: L.text, border: 'none' },
  }[variant];
  return (
    <button onClick={onClick} style={{
      height: h, padding: `0 ${size === 'sm' ? 14 : 20}px`, borderRadius: 12,
      background: v.bg, color: v.color, border: v.border,
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
      justifyContent: 'center',
      ...T.titleMd, fontSize: size === 'sm' ? 14 : 16,
      boxShadow: v.shadow,
      width: block ? '100%' : undefined,
      ...style,
    }}>
      {icon && <span className="mi" style={{ fontSize: 20 }}>{icon}</span>}
      {label}
      {trailing && <span className="mi" style={{ fontSize: 20 }}>{trailing}</span>}
    </button>
  );
}

// Circular progress ring
function Ring({ size = 80, stroke = 8, value = 0.65, color = L.primary, trackColor, children, rotation = -90 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, value)) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: `rotate(${rotation}deg)` }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={trackColor || 'rgba(255,255,255,0.08)'}
          strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color}
          strokeWidth={stroke} fill="none"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 400ms ease' }}/>
      </svg>
      {children && <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
      }}>{children}</div>}
    </div>
  );
}

// Placeholder image block (stripes + optional label)
function Placeholder({ w = '100%', h = 120, label, tint = 'primary', icon, radius = 12, style }) {
  const colors = {
    primary: ['rgba(0,212,170,0.18)', 'rgba(0,212,170,0.05)', '#00D4AA'],
    ai: ['rgba(124,106,247,0.22)', 'rgba(124,106,247,0.06)', '#7C6AF7'],
    warm: ['rgba(255,176,32,0.22)', 'rgba(255,176,32,0.05)', '#FFB020'],
    neutral: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)', '#A0A0B0'],
    hot: ['rgba(255,77,106,0.20)', 'rgba(255,77,106,0.04)', '#FF4D6A'],
  }[tint];
  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      background: `repeating-linear-gradient(135deg, ${colors[0]} 0 8px, ${colors[1]} 8px 16px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: colors[2], ...T.labelMd, position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      {icon && <span className="mi" style={{ fontSize: 32, opacity: 0.7 }}>{icon}</span>}
      {label && <span style={{ marginLeft: icon ? 8 : 0 }}>{label}</span>}
    </div>
  );
}

// Tiny inline macro bar
function MacroBar({ label, value, goal, color, sub }) {
  const pct = Math.min(1, value / goal);
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ ...T.labelSm, color: L.text2 }}>{label}</span>
        <span style={{ ...T.mono, fontSize: 11, color: L.text }}>{value}/{goal}{sub}</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct * 100}%`, background: color, borderRadius: 2 }}/>
      </div>
    </div>
  );
}

// Avatar
function Avatar({ name = 'U', size = 36, color = L.primary, src }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: size/2,
      background: `linear-gradient(135deg, ${color}, ${L.secondary})`,
      color: L.textInv, display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...T.labelMd, fontSize: size * 0.34, fontWeight: 700,
      flexShrink: 0, overflow: 'hidden',
    }}>
      {src ? <Placeholder w={size} h={size} radius={size/2} tint="neutral" /> : initials}
    </div>
  );
}

// Screen wrapper
function Screen({ children, padBottom = true, bg = L.sBase, noScroll = false, style }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      overflowY: noScroll ? 'hidden' : 'auto',
      paddingBottom: padBottom ? 84 : 0,
      boxSizing: 'border-box',
      color: L.text,
      ...style,
    }}>
      {children}
    </div>
  );
}

// Section label
function SectionLabel({ children, action, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '0 16px', marginTop: 20, marginBottom: 10,
      ...style,
    }}>
      <span style={{ ...T.labelMd, color: L.text2 }}>{children}</span>
      {action}
    </div>
  );
}

Object.assign(window, { Card, Chip, Btn, Ring, Placeholder, MacroBar, Avatar, Screen, SectionLabel });
