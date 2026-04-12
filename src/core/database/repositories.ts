/**
 * Lyftora — Typed Repository Layer
 *
 * Each repository wraps raw SQL with typed read/write methods.
 * Repositories use the generic helpers from client.ts and helpers.ts.
 *
 * Pattern:
 *   - getX / getAllX   → SELECT queries, returns mapped TS types
 *   - insertX          → INSERT, takes Omit<T, 'id'> or full T
 *   - updateX          → UPDATE by id
 *   - deleteX          → DELETE by id
 */

import type {
  User, UserPreferences, MedicalProfile,
  Exercise, Workout, WorkoutExercise, WorkoutSet,
  FoodEntry, MealLog, MealEntry,
  CoachSession, CoachMessage,
  PersonalRecord, BodyMeasurement,
  Post,
} from '../../types';
import { queryAll, queryFirst, execute, transaction } from './client';
import { generateId, mapRow, prepareRow, buildInsert, buildUpdate, nowISO } from './helpers';

// ─────────────────────────────────────────────
// User
// ─────────────────────────────────────────────

type UserRow = Omit<User, 'preferences' | 'medicalProfile'>;

export const UserRepo = {
  getById(id: string): (UserRow & { preferences: UserPreferences; medicalProfile: MedicalProfile | null }) | null {
    const user = queryFirst<Record<string, unknown>>('SELECT * FROM users WHERE id = ?', id);
    if (!user) return null;

    const prefs = queryFirst<Record<string, unknown>>('SELECT * FROM user_preferences WHERE user_id = ?', id);
    const medical = queryFirst<Record<string, unknown>>('SELECT * FROM medical_profiles WHERE user_id = ?', id);

    return {
      ...mapRow<UserRow>(user),
      preferences: prefs
        ? mapRow<UserPreferences>(prefs)
        : { units: 'metric', theme: 'dark', language: 'en', notificationsEnabled: true },
      medicalProfile: medical
        ? mapRow<MedicalProfile>(medical, ['dietaryRestrictions', 'medicalConditions'])
        : null,
    };
  },

  getByEmail(email: string): UserRow | null {
    const row = queryFirst<Record<string, unknown>>('SELECT * FROM users WHERE email = ?', email);
    return row ? mapRow<UserRow>(row) : null;
  },

  insert(user: Omit<User, 'preferences' | 'medicalProfile'>): string {
    const id = user.id || generateId();
    const prepared = prepareRow({ ...user, id, createdAt: user.createdAt || nowISO(), updatedAt: nowISO() });
    const [sql, params] = buildInsert('users', prepared);
    execute(sql, params);

    // Insert default preferences
    const [prefSql, prefParams] = buildInsert('user_preferences', { user_id: id });
    execute(prefSql, prefParams);

    return id;
  },

  updatePreferences(userId: string, prefs: Partial<UserPreferences>): void {
    const prepared = prepareRow(prefs);
    const [sql, params] = buildUpdate('user_preferences', prepared, 'user_id', userId);
    execute(sql, params);
  },

  upsertMedicalProfile(userId: string, profile: MedicalProfile): void {
    const prepared = prepareRow({ ...profile, userId, updatedAt: nowISO() });
    const existing = queryFirst('SELECT user_id FROM medical_profiles WHERE user_id = ?', userId);
    if (existing) {
      const [sql, params] = buildUpdate('medical_profiles', prepared, 'user_id', userId);
      execute(sql, params);
    } else {
      const [sql, params] = buildInsert('medical_profiles', prepared);
      execute(sql, params);
    }
  },

  delete(id: string): void {
    execute('DELETE FROM users WHERE id = ?', id);
  },
} as const;

// ─────────────────────────────────────────────
// Exercise
// ─────────────────────────────────────────────

