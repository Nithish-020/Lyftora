/* Nutrition flow (2):
   13. Food Search
   14. Meal Logging Detail (serving picker)
*/

function FoodSearch({ onNavigate }) {
  const recent = [
    { name: 'Moong Dal', kcal: 198, serv: '1 bowl', regional: 'मूंग दाल' },
    { name: 'Chicken Curry', kcal: 320, serv: '200g', regional: 'चिकन' },
    { name: 'Roti (Whole Wheat)', kcal: 104, serv: '1 pc' },
    { name: 'Paneer Bhurji', kcal: 265, serv: '100g' },
  ];
  const results = [
    { name: 'Greek Yogurt', brand: 'Epigamia', kcal: 92, p: 9, c: 7, f: 3, serv: '100g' },
    { name: 'Masala Dosa', region: 'South Indian', kcal: 220, p: 6, c: 35, f: 7, serv: '1 pc' },
    { name: 'Whey Protein', brand: 'MuscleBlaze', kcal: 120, p: 25, c: 3, f: 1, serv: '1 scoop' },
    { name: 'Poha', region: 'Maharashtrian', kcal: 180, p: 4, c: 28, f: 5, serv: '1 plate' },
  ];
  const cats = ['All', 'Indian', 'Protein', 'Grains', 'Snacks'];

  return (
    <Screen bg={L.sBase} padBottom={false}>
      <TopBar title="Add food"
        left={<IconBtn icon="arrow_back" onClick={() => onNavigate && onNavigate('diet')}/>}
        right={<IconBtn icon="qr_code_scanner"/>}
      />

      <div style={{ padding: '0 16px' }}>
        <div style={{
          height: 48, background: L.sHigh, borderRadius: 8,
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
          border: `1px solid ${L.bAccent}`, boxShadow: L.shGlow,
        }}>
          <span className="mi" style={{ fontSize: 20, color: L.primary }}>search</span>
          <span style={{ ...T.bodyLg, color: L.text }}>paneer</span>
          <span style={{ width: 2, height: 18, background: L.primary }}/>
          <div style={{ flex: 1 }}/>
          <span style={{ ...T.labelSm, color: L.text2 }}>4 results</span>
        </div>
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {cats.map((c, i) => <Chip key={c} label={c} active={i === 1}/>)}
      </div>

      <SectionLabel>RECENT</SectionLabel>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {recent.map((r, i) => (
          <div key={i} style={{
            padding: 10, borderRadius: 10, background: L.sLow,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span className="mi" style={{ fontSize: 18, color: L.text3 }}>history</span>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.bodyMd, color: L.text }}>{r.name}
                {r.regional && <span style={{ ...T.bodySm, color: L.text2, marginLeft: 6 }}>{r.regional}</span>}
              </div>
              <div style={{ ...T.bodySm, color: L.text2 }}>{r.serv} · {r.kcal} kcal</div>
            </div>
            <IconBtn icon="add" size={30} bg={L.primarySurface} color={L.primary}/>
          </div>
        ))}
      </div>

      <SectionLabel>RESULTS</SectionLabel>
      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {results.map((r, i) => (
          <Card key={i} style={{ padding: 12 }}
            onClick={() => i === 1 && onNavigate && onNavigate('foodDetail')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ ...T.titleMd, color: L.text }}>{r.name}</div>
                <div style={{ ...T.bodySm, color: L.text2 }}>
                  {r.brand || r.region} · {r.serv}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...T.mono, color: L.primary, fontSize: 14 }}>{r.kcal}</div>
                <div style={{ ...T.labelSm, color: L.text2 }}>KCAL</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8, ...T.bodySm, color: L.text2 }}>
              <span>P <span style={{ color: L.primary, fontWeight: 600 }}>{r.p}g</span></span>
              <span>C <span style={{ color: L.warning, fontWeight: 600 }}>{r.c}g</span></span>
              <span>F <span style={{ color: L.secondary, fontWeight: 600 }}>{r.f}g</span></span>
            </div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

