/* LIGHT Profile & Social (3): Profile · Community · Achievements */

function LProfile({ onNavigate }) {
  return (
    <LScreen bg={LL.bg}>
      <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'space-between' }}>
        <LIconBtn icon="arrow_back" onClick={() => onNavigate && onNavigate('home')}/>
        <LIconBtn icon="settings"/>
      </div>

      {/* Hero identity */}
      <div style={{ padding: '10px 20px 16px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <div style={{
            width: 96, height: 96, borderRadius: 48,
            background: `radial-gradient(circle at 30% 30%, ${LL.primary}, #B8E03A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FL.serif, fontSize: 40, color: LL.ink,
            boxShadow: LL.shGlow,
          }}>NA</div>
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 30, height: 30, borderRadius: 15,
            background: LL.coral, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `3px solid ${LL.bg}`, boxShadow: LL.shCoral,
          }}>
            <span className="mi fill" style={{ fontSize: 16 }}>local_fire_department</span>
          </div>
        </div>

        <h1 style={{ fontFamily: FL.serif, fontWeight: 400, fontSize: 36, lineHeight: 1, letterSpacing: -1, color: LL.ink, margin: '12px 0 2px' }}>
          Nithish <LEm>A.</LEm>
        </h1>
        <div style={{ ...TL.bodyMd, color: LL.text2 }}>@lyft_nithish · Chennai</div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
          <div style={{
            padding: '5px 11px', borderRadius: 999,
            background: LL.primary, ...TL.labelSm, color: LL.ink,
          }}>12 DAY STREAK 🔥</div>
          <div style={{
            padding: '5px 11px', borderRadius: 999,
            background: 'transparent', border: `1px solid ${LL.bDefault}`,
            ...TL.labelSm, color: LL.text2,
          }}>LEVEL 7</div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        margin: '0 16px', padding: '14px 10px',
        background: LL.ink, color: LL.bg, borderRadius: 20,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
      }}>
        {[
          { v: '147', l: 'SESSIONS' },
          { v: '98h', l: 'TRAINED' },
          { v: '24', l: 'PRs' },
          { v: '8.2k', l: 'FOLLOWERS' },
        ].map((s, i) => (
          <div key={i} style={{
            textAlign: 'center',
            borderLeft: i > 0 ? '1px solid rgba(244,239,228,0.12)' : 'none',
          }}>
            <div style={{ fontFamily: FL.serif, fontSize: 22, color: i === 2 ? LL.primary : LL.bg, letterSpacing: -0.4, lineHeight: 1 }}>{s.v}</div>
            <div style={{ ...TL.labelSm, color: 'rgba(244,239,228,0.60)', marginTop: 4, fontSize: 9 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Goal card */}
      <LSectionLabel>CURRENT GOAL</LSectionLabel>
      <div style={{ margin: '0 16px' }}>
        <LCard style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LPlaceholder w={44} h={44} tint="lime" icon="trending_up" radius={12}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FL.serif, fontSize: 22, color: LL.ink, letterSpacing: -0.3, lineHeight: 1 }}>
                Bulk · <LEm>+4 kg</LEm>
              </div>
              <div style={{ ...TL.bodySm, color: LL.text2, marginTop: 2 }}>By Sept · 74.2 → 78 kg</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ ...TL.mono, fontSize: 16, color: LL.ink }}>52%</div>
              <div style={{ ...TL.labelSm, color: LL.text2 }}>DONE</div>
            </div>
          </div>
          <div style={{
            height: 6, borderRadius: 3, background: 'rgba(14,14,18,0.08)',
            marginTop: 12, overflow: 'hidden',
          }}>
            <div style={{ width: '52%', height: '100%', background: LL.ink }}/>
          </div>
        </LCard>
      </div>

      {/* Menu */}
      <LSectionLabel>ACCOUNT</LSectionLabel>
      <div style={{ margin: '0 16px 24px' }}>
        <LCard style={{ padding: 0 }}>
          {[
            { icon: 'emoji_events', label: 'Achievements', badge: '24', fn: () => onNavigate && onNavigate('achievements') },
            { icon: 'group', label: 'Community Feed', badge: '3 new', fn: () => onNavigate && onNavigate('community') },
            { icon: 'track_changes', label: 'Goals & targets' },
            { icon: 'notifications', label: 'Notifications' },
            { icon: 'privacy_tip', label: 'Privacy & data' },
            { icon: 'help', label: 'Help & feedback' },
          ].map((item, i, arr) => (
            <div key={i} onClick={item.fn} style={{
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              borderTop: i > 0 ? `1px solid ${LL.bSubtle}` : 'none',
              cursor: item.fn ? 'pointer' : 'default',
            }}>
              <span className="mi" style={{ fontSize: 22, color: LL.text2, width: 22 }}>{item.icon}</span>
              <span style={{ ...TL.bodyLg, color: LL.ink, flex: 1 }}>{item.label}</span>
              {item.badge && <span style={{
                padding: '3px 8px', borderRadius: 999,
                background: LL.primary, ...TL.labelSm, color: LL.ink, fontSize: 9,
              }}>{item.badge}</span>}
              <span className="mi" style={{ fontSize: 18, color: LL.text3 }}>chevron_right</span>
            </div>
          ))}
        </LCard>
      </div>
    </LScreen>
  );
}

function LCommunity({ onNavigate }) {
  const posts = [
    {
      who: 'Priya M.', handle: '@priya_lifts', ago: '14m', city: 'Bengaluru',
      type: 'pr', text: 'Finally broke 80! Six months of the grind. Let\'s goooo 🔥',
      pr: { ex: 'Deadlift', w: 82.5, r: 3, delta: '+2.5' },
      likes: 247, comments: 38, tint: 'lime',
    },
    {
      who: 'Coach · Suggested',
      ai: true,
      text: 'Based on your sleep (7h 20m) + yesterday\'s pull day volume, take a lighter push today. I\'ve queued it.',
      cta: 'View plan',
    },
    {
      who: 'Arjun K.', handle: '@arjun_k', ago: '2h', city: 'Mumbai',
      type: 'workout', text: 'Home gym leg day done. Dumbbells only. Cheaper than therapy.',
      workout: { name: 'Legs · Home', dur: 42, vol: '3,240 kg', ex: 5 },
      likes: 89, comments: 12, tint: 'coral',
    },
    {
      who: 'Meera S.', handle: '@meera.fits', ago: '5h', city: 'Chennai',
      type: 'streak', text: '30 day streak! Turned 4 months of \"tomorrow\" into a habit.',
      streak: 30,
      likes: 412, comments: 67, tint: 'violet',
    },
  ];

  return (
    <LScreen bg={LL.bg}>
      <LTopBar title="Community"
        left={<LIconBtn icon="arrow_back" onClick={() => onNavigate && onNavigate('profile')}/>}
        right={<LIconBtn icon="search"/>}
      />

      <div style={{ padding: '0 16px 8px', display: 'flex', gap: 8 }}>
        {['For you', 'Following', 'PRs', 'India'].map((t, i) => (
          <LChip key={t} label={t} active={i === 0}/>
        ))}
      </div>

      <div style={{ padding: '8px 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {posts.map((p, i) => (
          <LCard key={i} style={{ padding: 14 }}
            variant={p.ai ? 'ai' : 'surface'}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: p.ai ? 8 : 10 }}>
              {p.ai ? (
                <div style={{
                  width: 36, height: 36, borderRadius: 18,
                  background: `radial-gradient(circle at 30% 30%, #c9b6ff, ${LL.violet})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: LL.shGlowAI,
                }}>
                  <span className="mi fill" style={{ fontSize: 18, color: '#fff' }}>auto_awesome</span>
                </div>
              ) : (
                <LAvatar name={p.who} size={36} tone={p.tint}/>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ ...TL.titleMd, color: p.ai ? LL.violet : LL.ink }}>{p.who}</div>
                {p.handle && (
                  <div style={{ ...TL.labelSm, color: LL.text2 }}>
                    {p.handle} · {p.city} · {p.ago}
                  </div>
                )}
              </div>
              {!p.ai && <span className="mi" style={{ fontSize: 18, color: LL.text2 }}>more_horiz</span>}
            </div>

            <div style={{ ...TL.bodyMd, color: LL.ink, marginBottom: 10 }}>{p.text}</div>

            {p.pr && (
              <div style={{
                padding: 14, borderRadius: 14,
                background: LL.ink, color: LL.bg,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -30, right: -30, width: 120, height: 120,
                  borderRadius: '50%', background: LL.coral, filter: 'blur(40px)', opacity: 0.6,
                }}/>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="mi fill" style={{ fontSize: 32, color: LL.coral }}>emoji_events</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...TL.labelMd, color: LL.coral }}>PERSONAL RECORD</div>
                    <div style={{ fontFamily: FL.serif, fontSize: 22, color: LL.bg, letterSpacing: -0.3 }}>
                      {p.pr.ex}
                    </div>
                    <div style={{ ...TL.mono, color: LL.primary, fontSize: 15, marginTop: 2 }}>
                      {p.pr.w} kg × {p.pr.r} <span style={{ color: 'rgba(244,239,228,0.60)' }}>({p.pr.delta} kg)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {p.workout && (
              <div style={{
                padding: 12, borderRadius: 14,
                background: LL.bg2, border: `1px solid ${LL.bSubtle}`,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <LPlaceholder w={44} h={44} tint="coral" icon="fitness_center" radius={10}/>
                <div style={{ flex: 1 }}>
                  <div style={{ ...TL.titleMd, color: LL.ink }}>{p.workout.name}</div>
                  <div style={{ ...TL.mono, fontSize: 11, color: LL.text2, marginTop: 2 }}>
                    {p.workout.dur}m · {p.workout.vol} · {p.workout.ex} ex
                  </div>
                </div>
                <LBtn label="Try" variant="secondary" size="sm"/>
              </div>
            )}

            {p.streak && (
              <div style={{
                padding: 14, borderRadius: 14,
                background: LL.coralSurface, border: `1px solid ${LL.bCoral}`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span className="mi fill" style={{ fontSize: 36, color: LL.coral }}>local_fire_department</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FL.serif, fontSize: 32, color: LL.ink, letterSpacing: -1, lineHeight: 1 }}>
                    {p.streak} <span style={{ fontSize: 18, color: LL.text2 }}>days</span>
                  </div>
                  <div style={{ ...TL.labelSm, color: LL.coral, marginTop: 2 }}>UNBROKEN</div>
                </div>
              </div>
            )}

            {p.cta && (
              <LBtn label={p.cta} variant="ai" size="sm" trailing="arrow_forward" style={{ marginTop: 4 }}/>
            )}

            {!p.ai && (
              <div style={{
                marginTop: 12, paddingTop: 10,
                borderTop: `1px solid ${LL.bSubtle}`,
                display: 'flex', alignItems: 'center', gap: 18,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: LL.text2 }}>
                  <span className="mi" style={{ fontSize: 18 }}>favorite_border</span>
                  <span style={{ ...TL.mono, fontSize: 12 }}>{p.likes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: LL.text2 }}>
                  <span className="mi" style={{ fontSize: 18 }}>chat_bubble_outline</span>
                  <span style={{ ...TL.mono, fontSize: 12 }}>{p.comments}</span>
                </div>
                <div style={{ flex: 1 }}/>
                <span className="mi" style={{ fontSize: 18, color: LL.text2 }}>bookmark_border</span>
                <span className="mi" style={{ fontSize: 18, color: LL.text2 }}>ios_share</span>
              </div>
            )}
          </LCard>
        ))}
      </div>
    </LScreen>
  );
}

