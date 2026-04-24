/* Onboarding screens (4):
   1. Welcome / Splash  — warm gradient hero
   2. AI Coach Intro   — step 1 of 3
   3. Tracking Intro   — step 2 of 3
   4. Profile Setup    — step 3 of 3 (name/age/weight/height/exp/goal)
*/

function OnbDots({ step, total = 3 }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '16px 0' }}>
      {[...Array(total)].map((_, i) => (
        <div key={i} style={{
          width: i === step ? 24 : 6, height: 6, borderRadius: 3,
          background: i === step ? L.primary : 'rgba(255,255,255,0.16)',
          transition: 'width 200ms',
        }}/>
      ))}
    </div>
  );
}

// 1. Welcome / splash — warm, welcoming, no onboarding yet
function Welcome() {
  return (
    <Screen noScroll padBottom={false} bg="#0A0E1A" style={{ position: 'relative' }}>
      {/* warm atmospheric gradient wash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 80% at 70% 10%, rgba(255,176,32,0.28), transparent 60%), radial-gradient(100% 70% at 20% 90%, rgba(0,212,170,0.20), transparent 60%), radial-gradient(80% 60% at 50% 50%, rgba(124,106,247,0.12), transparent 70%)',
        pointerEvents: 'none',
      }}/>
      {/* grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        mixBlendMode: 'overlay',
      }}/>
      <div style={{
        position: 'relative', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: '40px 24px 40px',
      }}>
        {/* logo mark */}
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: `linear-gradient(135deg, ${L.primary}, ${L.warning})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: L.shGlow,
          }}>
            <span className="mi fill" style={{ fontSize: 18, color: L.textInv }}>bolt</span>
          </div>
          <span style={{ ...T.headlineMd, color: L.text, letterSpacing: -0.5 }}>lyftora</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Hero type */}
        <div>
          <div style={{ ...T.labelMd, color: L.warning, marginBottom: 16 }}>WELCOME IN</div>
          <h1 style={{
            ...T.displayLg, fontSize: 44, lineHeight: '48px', letterSpacing: -1,
            margin: 0, color: L.text,
          }}>
            Your coach.<br/>
            Your kitchen.<br/>
            <span style={{
              background: `linear-gradient(92deg, ${L.primary} 0%, ${L.warning} 100%)`,
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>Your pace.</span>
          </h1>
          <p style={{ ...T.bodyLg, color: L.text2, marginTop: 16, lineHeight: '22px' }}>
            AI personal training tuned for desi kitchens and small home gyms. No subscription. Just show up.
          </p>
        </div>

        <div style={{ marginTop: 28 }}>
          <Btn label="Let's go" variant="primary" size="lg" block trailing="arrow_forward" />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, marginTop: 16, ...T.bodySm, color: L.text2,
          }}>
            Already have an account? <span style={{ color: L.primary, fontWeight: 600 }}>Sign in</span>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// 2. AI Coach Intro — feature page
function OnbCoachIntro() {
  return (
    <Screen noScroll padBottom={false} bg={L.sBase}>
      <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ ...T.labelMd, color: L.text2, background: 'none', border: 'none', padding: 0 }}>BACK</button>
        <button style={{ ...T.labelMd, color: L.text2, background: 'none', border: 'none', padding: 0 }}>SKIP</button>
      </div>

      {/* Hero visual — AI orb with orbit */}
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', width: 220, height: 220, borderRadius: '50%',
          border: `1px dashed ${L.bAI}`,
        }}/>
        <div style={{
          position: 'absolute', width: 160, height: 160, borderRadius: '50%',
          border: `1px dashed rgba(124,106,247,0.45)`,
        }}/>
        {/* chat bubble orbit */}
        <div style={{ position: 'absolute', top: 50, right: 40, background: L.sContainer, border: `1px solid ${L.bAI}`, padding: '8px 12px', borderRadius: 16, borderBottomRightRadius: 4 }}>
          <div style={{ ...T.bodySm, color: L.text }}>Leg day?</div>
        </div>
        <div style={{ position: 'absolute', bottom: 60, left: 30, background: L.aiSurface, border: `1px solid ${L.bAI}`, padding: '8px 12px', borderRadius: 16, borderBottomLeftRadius: 4 }}>
          <div style={{ ...T.bodySm, color: L.secondary }}>Squats @ 4×8. Ready?</div>
        </div>
        {/* core orb */}
        <div style={{
          width: 96, height: 96, borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, #a999ff, ${L.secondary} 60%, #4a3ba6)`,
          boxShadow: L.shGlowAI + ', inset 0 0 20px rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="mi fill" style={{ fontSize: 40, color: '#fff' }}>auto_awesome</span>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ ...T.labelMd, color: L.secondary, marginBottom: 8 }}>STEP 1 · AI COACH</div>
        <h2 style={{ ...T.headlineLg, fontSize: 28, color: L.text, margin: 0, letterSpacing: -0.4 }}>
          A trainer that knows your dal, your desk job, and your deadlift.
        </h2>
        <p style={{ ...T.bodyLg, color: L.text2, marginTop: 12 }}>
          Tell it your week. It builds the plan. Ask anything — form cues, rest, substitutions. It remembers.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, padding: '0 20px' }}>
        <OnbDots step={0}/>
        <Btn label="Next" variant="primary" size="lg" block trailing="arrow_forward"/>
      </div>
    </Screen>
  );
}

