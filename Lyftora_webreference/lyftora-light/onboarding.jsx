/* LIGHT Onboarding (4):
   1. Welcome — cream canvas with DS's lime/coral/violet ambient wash
   2. AI Coach intro — violet orb in cream
   3. Tracking intro — stacked confetti cards
   4. Profile setup — serif heading, lime goal picker
*/

function LOnbDots({ step, total = 3 }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '16px 0' }}>
      {[...Array(total)].map((_, i) => (
        <div key={i} style={{
          width: i === step ? 24 : 6, height: 6, borderRadius: 3,
          background: i === step ? LL.ink : 'rgba(14,14,18,0.18)',
          transition: 'width 200ms',
        }}/>
      ))}
    </div>
  );
}

// 1. Welcome — warm, welcoming
function LWelcome() {
  return (
    <LScreen noScroll padBottom={false} bg={LL.bg} style={{ position: 'relative' }}>
      {/* DS-style ambient gradient wash — lime, coral, violet on cream */}
      <div style={{
        position: 'absolute', inset: '-20%',
        background: `
          radial-gradient(420px 420px at 85% 10%, rgba(214,255,77,0.70), transparent 60%),
          radial-gradient(360px 360px at 10% 90%, rgba(255,90,60,0.55), transparent 60%),
          radial-gradient(300px 300px at 55% 55%, rgba(123,92,255,0.32), transparent 70%)`,
        filter: 'blur(40px)', opacity: 0.85,
        pointerEvents: 'none',
      }}/>
      {/* grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        mixBlendMode: 'multiply',
      }}/>

      <div style={{
        position: 'relative', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: '28px 24px 36px',
      }}>
        {/* logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 10, height: 10, borderRadius: 5,
            background: LL.primary, boxShadow: '0 0 0 3px rgba(214,255,77,0.40)',
          }}/>
          <span style={{ fontFamily: FL.serif, fontSize: 24, letterSpacing: -0.3 }}>lyftora</span>
          <span style={{
            ...TL.labelSm, padding: '4px 10px', borderRadius: 999,
            background: LL.ink, color: LL.bg, fontSize: 9,
          }}>NAMASTE</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Hero type — Instrument Serif with italic coral emphasis */}
        <div>
          <LEyebrow>WELCOME IN · V 1.0</LEyebrow>
          <h1 style={{
            fontFamily: FL.serif, fontWeight: 400,
            fontSize: 58, lineHeight: 0.92, letterSpacing: -1.6,
            margin: '18px 0 14px', color: LL.ink,
          }}>
            Your coach.<br/>
            Your kitchen.<br/>
            <LEm>Your pace.</LEm>
          </h1>
          <p style={{ ...TL.bodyLg, color: LL.text2, maxWidth: '32ch' }}>
            AI personal training tuned for desi kitchens and small home gyms. No subscription. Just show up.
          </p>
        </div>

        <div style={{ marginTop: 26 }}>
          <LBtn label="Let's go" variant="ink" size="lg" block trailing="arrow_forward"/>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, marginTop: 16, ...TL.bodySm, color: LL.text2,
          }}>
            Already have an account? <span style={{ color: LL.ink, fontWeight: 600, textDecoration: 'underline' }}>Sign in</span>
          </div>
        </div>
      </div>
    </LScreen>
  );
}

