// AUTO-GENERATED — do not edit. Source: design-tokens/tokens.json
// Regenerate with: npm run tokens:build
/* eslint-disable */


export const palette = {
  "cream": "#F4EFE4",
  "cream2": "#EFE8D8",
  "ink": "#0E0E12",
  "ink2": "#1A1A22",
  "muted": "#6B6A63",
  "lime": "#D6FF4D",
  "coral": "#FF5A3C",
  "violet": "#7B5CFF",
  "sky": "#6EE0FF",
  "protein": "#FF5A3C",
  "carbs": "#F6D040",
  "fat": "#7B5CFF"
} as const;

export type PaletteKey = keyof typeof palette;

export const lightTheme = {
  "bg": "#F4EFE4",
  "surface": "#EFE8D8",
  "surfaceAlt": "#F4EFE4",
  "text": "#0E0E12",
  "textMuted": "#6B6A63",
  "textInverse": "#F4EFE4",
  "inverseBg": "#0E0E12",
  "inverseSurface": "#1A1A22",
  "primary": "#0E0E12",
  "primaryOn": "#F4EFE4",
  "accent": "#D6FF4D",
  "accentOn": "#0E0E12",
  "danger": "#FF5A3C",
  "dangerOn": "#F4EFE4",
  "border": "#0E0E12",
  "borderSubtle": "#6B6A63",
  "focusRing": "#D6FF4D"
} as const;

export const darkTheme = {
  "bg": "#0E0E12",
  "surface": "#1A1A22",
  "surfaceAlt": "#0E0E12",
  "text": "#F4EFE4",
  "textMuted": "#6B6A63",
  "textInverse": "#0E0E12",
  "inverseBg": "#F4EFE4",
  "inverseSurface": "#EFE8D8",
  "primary": "#D6FF4D",
  "primaryOn": "#0E0E12",
  "accent": "#D6FF4D",
  "accentOn": "#0E0E12",
  "danger": "#FF5A3C",
  "dangerOn": "#F4EFE4",
  "border": "#F4EFE4",
  "borderSubtle": "#6B6A63",
  "focusRing": "#D6FF4D"
} as const;

export type ThemeTokens = typeof lightTheme;

export const fontFamilies = {
  "serifRegular": "InstrumentSerif-Regular",
  "serifItalic": "InstrumentSerif-Italic",
  "sansRegular": "SpaceGrotesk-Regular",
  "sansMedium": "SpaceGrotesk-Medium",
  "sansSemiBold": "SpaceGrotesk-SemiBold",
  "sansBold": "SpaceGrotesk-Bold",
  "monoRegular": "GeistMono-Regular",
  "monoMedium": "GeistMono-Medium"
} as const;

export const type = {
  "display": {
    "font": "serif",
    "family": "serifRegular",
    "size": 96,
    "lineHeight": 86,
    "tracking": -2.88,
    "weight": "400"
  },
  "h1": {
    "font": "serif",
    "family": "serifRegular",
    "size": 72,
    "lineHeight": 65,
    "tracking": -2.16,
    "weight": "400"
  },
  "h2": {
    "font": "serif",
    "family": "serifRegular",
    "size": 56,
    "lineHeight": 53,
    "tracking": -1.12,
    "weight": "400"
  },
  "h3": {
    "font": "serif",
    "family": "serifRegular",
    "size": 34,
    "lineHeight": 36,
    "tracking": -0.34,
    "weight": "400"
  },
  "h4": {
    "font": "serif",
    "family": "serifRegular",
    "size": 24,
    "lineHeight": 26,
    "tracking": -0.24,
    "weight": "400"
  },
  "bodyLg": {
    "font": "sans",
    "family": "sansRegular",
    "size": 19,
    "lineHeight": 29,
    "tracking": 0,
    "weight": "400"
  },
  "body": {
    "font": "sans",
    "family": "sansRegular",
    "size": 15,
    "lineHeight": 22,
    "tracking": 0,
    "weight": "400"
  },
  "bodySmall": {
    "font": "sans",
    "family": "sansRegular",
    "size": 13,
    "lineHeight": 18,
    "tracking": 0,
    "weight": "400"
  },
  "label": {
    "font": "sans",
    "family": "sansMedium",
    "size": 14,
    "lineHeight": 18,
    "tracking": 0.2,
    "weight": "500"
  },
  "button": {
    "font": "sans",
    "family": "sansSemiBold",
    "size": 15,
    "lineHeight": 18,
    "tracking": 0,
    "weight": "600"
  },
  "caption": {
    "font": "mono",
    "family": "monoRegular",
    "size": 12,
    "lineHeight": 14,
    "tracking": 1.44,
    "weight": "400",
    "uppercase": true
  },
  "mono": {
    "font": "mono",
    "family": "monoRegular",
    "size": 13,
    "lineHeight": 18,
    "tracking": 0,
    "weight": "400"
  }
} as const;

export type TypeKey = keyof typeof type;

export const spacingScale = {
  "s1": 4,
  "s2": 8,
  "s3": 12,
  "s4": 16,
  "s5": 24,
  "s6": 32,
  "s7": 48,
  "s8": 64,
  "s9": 96
} as const;

export const radiiScale = {
  "sm": 12,
  "md": 20,
  "lg": 28,
  "xl": 48,
  "pill": 999
} as const;

export const shadowsRn = {
  "sm": {
    "shadowColor": "#000000",
    "shadowOffset": {
      "width": 0,
      "height": 4
    },
    "shadowOpacity": 0.12,
    "shadowRadius": 5,
    "elevation": 4
  },
  "md": {
    "shadowColor": "#000000",
    "shadowOffset": {
      "width": 0,
      "height": 14
    },
    "shadowOpacity": 0.18,
    "shadowRadius": 13,
    "elevation": 10
  },
  "lg": {
    "shadowColor": "#000000",
    "shadowOffset": {
      "width": 0,
      "height": 40
    },
    "shadowOpacity": 0.25,
    "shadowRadius": 30,
    "elevation": 25
  },
  "glow": {
    "shadowColor": "#d6ff4d",
    "shadowOffset": {
      "width": 0,
      "height": 0
    },
    "shadowOpacity": 0.5,
    "shadowRadius": 12,
    "elevation": 6
  }
} as const;

export const motion = {
  "easeBase": {
    "duration": 150,
    "curve": [
      0.4,
      0,
      0.2,
      1
    ],
    "description": "Default button/pill hover"
  },
  "easeOutSoft": {
    "duration": 700,
    "curve": [
      0.2,
      0.8,
      0.2,
      1
    ],
    "description": "Reveals, progress bars"
  },
  "easeBounce": {
    "duration": 900,
    "curve": [
      0.2,
      1.6,
      0.3,
      1
    ],
    "description": "Chips, plate items"
  },
  "easeSnap": {
    "duration": 250,
    "curve": [
      0.2,
      1.8,
      0.4,
      1
    ],
    "description": "Ingredient taps"
  }
} as const;

export const touchTarget = {
  "minimum": 44,
  "comfortable": 48
} as const;

export const iconSize = {
  "sm": 14,
  "md": 18,
  "lg": 22,
  "xl": 28
} as const;