// 3. Tracking intro
function OnbTrackingIntro() {
  return (
    <Screen noScroll padBottom={false} bg={L.sBase}>
      <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ ...T.labelMd, color: L.text2, background: 'none', border: 'none', padding: 0 }}>BACK</button>
        <button style={{ ...T.labelMd, color: L.text2, background: 'none', border: 'none', padding: 0 }}>SKIP</button>
      </div>

      {/* Visual: stacked mini cards preview */}
      <div style={{ height: 300, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* macro ring card */}
        <div style={{
          position: 'absolute', top: 36, left: 28,
          width: 140, background: L.sContainer, borderRadius: 14, padding: 12,
          border: `1px solid ${L.bSubtle}`, transform: 'rotate(-6deg)',
          boxShadow: L.shLg,
        }}>
          <div style={{ ...T.labelSm, color: L.text2, marginBottom: 6 }}>TODAY</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Ring size={60} stroke={6} value={0.68} color={L.primary}>
              <div style={{ ...T.mono, fontSize: 12, color: L.text }}>1820</div>
            </Ring>
            <div>
              <div style={{ ...T.bodySm, color: L.text2 }}>kcal</div>
              <div style={{ ...T.mono, fontSize: 11, color: L.primary }}>-680</div>
            </div>
          </div>
        </div>
        {/* workout card */}
        <div style={{
          position: 'absolute', bottom: 24, right: 20,
          width: 160, background: L.sContainer, borderRadius: 14, padding: 12,
          border: `1px solid ${L.bSubtle}`, transform: 'rotate(5deg)',
          boxShadow: L.shLg,
        }}>
          <div style={{ ...T.labelSm, color: L.primary, marginBottom: 4 }}>PR 🔥</div>
          <div style={{ ...T.titleMd, color: L.text }}>Bench Press</div>
          <div style={{ ...T.mono, color: L.primary, fontSize: 18, marginTop: 2 }}>72.5 kg × 5</div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginTop: 10 }}>
            <div style={{ width: '72%', height: '100%', background: L.primary, borderRadius: 2 }}/>
          </div>
        </div>
        {/* food card */}
        <div style={{
          position: 'absolute', bottom: 80, left: 40,
          width: 120, background: L.sContainer, borderRadius: 14, padding: 10,
          border: `1px solid ${L.bSubtle}`, transform: 'rotate(3deg)',
          boxShadow: L.shLg,
        }}>
          <div style={{ ...T.bodySm, color: L.text, fontWeight: 600 }}>Moong Dal</div>
          <div style={{ ...T.mono, fontSize: 11, color: L.text2, marginTop: 2 }}>1 bowl · 198 kcal</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: L.primary }}/>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: L.warning }}/>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: L.secondary }}/>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ ...T.labelMd, color: L.primary, marginBottom: 8 }}>STEP 2 · TRACKING</div>
        <h2 style={{ ...T.headlineLg, fontSize: 28, color: L.text, margin: 0, letterSpacing: -0.4 }}>
          Every set. Every roti. Nothing slips.
        </h2>
        <p style={{ ...T.bodyLg, color: L.text2, marginTop: 12 }}>
          100+ Indian foods with real macros. Set logging that keeps up with you. Offline by default.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, padding: '0 20px' }}>
        <OnbDots step={1}/>
        <Btn label="Next" variant="primary" size="lg" block trailing="arrow_forward"/>
      </div>
    </Screen>
  );
}