// 2. AI Coach intro
function LOnbCoachIntro() {
  return (
    <LScreen noScroll padBottom={false} bg={LL.bg}>
      <div style={{ padding: '14px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ ...TL.labelMd, color: LL.text2, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>← BACK</button>
        <button style={{ ...TL.labelMd, color: LL.text2, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>SKIP</button>
      </div>

      {/* visual — violet orb with chat bubbles and orbit rings */}
      <div style={{ height: 310, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* ambient wash behind */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(60% 60% at 50% 50%, rgba(123,92,255,0.18), transparent 70%)',
        }}/>
        <div style={{
          position: 'absolute', width: 240, height: 240, borderRadius: '50%',
          border: `1px dashed ${LL.bAI}`,
        }}/>
        <div style={{
          position: 'absolute', width: 170, height: 170, borderRadius: '50%',
          border: `1px dashed rgba(123,92,255,0.45)`,
        }}/>
        {/* user bubble */}
        <div style={{ position: 'absolute', top: 46, right: 28,
          background: '#fff', border: `1px solid ${LL.bSubtle}`,
          padding: '8px 12px', borderRadius: 14, borderBottomRightRadius: 4,
          boxShadow: LL.shSm,
        }}>
          <div style={{ ...TL.bodySm, color: LL.ink }}>Leg day?</div>
        </div>
        {/* AI bubble */}
        <div style={{ position: 'absolute', bottom: 54, left: 20,
          background: LL.aiSurface, border: `1px solid ${LL.bAI}`,
          padding: '8px 12px', borderRadius: 14, borderBottomLeftRadius: 4,
        }}>
          <div style={{ ...TL.bodySm, color: LL.violet, fontWeight: 500 }}>Squats @ 4×8. Ready?</div>
        </div>
        {/* core orb */}
        <div style={{
          width: 104, height: 104, borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, #d5c8ff, ${LL.violet} 55%, #3d2d85)`,
          boxShadow: LL.shGlowAI + ', inset 0 0 26px rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <span className="mi fill" style={{ fontSize: 44, color: '#fff' }}>auto_awesome</span>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ ...TL.labelMd, color: LL.violet, marginBottom: 10 }}>STEP 1 · AI COACH</div>
        <h2 style={{ fontFamily: FL.serif, fontWeight: 400, fontSize: 36, lineHeight: 1.02, letterSpacing: -0.8, color: LL.ink, margin: 0 }}>
          A trainer that knows your <LEm color={LL.violet}>dal</LEm>, your desk job, and your <LEm color={LL.coral}>deadlift.</LEm>
        </h2>
        <p style={{ ...TL.bodyLg, color: LL.text2, marginTop: 14 }}>
          Tell it your week. It builds the plan. Ask anything — form cues, rest, substitutions. It remembers.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, padding: '0 20px' }}>
        <LOnbDots step={0}/>
        <LBtn label="Next" variant="ink" size="lg" block trailing="arrow_forward"/>
      </div>
    </LScreen>
  );
}

// 3. Tracking intro
function LOnbTrackingIntro() {
  return (
    <LScreen noScroll padBottom={false} bg={LL.bg}>
      <div style={{ padding: '14px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ ...TL.labelMd, color: LL.text2, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>← BACK</button>
        <button style={{ ...TL.labelMd, color: LL.text2, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>SKIP</button>
      </div>

      {/* stacked confetti cards */}
      <div style={{ height: 310, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(60% 60% at 50% 50%, rgba(214,255,77,0.35), transparent 70%)',
        }}/>
        {/* macro card */}
        <div style={{
          position: 'absolute', top: 46, left: 28,
          width: 150, background: '#fff', borderRadius: 18, padding: 12,
          border: `1px solid ${LL.bSubtle}`, transform: 'rotate(-7deg)',
          boxShadow: LL.shLg,
        }}>
          <div style={{ ...TL.labelSm, color: LL.text2, marginBottom: 6 }}>TODAY</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <LRing size={56} stroke={6} value={0.68} color={LL.ink}>
              <div style={{ ...TL.mono, fontSize: 11, color: LL.ink }}>1820</div>
            </LRing>
            <div>
              <div style={{ ...TL.bodySm, color: LL.text2 }}>kcal</div>
              <div style={{ ...TL.mono, fontSize: 11, color: LL.coral }}>−680</div>
            </div>
          </div>
        </div>
        {/* PR card */}
        <div style={{
          position: 'absolute', bottom: 26, right: 20,
          width: 170, background: LL.ink, color: LL.bg,
          borderRadius: 18, padding: 12, transform: 'rotate(6deg)',
          boxShadow: LL.shLg,
        }}>
          <div style={{ ...TL.labelSm, color: LL.primary }}>🔥 PR</div>
          <div style={{ fontFamily: FL.serif, fontSize: 20, color: LL.bg, marginTop: 2, letterSpacing: -0.3 }}>Bench Press</div>
          <div style={{ ...TL.mono, color: LL.primary, fontSize: 20, marginTop: 2 }}>72.5 kg × 5</div>
          <div style={{ height: 4, background: 'rgba(244,239,228,0.15)', borderRadius: 2, marginTop: 10 }}>
            <div style={{ width: '72%', height: '100%', background: LL.primary, borderRadius: 2 }}/>
          </div>
        </div>
        {/* food card */}
        <div style={{
          position: 'absolute', top: 90, right: 40,
          width: 130, background: '#fff', borderRadius: 16, padding: 10,
          border: `1px solid ${LL.bSubtle}`, transform: 'rotate(-4deg)',
          boxShadow: LL.shMd,
        }}>
          <div style={{ ...TL.bodySm, color: LL.ink, fontWeight: 600 }}>Moong Dal</div>
          <div style={{ ...TL.mono, fontSize: 10, color: LL.text2, marginTop: 2 }}>1 bowl · 198 kcal</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: LL.primary }}/>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: LL.coral }}/>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: LL.violet }}/>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ ...TL.labelMd, color: LL.ink, marginBottom: 10 }}>STEP 2 · TRACKING</div>
        <h2 style={{ fontFamily: FL.serif, fontWeight: 400, fontSize: 36, lineHeight: 1.02, letterSpacing: -0.8, color: LL.ink, margin: 0 }}>
          Every set. Every <LEm>roti.</LEm> Nothing slips.
        </h2>
        <p style={{ ...TL.bodyLg, color: LL.text2, marginTop: 14 }}>
          100+ Indian foods with real macros. Set logging that keeps up. Offline by default.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, padding: '0 20px' }}>
        <LOnbDots step={1}/>
        <LBtn label="Next" variant="ink" size="lg" block trailing="arrow_forward"/>
      </div>
    </LScreen>
  );
}

