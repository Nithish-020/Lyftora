/* LIGHT Core Tabs (4): Dashboard · Templates · Nutrition · Progress */

// 5. Home Dashboard
function LDashboard({ onNavigate }) {
  return (
    <LScreen bg={LL.bg}>
      <div style={{ padding: '10px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <LAvatar name="Nithish A" size={40} tone="ink"/>
        <div style={{ flex: 1 }}>
          <div style={{ ...TL.labelSm, color: LL.text2 }}>WED · APR 23</div>
          <div style={{ fontFamily: FL.serif, fontSize: 22, color: LL.ink, letterSpacing: -0.4, lineHeight: 1.1 }}>
            Namaste, <LEm>Nithish</LEm>
          </div>
        </div>
        <LIconBtn icon="notifications" />
      </div>

      {/* Streak ribbon */}
      <div style={{
        margin: '14px 16px 0', padding: '12px 14px',
        borderRadius: 16, background: LL.coralSurface,
        border: `1px solid ${LL.bCoral}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span className="mi fill" style={{ fontSize: 22, color: LL.coral }}>local_fire_department</span>
        <div style={{ flex: 1 }}>
          <span style={{ ...TL.titleMd, color: LL.ink }}>12 day streak </span>
          <span style={{ ...TL.bodySm, color: LL.text2 }}>— train today to keep it</span>
        </div>
        <span className="mi" style={{ fontSize: 18, color: LL.text2 }}>chevron_right</span>
      </div>

      {/* Today's workout hero card */}
      <div style={{
        margin: '12px 16px 0', borderRadius: 22, overflow: 'hidden',
        background: LL.ink, color: LL.bg, position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: -50, right: -40, width: 180, height: 180,
          borderRadius: '50%', background: LL.primary, filter: 'blur(48px)', opacity: 0.5,
        }}/>
        <div style={{ padding: 18, position: 'relative' }}>
          <div style={{ ...TL.labelMd, color: LL.primary }}>TODAY'S SESSION</div>
          <div style={{ fontFamily: FL.serif, fontSize: 30, color: LL.bg, marginTop: 4, letterSpacing: -0.5, lineHeight: 1 }}>
            Push Day · <LEm color={LL.primary}>Upper</LEm>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 10, ...TL.bodySm, color: 'rgba(244,239,228,0.70)' }}>
            <span><span className="mi" style={{ fontSize: 13, verticalAlign: -2 }}>schedule</span> 48 min</span>
            <span><span className="mi" style={{ fontSize: 13, verticalAlign: -2 }}>fitness_center</span> 6 ex</span>
            <span><span className="mi" style={{ fontSize: 13, verticalAlign: -2 }}>local_fire_department</span> 420 kcal</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <LBtn label="Start" variant="primary" size="md" icon="play_arrow"
              onClick={() => onNavigate && onNavigate('active')} style={{ flex: 1 }}/>
            <LBtn label="Preview" variant="secondary" size="md"
              style={{ color: LL.bg, borderColor: 'rgba(244,239,228,0.30)' }}/>
          </div>
        </div>
      </div>

      {/* Nutrition */}
      <LSectionLabel action={<span style={{ ...TL.labelSm, color: LL.ink, textDecoration: 'underline' }}>VIEW DIARY</span>}>NUTRITION</LSectionLabel>
      <div style={{ margin: '0 16px' }}>
        <LCard>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <LRing size={88} stroke={9} value={0.62} color={LL.ink}>
              <div style={{ ...TL.mono, color: LL.ink, fontSize: 16 }}>1,820</div>
              <div style={{ ...TL.labelSm, color: LL.text2 }}>/ 2,500</div>
            </LRing>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <LMacroBar label="PROTEIN" value={112} goal={160} color={LL.ink} sub="g"/>
              <LMacroBar label="CARBS" value={182} goal={280} color={LL.coral} sub="g"/>
              <LMacroBar label="FAT" value={58} goal={78} color={LL.violet} sub="g"/>
            </div>
          </div>
        </LCard>
      </div>

      {/* AI Coach CTA */}
      <div style={{ margin: '14px 16px 0' }}>
        <div onClick={() => onNavigate && onNavigate('coach')} style={{
          borderRadius: 18, padding: 14,
          background: LL.aiSurface, border: `1px solid ${LL.bAI}`,
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 21,
            background: `radial-gradient(circle at 30% 30%, #c9b6ff, ${LL.violet})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: LL.shGlowAI,
          }}>
            <span className="mi fill" style={{ fontSize: 20, color: '#fff' }}>auto_awesome</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...TL.titleMd, color: LL.violet }}>Ask Coach</div>
            <div style={{ ...TL.bodySm, color: LL.text2 }}>"Swap today's bench for dumbbells?"</div>
          </div>
          <span className="mi" style={{ fontSize: 20, color: LL.violet }}>arrow_forward</span>
        </div>
      </div>

      {/* Quick stats */}
      <LSectionLabel>THIS WEEK</LSectionLabel>
      <div style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <LCard style={{ padding: 14 }}>
          <div style={{ ...TL.labelSm, color: LL.text2 }}>SESSIONS</div>
          <div style={{ fontFamily: FL.serif, fontSize: 30, color: LL.ink, marginTop: 2, letterSpacing: -0.8 }}>
            3 <span style={{ ...TL.bodyMd, color: LL.text2 }}>/ 5</span>
          </div>
          <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
            {[1,1,1,0,0].map((v,i) => (
              <div key={i} style={{ flex: 1, height: 5, borderRadius: 2, background: v ? LL.ink : 'rgba(14,14,18,0.08)' }}/>
            ))}
          </div>
        </LCard>
        <LCard style={{ padding: 14 }}>
          <div style={{ ...TL.labelSm, color: LL.text2 }}>VOLUME</div>
          <div style={{ fontFamily: FL.serif, fontSize: 30, color: LL.ink, marginTop: 2, letterSpacing: -0.8 }}>
            18.4k <span style={{ ...TL.bodyMd, color: LL.coral }}>↑8%</span>
          </div>
          <div style={{ ...TL.bodySm, color: LL.text2, marginTop: 4 }}>kg lifted vs last wk</div>
        </LCard>
      </div>

      <LTabBar active="home" onNavigate={onNavigate}/>
    </LScreen>
  );
}

// 6. Workout Templates
function LWorkoutTemplates({ onNavigate }) {
  const cats = ['All', 'Push', 'Pull', 'Legs', 'Full', 'Mobility'];
  const templates = [
    { name: 'Push Day · Upper', muscles: ['Chest','Shoulders','Triceps'], dur: '48m', ex: 6, tag: 'POPULAR', tint: 'lime' },
    { name: 'Pull Day · Back', muscles: ['Back','Biceps','Rear delts'], dur: '52m', ex: 7, tint: 'coral' },
    { name: 'Leg Builder', muscles: ['Quads','Hams','Glutes','Calves'], dur: '55m', ex: 8, tag: 'PR CHANCE', tint: 'coral' },
    { name: 'Home · Bodyweight', muscles: ['Full body'], dur: '22m', ex: 5, tag: 'NO KIT', tint: 'violet' },
    { name: 'Cricket Power', muscles: ['Rotational','Core','Legs'], dur: '40m', ex: 6, tag: 'SPORT', tint: 'sky' },
  ];
  const tagColor = { 'POPULAR': LL.ink, 'PR CHANCE': LL.coral, 'NO KIT': LL.violet, 'SPORT': '#1B7A96' };

  return (
    <LScreen bg={LL.bg}>
      <LTopBar title="Workouts" subtitle="Your template library"
        left={<LIconBtn icon="tune"/>}
        right={<LIconBtn icon="add" bg={LL.ink} color={LL.bg}/>}
      />

      <div style={{ padding: '6px 16px 10px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {cats.map((c, i) => <LChip key={c} label={c} active={i === 0}/>)}
      </div>

      {/* featured AI pick */}
      <div style={{ margin: '4px 16px 0', padding: 16, borderRadius: 20,
        background: LL.aiSurface, border: `1px solid ${LL.bAI}`, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -30, right: -30, width: 120, height: 120,
          borderRadius: '50%', background: 'rgba(123,92,255,0.25)', filter: 'blur(40px)',
        }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ ...TL.labelMd, color: LL.violet }}>✦ AI PICK · TODAY</div>
          <div style={{ fontFamily: FL.serif, fontSize: 24, color: LL.ink, marginTop: 4, letterSpacing: -0.3 }}>
            Push Day · <LEm color={LL.violet}>Upper</LEm>
          </div>
          <div style={{ ...TL.bodySm, color: LL.text2, marginTop: 2 }}>Based on yesterday's pull session + recovery</div>
          <div style={{ marginTop: 12 }}>
            <LBtn label="Load workout" variant="ai" size="sm" trailing="arrow_forward"/>
          </div>
        </div>
      </div>

      <LSectionLabel>ALL TEMPLATES</LSectionLabel>
      <div style={{ margin: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {templates.map((t, i) => (
          <LCard key={i} style={{ padding: 14, display: 'flex', gap: 12 }}
            onClick={() => i === 0 && onNavigate && onNavigate('active')}>
            <LPlaceholder w={56} h={56} tint={t.tint} icon="fitness_center" radius={12}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ ...TL.titleMd, color: LL.ink }}>{t.name}</span>
                {t.tag && <span style={{
                  ...TL.labelSm, color: tagColor[t.tag] || LL.ink,
                  padding: '2px 7px', borderRadius: 999,
                  border: `1px solid ${tagColor[t.tag] || LL.ink}`,
                }}>{t.tag}</span>}
              </div>
              <div style={{ ...TL.bodySm, color: LL.text2, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.muscles.join(' · ')}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, ...TL.mono, fontSize: 11, color: LL.text2 }}>
                <span>{t.dur}</span><span>·</span><span>{t.ex} exercises</span>
              </div>
            </div>
            <span className="mi" style={{ fontSize: 20, color: LL.text2, alignSelf: 'center' }}>chevron_right</span>
          </LCard>
        ))}
      </div>

      <LTabBar active="workout" onNavigate={onNavigate}/>
    </LScreen>
  );
}

// 7. Nutrition Daily Log
function LNutrition({ onNavigate }) {
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
    <LScreen bg={LL.bg}>
      <LTopBar title="Diet Diary" subtitle="Wed, Apr 23"
        left={<LIconBtn icon="calendar_today"/>}
        right={<LIconBtn icon="bar_chart"/>}
      />

      <div style={{ margin: '2px 16px 0' }}>
        <LCard style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <LRing size={110} stroke={10} value={0.62} color={LL.ink}>
              <div style={{ fontFamily: FL.serif, fontSize: 28, color: LL.ink, letterSpacing: -1 }}>1,820</div>
              <div style={{ ...TL.labelSm, color: LL.text2 }}>OF 2,500</div>
            </LRing>
            <div style={{ flex: 1 }}>
              <div style={{ ...TL.labelMd, color: LL.ink }}>680 KCAL LEFT</div>
              <div style={{ ...TL.bodySm, color: LL.text2, marginTop: 2 }}>On track for bulk goal</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                <LMacroBar label="PROTEIN" value={112} goal={160} color={LL.ink} sub="g"/>
                <LMacroBar label="CARBS" value={182} goal={280} color={LL.coral} sub="g"/>
                <LMacroBar label="FAT" value={58} goal={78} color={LL.violet} sub="g"/>
              </div>
            </div>
          </div>
        </LCard>
      </div>

      <LSectionLabel action={<span style={{ ...TL.labelSm, color: LL.ink, textDecoration: 'underline' }}>+ QUICK LOG</span>}>MEALS</LSectionLabel>

      <div style={{ margin: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {meals.map((m, i) => {
          const empty = m.items.length === 0;
          return (
            <LCard key={i} style={{ padding: 14 }}
              onClick={() => empty && onNavigate && onNavigate('foodSearch')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...TL.labelMd, color: LL.ink }}>{m.type}</span>
                {m.time && <span style={{ ...TL.labelSm, color: LL.text2 }}>{m.time}</span>}
                <div style={{ flex: 1 }}/>
                {!empty && <span style={{ ...TL.mono, color: LL.coral, fontSize: 13 }}>{m.kcal} kcal</span>}
              </div>
              {empty ? (
                <div style={{
                  marginTop: 10, padding: 12, borderRadius: 12,
                  border: `1px dashed ${LL.bDefault}`,
                  display: 'flex', alignItems: 'center', gap: 8,
                  color: LL.text2, ...TL.bodySm,
                }}>
                  <span className="mi" style={{ fontSize: 18 }}>add</span>
                  Log {m.type.toLowerCase()}
                </div>
              ) : (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {m.items.map((it, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: 2, background: LL.ink }}/>
                      <span style={{ ...TL.bodyMd, color: LL.ink, flex: 1 }}>{it.name}
                        {it.regional && <span style={{ ...TL.bodySm, color: LL.text2, marginLeft: 6 }}>· {it.regional}</span>}
                      </span>
                      <span style={{ ...TL.bodySm, color: LL.text2 }}>{it.serving}</span>
                      <span style={{ ...TL.mono, fontSize: 11, color: LL.text2, width: 50, textAlign: 'right' }}>{it.kcal}</span>
                    </div>
                  ))}
                </div>
              )}
            </LCard>
          );
        })}
      </div>

      <LTabBar active="diet" onNavigate={onNavigate}/>
    </LScreen>
  );
}

