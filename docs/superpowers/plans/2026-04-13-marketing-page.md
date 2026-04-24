# Lyftora Marketing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, SEO-optimized marketing landing page for Lyftora at `website/lyftora-site/` using vanilla HTML/CSS/JS.

**Architecture:** Single-page site with 8 content sections, smooth-scroll navigation, responsive layout (mobile-first), and dark theme matching Lyftora's app design system. No frameworks — vanilla HTML/CSS/JS only. Google Fonts for DM Serif Display and Outfit. CSS custom properties for design tokens.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript (smooth scroll, intersection observer for animations, mobile nav toggle)

**Spec:** `docs/superpowers/specs/2026-04-13-marketing-page-content-design.md`

---

## File Structure

```
website/lyftora-site/
├── index.html          — Single page with all 8 sections, semantic HTML, SEO meta tags
├── css/
│   ├── tokens.css      — CSS custom properties (colors, spacing, typography, radii)
│   ├── base.css        — Reset, body defaults, typography base, utility classes
│   ├── layout.css      — Container, grid, section spacing, responsive breakpoints
│   └── sections.css    — Styles for all 8 sections (nav, hero, features, etc.)
├── js/
│   └── main.js         — Smooth scroll, mobile nav toggle, scroll animations, navbar shrink
└── assets/
    └── images/         — Placeholder images directory (screenshots added later)
```

**Why this split:**
- `tokens.css` — single source of truth for design tokens, easy to update
- `base.css` — reusable reset and typography, changes rarely
- `layout.css` — responsive grid/container system, shared by all sections
- `sections.css` — all section-specific styles in one file (page is small enough that splitting per-section would be over-engineering)
- `main.js` — minimal JS, all in one file (< 100 lines expected)

---

## Task 1: CSS Foundation (tokens + base + layout)

**Files:**
- Create: `website/lyftora-site/css/tokens.css`
- Create: `website/lyftora-site/css/base.css`
- Create: `website/lyftora-site/css/layout.css`

- [ ] **Step 1: Create tokens.css with design system custom properties**

```css
/* website/lyftora-site/css/tokens.css */
:root {
  /* Colors — from Lyftora dark theme (src/theme/colors.ts) */
  --color-bg: #0A0E1A;
  --color-bg-alt: #0F1322;
  --color-surface: #141829;
  --color-surface-elevated: #1C2038;
  --color-primary: #00D4AA;
  --color-accent: #7C6AF7;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0A0B0;
  --color-text-tertiary: #6B6B7B;
  --color-border: #2A2E42;
  --color-bg-dark: #0A0E1A;

  /* Spacing — 4pt grid from src/theme/spacing.ts */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-base: 16px;
  --space-lg: 20px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 48px;
  --space-4xl: 64px;
  --space-5xl: 80px;
  --space-6xl: 120px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* Typography — mapped to web equivalents */
  --font-display: 'DM Serif Display', serif;
  --font-body: 'Outfit', sans-serif;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(0, 212, 170, 0.2);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

- [ ] **Step 2: Create base.css with reset, typography, and utilities**

```css
/* website/lyftora-site/css/base.css */

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-primary);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

ul, ol {
  list-style: none;
}

/* Typography */
h1, h2, h3, h4 {
  line-height: 1.2;
  font-weight: 700;
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.5px;
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}

h3 {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
}

h4 {
  font-size: 1.125rem;
}

.text-secondary {
  color: var(--color-text-secondary);
}

.text-tertiary {
  color: var(--color-text-tertiary);
}

.text-primary-color {
  color: var(--color-primary);
}

.text-accent {
  color: var(--color-accent);
}

/* Eyebrow text */
.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.eyebrow--accent {
  color: var(--color-accent);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  padding: 14px 32px;
  border-radius: var(--radius-md);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-bg);
  font-weight: 700;
  box-shadow: var(--shadow-glow);
}

.btn--primary:hover {
  box-shadow: 0 0 30px rgba(0, 212, 170, 0.35);
}

.btn--ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.btn--ghost:hover {
  border-color: var(--color-text-secondary);
}

.btn--inverted {
  background: var(--color-bg);
  color: var(--color-primary);
  font-weight: 700;
}

/* Cards */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
}

