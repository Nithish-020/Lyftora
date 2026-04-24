/* Pixel-style phone frame — LIGHT edition.
   Dark bezel, cream screen inside. Tab bar is inky pill floating in cream. */

const PXL_W = 360;
const PXL_H = 780;

function LStatusBar({ time = '9:41' }) {
  const c = LL.ink;
  return (
    <div style={{
      height: 28, padding: '0 18px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: FL.mono, fontSize: 11, fontWeight: 500, color: c, letterSpacing: 0.3,
      flexShrink: 0,
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span className="mi" style={{ fontSize: 13, color: c }}>signal_cellular_alt</span>
        <span className="mi" style={{ fontSize: 13, color: c }}>wifi</span>
        <span className="mi fill" style={{ fontSize: 14, color: c }}>battery_full</span>
      </div>
    </div>
  );
}

function LHomeIndicator() {
  return (
    <div style={{
      height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <div style={{
        width: 110, height: 4, borderRadius: 2,
        background: 'rgba(14,14,18,0.35)',
      }} />
    </div>
  );
}

function LPixel({
  children, bg = LL.bg, time = '9:41',
  width = PXL_W, height = PXL_H, noStatus = false, noIndicator = false,
}) {
  return (
    <div style={{
      width, height,
      borderRadius: 40,
      background: '#0E0E12',
      padding: 6,
      boxShadow: '0 30px 80px -20px rgba(14,14,18,0.35), 0 0 0 1px rgba(14,14,18,0.06)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 34, overflow: 'hidden',
        background: bg,
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}>
        {!noStatus && <LStatusBar time={time} />}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
        {!noIndicator && <LHomeIndicator />}
      </div>
    </div>
  );
}

// Floating ink pill tab bar — matches DS's dark pill motif over cream
function LTabBar({ active = 'home', onNavigate }) {
  const items = [
    { id: 'home', icon: 'grid_view', label: 'Home' },
    { id: 'workout', icon: 'fitness_center', label: 'Train' },
    { id: 'fab', icon: 'auto_awesome', label: '', fab: true },
    { id: 'diet', icon: 'restaurant', label: 'Diet' },
    { id: 'progress', icon: 'monitoring', label: 'Progress' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 14, right: 14, bottom: 14,
      height: 64, borderRadius: 999,
      background: LL.ink,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '0 8px', boxShadow: '0 20px 40px -18px rgba(14,14,18,0.55)',
    }}>
      {items.map(it => {
        if (it.fab) {
          return (
            <button key={it.id} onClick={() => onNavigate && onNavigate('coach')} style={{
              width: 52, height: 52, borderRadius: 26,
              background: `radial-gradient(circle at 30% 30%, #c9b6ff, ${LL.violet})`,
              border: `3px solid ${LL.ink}`, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: LL.shGlowAI, cursor: 'pointer',
              marginTop: -18,
            }}>
              <span className="mi fill" style={{ fontSize: 22 }}>auto_awesome</span>
            </button>
          );
        }
        const isActive = it.id === active;
        return (
          <button key={it.id} onClick={() => onNavigate && onNavigate(it.id)} style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '4px 0', color: isActive ? LL.primary : 'rgba(244,239,228,0.60)',
          }}>
            <span className={`mi ${isActive ? 'fill' : ''}`} style={{ fontSize: 20 }}>{it.icon}</span>
            <span style={{ ...TL.labelSm, fontSize: 8.5, color: isActive ? LL.primary : 'rgba(244,239,228,0.55)' }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function LTopBar({ title, left, right, subtitle, kicker }) {
  return (
    <div style={{
      padding: '12px 20px 10px',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      {left !== undefined ? left : <div style={{ width: 36 }} />}
      <div style={{ flex: 1, textAlign: subtitle || kicker ? 'left' : 'center' }}>
        {kicker && <div style={{ ...TL.labelSm, color: LL.text2, marginBottom: 2 }}>{kicker}</div>}
        <div style={{ ...TL.headlineMd, fontSize: 20, color: LL.ink }}>{title}</div>
        {subtitle && <div style={{ ...TL.bodySm, color: LL.text2 }}>{subtitle}</div>}
      </div>
      {right !== undefined ? right : <div style={{ width: 36 }} />}
    </div>
  );
}

function LIconBtn({ icon, onClick, size = 36, bg = 'rgba(14,14,18,0.06)', color = LL.ink, fill = false, border }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: size/2,
      background: bg, border: border || 'none', cursor: 'pointer',
      color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span className={`mi ${fill ? 'fill' : ''}`} style={{ fontSize: size * 0.55 }}>{icon}</span>
    </button>
  );
}

Object.assign(window, { LPixel, LStatusBar, LHomeIndicator, LTabBar, LTopBar, LIconBtn, PXL_W, PXL_H });