// 14. Meal Detail / serving picker
function FoodDetail({ onNavigate }) {
  return (
    <Screen bg={L.sBase} padBottom={false}>
      {/* Header image */}
      <div style={{ position: 'relative' }}>
        <Placeholder w="100%" h={180} tint="warm" icon="restaurant" radius={0}/>
        <div style={{
          position: 'absolute', top: 10, left: 14,
        }}>
          <IconBtn icon="arrow_back" onClick={() => onNavigate && onNavigate('foodSearch')} bg="rgba(0,0,0,0.4)"/>
        </div>
        <div style={{
          position: 'absolute', top: 10, right: 14,
        }}>
          <IconBtn icon="bookmark_border" bg="rgba(0,0,0,0.4)"/>
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ ...T.labelMd, color: L.warning }}>SOUTH INDIAN · BREAKFAST</div>
        <h2 style={{ ...T.headlineLg, color: L.text, margin: '4px 0 2px' }}>Masala Dosa</h2>
        <div style={{ ...T.bodySm, color: L.text2 }}>मसाला डोसा · with potato filling</div>

        {/* Serving picker */}
        <div style={{ marginTop: 18 }}>
          <div style={{ ...T.labelMd, color: L.text2, marginBottom: 8 }}>SERVING</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              flex: 1, height: 52, background: L.sHigh, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 14px',
            }}>
              <IconBtn icon="remove" size={32}/>
              <div style={{ textAlign: 'center' }}>
                <div style={{ ...T.mono, color: L.text, fontSize: 20 }}>1.5</div>
                <div style={{ ...T.labelSm, color: L.text2 }}>PIECES</div>
              </div>
              <IconBtn icon="add" size={32}/>
            </div>
            <div style={{
              height: 52, padding: '0 14px', background: L.sHigh, borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 6, color: L.text2, ...T.bodyMd,
            }}>
              1 pc
              <span className="mi" style={{ fontSize: 16 }}>expand_more</span>
            </div>
          </div>
        </div>

        {/* Total summary */}
        <div style={{
          marginTop: 18, padding: 16, borderRadius: 14,
          background: L.primarySurface, border: `1px solid ${L.bAccent}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ ...T.labelMd, color: L.primary }}>TOTAL CALORIES</span>
            <span style={{ ...T.mono, color: L.text, fontSize: 24 }}>330</span>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginTop: 14,
          }}>
            {[
              { l: 'PROTEIN', v: '9g', c: L.primary },
              { l: 'CARBS', v: '52g', c: L.warning },
              { l: 'FAT', v: '10g', c: L.secondary },
              { l: 'FIBER', v: '4g', c: L.text2 },
            ].map(m => (
              <div key={m.l} style={{ textAlign: 'center' }}>
                <div style={{ ...T.mono, color: m.c, fontSize: 16 }}>{m.v}</div>
                <div style={{ ...T.labelSm, color: L.text2 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to meal selector */}
        <div style={{ marginTop: 16 }}>
          <div style={{ ...T.labelMd, color: L.text2, marginBottom: 8 }}>ADD TO</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6 }}>
            {[
              { l: 'Breakfast', i: 'free_breakfast', a: true },
              { l: 'Lunch', i: 'lunch_dining' },
              { l: 'Dinner', i: 'dinner_dining' },
              { l: 'Snack', i: 'cookie' },
            ].map(m => (
              <div key={m.l} style={{
                padding: '10px 4px', borderRadius: 10,
                background: m.a ? L.primarySurface : L.sHigh,
                border: m.a ? `1px solid ${L.bAccent}` : '1px solid transparent',
                textAlign: 'center',
              }}>
                <span className="mi" style={{ fontSize: 20, color: m.a ? L.primary : L.text2 }}>{m.i}</span>
                <div style={{ ...T.labelSm, color: m.a ? L.primary : L.text2, marginTop: 2 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 16px 20px' }}>
        <Btn label="Log this meal" variant="primary" size="lg" block trailing="check"
          onClick={() => onNavigate && onNavigate('diet')}/>
      </div>
    </Screen>
  );
}

Object.assign(window, { FoodSearch, FoodDetail });
