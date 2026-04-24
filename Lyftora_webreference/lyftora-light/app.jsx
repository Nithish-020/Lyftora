/* LIGHT — App entrypoint. Lays out all 18 screens on the Design Canvas.
   Cream/ink/lime aesthetic mirroring the main Design System.
*/

function useLFlow(initial = 'home') {
  const [cur, setCur] = React.useState(initial);
  return [cur, setCur];
}

function LPhone({ children, bg, time = '9:41' }) {
  return <LPixel bg={bg} time={time}>{children}</LPixel>;
}

function LHeroTabsFlow() {
  const [cur, setCur] = useLFlow('home');

  const frames = {
    home: { label: '05 · Home', el: <LDashboard onNavigate={setCur}/> },
    workout: { label: '06 · Templates', el: <LWorkoutTemplates onNavigate={setCur}/> },
    active: { label: '09 · Active Workout', el: <LActiveWorkout onNavigate={setCur}/> },
    rest: { label: '11 · Rest Timer', el: <LRestTimer onNavigate={setCur}/> },
    summary: { label: '12 · Summary', el: <LPostWorkout onNavigate={setCur}/> },
    picker: { label: '10 · Picker', el: <LExercisePicker onNavigate={setCur}/> },
    coach: { label: '15 · Coach', el: <LCoachChat onNavigate={setCur}/> },
    diet: { label: '07 · Nutrition', el: <LNutrition onNavigate={setCur}/> },
    foodSearch: { label: '13 · Food Search', el: <LFoodSearch onNavigate={setCur}/> },
    foodDetail: { label: '14 · Food Detail', el: <LFoodDetail onNavigate={setCur}/> },
    progress: { label: '08 · Progress', el: <LProgress onNavigate={setCur}/> },
    profile: { label: '16 · Profile', el: <LProfile onNavigate={setCur}/> },
    community: { label: '17 · Community', el: <LCommunity onNavigate={setCur}/> },
    achievements: { label: '18 · Achievements', el: <LAchievements onNavigate={setCur}/> },
  };
  const cur_ = frames[cur] || frames.home;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{
        padding: '6px 14px', borderRadius: 999,
        background: LL.ink, color: LL.primary,
        fontFamily: FL.mono, fontSize: 10, fontWeight: 500,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        boxShadow: LL.shGlow,
      }}>{cur_.label} · click to navigate</div>
      <LPhone>{cur_.el}</LPhone>
    </div>
  );
}

function LArt({ children, pad = 20 }) {
  return (
    <div style={{ padding: pad, background: '#EAE4D5', height: '100%', boxSizing: 'border-box' }}>
      {children}
    </div>
  );
}

function LApp() {
  return (
    <DesignCanvas>
      <DCSection id="hero" title="Hero Flow · Click through"
        subtitle="Cream-forward aesthetic — serif display, lime primary, coral for emphasis, violet reserved for AI. Tap inside the phone to walk the main loop.">
        <DCArtboard id="hero-flow" label="Interactive prototype" width={400} height={860}>
          <LArt><LHeroTabsFlow/></LArt>
        </DCArtboard>
      </DCSection>

      <DCSection id="onboarding" title="Onboarding"
        subtitle="Ambient gradient wash (lime·coral·violet on cream), grain overlay, Instrument Serif display with italic coral emphasis.">
        <DCArtboard id="lo1" label="01 · Welcome" width={380} height={840}>
          <LArt><LPhone><LWelcome/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lo2" label="02 · AI Coach" width={380} height={840}>
          <LArt><LPhone><LOnbCoachIntro/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lo3" label="03 · Tracking" width={380} height={840}>
          <LArt><LPhone><LOnbTrackingIntro/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lo4" label="04 · Profile Setup" width={380} height={840}>
          <LArt><LPhone><LOnbProfileSetup/></LPhone></LArt>
        </DCArtboard>
      </DCSection>

      <DCSection id="core" title="Core Tabs"
        subtitle="Cream surfaces, ink ribbon tab bar, lime CTA glow. Home · Templates · Diet · Progress.">
        <DCArtboard id="lc5" label="05 · Home Dashboard" width={380} height={840}>
          <LArt><LPhone><LDashboard/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lc6" label="06 · Templates" width={380} height={840}>
          <LArt><LPhone><LWorkoutTemplates/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lc7" label="07 · Diet Diary" width={380} height={840}>
          <LArt><LPhone><LNutrition/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lc8" label="08 · Progress" width={380} height={840}>
          <LArt><LPhone><LProgress/></LPhone></LArt>
        </DCArtboard>
      </DCSection>

      <DCSection id="workout" title="Workout Flow · Hero"
        subtitle="Active set logging on cream, rest timer with lime glow halo and coral PR shout-out, and the celebration summary.">
        <DCArtboard id="lw9" label="09 · Active Workout" width={380} height={840}>
          <LArt><LPhone><LActiveWorkout/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lw10" label="10 · Exercise Picker" width={380} height={840}>
          <LArt><LPhone><LExercisePicker/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lw11" label="11 · Rest Timer" width={380} height={840}>
          <LArt><LPhone><LRestTimer/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lw12" label="12 · Post-Workout" width={380} height={840}>
          <LArt><LPhone><LPostWorkout/></LPhone></LArt>
        </DCArtboard>
      </DCSection>

      <DCSection id="nutrition" title="Nutrition Flow"
        subtitle="Indian staples with Devanagari/Tamil labels alongside macros. Serif display for food names, mono for numbers.">
        <DCArtboard id="ln13" label="13 · Food Search" width={380} height={840}>
          <LArt><LPhone><LFoodSearch/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="ln14" label="14 · Food Detail" width={380} height={840}>
          <LArt><LPhone><LFoodDetail/></LPhone></LArt>
        </DCArtboard>
      </DCSection>

      <DCSection id="coach" title="AI Coach"
        subtitle="Violet-only accents for AI. Warm + hype tone. Suggestion pills above the composer.">
        <DCArtboard id="lai15" label="15 · Coach Chat" width={380} height={840}>
          <LArt><LPhone><LCoachChat/></LPhone></LArt>
        </DCArtboard>
      </DCSection>

      <DCSection id="social" title="Profile & Social"
        subtitle="Profile with ink stat bar. Community feed with PR spotlight cards. Achievements with GitHub-style streak calendar.">
        <DCArtboard id="lp16" label="16 · Profile" width={380} height={840}>
          <LArt><LPhone><LProfile/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lp17" label="17 · Community" width={380} height={840}>
          <LArt><LPhone><LCommunity/></LPhone></LArt>
        </DCArtboard>
        <DCArtboard id="lp18" label="18 · Achievements" width={380} height={840}>
          <LArt><LPhone><LAchievements/></LPhone></LArt>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LApp/>);