/* Visually hidden (for screen readers) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 3: Create layout.css with container, section, and responsive grid**

```css
/* website/lyftora-site/css/layout.css */

.container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

.section {
  padding: var(--space-6xl) 0;
}

/* Two-column layout */
.two-col {
  display: flex;
  align-items: center;
  gap: var(--space-3xl);
}

.two-col--reverse {
  flex-direction: row-reverse;
}

.two-col__content,
.two-col__visual {
  flex: 1;
  min-width: 0;
}

/* Grid layouts */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
}

/* Screenshot placeholder */
.screenshot-placeholder {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-3xl);
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-base);
  }

  .section {
    padding: var(--space-4xl) 0;
  }

  .two-col,
  .two-col--reverse {
    flex-direction: column;
    gap: var(--space-2xl);
  }

  .grid-2 {
    grid-template-columns: 1fr;
  }

  .grid-3 {
    grid-template-columns: 1fr;
  }

  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Verify CSS files are created correctly**

Run: `ls -la website/lyftora-site/css/`
Expected: `tokens.css`, `base.css`, `layout.css` all present

- [ ] **Step 5: Commit**

```bash
git add website/lyftora-site/css/tokens.css website/lyftora-site/css/base.css website/lyftora-site/css/layout.css
git commit -m "feat(website): add CSS foundation — tokens, base reset, and responsive layout"
```

---

## Task 2: HTML Structure (index.html with all 8 sections)

**Files:**
- Create: `website/lyftora-site/index.html`

- [ ] **Step 1: Create index.html with head, SEO meta tags, and font loading**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta Tags -->
  <title>Lyftora — AI Personal Trainer & Indian Diet Tracker | Best Fitness App India</title>
  <meta name="description" content="Lyftora is India's first AI fitness coach. Get personalized workout plans, track 100+ Indian foods with real macros, and train smarter with an AI that adapts to you. Download now.">
  <meta name="keywords" content="AI fitness app India, AI personal trainer app, Indian diet tracker, workout planner India, AI workout generator, nutrition tracker Indian food, best gym app India, fitness coach app">

  <!-- Open Graph -->
  <meta property="og:title" content="Lyftora — Your AI Fitness Coach, Built for India">
  <meta property="og:description" content="AI-generated workout plans. Indian nutrition tracking. A personal coach that adapts to you. All in one app.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://lyftora.com">
  <meta property="og:image" content="assets/images/og-image.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Lyftora — Your AI Fitness Coach, Built for India">
  <meta name="twitter:description" content="AI-generated workout plans. Indian nutrition tracking. A personal coach that adapts to you.">

  <!-- Canonical -->
  <link rel="canonical" href="https://lyftora.com">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/sections.css">
</head>
<body>
```

- [ ] **Step 2: Add Section 1 — Navigation + Hero**

Add after `<body>`:

```html
  <!-- Navigation -->
  <header class="navbar" id="navbar">
    <nav class="container navbar__inner" aria-label="Main navigation">
      <a href="#" class="navbar__logo">Lyftora</a>
      <ul class="navbar__links" id="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#footer">About</a></li>
      </ul>
      <a href="https://play.google.com/store" class="btn btn--primary navbar__cta" target="_blank" rel="noopener">Download Now</a>
      <button class="navbar__toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="container hero__inner">
      <p class="eyebrow">India's #1 AI Fitness App</p>
      <h1 class="hero__title">Train Smarter. Eat Better.<br><span class="text-primary-color">India's First AI Fitness Coach.</span></h1>
      <p class="hero__subtitle text-secondary">Smart workout plans. Accurate Indian nutrition tracking. An AI coach that gets better as you do. Welcome to fitness that actually fits your life.</p>
      <div class="hero__ctas">
        <a href="https://play.google.com/store" class="btn btn--primary" target="_blank" rel="noopener">Download Now</a>
        <a href="#how-it-works" class="btn btn--ghost">See How It Works ↓</a>
      </div>
      <p class="hero__platform text-tertiary">Available on Android · iOS coming soon</p>
      <div class="hero__screenshot screenshot-placeholder">
        App Dashboard — AI coach greeting, today's workout plan, macro rings with Indian food entries
      </div>
    </div>
  </section>