function LAchievements({ onNavigate }) {
  // 5 weeks × 7 days = 35 cells
  const calendar = [
    1,1,1,0,1,1,0,
    1,1,0,1,1,1,1,
    1,1,1,1,0,1,1,
    0,1,1,1,1,1,1,
    1,1,1,1,1,1,2, // 2 = today
  ];
  const badges = [
    { name: 'First PR', got: true, icon: 'emoji_events', tint: 'lime' },
    { name: '10 Day Streak', got: true, icon: 'local_fire_department', tint: 'coral' },
    { name: 'Meal Master', got: true, icon: 'restaurant', tint: 'violet' },
    { name: 'Early Bird', got: true, icon: 'wb_sunny', tint: 'sky' },
    { name: '100 Sessions', got: true, icon: 'star', tint: 'lime' },
    { name: '30 Day', got: false, icon: 'local_fire_department', tint: 'cream' },
    { name: '1000 kg Club', got: false, icon: 'military_tech', tint: 'cream' },
    { name: 'Dawn Patrol', got: false, icon: 'bedtime', tint: 'cream' },
  ];
  const months = ['MAR', 'APR', 'MAY', 'JUN', 'JUL'];

  return (
    <LScreen bg={LL.bg}>
      <LTopBar title="Achievements"
        left={<LIconBtn icon="arrow_back" onClick={() => onNavigate && onNavigate('profile')}/>}
        right={<LIconBtn icon="ios_share"/>}
      />

      {/* Hero streak */}
      <div style={{ margin: '0 16px' }}>
        <LCard variant="ink" style={{
          background: LL.ink, color: LL.bg, border: 'none',
          padding: 20, position: 'relative', overflow: 'hidden', textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
            width: 220, height: 220, borderRadius: '50%',
            background: LL.coral, filter: 'blur(60px)', opacity: 0.4,
          }}/>
          <div style={{ position: 'relative' }}>
            <span className="mi fill" style={{ fontSize: 56, color: LL.coral }}>local_fire_department</span>
            <div style={{ fontFamily: FL.serif, fontSize: 78, color: LL.bg, letterSpacing: -3, lineHeight: 1, marginTop: -4 }}>
              12
            </div>
            <div style={{ ...TL.labelMd, color: 'rgba(244,239,228,0.60)', marginTop: 4 }}>DAY STREAK · ALL TIME BEST</div>
          </div>
        </LCard>
      </div>

      {/* Calendar */}
      <LSectionLabel action={<span style={{ ...TL.labelSm, color: LL.ink, textDecoration: 'underline' }}>FULL YEAR</span>}>
        TRAINING CALENDAR
      </LSectionLabel>
      <div style={{ margin: '0 16px' }}>
        <LCard style={{ padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, ...TL.labelSm, color: LL.text2 }}>
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3,
          }}>
            {calendar.map((v, i) => (
              <div key={i} style={{
                aspectRatio: '1',
                borderRadius: 4,
                background: v === 2 ? LL.primary : v === 1 ? LL.ink : 'rgba(14,14,18,0.06)',
                boxShadow: v === 2 ? LL.shGlow : 'none',
                border: v === 2 ? `1.5px solid ${LL.ink}` : 'none',
              }}/>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, ...TL.labelSm, color: LL.text2 }}>
            <span>LESS</span>
            <div style={{ display: 'flex', gap: 3 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(14,14,18,0.06)' }}/>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(14,14,18,0.25)' }}/>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: LL.ink }}/>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: LL.primary }}/>
            </div>
            <span>MORE</span>
            <div style={{ flex: 1 }}/>
            <span style={{ color: LL.ink }}>28/35 DAYS</span>
          </div>
        </LCard>
      </div>

      {/* Badges */}
      <LSectionLabel>BADGES · 5 / 24</LSectionLabel>
      <div style={{ margin: '0 16px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
        {badges.map((b, i) => (
          <div key={i} style={{
            aspectRatio: '0.85', padding: 10,
            borderRadius: 14,
            background: b.got ? '#fff' : LL.bg2,
            border: b.got ? `1px solid ${LL.bSubtle}` : `1px dashed ${LL.bDefault}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 4, textAlign: 'center',
            boxShadow: b.got ? LL.shSm : 'none',
            opacity: b.got ? 1 : 0.5,
          }}>
            <LPlaceholder w={40} h={40} tint={b.tint} icon={b.icon} radius={10}/>
            <div style={{ ...TL.labelSm, color: LL.ink, fontSize: 9 }}>{b.name}</div>
          </div>
        ))}
      </div>
    </LScreen>
  );
}

Object.assign(window, { LProfile, LCommunity, LAchievements });
