/* Shared primitives — LIGHT edition.
   Cards lift off cream with soft organic shadows.
   Pill chips, serif italic emphasis, mono data. */

function LCard({ children, style, variant = 'surface', onClick }) {
  const bg = {
    surface: LL.sContainer,       // white
    cream:   LL.bg2,              // cream-2 (softer)
    ai:      '#F7F4FF',
    outlined:'transparent',
    lime:    LL.primarySurface,
    coral:   LL.coralSurface,
    ink:     LL.ink,
  }[variant];
  const border = {
    surface:  `1px solid ${LL.bSubtle}`,
    cream:    `1px solid ${LL.bSubtle}`,
    ai:       `1px solid ${LL.bAI}`,
    outlined: `1px solid ${LL.bDefault}`,
    lime:     `1px solid ${LL.bAccent}`,
    coral:    `1px solid ${LL.bCoral}`,
    ink:      'none',
  }[variant];
  return (
    <div onClick={onClick} style={{
      background: bg, borderRadius: 20, padding: 16,
      border, boxShadow: LL.shSm,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}

function LChip({ label, active, leading, onClick, style, variant = 'default' }) {
  const styles = {
    default: active
      ? { bg: LL.ink, color: LL.bg, border: 'none' }
      : { bg: 'transparent', color: LL.ink, border: `1px solid ${LL.bDefault}` },
    lime: active
      ? { bg: LL.primary, color: LL.ink, border: 'none' }
      : { bg: 'transparent', color: LL.ink, border: `1px solid ${LL.bDefault}` },
    ai: active
      ? { bg: LL.violet, color: '#fff', border: 'none' }
      : { bg: 'transparent', color: LL.violet, border: `1px solid ${LL.bAI}` },
  }[variant];
  return (
    <button onClick={onClick} style={{
      height: 32, padding: '0 14px', borderRadius: 999,
      background: styles.bg, color: styles.color, border: styles.border,
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
      ...TL.labelMd, fontSize: 11, whiteSpace: 'nowrap',
      ...style,
    }}>
      {leading && <span className="mi" style={{ fontSize: 14 }}>{leading}</span>}
      {label}
    </button>
  );
}

function LBtn({ label, variant = 'primary', size = 'md', icon, onClick, style, trailing, block }) {
  const h = { sm: 36, md: 46, lg: 54 }[size];
  const v = {
    primary: { bg: LL.primary, color: LL.ink, border: 'none', shadow: LL.shGlow, weight: 700 },
    ink:     { bg: LL.ink, color: LL.bg, border: 'none', shadow: LL.shMd, weight: 600 },
    coral:   { bg: LL.coral, color: '#fff', border: 'none', shadow: LL.shCoral, weight: 700 },
    secondary: { bg: 'transparent', color: LL.ink, border: `1px solid ${LL.bStrong}`, weight: 600 },
    ghost:   { bg: 'transparent', color: LL.ink, border: 'none', weight: 500 },
    ai:      { bg: LL.violet, color: '#fff', border: 'none', shadow: LL.shGlowAI, weight: 600 },
    aiGhost: { bg: LL.aiSurface, color: LL.violet, border: `1px solid ${LL.bAI}`, weight: 600 },
    cream:   { bg: LL.bg2, color: LL.ink, border: 'none', weight: 600 },
  }[variant];
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 16 : 15;
  return (
    <button onClick={onClick} style={{
      height: h, padding: `0 ${size === 'sm' ? 14 : 22}px`, borderRadius: 999,
      background: v.bg, color: v.color, border: v.border,
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
      justifyContent: 'center',
      fontFamily: FL.sans, fontSize, fontWeight: v.weight, letterSpacing: -0.1,
      boxShadow: v.shadow,
      width: block ? '100%' : undefined,
      ...style,
    }}>
      {icon && <span className="mi" style={{ fontSize: size === 'lg' ? 20 : 18 }}>{icon}</span>}
      {label}
      {trailing && <span className="mi" style={{ fontSize: size === 'lg' ? 20 : 18 }}>{trailing}</span>}
    </button>
  );
}

// Circular progress ring (light trackline)
function LRing({ size = 80, stroke = 8, value = 0.65, color = LL.ink, trackColor, children, rotation = -90 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, value)) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: `rotate(${rotation}deg)`, display: 'block' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={trackColor || 'rgba(14,14,18,0.08)'}
          strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color}
          strokeWidth={stroke} fill="none"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"/>
      </svg>
      {children && <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
      }}>{children}</div>}
    </div>
  );
}

