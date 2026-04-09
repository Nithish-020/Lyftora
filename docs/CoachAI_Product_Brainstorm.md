# Lyftora — AI Personal Trainer Product Brainstorm

> Adapted from FitForge Product Strategy v2.0 (April 5, 2026)
> Original: Prepared for Nithish A. | Renamed: FitForge → Lyftora

---

## 1. Executive Summary

Lyftora is a cross-platform fitness app built with React Native (Expo) + TypeScript, launching Android-first in India before expanding to iOS and global markets. It combines AI-powered personal training (Claude API), culturally intelligent nutrition tracking (100+ Indian foods with regional macros), and social fitness features — all for a one-time purchase of ₹499 / $6.99.

**Key decisions:**

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | React Native + Expo | Core stack is React+TS. Single codebase. Expo SDK 55 with New Architecture delivers 60fps |
| Launch Platform | Android-first (India) | 92.4% Android market share in India. 1B smartphone users by 2026 |
| iOS Timeline | 4–6 weeks after Android | Same RN codebase, minor platform-specific adjustments |
| Revenue Model | One-time purchase | ₹499 / $6.99 — counter-positioned against subscription fatigue. IAP expansion packs for ongoing revenue |

---

## 2. Market & Competitive Landscape

### 2.1 India Market Data

| Metric | Value |
|--------|-------|
| Android market share in India | 92.4% (2025) |
| India smartphone users (2026) | 1 Billion+ |
| India fitness app market CAGR | 19.35% (2025–2035) |
| India fitness app market (2024) | $5 Billion |
| India projected (2035) | $35 Billion |

### 2.2 Strategic Reasoning

- **Market capture:** Android-first means reaching 92%+ of Indian smartphone users on day one.
- **Play Store advantages:** Faster review times, regional INR pricing, sideloading for beta testers.
- **Lower device floor:** Many Indian users on 2–4GB RAM devices. Hermes engine optimized for this.
- **Competition gap:** HealthifyMe and Cult.fit focus on Android. Hevy and Lyfta are stronger on iOS.
- **iOS follows naturally:** Same RN codebase ships to iOS 4–6 weeks later via EAS.

### 2.3 Competitive Advantages

| Competitor | Pricing | Lyftora Advantage |
|------------|---------|-------------------|
| HealthifyMe | ₹208–₹8,000/mo | 100x cheaper (₹499 once). Full workout tracking. |
| Cult.fit | Subscription + gym | No gym required. Offline-first. One-time purchase. |
| Hevy | $9.99/mo premium | Indian food database. AI coach. $6.99 vs $120/yr. |
| MyFitnessPal | $9.99/mo or $49.99/yr | Accurate Indian food macros. AI coach. No subscription. |
| Strong | $4.99/mo or $29.99/yr | All-in-one (Strong is workout-only). AI coach. One-time purchase. |
| Lyfta | Subscription | Nutrition tracking (Lyfta has none). AI coaching. Regional food support. |

---

## 3. Design System

### 3.1 Color Palette

**Dark Theme (default):**
- Background: `#0A0E1A`
- Primary (accent green): `#00D4AA`
- Accent (purple): `#7C6AF7`
- Surface/Card: derive from background with opacity
- Text Primary: `#FFFFFF`
- Text Secondary: `#A0A0B0`
- Error: `#FF4D6A`
- Warning: `#FFB020`
- Success: `#00D4AA` (same as primary)

### 3.2 Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / Headings | DM Serif Display | Regular (400) | 24–32pt |
| Body / UI | Outfit | Regular (400), Medium (500), SemiBold (600) | 12–20pt |
| Mono / Data | JetBrains Mono | Regular (400) | 12–14pt |

**Type Scale:** 12 / 14 / 16 / 20 / 24 / 32pt

### 3.3 Spacing

4pt grid system:
- `xs`: 4
- `sm`: 8
- `md`: 12
- `base`: 16
- `lg`: 20
- `xl`: 24
- `2xl`: 32
- `3xl`: 48

### 3.4 Touch Targets

All interactive elements: minimum **44×44pt** (WCAG 2.1 AA)

### 3.5 Component Variants

- **Button**: accent, secondary, ghost, FAB, icon — using `Pressable` + Reanimated
- **Card**: elevated (shadow/elevation), flat, outlined
- **TabBar**: 5 tabs + center FAB

### 3.6 SwiftUI → React Native Design Token Migration

