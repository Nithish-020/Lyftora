/* Core tabs (4):
   5. Home Dashboard
   6. Workout Templates Library
   7. Nutrition Daily Log
   8. Progress & Analytics
*/

// 5. Home Dashboard
function Dashboard({ onNavigate }) {
  return (
    <Screen bg={L.sBase}>
      {/* Top bar w/ greeting */}
      <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar name="Nithish A" size={40}/>
        <div style={{ flex: 1 }}>
          <div style={{ ...T.bodySm, color: L.text2 }}>Wednesday · Apr 23</div>
          <div style={{ ...T.titleLg, color: L.text }}>Namaste, Nithish</div>
        </div>
        <IconBtn icon="notifications" />
      </div>

      {/* Streak ribbon */}
      <div style={{
        margin: '14px 16px 0', padding: '10px 14px',
        borderRadius: 12, background: L.warnSurface,
        border: `1px solid rgba(255,176,32,0.20)`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span className="mi fill" style={{ fontSize: 20, color: L.warning }}>local_fire_department</span>
        <div style={{ flex: 1 }}>
          <span style={{ ...T.titleMd, color: L.text }}>12 day streak </span>
          <span style={{ ...T.bodySm, color: L.text2 }}>— train today to keep it</span>
        </div>
        <span className="mi" style={{ fontSize: 18, color: L.text2 }}>chevron_right</span>
      </div>

      {/* Today's workout hero card */}
      <div style={{
        margin: '14px 16px 0', borderRadius: 16, overflow: 'hidden',
        background: `linear-gradient(135deg, ${L.sContainer}, ${L.sHigh})`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 160, height: 160,
          borderRadius: '50%', background: L.primarySurface, filter: 'blur(30px)',
        }}/>
        <div style={{ padding: 16, position: 'relative' }}>
          <div style={{ ...T.labelMd, color: L.primary }}>TODAY'S SESSION</div>
          <div style={{ ...T.headlineLg, color: L.text, marginTop: 4, letterSpacing: -0.3 }}>Push Day · Upper</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10, ...T.bodySm, color: L.text2 }}>
            <span><span className="mi" style={{ fontSize: 13, verticalAlign: -2 }}>schedule</span> 48 min</span>
            <span><span className="mi" style={{ fontSize: 13, verticalAlign: -2 }}>fitness_center</span> 6 exercises</span>
            <span><span className="mi" style={{ fontSize: 13, verticalAlign: -2 }}>local_fire_department</span> 420 kcal</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <Btn label="Start" variant="primary" size="md" icon="play_arrow"
              onClick={() => onNavigate && onNavigate('active')} style={{ flex: 1 }}/>
            <Btn label="Preview" variant="secondary" size="md" />
          </div>
        </div>
      </div>

      {/* Nutrition ring + macros */}
      <SectionLabel action={<span style={{ ...T.labelSm, color: L.primary }}>VIEW DIARY</span>}>NUTRITION</SectionLabel>
      <div style={{ margin: '0 16px' }}>
        <Card>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Ring size={88} stroke={9} value={0.62} color={L.primary}>
              <div style={{ ...T.mono, color: L.text, fontSize: 16 }}>1,820</div>
              <div style={{ ...T.labelSm, color: L.text2 }}>/ 2,500</div>
            </Ring>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <MacroBar label="PROTEIN" value={112} goal={160} color={L.primary} sub="g"/>
              <MacroBar label="CARBS" value={182} goal={280} color={L.warning} sub="g"/>
              <MacroBar label="FAT" value={58} goal={78} color={L.secondary} sub="g"/>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Coach CTA */}
      <div style={{ margin: '14px 16px 0' }}>
        <div onClick={() => onNavigate && onNavigate('coach')} style={{
          borderRadius: 14, padding: 14,
          background: L.aiSurface, border: `1px solid ${L.bAI}`,
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 20,
            background: `radial-gradient(circle at 30% 30%, #a999ff, ${L.secondary})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: L.shGlowAI,
          }}>
            <span className="mi fill" style={{ fontSize: 20, color: '#fff' }}>auto_awesome</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...T.titleMd, color: L.secondary }}>Ask Coach</div>
            <div style={{ ...T.bodySm, color: L.text2 }}>"Swap today's bench for dumbbells?"</div>
          </div>
          <span className="mi" style={{ fontSize: 20, color: L.secondary }}>arrow_forward</span>
        </div>
      </div>

      {/* Quick stats */}
      <SectionLabel>THIS WEEK</SectionLabel>
      <div style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card style={{ padding: 12 }}>
          <div style={{ ...T.labelSm, color: L.text2 }}>SESSIONS</div>
          <div style={{ ...T.displayMd, color: L.text, fontSize: 26, marginTop: 2 }}>3 <span style={{ ...T.bodyMd, color: L.text2 }}>/ 5</span></div>
          <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
            {[1,1,1,0,0].map((v,i) => (
              <div key={i} style={{
                flex: 1, height: 5, borderRadius: 2,
                background: v ? L.primary : 'rgba(255,255,255,0.06)',
              }}/>
            ))}
          </div>
        </Card>
        <Card style={{ padding: 12 }}>
          <div style={{ ...T.labelSm, color: L.text2 }}>VOLUME</div>
          <div style={{ ...T.displayMd, color: L.text, fontSize: 26, marginTop: 2 }}>18.4k <span style={{ ...T.bodyMd, color: L.primary }}>↑8%</span></div>
          <div style={{ ...T.bodySm, color: L.text2, marginTop: 6 }}>kg lifted vs last wk</div>
        </Card>
      </div>

      <TabBar active="home" onNavigate={onNavigate}/>
    </Screen>
  );
}

// 6. Workout templates library
function WorkoutTemplates({ onNavigate }) {
  const cats = ['All', 'Push', 'Pull', 'Legs', 'Full', 'Mobility'];
  const templates = [
    { name: 'Push Day · Upper', muscles: ['Chest','Shoulders','Triceps'], dur: '48m', ex: 6, tag: 'POPULAR', color: L.primary },
    { name: 'Pull Day · Back', muscles: ['Back','Biceps','Rear delts'], dur: '52m', ex: 7, tag: null },
    { name: 'Leg Builder', muscles: ['Quads','Hams','Glutes','Calves'], dur: '55m', ex: 8, tag: 'PR CHANCE', color: L.warning },
    { name: 'Home · Bodyweight', muscles: ['Full body'], dur: '22m', ex: 5, tag: 'NO KIT', color: L.secondary },
    { name: 'Cricket Power', muscles: ['Rotational','Core','Legs'], dur: '40m', ex: 6, tag: 'SPORT', color: L.secondary },
  ];

  return (
    <Screen bg={L.sBase}>
      <TopBar title="Workouts" subtitle="Your template library"
        left={<IconBtn icon="tune"/>}
        right={<IconBtn icon="add" bg={L.primary} color={L.textInv}/>}
      />

      {/* chips */}
      <div style={{ padding: '8px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {cats.map((c, i) => <Chip key={c} label={c} active={i === 0}/>)}
      </div>

      {/* featured */}
      <div style={{ margin: '6px 16px 0', padding: 16, borderRadius: 16,
        background: `linear-gradient(140deg, ${L.aiSurface}, ${L.sContainer})`,
        border: `1px solid ${L.bAI}`, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ ...T.labelMd, color: L.secondary }}>AI PICK · TODAY</div>
        <div style={{ ...T.headlineMd, color: L.text, marginTop: 4 }}>Push Day · Upper</div>
        <div style={{ ...T.bodySm, color: L.text2, marginTop: 2 }}>Based on yesterday's back session + recovery</div>
        <div style={{ marginTop: 10 }}>
          <Btn label="Load workout" variant="ai" size="sm" trailing="arrow_forward"/>
        </div>
      </div>

      <SectionLabel>ALL TEMPLATES</SectionLabel>
      <div style={{ margin: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {templates.map((t, i) => (
          <Card key={i} style={{ padding: 14, display: 'flex', gap: 12 }}
            onClick={() => i === 0 && onNavigate && onNavigate('active')}>
            <Placeholder w={56} h={56} tint={i % 2 ? 'warm' : 'primary'} icon="fitness_center" radius={10}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ ...T.titleMd, color: L.text }}>{t.name}</span>
                {t.tag && <span style={{
                  ...T.labelSm, color: t.color || L.primary,
                  padding: '2px 6px', borderRadius: 4,
                  background: `${t.color || L.primary}22`,
                }}>{t.tag}</span>}
              </div>
              <div style={{ ...T.bodySm, color: L.text2, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.muscles.join(' · ')}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, ...T.mono, fontSize: 11, color: L.text2 }}>
                <span>{t.dur}</span>
                <span>·</span>
                <span>{t.ex} exercises</span>
              </div>
            </div>
            <span className="mi" style={{ fontSize: 20, color: L.text2, alignSelf: 'center' }}>chevron_right</span>
          </Card>
        ))}
      </div>

      <TabBar active="workout" onNavigate={onNavigate}/>
    </Screen>
  );
}

// 7. Nutrition Daily Log
function Nutrition({ onNavigate }) {
  const meals = [
    { type: 'BREAKFAST', time: '8:20 AM', items: [
      { name: 'Masala Oats', serving: '1 bowl', kcal: 280 },
      { name: 'Boiled Eggs', serving: '3 pc', kcal: 215 },
    ], kcal: 495 },
    { type: 'LUNCH', time: '1:40 PM', items: [
      { name: 'Chicken Curry', serving: '200g', kcal: 320, regional: 'चिकन करी' },
      { name: 'Brown Rice', serving: '1 cup', kcal: 218 },
      { name: 'Moong Dal', serving: '1 bowl', kcal: 198 },
    ], kcal: 736 },
    { type: 'SNACK', time: null, items: [], kcal: 0 },
    { type: 'DINNER', time: null, items: [], kcal: 0 },
  ];

  return (
    <Screen bg={L.sBase}>
      <TopBar title="Diet Diary" subtitle="Wed, Apr 23"
        left={<IconBtn icon="calendar_today"/>}
        right={<IconBtn icon="bar_chart"/>}
      />

      {/* Macro ring hero */}
      <div style={{ margin: '4px 16px 0' }}>
        <Card style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Ring size={110} stroke={10} value={0.62} color={L.primary}>
              <div style={{ ...T.mono, color: L.text, fontSize: 22 }}>1,820</div>
              <div style={{ ...T.labelSm, color: L.text2 }}>OF 2,500</div>
            </Ring>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.labelMd, color: L.primary }}>680 KCAL LEFT</div>
              <div style={{ ...T.bodySm, color: L.text2, marginTop: 2 }}>On track for bulk goal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                <MacroBar label="PROTEIN" value={112} goal={160} color={L.primary} sub="g"/>
                <MacroBar label="CARBS" value={182} goal={280} color={L.warning} sub="g"/>
                <MacroBar label="FAT" value={58} goal={78} color={L.secondary} sub="g"/>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <SectionLabel action={<span style={{ ...T.labelSm, color: L.primary }}>+ QUICK LOG</span>}>MEALS</SectionLabel>

      <div style={{ margin: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {meals.map((m, i) => {
          const empty = m.items.length === 0;
          return (
            <Card key={i} style={{ padding: 14 }}
              onClick={() => empty && onNavigate && onNavigate('foodSearch')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...T.labelMd, color: L.text }}>{m.type}</span>
                {m.time && <span style={{ ...T.labelSm, color: L.text2 }}>{m.time}</span>}
                <div style={{ flex: 1 }}/>
                {!empty && <span style={{ ...T.mono, color: L.primary, fontSize: 13 }}>{m.kcal} kcal</span>}
              </div>
              {empty ? (
                <div style={{
                  marginTop: 10, padding: 12, borderRadius: 10,
                  border: `1px dashed ${L.bDefault}`,
                  display: 'flex', alignItems: 'center', gap: 8,
                  color: L.text2, ...T.bodySm,
                }}>
                  <span className="mi" style={{ fontSize: 18 }}>add</span>
                  Log {m.type.toLowerCase()}
                </div>
              ) : (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {m.items.map((it, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: 2, background: L.primary }}/>
                      <span style={{ ...T.bodyMd, color: L.text, flex: 1 }}>{it.name}
                        {it.regional && <span style={{ ...T.bodySm, color: L.text2, marginLeft: 6 }}>· {it.regional}</span>}
                      </span>
                      <span style={{ ...T.bodySm, color: L.text2 }}>{it.serving}</span>
                      <span style={{ ...T.mono, fontSize: 11, color: L.text2, width: 50, textAlign: 'right' }}>{it.kcal}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <TabBar active="diet" onNavigate={onNavigate}/>
    </Screen>
  );
}

// 8. Progress & Analytics
function Progress({ onNavigate }) {
  // faux bar chart data (weekly volume)
  const weeks = [0.4, 0.55, 0.48, 0.72, 0.68, 0.82, 0.9];
  const prs = [
    { ex: 'Bench Press', w: 72.5, r: 5, date: '2d ago', up: true },
    { ex: 'Squat', w: 100, r: 3, date: '1w ago', up: true },
    { ex: 'Deadlift', w: 120, r: 5, date: '2w ago', up: false },
  ];

  return (
    <Screen bg={L.sBase}>
      <TopBar title="Progress" subtitle="Last 7 weeks"
        left={<IconBtn icon="filter_list"/>}
        right={<IconBtn icon="share"/>}
      />

      {/* Hero weekly stat */}
      <div style={{ margin: '4px 16px 0' }}>
        <Card style={{ padding: 16, background: `linear-gradient(135deg, ${L.sContainer}, ${L.sHigh})` }}>
          <div style={{ ...T.labelMd, color: L.text2 }}>TOTAL VOLUME</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span style={{ ...T.displayLg, color: L.text, letterSpacing: -1 }}>127.8k</span>
            <span style={{ ...T.bodyMd, color: L.text2 }}>kg · last 7 wk</span>
          </div>
          <div style={{ ...T.bodySm, color: L.primary, marginTop: 2 }}>↑ 12% vs previous period</div>

          {/* mini bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginTop: 14 }}>
            {weeks.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  height: `${v * 100}%`,
                  background: i === weeks.length - 1
                    ? `linear-gradient(180deg, ${L.primary}, rgba(0,212,170,0.3))`
                    : 'rgba(255,255,255,0.12)',
                  borderRadius: '4px 4px 2px 2px',
                  boxShadow: i === weeks.length - 1 ? L.shGlow : 'none',
                }}/>
                <span style={{ ...T.labelSm, fontSize: 9, color: L.text2 }}>W{i+1}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* PR list */}
      <SectionLabel action={<span style={{ ...T.labelSm, color: L.primary }}>ALL →</span>}>PERSONAL RECORDS</SectionLabel>
      <div style={{ margin: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {prs.map((p, i) => (
          <Card key={i} style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: p.up ? L.primarySurface : L.warnSurface,
              color: p.up ? L.primary : L.warning,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="mi fill" style={{ fontSize: 20 }}>{p.up ? 'arrow_upward' : 'emoji_events'}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.titleMd, color: L.text }}>{p.ex}</div>
              <div style={{ ...T.bodySm, color: L.text2 }}>{p.date}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...T.mono, color: L.primary, fontSize: 16 }}>{p.w} kg</div>
              <div style={{ ...T.labelSm, color: L.text2 }}>× {p.r}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Body */}
      <SectionLabel>BODY</SectionLabel>
      <div style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card style={{ padding: 12 }}>
          <div style={{ ...T.labelSm, color: L.text2 }}>WEIGHT</div>
          <div style={{ ...T.displayMd, color: L.text, fontSize: 24, marginTop: 2 }}>74.2 <span style={{ ...T.bodyMd, color: L.text2 }}>kg</span></div>
          <div style={{ ...T.bodySm, color: L.primary }}>+1.2 this month</div>
        </Card>
        <Card style={{ padding: 12 }}>
          <div style={{ ...T.labelSm, color: L.text2 }}>BODY FAT</div>
          <div style={{ ...T.displayMd, color: L.text, fontSize: 24, marginTop: 2 }}>17.8<span style={{ ...T.bodyMd, color: L.text2 }}>%</span></div>
          <div style={{ ...T.bodySm, color: L.text2 }}>Est · DEXA</div>
        </Card>
      </div>

      <TabBar active="progress" onNavigate={onNavigate}/>
    </Screen>
  );
}

Object.assign(window, { Dashboard, WorkoutTemplates, Nutrition, Progress });
