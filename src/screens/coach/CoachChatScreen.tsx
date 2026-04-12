import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../components/common/ScreenWrapper';
import { Typography } from '../../components/common/Typography';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useTheme } from '../../hooks/useTheme';
import { spacing } from '../../theme/spacing';
import type { RootStackScreenProps } from '../../types/navigation';

export function CoachChatScreen(_props: RootStackScreenProps<'CoachChat'>) {
  const { colors } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Typography variant="displaySmall">AI Coach</Typography>
        <Typography variant="bodyMedium" color={colors.textSecondary}>
          Powered by Claude
        </Typography>
      </View>

      <View style={styles.chatArea}>
        <View style={[styles.bubble, { backgroundColor: colors.surface }]}>
          <Typography variant="bodyMedium">
            Hey! I&apos;m your AI fitness coach. I can help you create workout plans,
            suggest nutrition strategies, and answer any fitness questions. What would
            you like to work on today?
          </Typography>
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Input
            placeholder="Ask your coach..."
            containerStyle={styles.inputContainer}
          />
        </View>
        <Button title="Send" variant="accent" style={styles.sendButton} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  chatArea: {
    flex: 1,
    paddingBottom: spacing.base,
  },
  bubble: {
    padding: spacing.base,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    maxWidth: '85%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: spacing.base,
    gap: spacing.sm,
  },
  inputWrapper: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 0,
  },
  sendButton: {
    marginBottom: 0,
  },
});