```

- [ ] **Step 3: Add Section 2 — AI Coach Feature**

```html
  <!-- AI Coach Feature -->
  <section class="section ai-coach">
    <div class="container two-col">
      <div class="two-col__content">
        <p class="eyebrow eyebrow--accent">AI-Powered Coaching</p>
        <h2>Like Having a Trainer<br><span class="text-accent">Who Never Cancels on You.</span></h2>
        <p class="text-secondary" style="margin-top: var(--space-base); line-height: 1.7;">Lyftora's AI coach learns how you train, what you eat, and where you're stuck — then builds a plan that actually works for your body and your schedule. Ask it anything. It adapts as you grow.</p>
        <ul class="check-list" aria-label="AI coach features">
          <li class="check-list__item">Personalized workout plans generated in seconds</li>
          <li class="check-list__item">Nutrition advice that understands Indian meals</li>
          <li class="check-list__item">Adapts to your progress — gets smarter over time</li>
        </ul>
      </div>
      <div class="two-col__visual">
        <div class="screenshot-placeholder">AI Coach Chat — user asks about poha for breakfast, AI responds with personalized lunch plan</div>
      </div>
    </div>
  </section>
```

- [ ] **Step 4: Add Section 3 — Indian Nutrition Feature**

```html
  <!-- Indian Nutrition Feature -->
  <section class="section nutrition" style="background: var(--color-bg-alt);">
    <div class="container two-col two-col--reverse">
      <div class="two-col__content">
        <p class="eyebrow">Built for Indian Food</p>
        <h2>100+ Indian Dishes.<br>Real Macros. <span class="text-primary-color">Zero Guesswork.</span></h2>
        <p class="text-secondary" style="margin-top: var(--space-base); line-height: 1.7;">We built a nutrition database for how India eats — regional dishes, real serving sizes, accurate macros. Log your meals in seconds, see exactly where your protein, carbs, and fats stand, and let the AI adjust your plan accordingly.</p>
        <div class="food-chips" aria-label="Example Indian dishes tracked">
          <span class="food-chip">Biryani</span>
          <span class="food-chip">Dal Tadka</span>
          <span class="food-chip">Roti</span>
          <span class="food-chip">Dosa</span>
          <span class="food-chip">Paneer Butter Masala</span>
          <span class="food-chip">Poha</span>
          <span class="food-chip">Tandoori Chicken</span>
          <span class="food-chip food-chip--more">+ 100 more</span>
        </div>
      </div>
      <div class="two-col__visual">
        <div class="screenshot-placeholder">Nutrition Tracker — Poha 158 cal, Dal Tadka 210 cal, Chicken Biryani 490 cal with macro breakdown rings</div>
      </div>
    </div>
  </section>
```

- [ ] **Step 5: Add Section 4 — Feature Breakdown (4-card grid)**

```html
  <!-- Feature Breakdown -->
  <section class="section features" id="features">
    <div class="container">
      <div class="section__header">
        <h2>Built to Do It All.<br><span class="text-primary-color">So You Don't Need Anything Else.</span></h2>
      </div>
      <div class="grid-2 features__grid">
        <div class="card feature-card">
          <span class="feature-card__icon" aria-hidden="true">🧠</span>
          <h3>AI That Gets You</h3>
          <p class="text-secondary">Tell it your goals, your limits, your schedule. It builds the perfect plan — and updates it as you grow.</p>
        </div>
        <div class="card feature-card">
          <span class="feature-card__icon" aria-hidden="true">💪</span>
          <h3>Never Skip. Never Guess.</h3>
          <p class="text-secondary">Structured workout plans with exercise guides, set tracking, and a rest timer that keeps you honest.</p>
        </div>
        <div class="card feature-card">
          <span class="feature-card__icon" aria-hidden="true">🍛</span>
          <h3>Indian Food. Actual Macros.</h3>
          <p class="text-secondary">From poha to paneer — 100+ dishes with region-accurate nutrition. Log meals in seconds, not minutes.</p>
        </div>
        <div class="card feature-card">
          <span class="feature-card__icon" aria-hidden="true">📈</span>
          <h3>Proof You're Getting Stronger</h3>
          <p class="text-secondary">PR tracking, body measurements, visual charts. Your progress, clear as day.</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 6: Add Section 5 — Three Pocket Features**