| SwiftUI (Original) | React Native (Lyftora) | Notes |
|---------------------|----------------------|-------|
| FFColors.swift | src/theme/colors.ts | Same hex values |
| FFTypography.swift | src/theme/typography.ts | Map SF Pro Rounded → system font. Same size scale |
| FFSpacing.swift | src/theme/spacing.ts | 4pt grid carries over exactly |
| FFButton.swift | src/components/common/Button.tsx | 5 variants: accent, secondary, ghost, FAB, icon |
| FFWorkoutFeedCard.swift | src/components/social/WorkoutFeedCard.tsx | Social card design |
| FFCardModifier.swift | src/components/common/Card.tsx | StyleSheet with elevation + shadow |
| FFTheme.swift | src/store/themeStore.ts | Zustand store. useColorScheme() hook |

---

## 4. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React Native 0.84+ with Expo SDK 55 | New Architecture, Hermes V1, 60fps Fabric renderer |
| Language | TypeScript (strict mode) | Proper types for all models, API contracts, navigation |
| Navigation | React Navigation v6 | Stack/tab navigators, deep linking, type-safe routes |
| State Management | Zustand | Client state (UI, preferences). Lightweight, no boilerplate |
| Local Storage | MMKV + AsyncStorage | MMKV for fast key-value, AsyncStorage for larger blobs |
| AI Coach | Anthropic Claude API | Conversational coaching, plan generation |
| Charts | Victory Native | Lightweight charting for progress/PR tracking |
| Animations | Reanimated 3 | UI thread animations, smooth even on low-end Android |
| Lists | FlashList | 10x faster than FlatList for exercise library, food search |
| Build & Deploy | EAS Build + EAS Submit | Cloud builds for Android + iOS. OTA updates. |
| Testing | Jest + React Native Testing Library | Unit + integration tests. Detox for E2E if needed. |
| Backend (Phase 2) | Supabase | Postgres + Auth + Realtime for social features |

### 4.1 Why React Native + Expo (Not Flutter, Not KMP)

| Factor | React Native + Expo | Flutter | KMP |
|--------|-------------------|---------|-----|
| Skill match | React + TypeScript = primary stack. Zero learning curve. | Dart — new language. | Kotlin — closer to Swift but still new. |
| 2026 Architecture | RN 0.84 New Architecture: JSI, Fabric, TurboModules. 60fps, 40% faster startup. | Solid performance. But large binary size. | Shared logic only. Still need native UI. |
| India optimization | Hermes: 30% less memory, compiled bytecode. Perfect for 2–4GB RAM devices. | Good but larger APK size (~15–20MB base). | Native performance but 2x the UI code. |
| Solo dev viability | One codebase, one language, one build system. Best for solo. | One codebase but new language. | Two UI codebases — worst for solo. |

---

## 5. Development Roadmap

### 5.1 Phase 0 — Foundation (Weeks 1–2)
Goal: Scaffold RN project, migrate design system, set up build pipeline.

| Task | Effort |
|------|--------|
| Expo project scaffold with TypeScript strict, EAS config | 2 hours |
| Design token migration (colors, typography, spacing) | 4 hours |
| Core UI components (Button, Card, TabBar, Input) | 2 days |
| SQLite schema (User, Workout, Exercise, Set, MealLog) | 1 day |
| Data migration (Indian foods, exercises → typed JSON) | 1 day |
| EAS Build setup + test APK | 3 hours |
| Zustand stores with persistence | 1 day |

### 5.2 Phase 1 — Android MVP (Weeks 3–8)

| Feature | Screen(s) | Week |
|---------|-----------|------|
| Onboarding Flow | screens/onboarding/ | 3 |
| Exercise Library | screens/workout/ | 3–4 |
| Active Workout | screens/workout/ | 4–5 |
| Post-Workout Summary | Modal component | 5 |
| Nutrition Tracker | screens/diet/ | 5–6 |
| AI Coach (Core) | screens/coach/ | 6–7 |
| Progress & PRs | screens/progress/ | 7 |
| Profile & Settings | screens/dashboard/ | 7–8 |
| Play Store Submission | EAS Submit | 8 |

### 5.3 Phase 2 — iOS Launch + Social (Weeks 9–14)

| Feature | Details | Week |
|---------|---------|------|
| iOS Build + Platform Tweaks | HealthKit, StoreKit 2, Haptics | 9–10 |
| App Store Submission | iOS screenshots, ASO, App Review | 10–11 |
| Supabase Backend | Auth, Postgres, Realtime | 10–11 |
| Community Feed | Social feed with workout shares, likes, comments | 11–12 |
| Follow System | Follow/followers, activity feed | 12–13 |
| Push Notifications | Workout reminders, social, streak alerts | 13 |
| Challenges & Leaderboard | Weekly/monthly challenges, streaks | 13–14 |

