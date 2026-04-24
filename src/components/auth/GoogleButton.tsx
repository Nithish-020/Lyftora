import React from 'react';
import { Pressable, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LL, FL, LS } from '../light';

export function GoogleButton({ onPress, label = 'Continue with Google', size = 54 }: { onPress?: () => void; label?: string; size?: number }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: size,
          borderRadius: 14,
          backgroundColor: '#fff',
          borderWidth: 1.5,
          borderColor: LL.bStrong,
          paddingHorizontal: 22,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          opacity: pressed ? 0.9 : 1,
        },
        LS.sm,
      ]}
    >
      <Svg width={size === 54 ? 22 : 20} height={size === 54 ? 22 : 20} viewBox="0 0 48 48">
        <Path
          fill="#FFC107"
          d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C33.9 5.7 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
        />
        <Path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C33.9 5.7 29.2 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
        <Path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.5 16.2 44 24 44z" />
        <Path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2c-.4.4 6.6-4.8 6.6-14.8 0-1.3-.1-2.6-.4-3.9z" />
      </Svg>
      <Text style={{ fontFamily: FL.sansSemiBold ?? FL.sans, fontSize: 15, fontWeight: '600', color: LL.ink }}>
        {label}
      </Text>
    </Pressable>
  );
}