```html
  <!-- Pocket Features -->
  <section class="section pocket-features" style="background: var(--color-bg-alt);">
    <div class="container">
      <div class="section__header">
        <h2>Small Features.<br><span class="text-primary-color">Big Difference.</span></h2>
      </div>
      <div class="grid-3 pocket-features__grid">
        <div class="card pocket-card">
          <span class="pocket-card__icon" aria-hidden="true">📡</span>
          <h3>Works Offline</h3>
          <p class="text-secondary">No WiFi at the gym? No problem. Track workouts and meals without internet.</p>
        </div>
        <div class="card pocket-card">
          <span class="pocket-card__icon" aria-hidden="true">⏱️</span>
          <h3>Smart Rest Timer</h3>
          <p class="text-secondary">Auto-starts between sets. Keeps you focused, not scrolling Instagram.</p>
        </div>
        <div class="card pocket-card">
          <span class="pocket-card__icon" aria-hidden="true">📚</span>
          <h3>Exercise Library</h3>
          <p class="text-secondary">Searchable database with form guides. Never wonder "am I doing this right?" again.</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 7: Add Section 6 — Social Proof (Stats)**

```html
  <!-- Social Proof / Stats -->
  <section class="section stats">
    <div class="container">
      <div class="section__header">
        <h2>Don't Take Our Word for It.<br><span class="text-primary-color">Take Theirs.</span></h2>
      </div>
      <div class="grid-4 stats__grid">
        <div class="card stat-card">
          <span class="stat-card__number">100+</span>
          <p class="stat-card__label text-secondary">Indian dishes tracked</p>
        </div>
        <div class="card stat-card">
          <span class="stat-card__number">500+</span>
          <p class="stat-card__label text-secondary">Exercises in library</p>
        </div>
        <div class="card stat-card">
          <span class="stat-card__number">24/7</span>
          <p class="stat-card__label text-secondary">AI coach available</p>
        </div>
        <div class="card stat-card">
          <span class="stat-card__number">100%</span>
          <p class="stat-card__label text-secondary">Offline capable</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 8: Add Section 7 — How It Works (3-step alternating)**

```html
  <!-- How It Works -->
  <section class="section how-it-works" id="how-it-works" style="background: var(--color-bg-alt);">
    <div class="container">
      <div class="section__header">
        <h2>Getting Started Is<br><span class="text-primary-color">Stupidly Simple.</span></h2>
      </div>

      <!-- Step 1 -->
      <div class="two-col step">
        <div class="two-col__visual">
          <div class="screenshot-placeholder">Onboarding screen — goals, fitness level, dietary preferences</div>
        </div>
        <div class="two-col__content">
          <span class="step__label">Step 1</span>
          <h3>Tell Us Who You Are</h3>
          <p class="text-secondary">Quick profile setup — your fitness goals, current level, dietary preferences, injuries, and equipment access. The more you share, the smarter your AI coach gets.</p>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="two-col two-col--reverse step">
        <div class="two-col__visual">
          <div class="screenshot-placeholder">AI coach generating a personalized workout + nutrition plan</div>
        </div>
        <div class="two-col__content">
          <span class="step__label">Step 2</span>
          <h3>Your AI Coach Takes Over</h3>
          <p class="text-secondary">In seconds, Lyftora generates a complete workout plan and Indian-friendly meal suggestions. Ask your coach to tweak anything — it's a conversation, not a template.</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="two-col step">
        <div class="two-col__visual">
          <div class="screenshot-placeholder">Dashboard with progress charts and PR celebration</div>
        </div>
        <div class="two-col__content">
          <span class="step__label">Step 3</span>
          <h3>Show Up. The App Does the Rest.</h3>
          <p class="text-secondary">Follow your plan, log meals with a tap, track PRs automatically. Your AI coach reviews your week and adjusts — so every week is better than the last.</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 9: Add Section 8 — Final CTA + Footer**

```html
  <!-- Final CTA -->
  <section class="final-cta">
    <div class="container final-cta__inner">
      <h2>The Gym Is Waiting.<br>So Is Your AI Coach.</h2>
      <p>Smart workouts. Indian nutrition. AI coaching. All in one app that actually gets you.</p>
      <a href="https://play.google.com/store" class="btn btn--inverted" target="_blank" rel="noopener">Download Now</a>
      <p class="final-cta__platform">Free on Android · iOS coming soon</p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer" id="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="#" class="footer__logo">Lyftora</a>
        <p class="text-secondary">India's smartest AI fitness app. Train smarter, eat better, get stronger.</p>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Product</h4>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="https://play.google.com/store" target="_blank" rel="noopener">Download</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Company</h4>
        <ul>
          <li><a href="#footer">About</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__heading">Connect</h4>
        <ul>
          <li><a href="#" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="#" target="_blank" rel="noopener">Twitter / X</a></li>
          <li><a href="#" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <p class="text-tertiary">&copy; 2026 Lyftora. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 10: Open in browser to verify HTML structure renders**

