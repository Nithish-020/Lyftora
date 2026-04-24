/* LIGHT Workout flow (4) — HERO.  Active · Picker · Rest · Summary */

function LActiveWorkout({ onNavigate }) {
  const exercises = [
    { name: 'Barbell Bench Press', muscle: 'Chest',
      sets: [
        { n: 1, w: 40, r: 10, done: true, warmup: true },
        { n: 2, w: 60, r: 8, done: true },
        { n: 3, w: 70, r: 6, done: true, pr: true },
        { n: 4, w: 72.5, r: 5, active: true },
      ]},
    { name: 'Incline Dumbbell Press', muscle: 'Chest · Shoulders',
      sets: [{ n:1, w:20, r:10 }, { n:2, w:22.5, r:8 }, { n:3, w:22.5, r:8 }]},
    { name: 'Cable Fly', muscle: 'Chest',
      sets: [{ n:1, w:15, r:12 }, { n:2, w:15, r:12 }, { n:3, w:17.5, r:10 }]},
  ];

  return (
    <LScreen bg={LL.bg} padBottom={false}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: LL.glass, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        padding: '10px 16px 12px',
        borderBottom: `1px solid ${LL.bSubtle}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LIconBtn icon="close"/>
          <div style={{ flex: 1 }}>
            <div style={{ ...TL.labelMd, color: LL.text2 }}>PUSH DAY · UPPER</div>
            <div style={{ ...TL.monoLg, color: LL.ink, fontSize: 22, letterSpacing: 0.5 }}>00:24:18</div>
          </div>
          <LBtn label="Finish" variant="primary" size="sm"
            onClick={() => onNavigate && onNavigate('summary')}/>
        </div>

        <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
          {[1,1,1,0.5,0,0].map((v,i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: v === 1 ? LL.ink : v > 0 ? `linear-gradient(90deg, ${LL.ink} 50%, rgba(14,14,18,0.10) 50%)` : 'rgba(14,14,18,0.10)',
            }}/>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, ...TL.labelSm, color: LL.text2 }}>
          <span>EX 1 / 6</span><span>VOL 3,260 kg</span><span style={{ color: LL.coral }}>3 PRs</span>
        </div>
      </div>

      <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {exercises.map((ex, idx) => {
          const active = idx === 0;
          return (
            <div key={idx} style={{
              borderRadius: 20,
              background: active ? '#fff' : LL.bg2,
              border: active ? `1.5px solid ${LL.ink}` : `1px solid ${LL.bSubtle}`,
              boxShadow: active ? LL.shMd : 'none',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '14px 14px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <LPlaceholder w={44} h={44} radius={12} tint={active ? 'lime' : 'cream'} icon="fitness_center"/>
                <div style={{ flex: 1 }}>
                  <div style={{ ...TL.titleMd, color: LL.ink }}>{ex.name}</div>
                  <div style={{ ...TL.bodySm, color: LL.text2 }}>{ex.muscle}</div>
                </div>
                <LIconBtn icon="more_horiz" size={32}/>
              </div>

              <div style={{ padding: '0 14px' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '30px 1fr 1fr 1fr 36px',
                  padding: '4px 0', ...TL.labelSm, color: LL.text2,
                }}>
                  <span>SET</span><span>WEIGHT</span><span>REPS</span><span>RPE</span><span></span>
                </div>
                {ex.sets.map((s, si) => (
                  <div key={si} style={{
                    display: 'grid', gridTemplateColumns: '30px 1fr 1fr 1fr 36px',
                    alignItems: 'center', padding: '10px 0',
                    borderTop: `1px solid ${LL.bSubtle}`,
                    background: s.active ? LL.primarySurface : 'transparent',
                    margin: s.active ? '0 -14px' : undefined,
                    paddingLeft: s.active ? 14 : undefined,
                    paddingRight: s.active ? 14 : undefined,
                    borderRadius: s.active ? 8 : 0,
                  }}>
                    <span style={{ ...TL.mono, fontSize: 13, color: s.warmup ? LL.coral : LL.ink }}>{s.warmup ? 'W' : s.n}</span>
                    <span style={{ ...TL.mono, color: LL.ink }}>{s.w} <span style={{ color: LL.text2, fontSize: 11 }}>kg</span></span>
                    <span style={{ ...TL.mono, color: LL.ink }}>{s.r}</span>
                    <span style={{ ...TL.mono, color: LL.text2 }}>{s.done ? 8 : '—'}</span>
                    {s.done ? (
                      <div style={{
                        width: 26, height: 26, borderRadius: 13,
                        background: s.pr ? LL.coral : LL.ink,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span className="mi fill" style={{ fontSize: 16, color: s.pr ? '#fff' : LL.primary }}>{s.pr ? 'emoji_events' : 'check'}</span>
                      </div>
                    ) : s.active ? (
                      <div style={{ width: 26, height: 26, borderRadius: 13, border: `2px solid ${LL.ink}`, boxShadow: LL.shGlow }}/>
                    ) : (
                      <div style={{ width: 26, height: 26, borderRadius: 13, border: `1px solid ${LL.bDefault}` }}/>
                    )}
                  </div>
                ))}
              </div>

              {active ? (
                <div style={{ padding: '12px 14px 14px', display: 'flex', gap: 8 }}>
                  <LBtn label="Log set" variant="ink" size="sm" icon="check" style={{ flex: 1 }}
                    onClick={() => onNavigate && onNavigate('rest')}/>
                  <LBtn label="Add set" variant="secondary" size="sm" icon="add"/>
                </div>
              ) : (
                <div style={{ padding: '6px 14px 12px' }}>
                  <button style={{
                    width: '100%', background: 'transparent', border: 'none',
                    color: LL.text2, ...TL.labelMd, cursor: 'pointer', padding: '8px 0',
                  }}>+ ADD SET</button>
                </div>
              )}
            </div>
          );
        })}

        <button onClick={() => onNavigate && onNavigate('picker')} style={{
          padding: 16, borderRadius: 16,
          background: 'transparent', border: `1px dashed ${LL.bDefault}`,
          color: LL.ink, ...TL.titleMd, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <span className="mi" style={{ fontSize: 20 }}>add</span> Add exercise
        </button>
      </div>
    </LScreen>
  );
}

function LExercisePicker({ onNavigate }) {
  const muscles = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
  const exercises = [
    { name: 'Barbell Bench Press', muscle: 'Chest · Triceps', eq: 'Barbell', pr: '72.5 kg' },
    { name: 'Incline Dumbbell Press', muscle: 'Chest · Shoulders', eq: 'Dumbbell' },
    { name: 'Cable Fly', muscle: 'Chest', eq: 'Cable' },
    { name: 'Push-up', muscle: 'Chest · Core', eq: 'Bodyweight' },
    { name: 'Dumbbell Chest Press', muscle: 'Chest', eq: 'Dumbbell', pr: '28 kg' },
    { name: 'Dips', muscle: 'Chest · Triceps', eq: 'Bodyweight' },
  ];
  const tints = ['lime','coral','violet','sky','cream'];

  return (
    <LScreen bg={LL.bg} padBottom={false}>
      <LTopBar title="Add Exercise"
        left={<LIconBtn icon="close" onClick={() => onNavigate && onNavigate('active')}/>}
        right={<LIconBtn icon="tune"/>}
      />

      <div style={{ padding: '0 16px' }}>
        <div style={{
          height: 50, background: '#fff', borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px',
          border: `1px solid ${LL.bSubtle}`,
        }}>
          <span className="mi" style={{ fontSize: 20, color: LL.text2 }}>search</span>
          <span style={{ ...TL.bodyLg, color: LL.text2 }}>Search 400+ exercises</span>
        </div>
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {muscles.map((m, i) => <LChip key={m} label={m} active={i === 1}/>)}
      </div>

      <LSectionLabel>RECENT</LSectionLabel>
      <div style={{ padding: '0 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {['Bench', 'Incline DB', 'Cable Fly'].map(n => (
          <div key={n} style={{
            padding: '8px 14px', borderRadius: 999,
            background: '#fff', border: `1px solid ${LL.bSubtle}`,
            ...TL.bodyMd, color: LL.ink, whiteSpace: 'nowrap',
          }}>{n}</div>
        ))}
      </div>

      <LSectionLabel>CHEST</LSectionLabel>
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {exercises.map((e, i) => (
          <div key={i} style={{
            padding: 10, borderRadius: 14, background: '#fff', border: `1px solid ${LL.bSubtle}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <LPlaceholder w={48} h={48} tint={tints[i % 5]} icon="fitness_center" radius={10}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...TL.titleMd, color: LL.ink }}>{e.name}</div>
              <div style={{ ...TL.bodySm, color: LL.text2 }}>{e.muscle} · {e.eq}</div>
            </div>
            {e.pr && <div style={{
              padding: '3px 8px', borderRadius: 999, background: LL.primary,
              ...TL.mono, fontSize: 10, color: LL.ink,
            }}>PR {e.pr}</div>}
            <div style={{
              width: 32, height: 32, borderRadius: 16,
              background: LL.ink, color: LL.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="mi" style={{ fontSize: 18 }}>add</span>
            </div>
          </div>
        ))}
      </div>
    </LScreen>
  );
}