### 5.4 Phase 3 — Intelligence + Scale (Weeks 15–22)

| Feature | Priority |
|---------|----------|
| Program Builder (AI suggestions, drag-and-drop) | P0 |
| Sport-Specific Programs (cricket, football, martial arts) | P1 |
| Hindi/Tamil Localization | P1 |
| Body Measurements (progress photos, body fat) | P1 |
| Advanced Charts (volume trends, muscle heatmap) | P1 |
| Wearable Integration (Google Fit, HealthKit, Fitbit) | P1 |
| Expansion Packs (IAP: sport programs, cuisine packs) | P1 |

### 5.5 Phase 4 — Marketplace + Growth (Weeks 23–30)

| Feature | Priority |
|---------|----------|
| Trainer Marketplace (20% commission, ratings) | P1 |
| Web Dashboard (React companion for analytics) | P2 |
| Offline Sync (background sync for connectivity gaps) | P1 |
| AI Coach v2 (on-device ML for form analysis) | P2 |
| Referral System (invite friends → unlock content) | P1 |

---

## 6. TypeScript Interfaces

These are the **source of truth** for the codebase. All components, stores, and services must use these types.

```typescript
// ──── User & Auth ────

interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
  preferences: UserPreferences;
  medicalProfile?: MedicalProfile;
}

interface UserPreferences {
  units: 'metric' | 'imperial';
  theme: 'dark' | 'light' | 'system';
  language: string;
  notificationsEnabled: boolean;
}

interface MedicalProfile {
  age: number;
  sex: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: 'lose' | 'maintain' | 'gain';
  dietaryRestrictions: string[];
  medicalConditions: string[];
}

// ──── Workout ────

interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment;
  instructions: string;
  imageUrl?: string;
}

type MuscleGroup =
  | 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps'
  | 'forearms' | 'core' | 'quads' | 'hamstrings' | 'glutes'
  | 'calves' | 'fullBody';

type Equipment =
  | 'barbell' | 'dumbbell' | 'machine' | 'cable'
  | 'bodyweight' | 'kettlebell' | 'band' | 'other';

interface WorkoutSet {
  id: string;
  exerciseId: string;
  reps: number;
  weightKg: number;
  isWarmup: boolean;
  isPR: boolean;
  completedAt?: string;
}

interface Workout {
  id: string;
  userId: string;
  name: string;
  exercises: WorkoutExercise[];
  startedAt: string;
  completedAt?: string;
  durationMinutes: number;
  notes?: string;
}

interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
  restTimerSeconds: number;
}

// ──── Nutrition ────

interface FoodEntry {
  id: string;
  name: string;
  nameRegional?: string;
  region?: string;
  caloriesPerServing: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  servingSize: string;
  servingUnit: string;
  category: FoodCategory;
}

type FoodCategory =
  | 'grain' | 'protein' | 'dairy' | 'vegetable' | 'fruit'
  | 'legume' | 'snack' | 'beverage' | 'sweet' | 'condiment' | 'other';

interface MealLog {
  id: string;
  userId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  entries: MealEntry[];
}

interface MealEntry {
  foodId: string;
  servings: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

// ──── AI Coach ────

interface CoachMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: CoachMessageMetadata;
}

interface CoachMessageMetadata {
  planGenerated?: boolean;
  exercisesRecommended?: string[];
  mealsRecommended?: string[];
}

interface CoachSession {
  id: string;
  userId: string;
  messages: CoachMessage[];
  createdAt: string;
  updatedAt: string;
}

// ──── Progress ────

interface PersonalRecord {
  id: string;
  userId: string;
  exerciseId: string;
  weightKg: number;
  reps: number;
  achievedAt: string;
}

interface BodyMeasurement {
  id: string;
  userId: string;
  date: string;
  weightKg?: number;
  bodyFatPct?: number;
  measurements?: Record<string, number>;
}

// ──── Social (Phase 2) ────

interface Post {
  id: string;
  userId: string;
  type: 'workout' | 'achievement' | 'progress';
  content: string;
  workoutId?: string;
  likes: number;
  comments: number;
  createdAt: string;
}
```

---

## 7. Low-End Android Optimization (India-Critical)

| Optimization | Implementation | Impact |
|-------------|----------------|--------|
| Hermes Engine | Mandatory in RN 0.84+. Pre-compiled bytecode. | 30% less memory, faster cold start |
| FlashList | Replace all FlatList for exercise library, food search, feeds | 10x rendering on large lists |
| Reanimated 3 | All animations on UI thread | Smooth 60fps on low-end SoCs |
| Image optimization | expo-image with caching, WebP format | 50%+ smaller payloads |
| Bundle size | Tree-shaking, code splitting, lazy routes | Target <15MB APK |
| SQLite over API | All core data stored locally | Works offline. Zero latency. |
| Test on real devices | Redmi Note series, Realme C series | Catch perf issues before launch |
| Hermes Bytecode Diffing | OTA updates send only the diff | Smaller updates on limited data plans |