Run: `open website/lyftora-site/index.html`
Expected: Page loads with all sections visible (unstyled sections content, but styled base typography and tokens)

- [ ] **Step 11: Commit**

```bash
git add website/lyftora-site/index.html
git commit -m "feat(website): add complete HTML structure with all 8 marketing page sections"
```

---

## Task 3: Section Styles (sections.css)

**Files:**
- Create: `website/lyftora-site/css/sections.css`

- [ ] **Step 1: Create sections.css with navbar styles**

```css
/* website/lyftora-site/css/sections.css */

/* ========== NAVBAR ========== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 14, 26, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-base), background var(--transition-base);
}

.navbar--scrolled {
  border-bottom-color: var(--color-border);
  background: rgba(10, 14, 26, 0.95);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.navbar__logo {
  font-family: var(--font-body);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-primary);
}

.navbar__links {
  display: flex;
  gap: var(--space-2xl);
}

.navbar__links a {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.navbar__links a:hover {
  color: var(--color-text-primary);
}

.navbar__cta {
  font-size: 0.875rem;
  padding: 10px 24px;
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
}

.navbar__toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

/* Mobile nav */
@media (max-width: 768px) {
  .navbar__links {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-xl);
    gap: var(--space-lg);
  }

  .navbar__links--open {
    display: flex;
  }

  .navbar__cta {
    display: none;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__toggle--open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .navbar__toggle--open span:nth-child(2) {
    opacity: 0;
  }

  .navbar__toggle--open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
}
```

- [ ] **Step 2: Add hero section styles**

Append to `sections.css`:

```css
/* ========== HERO ========== */
.hero {
  padding-top: calc(72px + var(--space-5xl));
  padding-bottom: var(--space-6xl);
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 100%);
  text-align: center;
}

.hero__inner {
  max-width: 720px;
  margin: 0 auto;
}

.hero__title {
  margin-top: var(--space-base);
}

.hero__subtitle {
  font-size: 1.0625rem;
  line-height: 1.7;
  max-width: 560px;
  margin: var(--space-lg) auto 0;
}

.hero__ctas {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
  margin-top: var(--space-2xl);
}

.hero__platform {
  font-size: 0.8125rem;
  margin-top: var(--space-md);
}

.hero__screenshot {
  margin-top: var(--space-3xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
```

- [ ] **Step 3: Add AI Coach and Nutrition section styles**

Append to `sections.css`:

```css
/* ========== AI COACH ========== */
.ai-coach .check-list {
  margin-top: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.check-list__item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.9375rem;
}

.check-list__item::before {
  content: '✓';
  color: var(--color-primary);
  font-size: 1.125rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* ========== NUTRITION ========== */
.food-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-xl);
}

.food-chip {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
}

.food-chip--more {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: rgba(0, 212, 170, 0.08);
}
```

- [ ] **Step 4: Add Features and Pocket Features styles**

Append to `sections.css`:

```css
/* ========== SECTION HEADERS ========== */
.section__header {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

/* ========== FEATURE CARDS ========== */
.feature-card {
  text-align: left;
}

.feature-card__icon {
  font-size: 1.75rem;
  display: block;
  margin-bottom: var(--space-md);
}

.feature-card h3 {
  margin-bottom: var(--space-sm);
}

/* ========== POCKET FEATURES ========== */
.pocket-card {
  text-align: center;
}

.pocket-card__icon {
  font-size: 1.75rem;
  display: block;
  margin-bottom: var(--space-md);
}

.pocket-card h3 {
  margin-bottom: var(--space-sm);
}
```