// 4. Profile setup
function LOnbProfileSetup() {
  const goals = [
    { id: 'lose', label: 'Cut', sub: 'Lose fat', icon: 'trending_down' },
    { id: 'maintain', label: 'Hold', sub: 'Maintain', icon: 'balance' },
    { id: 'gain', label: 'Bulk', sub: 'Build muscle', icon: 'trending_up' },
  ];
  const selected = 'gain';

  return (
    <LScreen padBottom={false} bg={LL.bg}>
      <div style={{ padding: '14px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ ...TL.labelMd, color: LL.text2, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>← BACK</button>
        <span style={{ ...TL.labelMd, color: LL.text2 }}>STEP 3 / 3</span>
      </div>

      <div style={{ padding: '16px 20px 20px' }}>
        <h2 style={{ fontFamily: FL.serif, fontWeight: 400, fontSize: 40, lineHeight: 0.95, letterSpacing: -1, color: LL.ink, margin: 0 }}>
          Let's make it <LEm>yours.</LEm>
        </h2>
        <p style={{ ...TL.bodyMd, color: LL.text2, marginTop: 6 }}>90 seconds. Edit anytime.</p>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Name */}
        <div>
          <div style={{ ...TL.labelMd, color: LL.text2, marginBottom: 6 }}>NAME</div>
          <div style={{
            height: 50, background: '#fff', borderRadius: 14, padding: '0 16px',
            display: 'flex', alignItems: 'center',
            border: `1.5px solid ${LL.ink}`,
            fontFamily: FL.serif, fontSize: 20, color: LL.ink,
          }}>Nithish A.<span style={{ width: 2, height: 20, background: LL.coral, marginLeft: 3 }}/></div>
        </div>

        {/* Age / weight / height */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'AGE', val: '27', unit: 'yr' },
            { label: 'WEIGHT', val: '74', unit: 'kg' },
            { label: 'HEIGHT', val: '176', unit: 'cm' },
          ].map(f => (
            <div key={f.label} style={{
              background: '#fff', borderRadius: 14, padding: 12,
              border: `1px solid ${LL.bSubtle}`,
            }}>
              <div style={{ ...TL.labelSm, color: LL.text2 }}>{f.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 4 }}>
                <span style={{ fontFamily: FL.serif, fontSize: 30, color: LL.ink, letterSpacing: -1 }}>{f.val}</span>
                <span style={{ ...TL.labelSm, color: LL.text2 }}>{f.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div>
          <div style={{ ...TL.labelMd, color: LL.text2, marginBottom: 8 }}>EXPERIENCE</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Beginner', 'Intermediate', 'Advanced'].map((x, i) => (
              <LChip key={x} label={x} active={i === 1}/>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <div style={{ ...TL.labelMd, color: LL.text2, marginBottom: 8 }}>GOAL</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {goals.map(g => {
              const active = g.id === selected;
              return (
                <div key={g.id} style={{
                  background: active ? LL.primary : '#fff',
                  border: active ? `1.5px solid ${LL.ink}` : `1px solid ${LL.bSubtle}`,
                  borderRadius: 16, padding: 14, textAlign: 'center',
                  boxShadow: active ? LL.shGlow : 'none',
                }}>
                  <span className="mi" style={{ fontSize: 22, color: LL.ink }}>{g.icon}</span>
                  <div style={{ fontFamily: FL.serif, fontSize: 22, color: LL.ink, marginTop: 2, letterSpacing: -0.2 }}>{g.label}</div>
                  <div style={{ ...TL.labelSm, color: active ? LL.ink : LL.text2 }}>{g.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px 20px' }}>
        <LBtn label="Build my plan" variant="ink" size="lg" block trailing="auto_awesome"/>
      </div>
    </LScreen>
  );
}

Object.assign(window, { LWelcome, LOnbCoachIntro, LOnbTrackingIntro, LOnbProfileSetup });
