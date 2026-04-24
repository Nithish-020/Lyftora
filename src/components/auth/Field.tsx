import React from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { LL, TL, LIcon, LS } from '../light';

export type FieldState = 'default' | 'focus' | 'ok' | 'error';

interface Props extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  state?: FieldState;
  hint?: string;
  helper?: string;
  trailingIcon?: string;
  trailingColor?: string;
  onTrailingPress?: () => void;
  mono?: boolean;
}

export function Field({
  label,
  value,
  onChangeText,
  state = 'default',
  hint,
  helper,
  trailingIcon,
  trailingColor,
  onTrailingPress,
  mono,
  secureTextEntry,
  placeholder,
  ...rest
}: Props) {
  const [focused, setFocused] = React.useState(false);
  const effective = focused && state === 'default' ? 'focus' : state;
  const borderColor =
    effective === 'error' ? LL.coral : effective === 'ok' || effective === 'focus' ? LL.ink : LL.bDefault;
  const helperColor =
    effective === 'error' ? LL.coral : effective === 'ok' ? '#3D7A1F' : LL.text2;
  const hintColor =
    state === 'ok' ? '#3D7A1F' : state === 'error' ? LL.coral : LL.text3;

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
        <Text style={[TL.labelMd, { color: LL.text2 }]}>{label}</Text>
        {hint ? <Text style={[TL.labelSm, { color: hintColor }]}>{hint}</Text> : null}
      </View>

      <View
        style={[
          {
            height: 54,
            backgroundColor: '#fff',
            borderRadius: 14,
            borderWidth: 1.5,
            borderColor,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          },
          (effective === 'focus' || effective === 'ok') && LS.sm,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={LL.text3}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          selectionColor={LL.coral}
          style={[
            mono ? TL.mono : TL.bodyLg,
            { flex: 1, fontSize: mono ? 15 : 16, color: LL.ink, padding: 0 },
          ]}
          {...rest}
        />
        {trailingIcon ? (
          <Text
            onPress={onTrailingPress}
            style={{ paddingLeft: 4, paddingVertical: 4 }}
            suppressHighlighting
          >
            <LIcon name={trailingIcon} size={18} color={trailingColor ?? LL.text3} />
          </Text>
        ) : null}
      </View>

      {helper ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6, marginLeft: 4 }}>
          {effective === 'ok' ? <LIcon name="check-circle" size={14} color="#3D7A1F" /> : null}
          {effective === 'error' ? <LIcon name="error" size={14} color={LL.coral} /> : null}
          <Text style={[TL.bodySm, { color: helperColor }]}>{helper}</Text>
        </View>
      ) : null}
    </View>
  );
}
