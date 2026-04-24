/* LIGHT AI Coach chat — warm, hype, violet-accented on cream */

function LCoachChat({ onNavigate }) {
  return (
    <LScreen bg={LL.bg} padBottom={false}>
      <div style={{
        padding: '10px 16px 14px',
        borderBottom: `1px solid ${LL.bSubtle}`,
        background: LL.glass, backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 5,
      }}>
        <LIconBtn icon="arrow_back" onClick={() => onNavigate && onNavigate('home')}/>
        <div style={{
          width: 42, height: 42, borderRadius: 21,
          background: `radial-gradient(circle at 30% 30%, #c9b6ff, ${LL.violet})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: LL.shGlowAI, position: 'relative',
        }}>
          <span className="mi fill" style={{ fontSize: 20, color: '#fff' }}>auto_awesome</span>
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 12, height: 12, borderRadius: 6,
            background: LL.primary, border: `2px solid ${LL.bg}`,
          }}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FL.serif, fontSize: 20, color: LL.ink, letterSpacing: -0.3, lineHeight: 1 }}>Coach</div>
          <div style={{ ...TL.labelSm, color: LL.violet, marginTop: 2 }}>TUNED TO YOU · REMEMBERS ALL</div>
        </div>
        <LIconBtn icon="more_vert"/>
      </div>

      <div style={{ padding: '18px 16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Date divider */}
        <div style={{ textAlign: 'center', ...TL.labelSm, color: LL.text3, margin: '4px 0' }}>
          · TODAY · 8:14 AM ·
        </div>

        {/* AI greeting */}
        <CoachBubble side="ai">
          <div style={{ fontFamily: FL.serif, fontSize: 20, lineHeight: 1.1, letterSpacing: -0.3, color: LL.ink }}>
            Good morning, <LEm color={LL.violet}>Nithish.</LEm>
          </div>
          <div style={{ ...TL.bodyMd, color: LL.text, marginTop: 6 }}>
            You smashed pull day yesterday — 3 PRs, 68 min. Recovery looks solid (sleep 7h 20m). Ready for push?
          </div>
        </CoachBubble>

        {/* Plan card */}
        <CoachBubble side="ai" noTail>
          <div style={{ ...TL.labelMd, color: LL.violet, marginBottom: 6 }}>TODAY'S PLAN</div>
          <div style={{ fontFamily: FL.serif, fontSize: 22, color: LL.ink, letterSpacing: -0.3, lineHeight: 1 }}>
            Push Day · <LEm color={LL.violet}>Upper</LEm>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10 }}>
            {[
              { n: 'Bench Press', s: '4 × 5–8', hot: true },
              { n: 'Incline DB Press', s: '3 × 8–10' },
              { n: 'Cable Fly', s: '3 × 10–12' },
              { n: 'Overhead Press', s: '4 × 8' },
              { n: '+ 2 more', s: '' },
            ].map((ex, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 0', borderTop: i > 0 ? `1px dashed ${LL.bSubtle}` : 'none',
              }}>
                <span style={{ ...TL.mono, fontSize: 11, color: LL.text2, width: 20 }}>{i < 4 ? `0${i+1}` : '··'}</span>
                <span style={{ ...TL.bodyMd, color: LL.ink, flex: 1 }}>{ex.n}</span>
                {ex.hot && <span className="mi fill" style={{ fontSize: 12, color: LL.coral }}>emoji_events</span>}
                <span style={{ ...TL.mono, fontSize: 11, color: LL.text2 }}>{ex.s}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <LBtn label="Start now" variant="ai" size="sm" icon="play_arrow"
              onClick={() => onNavigate && onNavigate('active')}/>
            <LBtn label="Tweak" variant="aiGhost" size="sm"/>
          </div>
        </CoachBubble>

        {/* User bubble */}
        <CoachBubble side="user">
          <div style={{ ...TL.bodyMd, color: LL.bg }}>
            Shoulder's a bit tight. Can we swap bench for dumbbell?
          </div>
        </CoachBubble>

        {/* AI reply */}
        <CoachBubble side="ai">
          <div style={{ ...TL.bodyMd, color: LL.text }}>
            Good call — safer range of motion. Let's do <strong style={{ color: LL.ink }}>Dumbbell Bench 4 × 8</strong> at 22.5 kg, with a 2-min warm-up on the cable first.
          </div>
          <div style={{
            marginTop: 10, padding: 10, borderRadius: 12,
            background: LL.coralSurface, border: `1px solid ${LL.bCoral}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span className="mi fill" style={{ fontSize: 18, color: LL.coral }}>tips_and_updates</span>
            <div style={{ ...TL.bodySm, color: LL.ink }}>
              Your PR is 28 kg × 6 — I'll track if today feels spicy.
            </div>
          </div>
        </CoachBubble>

        {/* User typing indicator */}
        <CoachBubble side="ai" noTail>
          <div style={{ ...TL.bodySm, color: LL.text2, fontStyle: 'italic' }}>
            Also — want me to bump your lunch dal to 1.5 bowls? You're <LEm color={LL.coral}>30g protein</LEm> short this week.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <div style={{
              padding: '6px 12px', borderRadius: 999,
              background: '#fff', border: `1px solid ${LL.bDefault}`,
              ...TL.labelMd, color: LL.ink,
            }}>YES, LOG IT</div>
            <div style={{
              padding: '6px 12px', borderRadius: 999,
              background: 'transparent', border: `1px solid ${LL.bDefault}`,
              ...TL.labelMd, color: LL.text2,
            }}>NOT NOW</div>
          </div>
        </CoachBubble>
      </div>

      {/* Composer */}
      <div style={{
        position: 'sticky', bottom: 0,
        padding: '10px 16px 16px',
        background: LL.glass, backdropFilter: 'blur(16px)',
        borderTop: `1px solid ${LL.bSubtle}`,
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, overflowX: 'auto' }}>
          {['Today\'s plan', 'What to eat?', 'Form check', 'Explain RPE'].map((s, i) => (
            <div key={s} style={{
              padding: '7px 12px', borderRadius: 999,
              background: 'rgba(123,92,255,0.08)',
              border: `1px solid ${LL.bAI}`,
              ...TL.labelSm, color: LL.violet,
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>✦ {s}</div>
          ))}
        </div>
        <div style={{
          height: 50, background: '#fff', borderRadius: 25,
          border: `1px solid ${LL.bDefault}`, padding: '0 6px 0 18px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ ...TL.bodyMd, color: LL.text2, flex: 1 }}>Ask Coach anything…</span>
          <LIconBtn icon="mic" size={36} bg={LL.bg2}/>
          <LIconBtn icon="arrow_upward" size={38} bg={LL.violet} color="#fff" fill/>
        </div>
      </div>
    </LScreen>
  );
}

function CoachBubble({ children, side = 'ai', noTail }) {
  const isAi = side === 'ai';
  return (
    <div style={{
      display: 'flex', justifyContent: isAi ? 'flex-start' : 'flex-end',
    }}>
      <div style={{
        maxWidth: '82%',
        background: isAi ? '#fff' : LL.ink,
        color: isAi ? LL.text : LL.bg,
        padding: '12px 14px',
        borderRadius: 18,
        borderBottomLeftRadius: isAi && !noTail ? 4 : 18,
        borderBottomRightRadius: !isAi ? 4 : 18,
        border: isAi ? `1px solid ${LL.bSubtle}` : 'none',
        boxShadow: isAi ? LL.shSm : LL.shMd,
      }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { LCoachChat });
