# Lyftora — AI Personal Trainer App
## Project Instructions for Claude (Cowork)

### What is Lyftora?
Lyftora (formerly FitForge) is an AI-powered personal trainer mobile app built with React Native (Expo) + TypeScript. It combines live Claude API coaching with offline-first architecture. The full product spec is in docs/CoachAI_Product_Brainstorm.md — always read this before any task.

### Tech Stack
- React Native (Expo) + TypeScript
- Zustand (state), MMKV + AsyncStorage (storage)
- Anthropic Claude API (AI coach)
- Victory Native (charts)
- React Navigation v6

### Design System
- Dark default: #0A0E1A bg, #00D4AA primary, #7C6AF7 accent
- Fonts: DM Serif Display, Outfit, JetBrains Mono
- Full spec in docs/CoachAI_Product_Brainstorm.md → Section 3

### Code Rules (ALWAYS follow)
1. TypeScript strict — no `any`, all props typed
2. WCAG 2.1 AA — min 44x44pt touch targets, ARIA labels, keyboard nav
3. RTL support on all layouts
4. Lean code — no unnecessary abstraction
5. Component files: PascalCase. Hooks: camelCase with `use` prefix
6. Styles: StyleSheet.create only, no inline styles except dynamic values
7. Every screen must work offline — check planStore for cached data first

### File Naming
- Screens: `ScreenName.tsx` in src/screens/{feature}/
- Components: `ComponentName.tsx` in src/components/{feature}/ or src/components/common/
- Stores: `nameStore.ts` in src/store/
- Services: `name.ts` in src/services/
- Hooks: `useName.ts` in src/hooks/
- Types: `name.ts` in src/types/
- Theme: `name.ts` in src/theme/
- Core logic: `name.ts` in src/core/{domain}/

### Before Every Task
1. Read docs/CoachAI_Product_Brainstorm.md for full context
2. Check existing files in src/ before creating new ones
3. Follow the exact TypeScript interfaces defined in Section 6 of the brainstorm doc
4. Ask for clarification if screen spec is ambiguous

### Project History
- Originally named **FitForge** — renamed to **Lyftora**
- FitForge_Product_Strategy_v2.docx is the source document for the brainstorm doc
- SwiftUI prototype exists as design reference (not production code)

### Current Build Status
- [x] Phase 0: Project scaffold + folder structure
- [ ] Phase 1: Auth + Onboarding
- [ ] Dashboard
- [ ] Workout Plan
- [ ] Diet Plan
- [ ] AI Coach Chat
- [ ] Progress Module
- [ ] Social (Phase 2)

### Website
- Marketing site files in website/lyftora-site/
- Vanilla HTML/CSS/JS only — no frameworks