// Placeholder image — cross-hatch cream/ink pattern (DS style: stripey)
function LPlaceholder({ w = '100%', h = 120, label, tint = 'lime', icon, radius = 16, style }) {
  const palette = {
    lime:  ['rgba(214,255,77,0.55)', 'rgba(214,255,77,0.15)', '#6B7A1A'],
    coral: ['rgba(255,90,60,0.28)', 'rgba(255,90,60,0.08)', '#B8361F'],
    violet:['rgba(123,92,255,0.26)', 'rgba(123,92,255,0.08)', '#4A3BA6'],
    sky:   ['rgba(110,224,255,0.30)', 'rgba(110,224,255,0.10)', '#1B7A96'],
    cream: ['rgba(14,14,18,0.06)', 'rgba(14,14,18,0.02)', LL.text2],
    ink:   ['rgba(14,14,18,0.72)', 'rgba(14,14,18,0.92)', LL.primary],
  }[tint];
  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      background: `repeating-linear-gradient(135deg, ${palette[0]} 0 8px, ${palette[1]} 8px 16px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: palette[2], ...TL.labelMd, position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      {icon && <span className="mi" style={{ fontSize: 28, opacity: 0.85 }}>{icon}</span>}
      {label && <span style={{ marginLeft: icon ? 8 : 0 }}>{label}</span>}
    </div>
  );
}

// Macro bar — lime track on cream
function LMacroBar({ label, value, goal, color, sub }) {
  const pct = Math.min(1, value / goal);
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ ...TL.labelSm, color: LL.text2 }}>{label}</span>
        <span style={{ ...TL.mono, fontSize: 11, color: LL.ink }}>{value}/{goal}{sub}</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: 'rgba(14,14,18,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct * 100}%`, background: color, borderRadius: 2 }}/>
      </div>
    </div>
  );
}

// Avatar — inky disc with cream initials, or cream disc with ink initials
function LAvatar({ name = 'U', size = 36, tone = 'ink' }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  const palette = {
    ink:    { bg: LL.ink, color: LL.bg },
    lime:   { bg: LL.primary, color: LL.ink },
    coral:  { bg: LL.coral, color: '#fff' },
    violet: { bg: LL.violet, color: '#fff' },
    cream:  { bg: LL.bg2, color: LL.ink },
  }[tone];
  return (
    <div style={{
      width: size, height: size, borderRadius: size/2,
      background: palette.bg, color: palette.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FL.serif, fontSize: size * 0.42, fontWeight: 400, letterSpacing: -0.5,
      flexShrink: 0, overflow: 'hidden',
    }}>
      {initials}
    </div>
  );
}

// Screen wrapper
function LScreen({ children, padBottom = true, bg = LL.bg, noScroll = false, style }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: bg,
      overflowY: noScroll ? 'hidden' : 'auto',
      paddingBottom: padBottom ? 90 : 0,
      boxSizing: 'border-box',
      color: LL.ink,
      fontFamily: FL.sans,
      ...style,
    }}>
      {children}
    </div>
  );
}

// Section label with 28px kicker-rule left (DS's ::before style)
function LSectionLabel({ children, action, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', marginTop: 22, marginBottom: 12,
      ...style,
    }}>
      <span style={{
        ...TL.labelMd, color: LL.text2,
        display: 'inline-flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ width: 20, height: 1, background: 'currentColor' }}/>
        {children}
      </span>
      {action}
    </div>
  );
}

// Italic coral emphasis — the signature serif move
function LEm({ children, color }) {
  return <em style={{ fontStyle: 'italic', color: color || LL.coral, fontFamily: FL.serif }}>{children}</em>;
}

// A little eyebrow pill
function LEyebrow({ children, dot = true, style }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px 6px 8px',
      borderRadius: 999,
      background: 'rgba(14,14,18,0.05)',
      border: `1px solid ${LL.bDefault}`,
      ...TL.labelMd, color: LL.ink,
      ...style,
    }}>
      {dot && <span style={{
        width: 8, height: 8, borderRadius: 4,
        background: LL.primary, boxShadow: `0 0 0 3px rgba(214,255,77,0.40)`,
      }}/>}
      {children}
    </div>
  );
}

Object.assign(window, { LCard, LChip, LBtn, LRing, LPlaceholder, LMacroBar, LAvatar, LScreen, LSectionLabel, LEm, LEyebrow });