- [ ] **Step 5: Add Stats section styles**

Append to `sections.css`:

```css
/* ========== STATS ========== */
.stat-card {
  text-align: center;
  padding: var(--space-2xl) var(--space-xl);
}

.stat-card__number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
}

.stat-card__label {
  font-size: 0.875rem;
  margin-top: var(--space-xs);
}
```

- [ ] **Step 6: Add How It Works section styles**

Append to `sections.css`:

```css
/* ========== HOW IT WORKS ========== */
.step {
  margin-top: var(--space-3xl);
}

.step:first-of-type {
  margin-top: 0;
}

.step__label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
}

.step h3 {
  font-size: 1.375rem;
  margin-bottom: var(--space-md);
}

.step p {
  line-height: 1.7;
}
```

- [ ] **Step 7: Add Final CTA and Footer styles**

Append to `sections.css`:

```css
/* ========== FINAL CTA ========== */
.final-cta {
  background: var(--color-primary);
  padding: var(--space-5xl) 0;
  text-align: center;
}

.final-cta__inner {
  max-width: 560px;
  margin: 0 auto;
}

.final-cta h2 {
  color: var(--color-bg);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
}

.final-cta p {
  color: var(--color-bg);
  opacity: 0.7;
  font-size: 1.0625rem;
  line-height: 1.6;
  margin-top: var(--space-base);
}

.final-cta .btn {
  margin-top: var(--space-2xl);
}

.final-cta__platform {
  font-size: 0.8125rem;
  opacity: 0.5;
  margin-top: var(--space-md);
}

/* ========== FOOTER ========== */
.footer {
  background: var(--color-bg);
  padding-top: var(--space-4xl);
}

.footer__inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-3xl);
}

.footer__logo {
  font-family: var(--font-body);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-primary);
  display: inline-block;
  margin-bottom: var(--space-md);
}

.footer__brand p {
  font-size: 0.875rem;
  max-width: 260px;
}

.footer__heading {
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-text-primary);
  margin-bottom: var(--space-base);
}

.footer__col ul li {
  margin-bottom: var(--space-sm);
}

.footer__col a {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.footer__col a:hover {
  color: var(--color-text-primary);
}

.footer__bottom {
  margin-top: var(--space-2xl);
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.footer__bottom p {
  font-size: 0.8125rem;
  text-align: center;
}

/* Footer responsive */
@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2xl);
  }

  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer__inner {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 8: Add scroll-reveal animation classes**

Append to `sections.css`:

```css
/* ========== SCROLL ANIMATIONS ========== */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 9: Open in browser to verify all sections are styled**

Run: `open website/lyftora-site/index.html`
Expected: All 8 sections render with correct colors, typography, spacing, cards, and layout

- [ ] **Step 10: Commit**

```bash
git add website/lyftora-site/css/sections.css
git commit -m "feat(website): add complete section styles for all 8 marketing page sections"
```

---

## Task 4: JavaScript (smooth scroll, nav toggle, animations)

**Files:**
- Create: `website/lyftora-site/js/main.js`

- [ ] **Step 1: Create main.js with mobile nav toggle**

```javascript
/* website/lyftora-site/js/main.js */

// Mobile nav toggle
(function initNavToggle() {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('navbar__links--open');
    toggle.classList.toggle('navbar__toggle--open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close nav when a link is clicked
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('navbar__links--open');
      toggle.classList.remove('navbar__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
```

- [ ] **Step 2: Add navbar scroll effect**

Append to `main.js`:

```javascript
// Navbar scroll effect
(function initNavbarScroll() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  var scrollThreshold = 50;

  window.addEventListener('scroll', function () {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true });
})();
```

- [ ] **Step 3: Add scroll-reveal animations using IntersectionObserver**

Append to `main.js`:

```javascript
// Scroll reveal animations
(function initRevealAnimations() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
```

- [ ] **Step 4: Add `reveal` class to sections in index.html**

Open `website/lyftora-site/index.html` and add the `reveal` class to these elements:
- Each `.card` element in sections 4, 5, 6
- Each `.step` element in section 7 (How It Works)
- The `.two-col` containers in sections 2 and 3
- The `.section__header` elements

Specific changes to `index.html`:

Section 2 — change `<div class="container two-col">` to `<div class="container two-col reveal">`