---

## 8. Go-to-Market Strategy

| Phase | Timeline | Market | Channel |
|-------|----------|--------|---------|
| Android India Launch | Month 1–2 | India (Android) | Instagram/YouTube Reels, Indian fitness YouTubers, r/IndianFitness, Play Store ASO |
| iOS India + Diaspora | Month 3–4 | India (iOS) + US/UK/Canada/UAE | App Store launch, South Asian influencers abroad, Product Hunt |
| Global Anti-Sub Play | Month 5–8 | English-speaking global | Comparison marketing vs Hevy/Strong ($6.99 vs $120/yr), tech press, Reddit r/fitness |
| Localization Wave | Month 9–12 | Hindi/Tamil speakers, Middle East | Vernacular AI coach, regional food expansion, localized ASO |

### Market Sizing

| Segment | Users (est.) | Revenue at $6.99 |
|---------|-------------|------------------|
| India (primary) | 50M fitness-interested | $350M TAM |
| South Asian Diaspora | 15M health-conscious | $105M TAM |
| Global anti-subscription | 100M+ subscription-fatigued | $700M TAM |
| Sport-specific athletes | 30M amateur cricketers/footballers | $210M TAM |

---

## 9. Success Metrics

| Metric | Android Launch (Month 2) | iOS Launch (Month 4) | Month 12 |
|--------|--------------------------|----------------------|----------|
| Total Downloads | 5,000 | 8,000 total | 150,000 |
| Store Rating | 4.4+ | 4.5+ | 4.6+ |
| Day 7 Retention | 35% | 40% | 50% |
| Day 30 Retention | 20% | 25% | 35% |
| AI Coach Usage | 50% generate 1+ plan | 60% | 75% |
| Revenue | ₹24.95L (~$30K) | ₹45L (~$55K) cumulative | ₹7.5Cr (~$900K) |
| APK Size | <15MB | <20MB (iOS) | Maintain |
| Cold Start Time | <2s on Redmi Note | <1.5s on iPhone | Maintain |

---

## 10. Risk Analysis

### 10.1 Rebuilding in RN Delays Launch
**Risk:** Starting fresh in React Native adds 2–3 weeks to rebuild.
**Mitigation:** Not starting from scratch — SwiftUI code is the complete design spec. Gaining Android (92% of India) + cross-platform forever.

### 10.2 React Native Performance on Low-End Android
**Risk:** India's top-selling phones have 2–4GB RAM.
**Mitigation:** RN 0.84 New Architecture + Hermes V1 targets this specifically. FlashList for lists. Test on actual Redmi/Realme devices.

### 10.3 One-Time Purchase Sustainability
**Risk:** No recurring revenue requires constant new user acquisition.
**Mitigation:** IAP expansion packs from Phase 3 (sport programs ₹149–299, cuisine packs, Lyftora Pro ₹999). Social features create viral loops.

### 10.4 Solo Dev Maintaining Two Platforms
**Risk:** Platform-specific bugs and edge cases.
**Mitigation:** 90–95% code sharing with Expo. EAS builds both from one repo. OTA updates push fixes simultaneously.

---

## 11. SwiftUI Screen Migration Reference

| SwiftUI Screen | Size | React Native Equivalent | What Carries Over |
|---------------|------|------------------------|-------------------|
| OnboardingView.swift | 10.6KB | screens/onboarding/ | Full UI spec. 3-step flow. Layout + animations. |
| HomeView.swift | 4.5KB | screens/dashboard/ | Social feed tabs. Card layout. |
| ActiveWorkoutView.swift | 15.1KB | screens/workout/ | Set logging, exercise picker, timer. Most complex. |
| RestTimerView.swift | 5.8KB | components/workout/ | Circular timer animation → Reanimated. |
| PostWorkoutSummaryView.swift | 8.2KB | components/workout/ | Stats layout, PR celebration, share prompt. |
| ProgressView.swift | 11.5KB | screens/progress/ | PR cards, chart layout, history list → Victory. |

Total SwiftUI code: ~67KB — translates to 2–3 weeks of focused RN rebuilding.

---

*Target: Android on Play Store by end of May 2026. iOS on App Store by end of June 2026. First 5,000 users within 60 days.*
