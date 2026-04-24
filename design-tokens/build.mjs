#!/usr/bin/env node
// Design tokens generator.
// Reads tokens.json and emits:
//   - src/website/css/tokens.css (CSS variables for the marketing site)
//   - src/theme/tokens.generated.ts (typed tokens for the React Native app)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..');
const SRC = resolve(HERE, 'tokens.json');
const OUT_CSS = resolve(REPO, 'src/website/css/tokens.css');
const OUT_TS = resolve(REPO, 'src/theme/tokens.generated.ts');

const HEADER_CSS = `/* AUTO-GENERATED — do not edit. Source: design-tokens/tokens.json */\n/* Regenerate with: npm run tokens:build */\n\n`;
const HEADER_TS = `// AUTO-GENERATED — do not edit. Source: design-tokens/tokens.json
// Regenerate with: npm run tokens:build
/* eslint-disable */

`;

function loadTokens() {
  const raw = readFileSync(SRC, 'utf8');
  const t = JSON.parse(raw);
  const required = ['palette', 'themes', 'fonts', 'fontFamilies', 'type', 'spacing', 'radii', 'shadows', 'motion', 'touchTarget'];
  for (const key of required) {
    if (!t[key]) {
      console.error(`tokens.json is missing required key: ${key}`);
      process.exit(1);
    }
  }
  return t;
}

function buildCss(t) {
  const p = t.palette;
  const lines = [':root {'];
  lines.push('  /* Palette */');
  for (const [name, hex] of Object.entries(p)) {
    const css = name === 'cream2' ? '--cream-2' : name === 'ink2' ? '--ink-2' : `--${name}`;
    lines.push(`  ${css}: ${hex};`);
  }
  lines.push('');
  lines.push('  /* Fonts */');
  lines.push(`  --serif: "${t.fonts.serif}", Georgia, serif;`);
  lines.push(`  --sans:  "${t.fonts.sans}", system-ui, sans-serif;`);
  lines.push(`  --mono:  "${t.fonts.mono}", ui-monospace, monospace;`);
  lines.push('');
  lines.push('  /* Layout */');
  lines.push(`  --container: ${t.layout.container}px;`);
  lines.push(`  --pad: clamp(${t.layout.pad.min}px, ${t.layout.pad.preferred}, ${t.layout.pad.max}px);`);
  lines.push('');
  lines.push('  /* Radii */');
  for (const [name, v] of Object.entries(t.radii)) {
    lines.push(`  --r-${name === 'pill' ? 'pill' : name}: ${v}px;`);
  }
  lines.push('');
  lines.push('  /* Spacing */');
  for (const [name, v] of Object.entries(t.spacing)) {
    const cssName = name.replace(/^s/, 's-');
    lines.push(`  --${cssName}: ${v}px;`);
  }
  lines.push('');
  lines.push('  /* Shadows */');
  for (const [name, s] of Object.entries(t.shadows)) {
    lines.push(`  --sh-${name}: ${s.css};`);
  }
  lines.push('');
  lines.push('  /* Theme (default: light) */');
  for (const [k, v] of Object.entries(t.themes.light)) {
    const refHex = p[v];
    if (refHex) lines.push(`  --theme-${kebab(k)}: ${refHex};`);
  }
  lines.push('}');
  lines.push('');
  lines.push('[data-theme="dark"] {');
  for (const [k, v] of Object.entries(t.themes.dark)) {
    const refHex = p[v];
    if (refHex) lines.push(`  --theme-${kebab(k)}: ${refHex};`);
  }
  lines.push('}');
  lines.push('');
  return HEADER_CSS + lines.join('\n');
}

function kebab(s) {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function buildTs(t) {
  const p = t.palette;
  const resolveTheme = (theme) => {
    const out = {};
    for (const [k, v] of Object.entries(theme)) out[k] = p[v] ?? v;
    return out;
  };
  const light = resolveTheme(t.themes.light);
  const dark = resolveTheme(t.themes.dark);

  const shadowsRn = {};
  for (const [name, s] of Object.entries(t.shadows)) {
    shadowsRn[name] = {
      shadowColor: rgbaToHex(s.color),
      shadowOffset: { width: s.offset[0], height: s.offset[1] },
      shadowOpacity: rgbaOpacity(s.color),
      shadowRadius: Math.max(1, Math.round(s.blur / 2)),
      elevation: elevationFrom(s.blur, s.offset[1]),
    };
  }

  const out = [];
  out.push(HEADER_TS);
  out.push(`export const palette = ${JSON.stringify(p, null, 2)} as const;`);
  out.push('');
  out.push(`export type PaletteKey = keyof typeof palette;`);
  out.push('');
  out.push(`export const lightTheme = ${JSON.stringify(light, null, 2)} as const;`);
  out.push('');
  out.push(`export const darkTheme = ${JSON.stringify(dark, null, 2)} as const;`);
  out.push('');
  out.push(`export type ThemeTokens = typeof lightTheme;`);
  out.push('');
  out.push(`export const fontFamilies = ${JSON.stringify(t.fontFamilies, null, 2)} as const;`);
  out.push('');
  out.push(`export const type = ${JSON.stringify(t.type, null, 2)} as const;`);
  out.push('');
  out.push(`export type TypeKey = keyof typeof type;`);
  out.push('');
  out.push(`export const spacingScale = ${JSON.stringify(t.spacing, null, 2)} as const;`);
  out.push('');
  out.push(`export const radiiScale = ${JSON.stringify(t.radii, null, 2)} as const;`);
  out.push('');
  out.push(`export const shadowsRn = ${JSON.stringify(shadowsRn, null, 2)} as const;`);
  out.push('');
  out.push(`export const motion = ${JSON.stringify(t.motion, null, 2)} as const;`);
  out.push('');
  out.push(`export const touchTarget = ${JSON.stringify(t.touchTarget, null, 2)} as const;`);
  out.push('');
  out.push(`export const iconSize = ${JSON.stringify(t.iconSize ?? { sm: 14, md: 18, lg: 22, xl: 28 }, null, 2)} as const;`);
  out.push('');
  return out.join('\n');
}

function rgbaToHex(rgba) {
  const m = rgba.match(/rgba?\(([^)]+)\)/);
  if (!m) return rgba;
  const parts = m[1].split(',').map((s) => s.trim());
  const [r, g, b] = parts.map((x) => parseInt(x, 10));
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbaOpacity(rgba) {
  const m = rgba.match(/rgba?\(([^)]+)\)/);
  if (!m) return 1;
  const parts = m[1].split(',').map((s) => s.trim());
  return parts.length === 4 ? Number(parts[3]) : 1;
}

function elevationFrom(blur, offsetY) {
  return Math.max(1, Math.round((blur + Math.abs(offsetY)) / 4));
}

function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}

function main() {
  const tokens = loadTokens();
  const css = buildCss(tokens);
  const ts = buildTs(tokens);
  ensureDir(OUT_CSS);
  ensureDir(OUT_TS);
  writeFileSync(OUT_CSS, css, 'utf8');
  writeFileSync(OUT_TS, ts, 'utf8');
  console.log(`tokens:build  ok`);
  console.log(`  wrote ${OUT_CSS.replace(REPO + '/', '')}`);
  console.log(`  wrote ${OUT_TS.replace(REPO + '/', '')}`);
}

main();