export const ExerciseRepo = {
  getAll(): Exercise[] {
    const rows = queryAll<Record<string, unknown>>('SELECT * FROM exercises ORDER BY name COLLATE NOCASE');
    return rows.map((r) => mapRow<Exercise>(r, ['secondaryMuscles']));
  },

  getById(id: string): Exercise | null {
    const row = queryFirst<Record<string, unknown>>('SELECT * FROM exercises WHERE id = ?', id);
    return row ? mapRow<Exercise>(row, ['secondaryMuscles']) : null;
  },

  getByMuscleGroup(group: string): Exercise[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM exercises WHERE muscle_group = ? ORDER BY name COLLATE NOCASE',
      group
    );
    return rows.map((r) => mapRow<Exercise>(r, ['secondaryMuscles']));
  },

  search(query: string): Exercise[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM exercises WHERE name LIKE ? ORDER BY name COLLATE NOCASE LIMIT 50',
      `%${query}%`
    );
    return rows.map((r) => mapRow<Exercise>(r, ['secondaryMuscles']));
  },

  insert(exercise: Exercise): string {
    const id = exercise.id || generateId();
    const prepared = prepareRow({ ...exercise, id });
    const [sql, params] = buildInsert('exercises', prepared);
    execute(sql, params);
    return id;
  },

  bulkInsert(exercises: Exercise[]): void {
    transaction(() => {
      for (const exercise of exercises) {
        const prepared = prepareRow({ ...exercise, id: exercise.id || generateId() });
        const [sql, params] = buildInsert('exercises', prepared);
        execute(sql, params);
      }
    });
  },
} as const;

// ─────────────────────────────────────────────
// Workout (with nested exercises + sets)
// ─────────────────────────────────────────────

export const WorkoutRepo = {
  getById(id: string): Workout | null {
    const row = queryFirst<Record<string, unknown>>('SELECT * FROM workouts WHERE id = ?', id);
    if (!row) return null;

    const workout = mapRow<Omit<Workout, 'exercises'>>(row);
    const exercises = loadWorkoutExercises(id);
    return { ...workout, exercises };
  },

  getByUser(userId: string, limit = 50, offset = 0): Workout[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM workouts WHERE user_id = ? ORDER BY started_at DESC LIMIT ? OFFSET ?',
      userId, limit, offset
    );
    return rows.map((r) => {
      const w = mapRow<Omit<Workout, 'exercises'>>(r);
      return { ...w, exercises: loadWorkoutExercises(w.id) };
    });
  },

  getByUserAndDateRange(userId: string, startDate: string, endDate: string): Workout[] {
    const rows = queryAll<Record<string, unknown>>(
      `SELECT * FROM workouts
       WHERE user_id = ? AND started_at >= ? AND started_at <= ?
       ORDER BY started_at DESC`,
      userId, startDate, endDate
    );
    return rows.map((r) => {
      const w = mapRow<Omit<Workout, 'exercises'>>(r);
      return { ...w, exercises: loadWorkoutExercises(w.id) };
    });
  },

  insert(workout: Workout): string {
    const id = workout.id || generateId();

    transaction(() => {
      const prepared = prepareRow({
        id,
        userId: workout.userId,
        name: workout.name,
        startedAt: workout.startedAt,
        completedAt: workout.completedAt ?? null,
        durationMinutes: workout.durationMinutes,
        notes: workout.notes ?? null,
        createdAt: nowISO(),
      });
      const [sql, params] = buildInsert('workouts', prepared);
      execute(sql, params);

      for (let i = 0; i < workout.exercises.length; i++) {
        const we = workout.exercises[i];
        const weId = generateId();
        const wePrepared = prepareRow({
          id: weId,
          workoutId: id,
          exerciseId: we.exerciseId,
          sortOrder: i,
          restTimerSeconds: we.restTimerSeconds,
        });
        const [weSql, weParams] = buildInsert('workout_exercises', wePrepared);
        execute(weSql, weParams);

        for (let j = 0; j < we.sets.length; j++) {
          const s = we.sets[j];
          const setPrepared = prepareRow({
            id: s.id || generateId(),
            workoutExerciseId: weId,
            exerciseId: we.exerciseId,
            setOrder: j,
            reps: s.reps,
            weightKg: s.weightKg,
            isWarmup: s.isWarmup,
            isPr: s.isPR,
            completedAt: s.completedAt ?? null,
          });
          const [setSql, setParams] = buildInsert('workout_sets', setPrepared);
          execute(setSql, setParams);
        }
      }
    });

    return id;
  },

  delete(id: string): void {
    execute('DELETE FROM workouts WHERE id = ?', id);
  },

  countByUser(userId: string): number {
    const row = queryFirst<{ count: number }>('SELECT COUNT(*) as count FROM workouts WHERE user_id = ?', userId);
    return row?.count ?? 0;
  },
} as const;

