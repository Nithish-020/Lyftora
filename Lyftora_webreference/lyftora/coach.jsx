/* AI Coach Chat (1) */

function CoachChat({ onNavigate }) {
  const msgs = [
    { role: 'a', text: "Yo Nithish. Saw you crushed yesterday's pull day. Let's talk push day." },
    { role: 'u', text: "Can we swap barbell bench? My right shoulder feels tight." },
    { role: 'a', text: "Good call listening to the body. Dumbbell press instead — more range, less stress. Drop to 4×8 at 22.5 kg." },
    { role: 'a', chip: true, title: 'Push Day · Upper (Modified)', sub: '6 exercises · 48 min', cta: 'Load it up' },
    { role: 'u', text: "Warmup?" },
    { role: 'a', text: "2 min band pull-apart + arm circles. Light DB press 12 reps just to grease. Then send it. 💪" },
  ];
  const prompts = ['Plan my week', 'Swap leg day', 'Protein after this?'];

  return (
    <Screen bg={L.sBase} padBottom={false} style={{ position: 'relative' }}>
      {/* ambient AI bg */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 280, height: 280,
        borderRadius: '50%', background: L.aiSurface, filter: 'blur(60px)', pointerEvents: 'none',
      }}/>

      {/* header */}
      <div style={{ position: 'relative', padding: '10px 16px 12px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${L.bSubtle}`,
      }}>
        <IconBtn icon="arrow_back" onClick={() => onNavigate && onNavigate('home')}/>
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          background: `radial-gradient(circle at 30% 30%, #a999ff, ${L.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: L.shGlowAI,
        }}>
          <span className="mi fill" style={{ fontSize: 18, color: '#fff' }}>auto_awesome</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ ...T.titleMd, color: L.text }}>Coach</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, ...T.bodySm, color: L.secondary }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: L.secondary, boxShadow: `0 0 8px ${L.secondary}` }}/>
            Online · knows your history
          </div>
        </div>
        <IconBtn icon="history"/>
      </div>

      {/* messages */}
      <div style={{ padding: '16px 16px 12px', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        {msgs.map((m, i) => {
          if (m.chip) {
            return (
              <div key={i} style={{
                alignSelf: 'flex-start', maxWidth: '86%',
                padding: 12, borderRadius: 14,
                background: L.aiSurface, border: `1px solid ${L.bAI}`,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <Placeholder w={44} h={44} tint="ai" icon="list_alt" radius={10}/>
                <div style={{ flex: 1 }}>
                  <div style={{ ...T.titleMd, color: L.text }}>{m.title}</div>
                  <div style={{ ...T.bodySm, color: L.text2 }}>{m.sub}</div>
                </div>
                <Btn label={m.cta} variant="ai" size="sm"/>
              </div>
            );
          }
          const isA = m.role === 'a';
          return (
            <div key={i} style={{
              alignSelf: isA ? 'flex-start' : 'flex-end', maxWidth: '80%',
              padding: '10px 14px', borderRadius: 16,
              borderBottomLeftRadius: isA ? 4 : 16,
              borderBottomRightRadius: isA ? 16 : 4,
              background: isA ? L.sContainer : L.primary,
              color: isA ? L.text : L.textInv,
              ...T.bodyMd,
              border: isA ? `1px solid ${L.bAI}` : 'none',
            }}>
              {m.text}
            </div>
          );
        })}
      </div>

      {/* Suggested prompts */}
      <div style={{ padding: '0 16px 10px', display: 'flex', gap: 8, overflowX: 'auto', position: 'relative' }}>
        {prompts.map(p => (
          <div key={p} style={{
            padding: '8px 12px', borderRadius: 10,
            background: L.sLow, border: `1px solid ${L.bSubtle}`,
            color: L.text2, ...T.bodySm, whiteSpace: 'nowrap',
          }}>{p}</div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: '10px 12px 14px', borderTop: `1px solid ${L.bSubtle}`,
        background: L.glass, backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <IconBtn icon="add" bg={L.sHigh}/>
        <div style={{
          flex: 1, height: 42, background: L.sHigh, borderRadius: 21,
          padding: '0 14px', display: 'flex', alignItems: 'center',
          color: L.text3, ...T.bodyMd,
        }}>Message Coach…</div>
        <IconBtn icon="mic" bg={L.aiSurface} color={L.secondary}/>
      </div>
    </Screen>
  );
}

Object.assign(window, { CoachChat });
