import { Easing } from 'react-native-reanimated';
import { motion as motionTokens } from './tokens.generated';

type MotionKey = keyof typeof motionTokens;

type MotionPreset = {
  duration: number;
  easing: ReturnType<typeof Easing.bezier>;
  curve: readonly [number, number, number, number];
};

function preset(key: MotionKey): MotionPreset {
  const m = motionTokens[key];
  const [x1, y1, x2, y2] = m.curve as [number, number, number, number];
  return {
    duration: m.duration,
    easing: Easing.bezier(x1, y1, x2, y2),
    curve: [x1, y1, x2, y2] as const,
  };
}

// Easing presets mirrored from the website design system.
// Prefer these over ad-hoc cubic-beziers so web and app share motion vocabulary.
export const motion = {
  easeBase:    preset('easeBase'),
  easeOutSoft: preset('easeOutSoft'),
  easeBounce:  preset('easeBounce'),
  easeSnap:    preset('easeSnap'),
} as const;

export type MotionPresetKey = keyof typeof motion;
