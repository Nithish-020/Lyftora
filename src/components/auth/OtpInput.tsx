import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { LL, FL } from '../light';

interface Props {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  autoFocus?: boolean;
  compact?: boolean;
}

export function OtpInput({ value, onChange, length = 6, autoFocus = true, compact = false }: Props) {
  const inputRef = React.useRef<TextInput>(null);
  const [focused, setFocused] = React.useState(false);
  const digits = value.padEnd(length, ' ').split('').slice(0, length);
  const cursor = Math.min(value.length, length - 1);

  const cellW = compact ? undefined : 46;
  const cellH = compact ? 48 : 58;
  const radius = compact ? 10 : 12;
  const fontSize = compact ? 20 : 28;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: compact ? 6 : 8,
          justifyContent: 'center',
        }}
      >
        {digits.map((d, i) => {
          const hasValue = d.trim() !== '';
          const isCursor = focused && i === cursor && !hasValue;
          return (
            <View
              key={i}
              style={{
                flex: compact ? 1 : undefined,
                width: cellW,
                height: cellH,
                borderRadius: radius,
                backgroundColor: hasValue ? LL.ink : '#fff',
                borderWidth: 1.5,
                borderColor: isCursor ? LL.ink : hasValue ? LL.ink : LL.bDefault,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {hasValue ? (
                <Text
                  style={{
                    fontFamily: compact ? FL.mono : FL.serif,
                    fontSize,
                    color: LL.bg,
                    letterSpacing: -0.5,
                  }}
                >
                  {d}
                </Text>
              ) : isCursor ? (
                <View style={{ width: 2, height: 26, backgroundColor: LL.coral }} />
              ) : null}
            </View>
          );
        })}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={length}
        style={{ position: 'absolute', opacity: 0, width: '100%', height: cellH }}
        caretHidden
      />
    </View>
  );
}
