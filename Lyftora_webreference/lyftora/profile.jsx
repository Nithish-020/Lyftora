/* Profile & Social (3):
   16. Profile & Settings
   17. Community Feed
   18. Achievements & Streaks
*/

function Profile({ onNavigate }) {
  return (
    <Screen bg={L.sBase}>
      {/* Hero */}
      <div style={{
        padding: '24px 20px 16px',
        background: `radial-gradient(80% 120% at 50% 0%, rgba(0,212,170,0.18), transparent 70%)`,
        textAlign: 'center',
      }}>
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <Avatar name="Nithish A" size={84}/>
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 26, height: 26, borderRadius: 13, background: L.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `3px solid ${L.sBase}`,
          }}>
            <span className="mi" style={{ fontSize: 14, color: L.textInv }}>edit</span>
          </div>
        </div>
        <div style={{ ...T.headlineMd, color: L.text, marginTop: 12 }}>Nithish A.</div>
        <div style={{ ...T.bodySm, color: L.text2 }}>@nithish.lifts · Bengaluru · Intermediate</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 14 }}>
          {[
            { v: '127', l: 'SESSIONS' },
            { v: '42', l: 'PRs' },
            { v: '12d', l: 'STREAK' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ ...T.headlineMd, color: L.text }}>{s.v}</div>
              <div style={{ ...T.labelSm, color: L.text2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionLabel>PREFERENCES</SectionLabel>
      <div style={{ margin: '0 16px', borderRadius: 12, background: L.sContainer, overflow: 'hidden' }}>
        {[
          { i: 'dark_mode', l: 'Theme', v: 'Dark', sub: 'Auto disabled' },
          { i: 'straighten', l: 'Units', v: 'Metric (kg / cm)' },
          { i: 'notifications', l: 'Notifications', v: 'On', toggle: true },
          { i: 'language', l: 'Language', v: 'English' },
        ].map((it, i, arr) => (
          <div key={it.l} style={{
            padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: i < arr.length - 1 ? `1px solid ${L.bSubtle}` : 'none',
          }}>
            <span className="mi" style={{ fontSize: 20, color: L.text2 }}>{it.i}</span>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.bodyMd, color: L.text }}>{it.l}</div>
              {it.sub && <div style={{ ...T.bodySm, color: L.text3 }}>{it.sub}</div>}
            </div>
            {it.toggle ? (
              <div style={{ width: 40, height: 22, borderRadius: 11, background: L.primary, padding: 2 }}>
                <div style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', marginLeft: 'auto' }}/>
              </div>
            ) : (
              <div style={{ ...T.bodySm, color: L.text2, display: 'flex', alignItems: 'center', gap: 4 }}>
                {it.v} <span className="mi" style={{ fontSize: 18 }}>chevron_right</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <SectionLabel>YOUR PLAN</SectionLabel>
      <div style={{ margin: '0 16px' }}>
        <Card style={{
          padding: 14,
          background: `linear-gradient(135deg, ${L.warnSurface}, ${L.sContainer})`,
          border: `1px solid rgba(255,176,32,0.25)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: L.warnSurface, color: L.warning,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="mi fill" style={{ fontSize: 20 }}>workspace_premium</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.titleMd, color: L.text }}>Lyftora Pro</div>
              <div style={{ ...T.bodySm, color: L.text2 }}>One-time · ₹499 · unlocked</div>
            </div>
            <span className="mi fill" style={{ fontSize: 20, color: L.primary }}>check_circle</span>
          </div>
        </Card>
      </div>

      <SectionLabel>MORE</SectionLabel>
      <div style={{ margin: '0 16px 20px', borderRadius: 12, background: L.sContainer, overflow: 'hidden' }}>
        {[
          { i: 'store', l: 'Expansion packs', sub: 'Cricket, football, cuisine packs' },
          { i: 'ios_share', l: 'Invite friends', sub: 'Unlock bonus programs' },
          { i: 'help', l: 'Help & support' },
          { i: 'logout', l: 'Sign out', color: L.error },
        ].map((it, i, arr) => (
          <div key={it.l} style={{
            padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: i < arr.length - 1 ? `1px solid ${L.bSubtle}` : 'none',
          }}>
            <span className="mi" style={{ fontSize: 20, color: it.color || L.text2 }}>{it.i}</span>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.bodyMd, color: it.color || L.text }}>{it.l}</div>
              {it.sub && <div style={{ ...T.bodySm, color: L.text3 }}>{it.sub}</div>}
            </div>
            <span className="mi" style={{ fontSize: 18, color: L.text3 }}>chevron_right</span>
          </div>
        ))}
      </div>

      <TabBar active="home" onNavigate={onNavigate}/>
    </Screen>
  );
}

// 17. Community Feed
function Feed({ onNavigate }) {
  const posts = [
    { user: 'Priya S.', handle: '@priya.lifts', ago: '12m', city: 'Mumbai',
      type: 'PR', body: "5 plates, baby. Deadlift finally hit 140 kg × 1. Programming works 🔥",
      stat: { ex: 'Deadlift', w: '140 kg', r: '1 rep' },
      likes: 148, comments: 22, tint: 'warm' },
    { user: 'Arjun R.', handle: '@arjun.r', ago: '1h', city: 'Delhi',
      type: 'WORKOUT', body: "Leg day done. Legs officially jelly. Namaste 🙏",
      workout: { name: 'Leg Builder', vol: '6,840 kg', dur: '62 min', prs: 1 },
      likes: 72, comments: 8, tint: 'primary' },
  ];

  return (
    <Screen bg={L.sBase}>
      {/* segmented */}
      <TopBar title="Community"
        left={<IconBtn icon="search"/>}
        right={<IconBtn icon="group_add"/>}
      />
      <div style={{ padding: '0 16px', display: 'flex', gap: 0 }}>
        {['Following', 'For You', 'Nearby'].map((t, i) => (
          <div key={t} style={{
            flex: 1, padding: '8px 0', textAlign: 'center',
            ...T.labelMd, color: i === 1 ? L.primary : L.text2,
            borderBottom: i === 1 ? `2px solid ${L.primary}` : `1px solid ${L.bSubtle}`,
          }}>{t}</div>
        ))}
      </div>

      {/* Follow suggestions strip */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ ...T.labelMd, color: L.text2, marginBottom: 8 }}>SUGGESTED</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {['Anjali', 'Rohan', 'Priya', 'Karan'].map((n, i) => (
            <div key={n} style={{
              minWidth: 108, padding: 10, borderRadius: 12, background: L.sContainer,
              textAlign: 'center',
            }}>
              <Avatar name={n} size={44} color={[L.primary, L.warning, L.secondary, L.error][i]}/>
              <div style={{ ...T.bodySm, color: L.text, marginTop: 6 }}>{n} K.</div>
              <div style={{ ...T.labelSm, color: L.text2 }}>@{n.toLowerCase()}.fit</div>
              <button style={{
                marginTop: 8, padding: '4px 12px', borderRadius: 8,
                background: L.primary, color: L.textInv, border: 'none',
                ...T.labelMd, cursor: 'pointer',
              }}>FOLLOW</button>
            </div>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {posts.map((p, i) => (
          <Card key={i} variant="surface" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={p.user} size={36} color={i === 0 ? L.warning : L.primary}/>
              <div style={{ flex: 1 }}>
                <div style={{ ...T.titleMd, color: L.text, fontSize: 14 }}>{p.user}</div>
                <div style={{ ...T.bodySm, color: L.text2 }}>{p.handle} · {p.city} · {p.ago}</div>
              </div>
              <span style={{
                ...T.labelSm, padding: '3px 8px', borderRadius: 6,
                background: i === 0 ? L.warnSurface : L.primarySurface,
                color: i === 0 ? L.warning : L.primary,
              }}>{p.type}</span>
            </div>
            <div style={{ padding: '0 14px 12px', ...T.bodyMd, color: L.text }}>{p.body}</div>

            {/* stat block */}
            {p.stat && (
              <div style={{ margin: '0 14px', padding: 14, borderRadius: 10,
                background: `linear-gradient(135deg, ${L.warnSurface}, transparent)`,
                border: `1px solid rgba(255,176,32,0.25)`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span className="mi fill" style={{ fontSize: 24, color: L.warning }}>emoji_events</span>
                <div>
                  <div style={{ ...T.labelMd, color: L.warning }}>NEW PR</div>
                  <div style={{ ...T.titleMd, color: L.text }}>{p.stat.ex} · {p.stat.w} × {p.stat.r}</div>
                </div>
              </div>
            )}
            {p.workout && (
              <div style={{ margin: '0 14px', padding: 12, borderRadius: 10, background: L.sLow,
                display: 'flex', gap: 12, alignItems: 'center',
              }}>
                <Placeholder w={44} h={44} tint={p.tint} icon="fitness_center" radius={8}/>
                <div style={{ flex: 1 }}>
                  <div style={{ ...T.titleMd, color: L.text, fontSize: 14 }}>{p.workout.name}</div>
                  <div style={{ ...T.bodySm, color: L.text2 }}>{p.workout.dur} · {p.workout.vol}</div>
                </div>
              </div>
            )}

            <div style={{ padding: 12, display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: L.text2 }}>
                <span className="mi" style={{ fontSize: 20 }}>favorite_border</span>
                <span style={{ ...T.bodySm }}>{p.likes}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: L.text2 }}>
                <span className="mi" style={{ fontSize: 20 }}>mode_comment</span>
                <span style={{ ...T.bodySm }}>{p.comments}</span>
              </div>
              <div style={{ flex: 1 }}/>
              <span className="mi" style={{ fontSize: 20, color: L.text2 }}>ios_share</span>
            </div>
          </Card>
        ))}
      </div>

      <TabBar active="home" onNavigate={onNavigate}/>
    </Screen>
  );
}

// 18. Achievements & Streaks
function Achievements({ onNavigate }) {
  // 35-day grid for streak calendar (5 weeks)
  const days = Array.from({ length: 35 }, (_, i) => {
    if (i < 9) return 'past';
    if (i < 20) return 'done';
    if (i === 20) return 'today';
    return 'future';
  });
  const dayColor = {
    past: 'rgba(255,255,255,0.04)',
    done: L.primary,
    today: L.warning,
    future: 'rgba(255,255,255,0.06)',
  };

  const badges = [
    { i: 'local_fire_department', l: '7-Day Streak', earned: true, color: L.warning },
    { i: 'emoji_events', l: 'First PR', earned: true, color: L.primary },
    { i: 'bolt', l: '10,000 kg', earned: true, color: L.primary },
    { i: 'military_tech', l: '30 Sessions', earned: true, color: L.secondary },
    { i: 'star', l: '5-Star Week', earned: false, color: L.text3 },
    { i: 'workspace_premium', l: 'Century PR', earned: false, color: L.text3 },
  ];

  return (
    <Screen bg={L.sBase}>
      <TopBar title="Achievements" subtitle="Badges, streaks, milestones"
        left={<IconBtn icon="arrow_back" onClick={() => onNavigate && onNavigate('home')}/>}
        right={<IconBtn icon="ios_share"/>}
      />

      {/* Streak hero */}
      <div style={{ margin: '4px 16px 0' }}>
        <Card style={{
          padding: 18,
          background: `radial-gradient(80% 100% at 100% 0%, rgba(255,176,32,0.25), transparent 60%), ${L.sContainer}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: `linear-gradient(135deg, ${L.warning}, #FF7A00)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(255,176,32,0.4)',
            }}>
              <span className="mi fill" style={{ fontSize: 36, color: L.textInv }}>local_fire_department</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.labelMd, color: L.warning }}>CURRENT STREAK</div>
              <div style={{ ...T.displayLg, color: L.text, fontSize: 34, letterSpacing: -1, marginTop: 2 }}>
                12 <span style={{ ...T.bodyLg, color: L.text2 }}>days</span>
              </div>
              <div style={{ ...T.bodySm, color: L.text2 }}>Longest: 28 · Train today to keep it</div>
            </div>
          </div>

          {/* Mini calendar */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5 }}>
              {['M','T','W','T','F','S','S'].map(d => (
                <div key={d + Math.random()} style={{ ...T.labelSm, fontSize: 9, color: L.text3, textAlign: 'center' }}>{d}</div>
              ))}
              {days.map((d, i) => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 4,
                  background: dayColor[d],
                  boxShadow: d === 'today' ? '0 0 8px rgba(255,176,32,0.6)' : 'none',
                  border: d === 'today' ? `1px solid ${L.warning}` : 'none',
                }}/>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Milestones */}
      <SectionLabel>NEXT UP</SectionLabel>
      <div style={{ margin: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { l: '30-day streak', now: 12, goal: 30, color: L.warning },
          { l: 'Total volume: 150k kg', now: 127.8, goal: 150, color: L.primary, unit: 'k' },
          { l: 'Bench: 80 kg', now: 72.5, goal: 80, color: L.error, unit: 'kg' },
        ].map((m, i) => (
          <Card key={i} style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ ...T.titleMd, color: L.text }}>{m.l}</span>
              <span style={{ ...T.mono, fontSize: 13, color: m.color }}>{m.now}{m.unit || ''} / {m.goal}{m.unit || ''}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', marginTop: 8, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${(m.now / m.goal) * 100}%`,
                background: m.color, borderRadius: 3,
              }}/>
            </div>
          </Card>
        ))}
      </div>

      {/* Badges */}
      <SectionLabel>BADGES · 4 / 24</SectionLabel>
      <div style={{ margin: '0 16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {badges.map((b, i) => (
          <div key={i} style={{
            padding: 14, borderRadius: 12,
            background: b.earned ? L.sContainer : L.sLow,
            border: b.earned ? `1px solid ${b.color}44` : `1px solid ${L.bSubtle}`,
            textAlign: 'center', opacity: b.earned ? 1 : 0.5,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 24, margin: '0 auto',
              background: b.earned ? `${b.color}22` : 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: b.earned ? `0 0 16px ${b.color}44` : 'none',
            }}>
              <span className={`mi ${b.earned ? 'fill' : ''}`} style={{ fontSize: 26, color: b.color }}>{b.i}</span>
            </div>
            <div style={{ ...T.labelMd, color: b.earned ? L.text : L.text3, marginTop: 8 }}>{b.l}</div>
          </div>
        ))}
      </div>

      <TabBar active="home" onNavigate={onNavigate}/>
    </Screen>
  );
}

Object.assign(window, { Profile, Feed, Achievements });