function loadWorkoutExercises(workoutId: string): WorkoutExercise[] {
  const exRows = queryAll<Record<string, unknown>>(
    'SELECT * FROM workout_exercises WHERE workout_id = ? ORDER BY sort_order',
    workoutId
  );

  return exRows.map((exRow) => {
    const we = mapRow<{ id: string; exerciseId: string; restTimerSeconds: number }>(exRow);

    const setRows = queryAll<Record<string, unknown>>(
      'SELECT * FROM workout_sets WHERE workout_exercise_id = ? ORDER BY set_order',
      we.id
    );

    const sets: WorkoutSet[] = setRows.map((sr) => {
      const s = mapRow<WorkoutSet & { isPr: boolean }>(sr);
      return { ...s, isPR: s.isPr ?? false };
    });

    return {
      exerciseId: we.exerciseId,
      sets,
      restTimerSeconds: we.restTimerSeconds,
    };
  });
}

// ─────────────────────────────────────────────
// Nutrition
// ─────────────────────────────────────────────

export const FoodRepo = {
  getAll(): FoodEntry[] {
    const rows = queryAll<Record<string, unknown>>('SELECT * FROM food_entries ORDER BY name COLLATE NOCASE');
    return rows.map((r) => mapRow<FoodEntry>(r));
  },

  getById(id: string): FoodEntry | null {
    const row = queryFirst<Record<string, unknown>>('SELECT * FROM food_entries WHERE id = ?', id);
    return row ? mapRow<FoodEntry>(row) : null;
  },

  search(query: string): FoodEntry[] {
    const rows = queryAll<Record<string, unknown>>(
      `SELECT * FROM food_entries
       WHERE name LIKE ? OR name_regional LIKE ?
       ORDER BY name COLLATE NOCASE LIMIT 50`,
      `%${query}%`, `%${query}%`
    );
    return rows.map((r) => mapRow<FoodEntry>(r));
  },

  getByCategory(category: string): FoodEntry[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM food_entries WHERE category = ? ORDER BY name COLLATE NOCASE',
      category
    );
    return rows.map((r) => mapRow<FoodEntry>(r));
  },

  getByRegion(region: string): FoodEntry[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM food_entries WHERE region = ? ORDER BY name COLLATE NOCASE',
      region
    );
    return rows.map((r) => mapRow<FoodEntry>(r));
  },

  insert(food: FoodEntry): string {
    const id = food.id || generateId();
    const prepared = prepareRow({ ...food, id });
    const [sql, params] = buildInsert('food_entries', prepared);
    execute(sql, params);
    return id;
  },

  bulkInsert(foods: FoodEntry[]): void {
    transaction(() => {
      for (const food of foods) {
        const prepared = prepareRow({ ...food, id: food.id || generateId() });
        const [sql, params] = buildInsert('food_entries', prepared);
        execute(sql, params);
      }
    });
  },
} as const;

export const MealLogRepo = {
  getByUserAndDate(userId: string, date: string): MealLog[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM meal_logs WHERE user_id = ? AND date = ? ORDER BY created_at',
      userId, date
    );

    return rows.map((r) => {
      const log = mapRow<Omit<MealLog, 'entries'>>(r);
      const entryRows = queryAll<Record<string, unknown>>(
        'SELECT * FROM meal_entries WHERE meal_log_id = ?',
        log.id
      );
      return { ...log, entries: entryRows.map((er) => mapRow<MealEntry>(er)) };
    });
  },

  insert(log: MealLog): string {
    const id = log.id || generateId();

    transaction(() => {
      const prepared = prepareRow({
        id,
        userId: log.userId,
        date: log.date,
        mealType: log.mealType,
        createdAt: nowISO(),
      });
      const [sql, params] = buildInsert('meal_logs', prepared);
      execute(sql, params);

      for (const entry of log.entries) {
        const entryPrepared = prepareRow({
          id: generateId(),
          mealLogId: id,
          foodId: entry.foodId,
          servings: entry.servings,
          calories: entry.calories,
          proteinG: entry.proteinG,
          carbsG: entry.carbsG,
          fatG: entry.fatG,
        });
        const [entrySql, entryParams] = buildInsert('meal_entries', entryPrepared);
        execute(entrySql, entryParams);
      }
    });

    return id;
  },

  delete(id: string): void {
    execute('DELETE FROM meal_logs WHERE id = ?', id);
  },

  getDailyTotals(userId: string, date: string): { calories: number; proteinG: number; carbsG: number; fatG: number } {
    const row = queryFirst<{ calories: number; protein_g: number; carbs_g: number; fat_g: number }>(
      `SELECT
        COALESCE(SUM(me.calories), 0) as calories,
        COALESCE(SUM(me.protein_g), 0) as protein_g,
        COALESCE(SUM(me.carbs_g), 0) as carbs_g,
        COALESCE(SUM(me.fat_g), 0) as fat_g
       FROM meal_logs ml
       JOIN meal_entries me ON me.meal_log_id = ml.id
       WHERE ml.user_id = ? AND ml.date = ?`,
      userId, date
    );

    return {
      calories: row?.calories ?? 0,
      proteinG: row?.protein_g ?? 0,
      carbsG: row?.carbs_g ?? 0,
      fatG: row?.fat_g ?? 0,
    };
  },
} as const;

