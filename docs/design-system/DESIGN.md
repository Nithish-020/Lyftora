# Lyftora Design System v1.0
**Project ID:** 5476808278702982899
**Stack:** React Native Expo + TypeScript
**Grid:** 8px base unit

---

## 1. Visual Theme & Atmosphere

Lyftora follows **"Precise Power"** — a premium fitness dashboard aesthetic inspired by high-end sports watches. Deep navy-black backgrounds create focus. Vibrant mint-green signals energy and progress. Purple denotes AI intelligence. The design is **data-rich but visually clean**, using tonal surface shifts instead of borders.

**Key principles:**
- Dark-first: `#0A0E1A` is the canvas, never pure black
- No 1px borders for sectioning — use surface color tiers
- Green = user actions, progress, success
- Purple = AI features only
- Amber = streaks, warnings, time-sensitive data
- Large display numbers for key metrics

---

## 2. Color Palette

### Brand Colors
| Token | Hex | Role |
|-------|-----|------|
| `background` | `#0A0E1A` | App canvas. Deep navy-black. |
| `primary` | `#00D4AA` | CTAs, progress, success, active states |
| `secondary` | `#7C6AF7` | AI coach, smart features only |
| `warning` | `#FFB020` | Streaks, timers, caution states |
| `error` | `#FF4D6A` | Errors, destructive actions |

### Surface Hierarchy (solid hex — never rgba)
| Token | Hex | Usage |
|-------|-----|-------|
| `surfaceBase` | `#0A0E1A` | Screen background |
| `surfaceLow` | `#111827` | Subtle section grouping |
| `surfaceContainer` | `#1A2235` | Primary cards, containers |
| `surfaceHigh` | `#243045` | Active states, inputs, overlays |
| `surfaceHighest` | `#2E3A50` | Focused elements, dropdowns |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `textPrimary` | `#FFFFFF` | Headings, primary content |
| `textSecondary` | `#A0A0B0` | Subtitles, metadata |
| `textTertiary` | `#6B7280` | Placeholder, disabled |
| `textInverse` | `#0A0E1A` | Text on primary buttons |

### Borders (rgba for transparency)
| Token | Value | Usage |
|-------|-------|-------|
| `borderSubtle` | `rgba(255,255,255,0.06)` | Card edges, glass borders |
| `borderDefault` | `rgba(255,255,255,0.10)` | Visible dividers |
| `borderStrong` | `rgba(255,255,255,0.16)` | Active focus rings |
| `borderAccent` | `rgba(0,212,170,0.30)` | Selected state borders |

---

## 3. Typography

### Font Stack
| Role | Font | RN Family Name |
|------|------|----------------|
| Headlines | DM Sans | `DMSans` |
| Body/UI | Inter | `Inter` |
| Labels/Tags | Space Grotesk | `SpaceGrotesk` |
| Data/Mono | JetBrains Mono | `JetBrainsMono` |

### Type Scale
| Token | Size | Weight | Font | Use Case |
|-------|------|--------|------|----------|
| `displayLg` | 32px | Bold | DM Sans | Hero numbers, PR values |
| `displayMd` | 28px | Bold | DM Sans | Screen titles |
| `headlineLg` | 24px | SemiBold | DM Sans | Section headers |
| `headlineMd` | 20px | SemiBold | DM Sans | Card titles, timer |
| `titleLg` | 18px | SemiBold | Inter | Subsection headers |
| `titleMd` | 16px | SemiBold | Inter | Button text, card titles |
| `bodyLg` | 16px | Regular | Inter | Primary body text |
| `bodyMd` | 14px | Regular | Inter | Standard body |
| `bodySm` | 12px | Regular | Inter | Captions, footnotes |
| `labelLg` | 14px | Medium | Space Grotesk | Navigation labels |
| `labelMd` | 12px | Medium | Space Grotesk | Tags, chip text |
| `labelSm` | 10px | Medium | Space Grotesk | Tab bar labels, micro text |
| `mono` | 14px | Bold | JetBrains Mono | Timer, set data, weights |

---

## 4. Spacing (8px Grid)

Every spacing value is a multiple of 4px. Primary rhythm is 8px.

