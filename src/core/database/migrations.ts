/**
 * Lyftora — Migration Registry
 *
 * Each migration is a versioned set of SQL statements that run in order.
 * Once applied, a migration is never re-run (tracked in _migrations table).
 */

import * as Schema from './schema';

export interface Migration {
  readonly version: number;
  readonly name: string;
  readonly statements: readonly string[];
}

export const MIGRATIONS: readonly Migration[] = [
  {
    version: 1,
    name: 'core_mvp',
    statements: [
      Schema.MIGRATION_001_USERS,
      Schema.MIGRATION_001_USER_PREFERENCES,
      Schema.MIGRATION_001_MEDICAL_PROFILES,
      Schema.MIGRATION_001_EXERCISES,
      Schema.MIGRATION_001_WORKOUTS,
      Schema.MIGRATION_001_WORKOUT_EXERCISES,
      Schema.MIGRATION_001_WORKOUT_SETS,
      Schema.MIGRATION_001_FOOD_ENTRIES,
      Schema.MIGRATION_001_MEAL_LOGS,
      Schema.MIGRATION_001_MEAL_ENTRIES,
      Schema.MIGRATION_001_COACH_SESSIONS,
      Schema.MIGRATION_001_COACH_MESSAGES,
      Schema.MIGRATION_001_PERSONAL_RECORDS,
      Schema.MIGRATION_001_BODY_MEASUREMENTS,
      ...Schema.MIGRATION_001_INDEXES,
    ],
  },
  {
    version: 2,
    name: 'social_and_sync',
    statements: [
      Schema.MIGRATION_002_POSTS,
      Schema.MIGRATION_002_COMMENTS,
      Schema.MIGRATION_002_LIKES,
      Schema.MIGRATION_002_FOLLOWS,
      Schema.MIGRATION_002_CHALLENGES,
      Schema.MIGRATION_002_CHALLENGE_PARTICIPANTS,
      Schema.MIGRATION_002_NOTIFICATIONS,
      Schema.MIGRATION_002_SYNC_QUEUE,
      ...Schema.MIGRATION_002_INDEXES,
    ],
  },
  {
    version: 3,
    name: 'intelligence_and_scale',
    statements: [
      Schema.MIGRATION_003_WORKOUT_PROGRAMS,
      Schema.MIGRATION_003_PROGRAM_DAYS,
      Schema.MIGRATION_003_PROGRAM_EXERCISES,
      Schema.MIGRATION_003_BODY_PHOTOS,
      Schema.MIGRATION_003_USER_STREAKS,
      Schema.MIGRATION_003_EXPANSION_PACKS,
      Schema.MIGRATION_003_USER_PURCHASES,
      ...Schema.MIGRATION_003_INDEXES,
    ],
  },
  {
    version: 4,
    name: 'marketplace_and_growth',
    statements: [
      Schema.MIGRATION_004_TRAINERS,
      Schema.MIGRATION_004_TRAINER_PROGRAMS,
      Schema.MIGRATION_004_TRAINER_REVIEWS,
      Schema.MIGRATION_004_REFERRALS,
      Schema.MIGRATION_004_REFERRAL_CODES,
      Schema.MIGRATION_004_WEARABLE_CONNECTIONS,
      Schema.MIGRATION_004_WEARABLE_DATA,
      ...Schema.MIGRATION_004_INDEXES,
    ],
  },
] as const;