// 4. Profile setup
function OnbProfileSetup() {
  const goals = [
    { id: 'lose', label: 'Cut', sub: 'Lose fat', icon: 'trending_down', color: L.warning },
    { id: 'maintain', label: 'Hold', sub: 'Maintain', icon: 'balance', color: L.text2 },
    { id: 'gain', label: 'Bulk', sub: 'Build muscle', icon: 'trending_up', color: L.primary },
  ];
  const selected = 'gain';

  return (
    <Screen padBottom={false} bg={L.sBase}>
      <div style={{ padding: '16px 20px 0', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ ...T.labelMd, color: L.text2, background: 'none', border: 'none', padding: 0 }}>BACK</button>
        <span style={{ ...T.labelMd, color: L.text2 }}>STEP 3 / 3</span>
      </div>

      <div style={{ padding: '20px 20px 24px' }}>
        <h2 style={{ ...T.displayMd, color: L.text, margin: 0, letterSpacing: -0.5 }}>
          Let's make it <span style={{ color: L.primary }}>yours.</span>
        </h2>
        <p style={{ ...T.bodyMd, color: L.text2, marginTop: 4 }}>90 seconds. Edit anytime.</p>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Name */}
        <div>
          <div style={{ ...T.labelMd, color: L.text2, marginBottom: 6 }}>NAME</div>
          <div style={{
            height: 48, background: L.sHigh, borderRadius: 8, padding: '0 14px',
            display: 'flex', alignItems: 'center', ...T.bodyLg, color: L.text,
            border: `1px solid ${L.bAccent}`,
          }}>Nithish A.<span style={{ width: 2, height: 18, background: L.primary, marginLeft: 2, animation: 'none' }}/></div>
        </div>

        {/* Age / weight / height grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'AGE', val: '27', unit: 'yr' },
            { label: 'WEIGHT', val: '74', unit: 'kg' },
            { label: 'HEIGHT', val: '176', unit: 'cm' },
          ].map(f => (
            <div key={f.label} style={{
              background: L.sHigh, borderRadius: 8, padding: 12,
            }}>
              <div style={{ ...T.labelSm, color: L.text2 }}>{f.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 2 }}>
                <span style={{ ...T.headlineMd, color: L.text }}>{f.val}</span>
                <span style={{ ...T.labelSm, color: L.text2 }}>{f.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div>
          <div style={{ ...T.labelMd, color: L.text2, marginBottom: 8 }}>EXPERIENCE</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Beginner', 'Intermediate', 'Advanced'].map((x, i) => (
              <Chip key={x} label={x} active={i === 1} />
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <div style={{ ...T.labelMd, color: L.text2, marginBottom: 8 }}>GOAL</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {goals.map(g => {
              const active = g.id === selected;
              return (
                <div key={g.id} style={{
                  background: active ? L.primarySurface : L.sHigh,
                  border: active ? `1px solid ${L.bAccent}` : '1px solid transparent',
                  borderRadius: 12, padding: 12, textAlign: 'center',
                }}>
                  <span className="mi" style={{ fontSize: 24, color: active ? L.primary : L.text2 }}>{g.icon}</span>
                  <div style={{ ...T.titleMd, color: active ? L.primary : L.text, marginTop: 4 }}>{g.label}</div>
                  <div style={{ ...T.bodySm, color: L.text2 }}>{g.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px 24px' }}>
        <Btn label="Build my plan" variant="primary" size="lg" block trailing="auto_awesome"/>
      </div>
    </Screen>
  );
}

Object.assign(window, { Welcome, OnbCoachIntro, OnbTrackingIntro, OnbProfileSetup, OnbDots });