| Token | Value | Use |
|-------|-------|-----|
| `1` | 4px | Icon-to-text inline gap |
| `2` | 8px | Chip padding, tight gaps |
| `3` | 12px | Card gap, form field gap |
| `4` | 16px | Screen padding, card padding |
| `6` | 24px | Section gap |
| `8` | 32px | Large section dividers |
| `12` | 48px | Screen vertical padding |

### Layout Constants
- Screen horizontal padding: **16px**
- Card internal padding: **16px**
- Card-to-card gap: **12px**
- Section-to-section gap: **24px**
- Bottom nav height: **80px**
- Header height: **64px**
- Touch target minimum: **44px**

---

## 5. Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `none` | 0 | Sharp edges (rare) |
| `sm` | 4px | Tags, micro chips |
| `default` | 8px | Inputs, small cards |
| `md` | 12px | Primary cards, buttons |
| `lg` | 16px | Large cards, modals |
| `xl` | 24px | Bottom sheets |
| `full` | 9999px | Pills, avatars, FABs |

---

## 6. Component Specs

### Button
| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| `primary` | `#00D4AA` | `#0A0E1A` | none |
| `secondary` | transparent | `#00D4AA` | `borderAccent` |
| `ghost` | transparent | `#A0A0B0` | none |
| `ai` | `rgba(124,106,247,0.10)` | `#7C6AF7` | `borderAI` |
| `danger` | `rgba(255,77,106,0.10)` | `#FF4D6A` | none |

Sizes: `sm` (36px), `md` (44px), `lg` (48px). Radius: `md` (12px). Press: scale(0.97).

### Card
| Variant | Background | Border |
|---------|-----------|--------|
| `surface` | `surfaceContainer` | none |
| `elevated` | `surfaceContainer` + shadow-md | none |
| `ai` | `aiSurface` | `aiBorder` |
| `outlined` | transparent | `borderDefault` |

Radius: `md` (12px). Padding: 16px.

### Input
Background: `surfaceHigh`. Radius: `default` (8px). Height: 48px. Label: `labelMd` uppercase.

### Chip
Selected: `primary` bg + `textInverse`. Default: `surfaceHigh` bg + `textSecondary`. Radius: `full`. Text: `labelMd` uppercase.

### Glass View
Background: `rgba(10,14,26,0.80)`. Blur: 12px. Border: `borderSubtle`. Used for: bottom nav, floating actions.

### Bottom Tab Bar
5 tabs + center FAB. Glass background. Active: `primary` color + glow. Inactive: `textSecondary`. FAB: 56px, `primary` bg, `full` radius. Height: 80px with safe area.

---

## 7. Shadows

| Token | Spec | Use |
|-------|------|-----|
| `sm` | 0 1px 3px rgba(0,0,0,0.12) | Subtle lift |
| `md` | 0 4px 12px rgba(0,0,0,0.20) | Elevated cards |
| `lg` | 0 8px 24px rgba(0,0,0,0.25) | Modals, overlays |
| `glow` | 0 0 16px rgba(0,212,170,0.25) | Active nav item |
| `navBar` | 0 -4px 20px rgba(0,0,0,0.40) | Bottom nav |

---

## 8. Icons

Material Symbols Outlined, 24px default. Weight: 400. Fill: 0 (outline) or 1 (filled for active states).

---

## 9. Audit Findings — What Was Wrong

| Issue | Before (Inconsistent) | After (Standardized) |
|-------|-----------------------|----------------------|
| Color naming | `brand.bg`, `background`, hardcoded `#0A0E1A` | `colors.background` everywhere |
| Surface system | Mix of solid hex AND rgba across screens | Solid hex only (`#111827`, `#1A2235`, etc.) |
| Surface values | 3 different hex values for "container" | One value: `#1A2235` |
| Radius `lg` | `0.75rem` (Dashboard) vs `1rem` (others) | `16px` everywhere |
| Glass effect | 3 different opacity+blur combos | `80% opacity + 12px blur` |
| Hardcoded hex | `text-[#00D4AA]` in Tailwind classes | Use token reference always |
| Font weights | Different weight sets imported per screen | Standard set: 400, 500, 600, 700 |
| Rogue colors | `#00B894`, `slate-800`, `slate-700` | Removed. Use token palette only |