function LRestTimer({ onNavigate }) {
  return (
    <LScreen bg={LL.bg} noScroll padBottom={false} style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(60% 50% at 50% 30%, rgba(214,255,77,0.40), transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div style={{ padding: '14px 16px', opacity: 0.35 }}>
        <div style={{ ...TL.labelMd, color: LL.text2 }}>PUSH DAY · UPPER</div>
        <div style={{ ...TL.mono, color: LL.ink, fontSize: 18 }}>00:26:04</div>
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}>
        <div style={{ ...TL.labelMd, color: LL.ink }}>REST</div>
        <div style={{ ...TL.bodySm, color: LL.text2, marginTop: 4, textAlign: 'center' }}>
          After Bench Press · Set 3 · 70 kg × 6 <span style={{ color: LL.coral }}>🔥 PR</span>
        </div>

        <div style={{ marginTop: 28, position: 'relative' }}>
          <LRing size={240} stroke={12} value={0.48} color={LL.ink} trackColor="rgba(14,14,18,0.08)">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: FL.serif, fontSize: 72, color: LL.ink, letterSpacing: -3, lineHeight: 1 }}>01:12</div>
              <div style={{ ...TL.labelMd, color: LL.text2, marginTop: 4 }}>OF 2:30</div>
            </div>
          </LRing>
          <div style={{
            position: 'absolute', inset: -8, borderRadius: '50%',
            boxShadow: LL.shGlow, pointerEvents: 'none',
          }}/>
        </div>

        <div style={{
          marginTop: 24, padding: '10px 16px', borderRadius: 999,
          background: LL.coral, color: '#fff',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          boxShadow: LL.shCoral,
        }}>
          <span className="mi fill" style={{ fontSize: 18 }}>emoji_events</span>
          <span style={{ fontFamily: FL.serif, fontSize: 18, letterSpacing: -0.3 }}>
            That's a <LEm color="#fff">PR</LEm>, brother.
          </span>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24, width: '100%', maxWidth: 320 }}>
          <LBtn label="−15s" variant="cream" size="md" style={{ flex: 1 }}/>
          <LBtn label="Skip" variant="ink" size="md" icon="skip_next" style={{ flex: 1.5 }}
            onClick={() => onNavigate && onNavigate('active')}/>
          <LBtn label="+15s" variant="cream" size="md" style={{ flex: 1 }}/>
        </div>

        <div style={{
          marginTop: 18, padding: 14, borderRadius: 16, background: '#fff',
          border: `1px solid ${LL.bSubtle}`,
          width: '100%', maxWidth: 320,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span className="mi" style={{ fontSize: 20, color: LL.text2 }}>arrow_forward</span>
          <div style={{ flex: 1 }}>
            <div style={{ ...TL.labelSm, color: LL.text2 }}>NEXT SET</div>
            <div style={{ ...TL.titleMd, color: LL.ink }}>Bench Press · 72.5 kg × 5</div>
          </div>
        </div>
      </div>
    </LScreen>
  );
}