// ─────────────────────────────────────────────
// Coach
// ─────────────────────────────────────────────

export const CoachRepo = {
  getSessionsByUser(userId: string): CoachSession[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM coach_sessions WHERE user_id = ? ORDER BY updated_at DESC',
      userId
    );

    return rows.map((r) => {
      const session = mapRow<Omit<CoachSession, 'messages'>>(r);
      const msgRows = queryAll<Record<string, unknown>>(
        'SELECT * FROM coach_messages WHERE session_id = ? ORDER BY timestamp ASC',
        session.id
      );
      const messages = msgRows.map((mr) =>
        mapRow<CoachMessage>(mr, ['exercisesRecommended', 'mealsRecommended'])
      );
      return { ...session, messages };
    });
  },

  getSessionById(id: string): CoachSession | null {
    const row = queryFirst<Record<string, unknown>>('SELECT * FROM coach_sessions WHERE id = ?', id);
    if (!row) return null;

    const session = mapRow<Omit<CoachSession, 'messages'>>(row);
    const msgRows = queryAll<Record<string, unknown>>(
      'SELECT * FROM coach_messages WHERE session_id = ? ORDER BY timestamp ASC',
      session.id
    );
    const messages = msgRows.map((mr) =>
      mapRow<CoachMessage>(mr, ['exercisesRecommended', 'mealsRecommended'])
    );
    return { ...session, messages };
  },

  createSession(userId: string): string {
    const id = generateId();
    const prepared = prepareRow({ id, userId, createdAt: nowISO(), updatedAt: nowISO() });
    const [sql, params] = buildInsert('coach_sessions', prepared);
    execute(sql, params);
    return id;
  },

  addMessage(sessionId: string, message: Omit<CoachMessage, 'id'>): string {
    const id = generateId();
    const prepared = prepareRow({
      id,
      sessionId,
      role: message.role,
      content: message.content,
      timestamp: message.timestamp || nowISO(),
      planGenerated: message.metadata?.planGenerated ?? false,
      exercisesRecommended: message.metadata?.exercisesRecommended ?? [],
      mealsRecommended: message.metadata?.mealsRecommended ?? [],
    });
    const [sql, params] = buildInsert('coach_messages', prepared);
    execute(sql, params);

    // Touch session updated_at
    execute('UPDATE coach_sessions SET updated_at = ? WHERE id = ?', nowISO(), sessionId);

    return id;
  },

  deleteSession(id: string): void {
    execute('DELETE FROM coach_sessions WHERE id = ?', id);
  },
} as const;

// ─────────────────────────────────────────────
// Progress
// ─────────────────────────────────────────────

export const PersonalRecordRepo = {
  getByUser(userId: string): PersonalRecord[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM personal_records WHERE user_id = ? ORDER BY achieved_at DESC',
      userId
    );
    return rows.map((r) => mapRow<PersonalRecord>(r));
  },

  getByExercise(userId: string, exerciseId: string): PersonalRecord[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM personal_records WHERE user_id = ? AND exercise_id = ? ORDER BY achieved_at DESC',
      userId, exerciseId
    );
    return rows.map((r) => mapRow<PersonalRecord>(r));
  },

  getBestForExercise(userId: string, exerciseId: string): PersonalRecord | null {
    const row = queryFirst<Record<string, unknown>>(
      'SELECT * FROM personal_records WHERE user_id = ? AND exercise_id = ? ORDER BY weight_kg DESC LIMIT 1',
      userId, exerciseId
    );
    return row ? mapRow<PersonalRecord>(row) : null;
  },

  insert(pr: PersonalRecord): string {
    const id = pr.id || generateId();
    const prepared = prepareRow({ ...pr, id });
    const [sql, params] = buildInsert('personal_records', prepared);
    execute(sql, params);
    return id;
  },
} as const;

