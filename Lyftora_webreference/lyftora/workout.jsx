/* Workout flow (4) — HERO
   9.  Active Workout
   10. Exercise Library (picker)
   11. Rest Timer Overlay
   12. Post-Workout Summary
*/

// 9. Active Workout — detailed set logging with inline edit
function ActiveWorkout({ onNavigate }) {
  const exercises = [
    {
      name: 'Barbell Bench Press', muscle: 'Chest',
      sets: [
        { n: 1, w: 40, r: 10, done: true, warmup: true },
        { n: 2, w: 60, r: 8, done: true, warmup: false },
        { n: 3, w: 70, r: 6, done: true, warmup: false, pr: true },
        { n: 4, w: 72.5, r: 5, done: false, warmup: false, active: true },
      ],
    },
    {
      name: 'Incline Dumbbell Press', muscle: 'Chest · Shoulders',
      sets: [
        { n: 1, w: 20, r: 10, done: false },
        { n: 2, w: 22.5, r: 8, done: false },
        { n: 3, w: 22.5, r: 8, done: false },
      ],
    },
    { name: 'Cable Fly', muscle: 'Chest', sets: [{ n: 1, w: 15, r: 12 }, { n: 2, w: 15, r: 12 }, { n: 3, w: 17.5, r: 10 }] },
  ];

  return (
    <Screen bg={L.sBase} padBottom={false}>
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: L.glass, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        padding: '10px 16px 12px',
        borderBottom: `1px solid ${L.bSubtle}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconBtn icon="close"/>
          <div style={{ flex: 1 }}>
            <div style={{ ...T.labelMd, color: L.primary }}>PUSH DAY · UPPER</div>
            <div style={{ ...T.mono, color: L.text, fontSize: 20, letterSpacing: 0.5 }}>00:24:18</div>
          </div>
          <Btn label="Finish" variant="primary" size="sm"
            onClick={() => onNavigate && onNavigate('summary')}/>
        </div>

        {/* Progress pills */}
        <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
          {[1,1,1,0.5,0,0].map((v,i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: v === 1 ? L.primary : v > 0 ? `linear-gradient(90deg, ${L.primary} 50%, rgba(255,255,255,0.08) 50%)` : 'rgba(255,255,255,0.08)',
            }}/>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, ...T.labelSm, color: L.text2 }}>
          <span>EX 1 / 6</span>
          <span>VOL 3,260 kg</span>
          <span>3 PRs</span>
        </div>
      </div>

      {/* Exercises */}
      <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {exercises.map((ex, idx) => {
          const active = idx === 0;
          return (
            <div key={idx} style={{
              borderRadius: 14,
              background: active ? L.sContainer : L.sLow,
              border: active ? `1px solid ${L.bAccent}` : `1px solid ${L.bSubtle}`,
              boxShadow: active ? L.shGlow : 'none',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '14px 14px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Placeholder w={44} h={44} radius={10} tint="primary" icon="fitness_center"/>
                <div style={{ flex: 1 }}>
                  <div style={{ ...T.titleMd, color: L.text }}>{ex.name}</div>
                  <div style={{ ...T.bodySm, color: L.text2 }}>{ex.muscle}</div>
                </div>
                <IconBtn icon="more_horiz" size={32}/>
              </div>

              {/* Set table */}
              <div style={{ padding: '0 14px' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '30px 1fr 1fr 1fr 36px',
                  padding: '4px 0', ...T.labelSm, color: L.text2,
                }}>
                  <span>SET</span><span>WEIGHT</span><span>REPS</span><span>RPE</span><span></span>
                </div>
                {ex.sets.map((s, si) => (
                  <div key={si} style={{
                    display: 'grid', gridTemplateColumns: '30px 1fr 1fr 1fr 36px',
                    alignItems: 'center', padding: '8px 0',
                    borderTop: `1px solid ${L.bSubtle}`,
                    background: s.active ? L.primarySurface : 'transparent',
                    margin: s.active ? '0 -14px' : undefined,
                    paddingLeft: s.active ? 14 : undefined,
                    paddingRight: s.active ? 14 : undefined,
                    borderRadius: s.active ? 6 : 0,
                  }}>
                    <span style={{
                      ...T.mono, fontSize: 13,
                      color: s.warmup ? L.warning : s.active ? L.primary : L.text,
                    }}>{s.warmup ? 'W' : s.n}</span>
                    <span style={{ ...T.mono, color: L.text }}>{s.w} <span style={{ color: L.text3, fontSize: 11 }}>kg</span></span>
                    <span style={{ ...T.mono, color: L.text }}>{s.r}</span>
                    <span style={{ ...T.mono, color: L.text2 }}>{s.done ? 8 : '—'}</span>
                    {s.done ? (
                      <div style={{
                        width: 26, height: 26, borderRadius: 13,
                        background: s.pr ? L.warning : L.primary,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span className="mi fill" style={{ fontSize: 16, color: L.textInv }}>{s.pr ? 'emoji_events' : 'check'}</span>
                      </div>
                    ) : s.active ? (
                      <div style={{
                        width: 26, height: 26, borderRadius: 13,
                        border: `2px solid ${L.primary}`, boxShadow: L.shGlow,
                      }}/>
                    ) : (
                      <div style={{
                        width: 26, height: 26, borderRadius: 13,
                        border: `1px solid ${L.bDefault}`,
                      }}/>
                    )}
                  </div>
                ))}
              </div>

              {active && (
                <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 8 }}>
                  <Btn label="Log set" variant="primary" size="sm" icon="check" style={{ flex: 1 }}
                    onClick={() => onNavigate && onNavigate('rest')}/>
                  <Btn label="Add set" variant="secondary" size="sm" icon="add"/>
                </div>
              )}
              {!active && (
                <div style={{ padding: '6px 14px 12px' }}>
                  <button style={{
                    width: '100%', background: 'transparent', border: 'none',
                    color: L.text2, ...T.labelMd, cursor: 'pointer', padding: '8px 0',
                  }}>+ ADD SET</button>
                </div>
              )}
            </div>
          );
        })}

        {/* Add exercise */}
        <button onClick={() => onNavigate && onNavigate('picker')} style={{
          padding: '16px', borderRadius: 12,
          background: 'transparent', border: `1px dashed ${L.bDefault}`,
          color: L.primary, ...T.titleMd, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <span className="mi" style={{ fontSize: 20 }}>add</span>
          Add exercise
        </button>
      </div>
    </Screen>
  );
}

// 10. Exercise Picker / Library
function ExercisePicker({ onNavigate }) {
  const muscles = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
  const exercises = [
    { name: 'Barbell Bench Press', muscle: 'Chest · Triceps', eq: 'Barbell', pr: '72.5 kg' },
    { name: 'Incline Dumbbell Press', muscle: 'Chest · Shoulders', eq: 'Dumbbell' },
    { name: 'Cable Fly', muscle: 'Chest', eq: 'Cable' },
    { name: 'Push-up', muscle: 'Chest · Core', eq: 'Bodyweight' },
    { name: 'Dumbbell Chest Press', muscle: 'Chest', eq: 'Dumbbell', pr: '28 kg' },
    { name: 'Dips', muscle: 'Chest · Triceps', eq: 'Bodyweight' },
  ];

  return (
    <Screen bg={L.sBase} padBottom={false}>
      <TopBar title="Add Exercise"
        left={<IconBtn icon="close" onClick={() => onNavigate && onNavigate('active')}/>}
        right={<IconBtn icon="tune"/>}
      />

      {/* Search */}
      <div style={{ padding: '0 16px' }}>
        <div style={{
          height: 48, background: L.sHigh, borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
        }}>
          <span className="mi" style={{ fontSize: 20, color: L.text2 }}>search</span>
          <span style={{ ...T.bodyLg, color: L.text3 }}>Search 400+ exercises</span>
        </div>
      </div>

      {/* Chips */}
      <div style={{ padding: '12px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {muscles.map((m, i) => <Chip key={m} label={m} active={i === 1}/>)}
      </div>

      {/* Recent */}
      <SectionLabel>RECENT</SectionLabel>
      <div style={{ padding: '0 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {['Bench', 'Incline DB', 'Cable Fly'].map(n => (
          <div key={n} style={{
            padding: '8px 12px', borderRadius: 10,
            background: L.sHigh, ...T.bodyMd, color: L.text, whiteSpace: 'nowrap',
          }}>{n}</div>
        ))}
      </div>

      <SectionLabel>CHEST</SectionLabel>
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {exercises.map((e, i) => (
          <div key={i} style={{
            padding: 10, borderRadius: 12, background: L.sLow,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Placeholder w={48} h={48} tint={i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'warm' : 'ai'} icon="fitness_center" radius={8}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...T.titleMd, color: L.text }}>{e.name}</div>
              <div style={{ ...T.bodySm, color: L.text2 }}>{e.muscle} · {e.eq}</div>
            </div>
            {e.pr && <div style={{
              padding: '3px 8px', borderRadius: 6, background: L.primarySurface,
              ...T.mono, fontSize: 11, color: L.primary,
            }}>PR {e.pr}</div>}
            <div style={{
              width: 32, height: 32, borderRadius: 16,
              background: L.sHigh, color: L.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="mi" style={{ fontSize: 20 }}>add</span>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

// 11. Rest Timer Overlay — full-screen circular countdown
function RestTimer({ onNavigate }) {
  return (
    <Screen bg={L.sBase} noScroll padBottom={false} style={{ position: 'relative' }}>
      {/* blurred background hint */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(60% 50% at 50% 30%, rgba(0,212,170,0.20), transparent 70%)',
        pointerEvents: 'none',
      }}/>

      {/* Small dim of what's behind */}
      <div style={{ padding: '14px 16px', opacity: 0.4, filter: 'blur(1px)' }}>
        <div style={{ ...T.labelMd, color: L.primary }}>PUSH DAY · UPPER</div>
        <div style={{ ...T.mono, color: L.text, fontSize: 18 }}>00:26:04</div>
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}>
        <div style={{ ...T.labelMd, color: L.primary }}>REST</div>
        <div style={{ ...T.bodySm, color: L.text2, marginTop: 4 }}>After Bench Press · Set 3 · 70 kg × 6 🔥 PR</div>

        {/* Big ring */}
        <div style={{ marginTop: 28, position: 'relative' }}>
          <Ring size={240} stroke={12} value={0.48} color={L.primary} trackColor="rgba(255,255,255,0.06)">
            <div style={{ textAlign: 'center' }}>
              <div style={{ ...T.mono, fontSize: 56, color: L.text, letterSpacing: -2 }}>01:12</div>
              <div style={{ ...T.labelMd, color: L.text2 }}>OF 2:30</div>
            </div>
          </Ring>
          <div style={{
            position: 'absolute', inset: -10, borderRadius: '50%',
            boxShadow: L.shGlow, pointerEvents: 'none',
          }}/>
        </div>

        {/* PR shout */}
        <div style={{
          marginTop: 24, padding: '10px 14px', borderRadius: 12,
          background: L.warnSurface, border: `1px solid rgba(255,176,32,0.3)`,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span className="mi fill" style={{ fontSize: 18, color: L.warning }}>emoji_events</span>
          <span style={{ ...T.titleMd, color: L.text }}>That's a PR, brother.</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24, width: '100%', maxWidth: 320 }}>
          <Btn label="-15s" variant="dark" size="md" style={{ flex: 1 }}/>
          <Btn label="Skip" variant="primary" size="md" icon="skip_next" style={{ flex: 1.5 }}
            onClick={() => onNavigate && onNavigate('active')}/>
          <Btn label="+15s" variant="dark" size="md" style={{ flex: 1 }}/>
        </div>

        {/* Next up */}
        <div style={{
          marginTop: 20, padding: 12, borderRadius: 12, background: L.sContainer,
          width: '100%', maxWidth: 320,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span className="mi" style={{ fontSize: 20, color: L.text2 }}>arrow_forward</span>
          <div style={{ flex: 1 }}>
            <div style={{ ...T.labelSm, color: L.text2 }}>NEXT SET</div>
            <div style={{ ...T.titleMd, color: L.text }}>Bench Press · 72.5 kg × 5</div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

// 12. Post-Workout Summary
function PostWorkout({ onNavigate }) {
  return (
    <Screen bg={L.sBase}>
      {/* celebratory hero */}
      <div style={{
        padding: '32px 20px 28px',
        background: `radial-gradient(80% 100% at 50% 0%, rgba(0,212,170,0.24), transparent 70%), radial-gradient(60% 80% at 80% 40%, rgba(255,176,32,0.18), transparent 70%)`,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ ...T.labelMd, color: L.primary, marginBottom: 8 }}>SESSION COMPLETE</div>
        <h1 style={{
          ...T.displayLg, fontSize: 40, color: L.text, margin: 0, letterSpacing: -1,
        }}>Let's go, <span style={{
          background: `linear-gradient(92deg, ${L.primary}, ${L.warning})`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        }}>Nithish.</span></h1>
        <p style={{ ...T.bodyMd, color: L.text2, marginTop: 8 }}>Push Day · Upper · crushed</p>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'DURATION', val: '48:12', sub: 'min', color: L.text },
          { label: 'VOLUME', val: '5,260', sub: 'kg', color: L.primary },
          { label: 'KCAL', val: '428', sub: '', color: L.warning },
        ].map(s => (
          <Card key={s.label} style={{ padding: 12, textAlign: 'center' }}>
            <div style={{ ...T.labelSm, color: L.text2 }}>{s.label}</div>
            <div style={{ ...T.mono, color: s.color, fontSize: 22, marginTop: 4 }}>{s.val}</div>
            <div style={{ ...T.bodySm, color: L.text2 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* PR banner */}
      <div style={{
        margin: '16px 16px 0', padding: 16, borderRadius: 14,
        background: `linear-gradient(135deg, ${L.warnSurface}, transparent)`,
        border: `1px solid rgba(255,176,32,0.35)`,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 24,
          background: `linear-gradient(135deg, ${L.warning}, #FF7A00)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(255,176,32,0.5)',
        }}>
          <span className="mi fill" style={{ fontSize: 26, color: L.textInv }}>emoji_events</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ ...T.labelMd, color: L.warning }}>NEW PERSONAL RECORD</div>
          <div style={{ ...T.titleMd, color: L.text }}>Bench Press · 72.5 kg × 5</div>
          <div style={{ ...T.bodySm, color: L.text2 }}>+2.5 kg from last PR</div>
        </div>
      </div>

      {/* Exercise breakdown */}
      <SectionLabel>BREAKDOWN</SectionLabel>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { n: 'Bench Press', sets: '4 × 5–10', vol: 1460, pr: true },
          { n: 'Incline DB Press', sets: '3 × 8–10', vol: 960 },
          { n: 'Cable Fly', sets: '3 × 10–12', vol: 510 },
          { n: 'Shoulder Press', sets: '4 × 8', vol: 1120 },
        ].map((e, i) => (
          <Card key={i} style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.titleMd, color: L.text, display: 'flex', alignItems: 'center', gap: 6 }}>
                {e.n}
                {e.pr && <span className="mi fill" style={{ fontSize: 14, color: L.warning }}>emoji_events</span>}
              </div>
              <div style={{ ...T.bodySm, color: L.text2 }}>{e.sets}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...T.mono, color: L.text, fontSize: 13 }}>{e.vol} kg</div>
              <div style={{ ...T.labelSm, color: L.text2 }}>VOLUME</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div style={{ padding: '20px 16px 24px', display: 'flex', gap: 10 }}>
        <Btn label="Share" variant="secondary" size="md" icon="ios_share" style={{ flex: 1 }}/>
        <Btn label="Done" variant="primary" size="md" icon="check"
          onClick={() => onNavigate && onNavigate('home')} style={{ flex: 1.5 }}/>
      </div>
    </Screen>
  );
}

Object.assign(window, { ActiveWorkout, ExercisePicker, RestTimer, PostWorkout });
