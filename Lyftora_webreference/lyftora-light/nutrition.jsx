/* LIGHT Nutrition (2): Food Search · Food Detail */

function LFoodSearch({ onNavigate }) {
  const categories = ['All', 'Indian', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const recent = [
    { name: 'Moong Dal', regional: 'मूंग दाल', serving: '1 bowl · 150g', kcal: 198, p: 14, c: 28, f: 4, tint: 'lime' },
    { name: 'Chapati', regional: 'चपाती', serving: '1 pc · 40g', kcal: 104, p: 3, c: 20, f: 2, tint: 'cream' },
    { name: 'Chicken Tikka', regional: 'चिकन टिक्का', serving: '100g', kcal: 186, p: 28, c: 2, f: 7, tint: 'coral' },
  ];
  const indian = [
    { name: 'Paneer Bhurji', regional: 'पनीर भुर्जी', serving: '100g', kcal: 232, p: 16, c: 5, f: 17, tint: 'coral' },
    { name: 'Masala Oats', regional: 'मसाला ओट्स', serving: '1 bowl', kcal: 280, p: 10, c: 42, f: 7, tint: 'lime' },
    { name: 'Idli', regional: 'இட்லி', serving: '2 pc', kcal: 132, p: 4, c: 26, f: 1, tint: 'cream' },
    { name: 'Rajma', regional: 'राजमा', serving: '1 bowl', kcal: 212, p: 14, c: 32, f: 3, tint: 'coral' },
  ];

  return (
    <LScreen bg={LL.bg} padBottom={false}>
      <LTopBar title="Add Food"
        left={<LIconBtn icon="close" onClick={() => onNavigate && onNavigate('nutrition')}/>}
        right={<LIconBtn icon="qr_code_scanner"/>}
      />

      <div style={{ padding: '0 16px' }}>
        <div style={{
          height: 54, background: '#fff', borderRadius: 16,
          display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px',
          border: `1.5px solid ${LL.ink}`,
          boxShadow: LL.shSm,
        }}>
          <span className="mi" style={{ fontSize: 22, color: LL.ink }}>search</span>
          <span style={{ ...TL.bodyLg, color: LL.ink, flex: 1 }}>dal<span style={{ width: 2, height: 18, background: LL.coral, display: 'inline-block', marginLeft: 2, verticalAlign: -3 }}/></span>
          <span className="mi" style={{ fontSize: 20, color: LL.text2 }}>mic</span>
        </div>
        <div style={{ ...TL.bodySm, color: LL.text2, marginTop: 8, marginLeft: 4 }}>
          <span className="mi" style={{ fontSize: 12, verticalAlign: -1, color: LL.violet }}>auto_awesome</span>
          {' '}Coach also suggests: <span style={{ color: LL.ink, textDecoration: 'underline' }}>moong dal</span>, <span style={{ color: LL.ink, textDecoration: 'underline' }}>tadka dal</span>
        </div>
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {categories.map((c, i) => <LChip key={c} label={c} active={i === 1}/>)}
      </div>

      <LSectionLabel>RECENT</LSectionLabel>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {recent.map((f, i) => (
          <LFoodRow key={i} food={f}
            onClick={() => i === 0 && onNavigate && onNavigate('foodDetail')}/>
        ))}
      </div>

      <LSectionLabel action={<span style={{ ...TL.labelSm, color: LL.ink, textDecoration: 'underline' }}>SEE ALL</span>}>
        INDIAN STAPLES
      </LSectionLabel>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {indian.map((f, i) => <LFoodRow key={i} food={f}/>)}
      </div>

      <LSectionLabel>QUICK ADD</LSectionLabel>
      <div style={{ padding: '0 16px 28px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {[
          { icon: 'edit_note', label: 'Manual' },
          { icon: 'photo_camera', label: 'Snap meal' },
          { icon: 'auto_awesome', label: 'Describe to AI', tint: 'ai' },
        ].map(q => (
          <div key={q.label} style={{
            minWidth: 120, padding: 14, borderRadius: 16,
            background: q.tint === 'ai' ? LL.aiSurface : '#fff',
            border: `1px solid ${q.tint === 'ai' ? LL.bAI : LL.bSubtle}`,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <span className="mi" style={{ fontSize: 22, color: q.tint === 'ai' ? LL.violet : LL.ink }}>{q.icon}</span>
            <span style={{ ...TL.titleSm, color: q.tint === 'ai' ? LL.violet : LL.ink }}>{q.label}</span>
          </div>
        ))}
      </div>
    </LScreen>
  );
}

function LFoodRow({ food, onClick }) {
  return (
    <div onClick={onClick} style={{
      padding: 12, borderRadius: 14, background: '#fff', border: `1px solid ${LL.bSubtle}`,
      display: 'flex', alignItems: 'center', gap: 12, cursor: onClick ? 'pointer' : 'default',
    }}>
      <LPlaceholder w={48} h={48} tint={food.tint} icon="restaurant" radius={10}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ ...TL.titleMd, color: LL.ink }}>{food.name}</span>
          {food.regional && <span style={{ ...TL.bodySm, color: LL.text2 }}>{food.regional}</span>}
        </div>
        <div style={{ ...TL.bodySm, color: LL.text2, marginTop: 2 }}>{food.serving}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <span style={{ ...TL.mono, fontSize: 10, color: LL.ink }}>P {food.p}</span>
          <span style={{ ...TL.mono, fontSize: 10, color: LL.coral }}>C {food.c}</span>
          <span style={{ ...TL.mono, fontSize: 10, color: LL.violet }}>F {food.f}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right', marginRight: 4 }}>
        <div style={{ fontFamily: FL.serif, fontSize: 20, color: LL.ink, letterSpacing: -0.4, lineHeight: 1 }}>{food.kcal}</div>
        <div style={{ ...TL.labelSm, color: LL.text2 }}>KCAL</div>
      </div>
      <div style={{
        width: 32, height: 32, borderRadius: 16,
        background: LL.ink, color: LL.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span className="mi" style={{ fontSize: 18 }}>add</span>
      </div>
    </div>
  );
}

function LFoodDetail({ onNavigate }) {
  return (
    <LScreen bg={LL.bg} padBottom={false}>
      <div style={{
        position: 'relative', height: 220,
        background: `
          radial-gradient(70% 80% at 30% 30%, rgba(214,255,77,0.70), transparent 65%),
          radial-gradient(60% 70% at 80% 70%, rgba(255,90,60,0.35), transparent 65%)`,
      }}>
        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <LIconBtn icon="arrow_back" bg="rgba(255,255,255,0.7)"
            onClick={() => onNavigate && onNavigate('foodSearch')}/>
          <div style={{ display: 'flex', gap: 8 }}>
            <LIconBtn icon="bookmark_border" bg="rgba(255,255,255,0.7)"/>
            <LIconBtn icon="ios_share" bg="rgba(255,255,255,0.7)"/>
          </div>
        </div>
        <div style={{ position: 'absolute', inset: '30% 20% 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 140, height: 140, borderRadius: 20,
            background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)',
            border: `1px solid ${LL.bSubtle}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="mi" style={{ fontSize: 64, color: LL.ink }}>ramen_dining</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 4px' }}>
        <div style={{ ...TL.labelMd, color: LL.text2 }}>INDIAN · LEGUMES</div>
        <h1 style={{ fontFamily: FL.serif, fontWeight: 400, fontSize: 38, lineHeight: 1, letterSpacing: -1, color: LL.ink, margin: '4px 0 2px' }}>
          Moong <LEm>Dal</LEm>
        </h1>
        <div style={{ ...TL.bodyMd, color: LL.text2 }}>मूंग दाल · yellow lentil curry</div>
      </div>

      {/* Serving + kcal */}
      <div style={{ padding: '12px 20px 0', display: 'flex', gap: 12 }}>
        <LCard style={{ flex: 1, padding: 14 }}>
          <div style={{ ...TL.labelSm, color: LL.text2 }}>SERVING</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <LIconBtn icon="remove" size={28} bg={LL.bg2}/>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: FL.serif, fontSize: 24, color: LL.ink, letterSpacing: -0.4, lineHeight: 1 }}>1 bowl</div>
              <div style={{ ...TL.labelSm, color: LL.text2, marginTop: 2 }}>150 g</div>
            </div>
            <LIconBtn icon="add" size={28} bg={LL.ink} color={LL.bg}/>
          </div>
        </LCard>
        <LCard style={{ width: 120, padding: 14, textAlign: 'center', background: LL.ink, color: LL.bg, border: 'none' }}>
          <div style={{ ...TL.labelSm, color: 'rgba(244,239,228,0.65)' }}>KCAL</div>
          <div style={{ fontFamily: FL.serif, fontSize: 38, color: LL.primary, letterSpacing: -1, lineHeight: 1, marginTop: 4 }}>198</div>
          <div style={{ ...TL.labelSm, color: 'rgba(244,239,228,0.65)', marginTop: 2 }}>≈ 8% OF DAY</div>
        </LCard>
      </div>

      <LSectionLabel>MACROS</LSectionLabel>
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'PROTEIN', val: 14, unit: 'g', color: LL.ink, pct: '28%' },
          { label: 'CARBS', val: 28, unit: 'g', color: LL.coral, pct: '56%' },
          { label: 'FAT', val: 4, unit: 'g', color: LL.violet, pct: '16%' },
        ].map(m => (
          <LCard key={m.label} style={{ padding: 14, textAlign: 'center' }}>
            <div style={{ ...TL.labelSm, color: LL.text2 }}>{m.label}</div>
            <div style={{ fontFamily: FL.serif, fontSize: 28, color: m.color, letterSpacing: -0.8, marginTop: 2, lineHeight: 1 }}>
              {m.val}<span style={{ fontSize: 14, color: LL.text2 }}>{m.unit}</span>
            </div>
            <div style={{
              height: 4, borderRadius: 2, background: 'rgba(14,14,18,0.08)',
              marginTop: 8, overflow: 'hidden',
            }}>
              <div style={{ width: m.pct, height: '100%', background: m.color }}/>
            </div>
          </LCard>
        ))}
      </div>

      <LSectionLabel>MICRONUTRIENTS</LSectionLabel>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'Fiber', val: '8 g', pct: 0.32 },
          { label: 'Iron', val: '3.2 mg', pct: 0.22 },
          { label: 'Folate', val: '172 µg', pct: 0.43 },
          { label: 'Potassium', val: '540 mg', pct: 0.18 },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
            <span style={{ ...TL.bodyMd, color: LL.ink, width: 90 }}>{m.label}</span>
            <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(14,14,18,0.08)', overflow: 'hidden' }}>
              <div style={{ width: `${m.pct * 100}%`, height: '100%', background: LL.ink }}/>
            </div>
            <span style={{ ...TL.mono, fontSize: 11, color: LL.text2, width: 70, textAlign: 'right' }}>{m.val}</span>
          </div>
        ))}
      </div>

      <LSectionLabel>ADD TO</LSectionLabel>
      <div style={{ padding: '0 20px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((m, i) => (
          <LChip key={m} label={m} active={i === 1}/>
        ))}
      </div>

      <div style={{ padding: '24px 20px 28px' }}>
        <LBtn label="Add to Lunch · 198 kcal" variant="ink" size="lg" block icon="add"
          onClick={() => onNavigate && onNavigate('nutrition')}/>
      </div>
    </LScreen>
  );
}

Object.assign(window, { LFoodSearch, LFoodDetail });