Section 3 — change `<div class="container two-col two-col--reverse">` to `<div class="container two-col two-col--reverse reveal">`

Section 4 — add `reveal` class to each of the 4 `.card.feature-card` elements

Section 5 — add `reveal` class to each of the 3 `.card.pocket-card` elements

Section 6 — add `reveal` class to each of the 4 `.card.stat-card` elements

Section 7 — add `reveal` class to each of the 3 `.two-col.step` elements

- [ ] **Step 5: Verify in browser — scroll animations trigger on each section**

Run: `open website/lyftora-site/index.html`
Expected: Sections fade in as you scroll. Mobile nav hamburger toggles open/close. Navbar gets border on scroll.

- [ ] **Step 6: Commit**

```bash
git add website/lyftora-site/js/main.js website/lyftora-site/index.html
git commit -m "feat(website): add JS interactions — mobile nav, scroll effects, reveal animations"
```

---

## Task 5: Assets Directory + Placeholder Images

**Files:**
- Create: `website/lyftora-site/assets/images/.gitkeep`

- [ ] **Step 1: Create assets directory structure**

Run: `mkdir -p website/lyftora-site/assets/images`

- [ ] **Step 2: Create a .gitkeep in the images directory**

```bash
touch website/lyftora-site/assets/images/.gitkeep
```

- [ ] **Step 3: Remove the old .gitkeep from lyftora-site root**

```bash
rm website/lyftora-site/.gitkeep
```

- [ ] **Step 4: Commit**

```bash
git add website/lyftora-site/assets/images/.gitkeep
git rm website/lyftora-site/.gitkeep
git commit -m "feat(website): add assets directory structure for marketing page images"
```

---

## Task 6: Final QA and Responsive Testing

**Files:**
- Modify: `website/lyftora-site/index.html` (if fixes needed)
- Modify: `website/lyftora-site/css/sections.css` (if fixes needed)

- [ ] **Step 1: Start a local server to test**

Run: `cd website/lyftora-site && python3 -m http.server 8080`
Expected: Server starts at http://localhost:8080

- [ ] **Step 2: Open in browser and test desktop layout**

Open: `http://localhost:8080`
Verify:
- All 8 sections render correctly
- Navigation links scroll to correct sections
- "Download Now" buttons open Play Store (placeholder)
- Typography uses DM Serif Display for display, Outfit for body (loaded from Google Fonts)
- Colors match design tokens (dark background, mint green primary, purple AI accent)
- Cards have proper borders and background
- Food chips wrap correctly
- Stats numbers are large and mint green
- Final CTA has inverted green background

- [ ] **Step 3: Test mobile layout (resize to 375px width)**

Verify:
- Hamburger menu appears and toggles nav links
- Two-column layouts stack vertically
- Grid cards stack to single column
- Hero text is readable and centered
- Food chips wrap nicely
- Footer stacks to single column
- No horizontal scrolling

- [ ] **Step 4: Test tablet layout (resize to 768px width)**

Verify:
- Two-column layouts work
- Grid-4 shows 2 columns
- Navigation still fits

- [ ] **Step 5: Validate HTML**

Run: `npx html-validate website/lyftora-site/index.html 2>/dev/null || echo "Install html-validate: npm install -g html-validate"`
Expected: No critical errors (warnings about missing alt on placeholder images are acceptable)

- [ ] **Step 6: Fix any issues found during QA**

Apply fixes to the relevant files based on what was found in steps 2-5.

- [ ] **Step 7: Final commit**

```bash
git add -A website/lyftora-site/
git commit -m "feat(website): complete Lyftora marketing landing page — responsive, SEO-optimized, 8 sections"
```

---

## Summary

| Task | What it builds | Files |
|------|---------------|-------|
| 1 | CSS foundation (tokens, reset, layout) | 3 CSS files |
| 2 | Full HTML structure (all 8 sections) | index.html |
| 3 | Section-specific styles | sections.css |
| 4 | JS interactions (nav, scroll, animations) | main.js + index.html updates |
| 5 | Assets directory | directory structure |
| 6 | QA + responsive testing | fixes as needed |

**Total files:** 6 files (index.html, 4 CSS, 1 JS) + assets directory
**Estimated commits:** 6
