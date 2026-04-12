/**
 * Lyftora — Database Module
 *
 * Public API for the database layer.
 *
 * Usage:
 *   import { initDatabase, UserRepo, WorkoutRepo } from '@/core/database';
 *
 *   // At app startup (e.g., in App.tsx or a bootstrap hook):
 *   initDatabase();
 *
 *   // Then use repositories anywhere:
 *   const user = UserRepo.getById('abc123');
 */

// Initialization
import { runMigrations } from './client';
export { getDatabase, closeDatabase, runMigrations, getCurrentVersion } from './client';
export { queryAll, queryFirst, execute, transaction } from './client';

// Repositories
// Phase 1 — Core MVP
export {
  UserRepo,
  ExerciseRepo,
  WorkoutRepo,
  FoodRepo,
  MealLogRepo,
  CoachRepo,
  PersonalRecordRepo,
  BodyMeasurementRepo,
} from './repositories';

// Phase 2 — Social + Sync
export {
  PostRepo,
  FollowRepo,
  CommentRepo,
  ChallengeRepo,
  NotificationRepo,
  SyncQueueRepo,
} from './repositories';

// Phase 3 — Intelligence + Scale
export {
  WorkoutProgramRepo,
  BodyPhotoRepo,
  UserStreakRepo,
  ExpansionPackRepo,
} from './repositories';

// Phase 4 — Marketplace + Growth
export {
  TrainerRepo,
  ReferralRepo,
  WearableRepo,
} from './repositories';

// Helpers
export { generateId, mapRow, prepareRow, nowISO } from './helpers';

// Zustand middleware
export { withSQLite, hydrateStore } from './zustandMiddleware';

// Schema (for testing / introspection)
export * as Schema from './schema';
export { MIGRATIONS } from './migrations';
export type { Migration } from './migrations';

/**
 * Initialize the database and run all pending migrations.
 * Call this once at app startup before any store hydration.
 *
 * @param targetVersion - Optional: only apply migrations up to this version.
 *   Use 1 for Phase 1 MVP, 2 for Phase 2, etc.
 *   Defaults to latest.
 */
export function initDatabase(targetVersion?: number): void {
  runMigrations(targetVersion);
}
