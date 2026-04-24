import React from 'react';
import { View, Text } from 'react-native';
import { LL, FL, TL, LIconBtn } from '../light';

interface Props {
  onBack?: () => void;
  step?: number;
  totalSteps?: number;
  kicker?: string;
}

export function AuthHeader({ onBack, step, totalSteps, kicker }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {onBack ? (
        <LIconBtn icon="arrow-back" onPress={onBack} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: LL.primary,
              shadowColor: LL.primary,
              shadowOpacity: 0.5,
              shadowRadius: 4,
            }}
          />
          <Text style={{ fontFamily: FL.serif, fontSize: 20, letterSpacing: -0.3, color: LL.ink }}>
            lyftora
          </Text>
        </View>
      )}

      {step && totalSteps ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <View
              key={i}
              style={{
                width: i === step - 1 ? 20 : 5,
                height: 5,
                borderRadius: 3,
                backgroundColor: i < step ? LL.ink : 'rgba(14,14,18,0.18)',
              }}
            />
          ))}
          <Text style={[TL.labelSm, { color: LL.text2, marginLeft: 6 }]}>
            {String(step).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
          </Text>
        </View>
      ) : kicker ? (
        <Text style={[TL.labelSm, { color: LL.text2 }]}>{kicker}</Text>
      ) : (
        <View style={{ width: 36 }} />
      )}
    </View>
  );
}