// 8. Progress
function LProgress({ onNavigate }) {
  const weeks = [0.4, 0.55, 0.48, 0.72, 0.68, 0.82, 0.9];
  const prs = [
    { ex: 'Bench Press', w: 72.5, r: 5, date: '2d ago', up: true },
    { ex: 'Squat', w: 100, r: 3, date: '1w ago', up: true },
    { ex: 'Deadlift', w: 120, r: 5, date: '2w ago', up: false },
  ];

  return (
    <LScreen bg={LL.bg}>
      <LTopBar title="Progress" subtitle="Last 7 weeks"
        left={<LIconBtn icon="filter_list"/>}
        right={<LIconBtn icon="share"/>}
      />

      <div style={{ margin: '2px 16px 0' }}>
        <LCard variant="ink" style={{ padding: 18, background: LL.ink, color: LL.bg, position: 'relative', overflow: 'hidden' }}>
          <div style={{ ...TL.labelMd, color: 'rgba(244,239,228,0.60)' }}>TOTAL VOLUME</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span style={{ fontFamily: FL.serif, fontSize: 56, color: LL.bg, letterSpacing: -2, lineHeight: 1 }}>127.8k</span>
            <span style={{ ...TL.bodyMd, color: 'rgba(244,239,228,0.60)' }}>kg · 7 wk</span>
          </div>
          <div style={{ ...TL.bodySm, color: LL.primary, marginTop: 4 }}>↑ 12% vs previous period</div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginTop: 16 }}>
            {weeks.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  height: `${v * 100}%`,
                  background: i === weeks.length - 1 ? LL.primary : 'rgba(244,239,228,0.20)',
                  borderRadius: '4px 4px 2px 2px',
                  boxShadow: i === weeks.length - 1 ? LL.shGlow : 'none',
                }}/>
                <span style={{ ...TL.labelSm, fontSize: 9, color: 'rgba(244,239,228,0.50)' }}>W{i+1}</span>
              </div>
            ))}
          </div>
        </LCard>
      </div>

      <LSectionLabel action={<span style={{ ...TL.labelSm, color: LL.ink, textDecoration: 'underline' }}>ALL →</span>}>PERSONAL RECORDS</LSectionLabel>
      <div style={{ margin: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {prs.map((p, i) => (
          <LCard key={i} style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: p.up ? LL.primary : LL.coralSurface,
              color: p.up ? LL.ink : LL.coral,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="mi fill" style={{ fontSize: 20 }}>{p.up ? 'arrow_upward' : 'emoji_events'}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...TL.titleMd, color: LL.ink }}>{p.ex}</div>
              <div style={{ ...TL.bodySm, color: LL.text2 }}>{p.date}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...TL.mono, color: LL.ink, fontSize: 16 }}>{p.w} kg</div>
              <div style={{ ...TL.labelSm, color: LL.text2 }}>× {p.r}</div>
            </div>
          </LCard>
        ))}
      </div>

      <LSectionLabel>BODY</LSectionLabel>
      <div style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <LCard style={{ padding: 14 }}>
          <div style={{ ...TL.labelSm, color: LL.text2 }}>WEIGHT</div>
          <div style={{ fontFamily: FL.serif, fontSize: 28, color: LL.ink, marginTop: 2, letterSpacing: -0.8 }}>
            74.2 <span style={{ ...TL.bodyMd, color: LL.text2 }}>kg</span>
          </div>
          <div style={{ ...TL.bodySm, color: LL.coral }}>+1.2 this month</div>
        </LCard>
        <LCard style={{ padding: 14 }}>
          <div style={{ ...TL.labelSm, color: LL.text2 }}>BODY FAT</div>
          <div style={{ fontFamily: FL.serif, fontSize: 28, color: LL.ink, marginTop: 2, letterSpacing: -0.8 }}>
            17.8<span style={{ ...TL.bodyMd, color: LL.text2 }}>%</span>
          </div>
          <div style={{ ...TL.bodySm, color: LL.text2 }}>Est · DEXA</div>
        </LCard>
      </div>

      <LTabBar active="progress" onNavigate={onNavigate}/>
    </LScreen>
  );
}

Object.assign(window, { LDashboard, LWorkoutTemplates, LNutrition, LProgress });