export const BodyMeasurementRepo = {
  getByUser(userId: string, limit = 30): BodyMeasurement[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM body_measurements WHERE user_id = ? ORDER BY date DESC LIMIT ?',
      userId, limit
    );
    return rows.map((r) => mapRow<BodyMeasurement>(r, ['measurements']));
  },

  getLatest(userId: string): BodyMeasurement | null {
    const row = queryFirst<Record<string, unknown>>(
      'SELECT * FROM body_measurements WHERE user_id = ? ORDER BY date DESC LIMIT 1',
      userId
    );
    return row ? mapRow<BodyMeasurement>(row, ['measurements']) : null;
  },

  insert(measurement: BodyMeasurement): string {
    const id = measurement.id || generateId();
    const prepared = prepareRow({ ...measurement, id, createdAt: nowISO() });
    const [sql, params] = buildInsert('body_measurements', prepared);
    execute(sql, params);
    return id;
  },
} as const;

// ─────────────────────────────────────────────
// Social (Phase 2)
// ─────────────────────────────────────────────

export const PostRepo = {
  getFeed(userId: string, limit = 20, offset = 0): Post[] {
    // Feed = posts from people the user follows + own posts
    const rows = queryAll<Record<string, unknown>>(
      `SELECT p.* FROM posts p
       WHERE p.user_id = ?
          OR p.user_id IN (SELECT following_id FROM follows WHERE follower_id = ?)
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      userId, userId, limit, offset
    );
    return rows.map((r) => mapRow<Post>(r));
  },

  getByUser(userId: string, limit = 20): Post[] {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      userId, limit
    );
    return rows.map((r) => mapRow<Post>(r));
  },

  insert(post: Omit<Post, 'likes' | 'comments'>): string {
    const id = post.id || generateId();
    const prepared = prepareRow({
      ...post,
      id,
      likesCount: 0,
      commentsCount: 0,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    });
    const [sql, params] = buildInsert('posts', prepared);
    execute(sql, params);
    return id;
  },

  toggleLike(postId: string, userId: string): boolean {
    const existing = queryFirst(
      'SELECT id FROM likes WHERE post_id = ? AND user_id = ?',
      postId, userId
    );

    if (existing) {
      execute('DELETE FROM likes WHERE post_id = ? AND user_id = ?', postId, userId);
      execute('UPDATE posts SET likes_count = likes_count - 1 WHERE id = ?', postId);
      return false;
    } else {
      const [sql, params] = buildInsert('likes', prepareRow({
        id: generateId(),
        postId,
        userId,
        createdAt: nowISO(),
      }));
      execute(sql, params);
      execute('UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?', postId);
      return true;
    }
  },

  delete(id: string): void {
    execute('DELETE FROM posts WHERE id = ?', id);
  },
} as const;

export const FollowRepo = {
  follow(followerId: string, followingId: string): void {
    const [sql, params] = buildInsert('follows', prepareRow({
      id: generateId(),
      followerId,
      followingId,
      createdAt: nowISO(),
    }));
    execute(sql, params);
  },

  unfollow(followerId: string, followingId: string): void {
    execute('DELETE FROM follows WHERE follower_id = ? AND following_id = ?', followerId, followingId);
  },

  isFollowing(followerId: string, followingId: string): boolean {
    const row = queryFirst(
      'SELECT id FROM follows WHERE follower_id = ? AND following_id = ?',
      followerId, followingId
    );
    return row !== null;
  },

  getFollowerCount(userId: string): number {
    const row = queryFirst<{ count: number }>('SELECT COUNT(*) as count FROM follows WHERE following_id = ?', userId);
    return row?.count ?? 0;
  },

  getFollowingCount(userId: string): number {
    const row = queryFirst<{ count: number }>('SELECT COUNT(*) as count FROM follows WHERE follower_id = ?', userId);
    return row?.count ?? 0;
  },
} as const;

// ─────────────────────────────────────────────
// Notifications (Phase 2)
// ─────────────────────────────────────────────

export const NotificationRepo = {
  getByUser(userId: string, limit = 50): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      userId, limit
    );
    return rows.map((r) => mapRow(r, ['data']));
  },

  getUnreadCount(userId: string): number {
    const row = queryFirst<{ count: number }>(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0',
      userId
    );
    return row?.count ?? 0;
  },

  markAsRead(id: string): void {
    execute('UPDATE notifications SET is_read = 1 WHERE id = ?', id);
  },

  markAllAsRead(userId: string): void {
    execute('UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0', userId);
  },

  insert(notification: { userId: string; type: string; title: string; body?: string; data?: Record<string, unknown> }): string {
    const id = generateId();
    const prepared = prepareRow({
      id,
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      body: notification.body ?? '',
      data: notification.data ?? {},
      isRead: false,
      createdAt: nowISO(),
    });
    const [sql, params] = buildInsert('notifications', prepared);
    execute(sql, params);
    return id;
  },
} as const;

// ─────────────────────────────────────────────
// Sync Queue (Phase 2 — offline-first)
// ─────────────────────────────────────────────

export const SyncQueueRepo = {
  getPending(limit = 100): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM sync_queue WHERE status = ? ORDER BY created_at ASC LIMIT ?',
      'pending', limit
    );
    return rows.map((r) => mapRow(r, ['payload']));
  },

  enqueue(tableName: string, recordId: string, operation: 'INSERT' | 'UPDATE' | 'DELETE', payload: Record<string, unknown>): string {
    const id = generateId();
    const prepared = prepareRow({
      id,
      tableName,
      recordId,
      operation,
      payload,
      status: 'pending',
      retryCount: 0,
      createdAt: nowISO(),
    });
    const [sql, params] = buildInsert('sync_queue', prepared);
    execute(sql, params);
    return id;
  },

  markSynced(id: string): void {
    execute('UPDATE sync_queue SET status = ?, synced_at = ? WHERE id = ?', 'synced', nowISO(), id);
  },

  markFailed(id: string): void {
    execute('UPDATE sync_queue SET status = ?, retry_count = retry_count + 1 WHERE id = ?', 'failed', id);
  },

  clearSynced(): void {
    execute('DELETE FROM sync_queue WHERE status = ?', 'synced');
  },
} as const;

// ─────────────────────────────────────────────
// Comments (Phase 2)
// ─────────────────────────────────────────────

export const CommentRepo = {
  getByPost(postId: string, limit = 50): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC LIMIT ?',
      postId, limit
    );
    return rows.map((r) => mapRow(r));
  },

  insert(postId: string, userId: string, content: string): string {
    const id = generateId();
    const prepared = prepareRow({ id, postId, userId, content, createdAt: nowISO() });
    const [sql, params] = buildInsert('comments', prepared);
    execute(sql, params);
    execute('UPDATE posts SET comments_count = comments_count + 1 WHERE id = ?', postId);
    return id;
  },

  delete(id: string, postId: string): void {
    execute('DELETE FROM comments WHERE id = ?', id);
    execute('UPDATE posts SET comments_count = comments_count - 1 WHERE id = ?', postId);
  },
} as const;

// ─────────────────────────────────────────────
// Challenges (Phase 2)
// ─────────────────────────────────────────────

export const ChallengeRepo = {
  getActive(): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      "SELECT * FROM challenges WHERE end_date >= date('now') ORDER BY start_date ASC"
    );
    return rows.map((r) => mapRow(r));
  },

  getById(id: string): Record<string, unknown> | null {
    const row = queryFirst<Record<string, unknown>>('SELECT * FROM challenges WHERE id = ?', id);
    return row ? mapRow(row) : null;
  },

  insert(challenge: Record<string, unknown>): string {
    const id = (challenge['id'] as string) || generateId();
    const prepared = prepareRow({ ...challenge, id, createdAt: nowISO() });
    const [sql, params] = buildInsert('challenges', prepared);
    execute(sql, params);
    return id;
  },

  join(challengeId: string, userId: string): void {
    const prepared = prepareRow({
      id: generateId(),
      challengeId,
      userId,
      currentValue: 0,
      joinedAt: nowISO(),
    });
    const [sql, params] = buildInsert('challenge_participants', prepared);
    execute(sql, params);
  },

  updateProgress(challengeId: string, userId: string, value: number): void {
    execute(
      'UPDATE challenge_participants SET current_value = ? WHERE challenge_id = ? AND user_id = ?',
      value, challengeId, userId
    );
  },

  getLeaderboard(challengeId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM challenge_participants WHERE challenge_id = ? ORDER BY current_value DESC',
      challengeId
    );
    return rows.map((r) => mapRow(r));
  },
} as const;

// ─────────────────────────────────────────────
// Workout Programs (Phase 3)
// ─────────────────────────────────────────────

export const WorkoutProgramRepo = {
  getByUser(userId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM workout_programs WHERE user_id = ? ORDER BY updated_at DESC',
      userId
    );
    return rows.map((r) => mapRow(r));
  },

  getById(id: string): Record<string, unknown> | null {
    const row = queryFirst<Record<string, unknown>>('SELECT * FROM workout_programs WHERE id = ?', id);
    return row ? mapRow(row) : null;
  },

  getTemplates(): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM workout_programs WHERE is_template = 1 ORDER BY name'
    );
    return rows.map((r) => mapRow(r));
  },

  insert(program: Record<string, unknown>): string {
    const id = (program['id'] as string) || generateId();
    const prepared = prepareRow({ ...program, id, createdAt: nowISO(), updatedAt: nowISO() });
    const [sql, params] = buildInsert('workout_programs', prepared);
    execute(sql, params);
    return id;
  },

  getDays(programId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM program_days WHERE program_id = ? ORDER BY week_number, day_number',
      programId
    );
    return rows.map((r) => mapRow(r));
  },

  getExercisesForDay(dayId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM program_exercises WHERE program_day_id = ? ORDER BY sort_order',
      dayId
    );
    return rows.map((r) => mapRow(r));
  },

  delete(id: string): void {
    execute('DELETE FROM workout_programs WHERE id = ?', id);
  },
} as const;

// ─────────────────────────────────────────────
// Body Photos (Phase 3)
// ─────────────────────────────────────────────

export const BodyPhotoRepo = {
  getByUser(userId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM body_photos WHERE user_id = ? ORDER BY taken_at DESC',
      userId
    );
    return rows.map((r) => mapRow(r));
  },

  insert(photo: { userId: string; measurementId?: string; pose: string; filePath: string }): string {
    const id = generateId();
    const prepared = prepareRow({ id, ...photo, takenAt: nowISO() });
    const [sql, params] = buildInsert('body_photos', prepared);
    execute(sql, params);
    return id;
  },

  delete(id: string): void {
    execute('DELETE FROM body_photos WHERE id = ?', id);
  },
} as const;

// ─────────────────────────────────────────────
// User Streaks (Phase 3)
// ─────────────────────────────────────────────

export const UserStreakRepo = {
  getByUser(userId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM user_streaks WHERE user_id = ?',
      userId
    );
    return rows.map((r) => mapRow(r));
  },

  upsert(userId: string, type: string, currentCount: number, lastDate: string): void {
    const existing = queryFirst(
      'SELECT id FROM user_streaks WHERE user_id = ? AND type = ?',
      userId, type
    );
    if (existing) {
      execute(
        `UPDATE user_streaks SET current_count = ?, longest_count = MAX(longest_count, ?), last_activity_date = ? WHERE user_id = ? AND type = ?`,
        currentCount, currentCount, lastDate, userId, type
      );
    } else {
      const prepared = prepareRow({
        id: generateId(), userId, type, currentCount, longestCount: currentCount, lastActivityDate: lastDate,
      });
      const [sql, params] = buildInsert('user_streaks', prepared);
      execute(sql, params);
    }
  },
} as const;

// ─────────────────────────────────────────────
// Expansion Packs & Purchases (Phase 3)
// ─────────────────────────────────────────────

export const ExpansionPackRepo = {
  getAll(): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>('SELECT * FROM expansion_packs ORDER BY name');
    return rows.map((r) => mapRow(r, ['contentData']));
  },

  getByType(type: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM expansion_packs WHERE type = ? ORDER BY name',
      type
    );
    return rows.map((r) => mapRow(r, ['contentData']));
  },

  getUserPurchases(userId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      `SELECT up.*, ep.name, ep.type, ep.content_data
       FROM user_purchases up
       JOIN expansion_packs ep ON ep.id = up.pack_id
       WHERE up.user_id = ?`,
      userId
    );
    return rows.map((r) => mapRow(r, ['contentData']));
  },

  recordPurchase(userId: string, packId: string, transactionId: string): string {
    const id = generateId();
    const prepared = prepareRow({
      id, userId, packId, storeTransactionId: transactionId, purchasedAt: nowISO(),
    });
    const [sql, params] = buildInsert('user_purchases', prepared);
    execute(sql, params);
    return id;
  },
} as const;

// ─────────────────────────────────────────────
// Trainers & Marketplace (Phase 4)
// ─────────────────────────────────────────────

export const TrainerRepo = {
  getAll(limit = 50): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM trainers WHERE is_verified = 1 ORDER BY rating DESC LIMIT ?',
      limit
    );
    return rows.map((r) => mapRow(r, ['specializations', 'certifications']));
  },

  getByUserId(userId: string): Record<string, unknown> | null {
    const row = queryFirst<Record<string, unknown>>('SELECT * FROM trainers WHERE user_id = ?', userId);
    return row ? mapRow(row, ['specializations', 'certifications']) : null;
  },

  getPrograms(trainerId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM trainer_programs WHERE trainer_id = ? AND is_published = 1 ORDER BY created_at DESC',
      trainerId
    );
    return rows.map((r) => mapRow(r));
  },

  getReviews(trainerId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM trainer_reviews WHERE trainer_id = ? ORDER BY created_at DESC',
      trainerId
    );
    return rows.map((r) => mapRow(r));
  },

  addReview(trainerId: string, userId: string, rating: number, text: string, programId?: string): string {
    const id = generateId();
    const prepared = prepareRow({
      id, trainerId, userId, programId: programId ?? null, rating, reviewText: text, createdAt: nowISO(),
    });
    const [sql, params] = buildInsert('trainer_reviews', prepared);
    execute(sql, params);

    // Update trainer aggregate rating
    const avg = queryFirst<{ avg_rating: number; cnt: number }>(
      'SELECT AVG(rating) as avg_rating, COUNT(*) as cnt FROM trainer_reviews WHERE trainer_id = ?',
      trainerId
    );
    if (avg) {
      execute('UPDATE trainers SET rating = ?, total_reviews = ? WHERE id = ?', avg.avg_rating, avg.cnt, trainerId);
    }
    return id;
  },
} as const;

// ─────────────────────────────────────────────
// Referrals (Phase 4)
// ─────────────────────────────────────────────

export const ReferralRepo = {
  getCode(userId: string): string | null {
    const row = queryFirst<{ code: string }>('SELECT code FROM referral_codes WHERE user_id = ?', userId);
    return row?.code ?? null;
  },

  createCode(userId: string, code: string): void {
    const prepared = prepareRow({ code, userId, usesCount: 0, maxUses: 10, createdAt: nowISO() });
    const [sql, params] = buildInsert('referral_codes', prepared);
    execute(sql, params);
  },

  recordReferral(referrerId: string, referredId: string, code: string, rewardType: string): string {
    const id = generateId();
    transaction(() => {
      const prepared = prepareRow({
        id, referrerId, referredId, referralCode: code, rewardType, isRedeemed: false, createdAt: nowISO(),
      });
      const [sql, params] = buildInsert('referrals', prepared);
      execute(sql, params);
      execute('UPDATE referral_codes SET uses_count = uses_count + 1 WHERE code = ?', code);
    });
    return id;
  },

  getReferralCount(userId: string): number {
    const row = queryFirst<{ count: number }>(
      'SELECT COUNT(*) as count FROM referrals WHERE referrer_id = ?', userId
    );
    return row?.count ?? 0;
  },
} as const;

// ─────────────────────────────────────────────
// Wearables (Phase 4)
// ─────────────────────────────────────────────

export const WearableRepo = {
  getConnections(userId: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM wearable_connections WHERE user_id = ? AND is_active = 1',
      userId
    );
    return rows.map((r) => mapRow(r));
  },

  upsertConnection(userId: string, provider: string, accessToken: string, refreshToken?: string): void {
    const existing = queryFirst(
      'SELECT id FROM wearable_connections WHERE user_id = ? AND provider = ?',
      userId, provider
    );
    if (existing) {
      execute(
        'UPDATE wearable_connections SET access_token = ?, refresh_token = ?, is_active = 1, last_synced_at = ? WHERE user_id = ? AND provider = ?',
        accessToken, refreshToken ?? null, nowISO(), userId, provider
      );
    } else {
      const prepared = prepareRow({
        id: generateId(), userId, provider, accessToken, refreshToken: refreshToken ?? null,
        isActive: true, connectedAt: nowISO(),
      });
      const [sql, params] = buildInsert('wearable_connections', prepared);
      execute(sql, params);
    }
  },

  disconnect(userId: string, provider: string): void {
    execute(
      'UPDATE wearable_connections SET is_active = 0 WHERE user_id = ? AND provider = ?',
      userId, provider
    );
  },

  insertData(data: { userId: string; provider: string; date: string; steps?: number; caloriesBurned?: number; heartRateAvg?: number; heartRateMax?: number; sleepHours?: number; rawData?: Record<string, unknown> }): string {
    const id = generateId();
    const prepared = prepareRow({ id, ...data, rawData: data.rawData ?? {}, syncedAt: nowISO() });
    const [sql, params] = buildInsert('wearable_data', prepared);
    execute(sql, params);
    return id;
  },

  getDataByDate(userId: string, date: string): Array<Record<string, unknown>> {
    const rows = queryAll<Record<string, unknown>>(
      'SELECT * FROM wearable_data WHERE user_id = ? AND date = ?',
      userId, date
    );
    return rows.map((r) => mapRow(r, ['rawData']));
  },
} as const;
