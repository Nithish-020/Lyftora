/* App entrypoint — lays out all 18 screens on the Design Canvas.
   Wires up click-through navigation via a shared state for the "hero" flow.
*/

// Small hook — clickable state machine that syncs selected screen across frames
function useFlow(initial = 'home') {
  const [cur, setCur] = React.useState(initial);
  return [cur, setCur];
}

// Phone wrapper just to sugar the Pixel device
function Phone({ children, bg, time = '9:41' }) {
  return <Pixel bg={bg} time={time}>{children}</Pixel>;
}

// Clickable core-tab strip. Navigating to a tab flips which phone is "active"
// by updating the artboard-level flow state in the hero section.
function HeroTabsFlow() {
  const [cur, setCur] = useFlow('home');

  // Each flow step: screen id -> component
  const frames = {
    home: { label: '05 · Home', el: <Dashboard onNavigate={setCur}/> },
    workout: { label: '06 · Templates', el: <WorkoutTemplates onNavigate={setCur}/> },
    active: { label: '09 · Active Workout', el: <ActiveWorkout onNavigate={setCur}/> },
    rest: { label: '11 · Rest Timer', el: <RestTimer onNavigate={setCur}/> },
    summary: { label: '12 · Summary', el: <PostWorkout onNavigate={setCur}/> },
    picker: { label: '10 · Picker', el: <ExercisePicker onNavigate={setCur}/> },
    coach: { label: '15 · Coach', el: <CoachChat onNavigate={setCur}/> },
    diet: { label: '07 · Nutrition', el: <Nutrition onNavigate={setCur}/> },
    foodSearch: { label: '13 · Food Search', el: <FoodSearch onNavigate={setCur}/> },
    foodDetail: { label: '14 · Food Detail', el: <FoodDetail onNavigate={setCur}/> },
    progress: { label: '08 · Progress', el: <Progress onNavigate={setCur}/> },
  };
  const cur_ = frames[cur] || frames.home;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{
        padding: '6px 12px', borderRadius: 999,
        background: '#1A2235', color: '#00D4AA',
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600,
        letterSpacing: 1, textTransform: 'uppercase',
        border: '1px solid rgba(0,212,170,0.30)',
      }}>{cur_.label} · click to navigate</div>
      <Phone>{cur_.el}</Phone>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="hero" title="Hero Flow · Click through"
        subtitle="The connective tissue — tap inside the phone to move between Home → Workout → Active → Rest → Summary, plus side-trips to Coach and Nutrition.">
        <DCArtboard id="hero-flow" label="Interactive prototype" width={400} height={860}>
          <div style={{ padding: '20px 20px 30px', background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <HeroTabsFlow/>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="onboarding" title="Onboarding"
        subtitle="Warm, welcoming first contact. Ambient gradients on the welcome screen fade into a focused 3-step flow.">
        <DCArtboard id="o1" label="01 · Welcome" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><Welcome/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="o2" label="02 · AI Coach" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><OnbCoachIntro/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="o3" label="03 · Tracking" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><OnbTrackingIntro/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="o4" label="04 · Profile Setup" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><OnbProfileSetup/></Phone>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="core" title="Core Tabs"
        subtitle="Home · Workouts · Nutrition · Progress. Dark-first, mint for action, amber for streaks, purple reserved for AI.">
        <DCArtboard id="c5" label="05 · Home Dashboard" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><Dashboard/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="c6" label="06 · Templates" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><WorkoutTemplates/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="c7" label="07 · Nutrition Log" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><Nutrition/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="c8" label="08 · Progress" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><Progress/></Phone>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="workout" title="Workout Flow · Hero"
        subtitle="Active Workout is the most-used screen. Logged sets, PR glow, rest timer overlay, and a celebratory summary close the loop.">
        <DCArtboard id="w9" label="09 · Active Workout" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><ActiveWorkout/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="w10" label="10 · Exercise Picker" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><ExercisePicker/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="w11" label="11 · Rest Timer" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><RestTimer/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="w12" label="12 · Post-Workout" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><PostWorkout/></Phone>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="nutrition" title="Nutrition Flow"
        subtitle="Indian foods live alongside generic items. Serving picker with translucent glass + real macros.">
        <DCArtboard id="n13" label="13 · Food Search" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><FoodSearch/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="n14" label="14 · Food Detail" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><FoodDetail/></Phone>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="coach" title="AI Coach"
        subtitle="Purple is reserved for AI only. Warm + hype tone — 'Yo Nithish. Let's send it.'">
        <DCArtboard id="ai15" label="15 · Coach Chat" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><CoachChat/></Phone>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="social" title="Profile & Social"
        subtitle="Profile, community feed with PR posts, achievements with streak calendar.">
        <DCArtboard id="p16" label="16 · Profile" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><Profile/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="p17" label="17 · Community" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><Feed/></Phone>
          </div>
        </DCArtboard>
        <DCArtboard id="p18" label="18 · Achievements" width={380} height={840}>
          <div style={{ padding: 20, background: '#f0eee9', height: '100%', boxSizing: 'border-box' }}>
            <Phone><Achievements/></Phone>
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