function LPostWorkout({ onNavigate }) {
  return (
    <LScreen bg={LL.bg}>
      <div style={{
        padding: '32px 20px 28px',
        background: `
          radial-gradient(80% 100% at 50% 0%, rgba(214,255,77,0.55), transparent 70%),
          radial-gradient(60% 80% at 80% 40%, rgba(255,90,60,0.35), transparent 70%)`,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ ...TL.labelMd, color: LL.ink, marginBottom: 8 }}>SESSION COMPLETE</div>
        <h1 style={{
          fontFamily: FL.serif, fontWeight: 400, fontSize: 48, color: LL.ink,
          margin: 0, letterSpacing: -1.5, lineHeight: 0.95,
        }}>
          Let's go, <LEm>Nithish.</LEm>
        </h1>
        <p style={{ ...TL.bodyMd, color: LL.text2, marginTop: 10 }}>Push Day · Upper · crushed</p>
      </div>

      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'DURATION', val: '48:12', sub: 'min', color: LL.ink },
          { label: 'VOLUME', val: '5,260', sub: 'kg', color: LL.ink },
          { label: 'KCAL', val: '428', sub: '', color: LL.coral },
        ].map(s => (
          <LCard key={s.label} style={{ padding: 14, textAlign: 'center' }}>
            <div style={{ ...TL.labelSm, color: LL.text2 }}>{s.label}</div>
            <div style={{ fontFamily: FL.serif, fontSize: 28, color: s.color, marginTop: 2, letterSpacing: -0.8 }}>{s.val}</div>
            <div style={{ ...TL.bodySm, color: LL.text2 }}>{s.sub}</div>
          </LCard>
        ))}
      </div>

      <div style={{
        margin: '16px 16px 0', padding: 18, borderRadius: 20,
        background: LL.ink, color: LL.bg,
        display: 'flex', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -20, right: -20, width: 120, height: 120,
          borderRadius: '50%', background: LL.coral, filter: 'blur(40px)', opacity: 0.6,
        }}/>
        <div style={{
          width: 52, height: 52, borderRadius: 16,
          background: LL.coral, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: LL.shCoral, flexShrink: 0, position: 'relative',
        }}>
          <span className="mi fill" style={{ fontSize: 28, color: '#fff' }}>emoji_events</span>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ ...TL.labelMd, color: LL.coral }}>NEW PERSONAL RECORD</div>
          <div style={{ fontFamily: FL.serif, fontSize: 22, color: LL.bg, letterSpacing: -0.3 }}>Bench Press · 72.5 kg × 5</div>
          <div style={{ ...TL.bodySm, color: 'rgba(244,239,228,0.70)' }}>+2.5 kg from last PR</div>
        </div>
      </div>

      <LSectionLabel>BREAKDOWN</LSectionLabel>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { n: 'Bench Press', sets: '4 × 5–10', vol: 1460, pr: true },
          { n: 'Incline DB Press', sets: '3 × 8–10', vol: 960 },
          { n: 'Cable Fly', sets: '3 × 10–12', vol: 510 },
          { n: 'Shoulder Press', sets: '4 × 8', vol: 1120 },
        ].map((e, i) => (
          <LCard key={i} style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ ...TL.titleMd, color: LL.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                {e.n}
                {e.pr && <span className="mi fill" style={{ fontSize: 14, color: LL.coral }}>emoji_events</span>}
              </div>
              <div style={{ ...TL.bodySm, color: LL.text2 }}>{e.sets}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...TL.mono, color: LL.ink, fontSize: 13 }}>{e.vol} kg</div>
              <div style={{ ...TL.labelSm, color: LL.text2 }}>VOLUME</div>
            </div>
          </LCard>
        ))}
      </div>

      <div style={{ padding: '20px 16px 24px', display: 'flex', gap: 10 }}>
        <LBtn label="Share" variant="secondary" size="md" icon="ios_share" style={{ flex: 1 }}/>
        <LBtn label="Done" variant="ink" size="md" icon="check"
          onClick={() => onNavigate && onNavigate('home')} style={{ flex: 1.5 }}/>
      </div>
    </LScreen>
  );
}

Object.assign(window, { LActiveWorkout, LExercisePicker, LRestTimer, LPostWorkout });
