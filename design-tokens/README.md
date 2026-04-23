# design-tokens

Single source of truth for the Lyftora visual system.

## What lives here

- **`tokens.json`** — the only file you edit. Palette, themes, type scale, spacing, radii, shadows, motion.
- **`build.mjs`** — Node stdlib generator. No dependencies.

## What gets generated (do NOT edit by hand)

- **`src/website/css/tokens.css`** — CSS variables, consumed by the marketing site via `@import`.
- **`src/theme/tokens.generated.ts`** — typed tokens, consumed by the React Native app.

Both files start with `AUTO-GENERATED — do not edit` and are overwritten every build.

## Usage

```bash
npm run tokens:build
```

The `prestart` hook also runs it before `expo start` so app builds can never use stale tokens.

## Editing tokens

1. Change `tokens.json`.
2. `npm run tokens:build`.
3. Commit `tokens.json` and both generated files in the same commit.

## Reference

The website's `src/website/Design System.html` is the visual documentation for these tokens — component tiles, type specimens, spacing bars, motion curves. Treat it as the printed reference.
