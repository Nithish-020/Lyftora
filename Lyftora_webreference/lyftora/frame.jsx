/* Pixel-style phone frame — slim, content fills screen */

const PX_W = 360;   // logical screen width
const PX_H = 780;   // logical screen height

function StatusBar({ dark = true, time = '9:41' }) {
  const c = dark ? '#fff' : '#0A0E1A';
  return (
    <div style={{
      height: 28, padding: '0 18px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: F.label, fontSize: 12, fontWeight: 600, color: c,
      flexShrink: 0,
    }}>
      <span style={{ letterSpacing: 0.2 }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span className="mi" style={{ fontSize: 13, color: c }}>signal_cellular_alt</span>
        <span className="mi" style={{ fontSize: 13, color: c }}>wifi</span>
        <span className="mi fill" style={{ fontSize: 14, color: c }}>battery_full</span>
      </div>
    </div>
  );
}

function HomeIndicator({ dark = true }) {
  return (
    <div style={{
      height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <div style={{
        width: 110, height: 4, borderRadius: 2,
        background: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)',
      }} />
    </div>
  );
}

// The complete phone bezel
function Pixel({
  children, bg = L.sBase, time = '9:41', statusDark = true,
  width = PX_W, height = PX_H, noStatus = false, noIndicator = false,
}) {
  return (
    <div style={{
      width, height,
      borderRadius: 40,
      background: '#0A0A0F',
      padding: 6,
      boxShadow: '0 30px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 34, overflow: 'hidden',
        background: bg,
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}>
        {!noStatus && <StatusBar dark={statusDark} time={time} />}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
        {!noIndicator && <HomeIndicator dark={statusDark} />}
      </div>
    </div>
  );
}

// Bottom tab bar (glass)
function TabBar({ active = 'home', onNavigate }) {
  const items = [
    { id: 'home', icon: 'grid_view', label: 'Home' },
    { id: 'workout', icon: 'fitness_center', label: 'Train' },
    { id: 'fab', icon: 'bolt', label: '', fab: true },
    { id: 'diet', icon: 'restaurant', label: 'Diet' },
    { id: 'progress', icon: 'monitoring', label: 'Progress' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: 70,
      background: L.glass,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${L.bSubtle}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 8px',
    }}>
      {items.map(it => {
        if (it.fab) {
          return (
            <button key={it.id} onClick={() => onNavigate && onNavigate('coach')} style={{
              width: 52, height: 52, borderRadius: 26,
              background: `linear-gradient(135deg, ${L.primary}, #00F5C4)`,
              border: 'none', color: L.textInv,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: L.shGlow, cursor: 'pointer',
              marginTop: -18,
            }}>
              <span className="mi fill" style={{ fontSize: 26 }}>bolt</span>
            </button>
          );
        }
        const isActive = it.id === active;
        return (
          <button key={it.id} onClick={() => onNavigate && onNavigate(it.id)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '6px 0', color: isActive ? L.primary : L.text2,
          }}>
            <span className={`mi ${isActive ? 'fill' : ''}`} style={{ fontSize: 22,
              filter: isActive ? 'drop-shadow(0 0 6px rgba(0,212,170,0.6))' : 'none' }}>{it.icon}</span>
            <span style={{ ...T.labelSm, color: isActive ? L.primary : L.text2 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Basic top header bar (non-app-bar screen header)
function TopBar({ title, left, right, subtitle }) {
  return (
    <div style={{
      padding: '10px 16px 8px',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      {left !== undefined ? left : <div style={{ width: 36 }} />}
      <div style={{ flex: 1, textAlign: subtitle ? 'left' : 'center' }}>
        <div style={{ ...T.titleMd, color: L.text }}>{title}</div>
        {subtitle && <div style={{ ...T.bodySm, color: L.text2 }}>{subtitle}</div>}
      </div>
      {right !== undefined ? right : <div style={{ width: 36 }} />}
    </div>
  );
}

function IconBtn({ icon, onClick, size = 36, bg = 'rgba(255,255,255,0.06)', color = L.text, fill = false, glow }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: size/2,
      background: bg, border: 'none', cursor: 'pointer',
      color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: glow,
    }}>
      <span className={`mi ${fill ? 'fill' : ''}`} style={{ fontSize: size * 0.56 }}>{icon}</span>
    </button>
  );
}

Object.assign(window, { Pixel, StatusBar, HomeIndicator, TabBar, TopBar, IconBtn, PX_W, PX_H });
