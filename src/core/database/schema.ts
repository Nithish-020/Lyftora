/**
 * Lyftora — SQLite Schema Definitions (All Phases)
 *
 * Organized by migration version so each phase can be applied incrementally.
 * expo-sqlite uses synchronous API — all SQL runs on the JS thread via JSI.
 *
 * Naming: snake_case for SQL columns, PascalCase for TS types.
 * All timestamps stored as ISO-8601 strings (SQLite has no native datetime).
 * All IDs are TEXT (nanoid / UUID) — no auto-increment.
 */

// ─────────────────────────────────────────────
// Phase 1 — Core MVP (Android Launch)
// ─────────────────────────────────────────────

export const MIGRATION_001_USERS = `
  CREATE TABLE IF NOT EXISTS users (
    id                    TEXT PRIMARY KEY NOT NULL,
    email                 TEXT NOT NULL UNIQUE,
    display_name          TEXT NOT NULL,
    avatar_url            TEXT,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_001_USER_PREFERENCES = `
  CREATE TABLE IF NOT EXISTS user_preferences (
    user_id               TEXT PRIMARY KEY NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    units                 TEXT NOT NULL DEFAULT 'metric' CHECK(units IN ('metric', 'imperial')),
    theme                 TEXT NOT NULL DEFAULT 'dark' CHECK(theme IN ('dark', 'light', 'system')),
    language              TEXT NOT NULL DEFAULT 'en',
    notifications_enabled INTEGER NOT NULL DEFAULT 1
  );
`;

export const MIGRATION_001_MEDICAL_PROFILES = `
  CREATE TABLE IF NOT EXISTS medical_profiles (
    user_id               TEXT PRIMARY KEY NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    age                   INTEGER NOT NULL,
    sex                   TEXT NOT NULL CHECK(sex IN ('male', 'female', 'other')),
    height_cm             REAL NOT NULL,
    weight_kg             REAL NOT NULL,
    activity_level        TEXT NOT NULL CHECK(activity_level IN ('sedentary', 'light', 'moderate', 'active', 'veryActive')),
    goal                  TEXT NOT NULL CHECK(goal IN ('lose', 'maintain', 'gain')),
    dietary_restrictions  TEXT NOT NULL DEFAULT '[]',
    medical_conditions    TEXT NOT NULL DEFAULT '[]',
    updated_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_001_EXERCISES = `
  CREATE TABLE IF NOT EXISTS exercises (
    id                    TEXT PRIMARY KEY NOT NULL,
    name                  TEXT NOT NULL,
    muscle_group          TEXT NOT NULL,
    secondary_muscles     TEXT NOT NULL DEFAULT '[]',
    equipment             TEXT NOT NULL,
    instructions          TEXT NOT NULL DEFAULT '',
    image_url             TEXT,
    is_custom             INTEGER NOT NULL DEFAULT 0,
    created_by_user_id    TEXT REFERENCES users(id) ON DELETE SET NULL
  );
`;

export const MIGRATION_001_WORKOUTS = `
  CREATE TABLE IF NOT EXISTS workouts (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name                  TEXT NOT NULL,
    started_at            TEXT NOT NULL,
    completed_at          TEXT,
    duration_minutes      INTEGER NOT NULL DEFAULT 0,
    notes                 TEXT,
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_001_WORKOUT_EXERCISES = `
  CREATE TABLE IF NOT EXISTS workout_exercises (
    id                    TEXT PRIMARY KEY NOT NULL,
    workout_id            TEXT NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id           TEXT NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
    sort_order            INTEGER NOT NULL DEFAULT 0,
    rest_timer_seconds    INTEGER NOT NULL DEFAULT 90
  );
`;

export const MIGRATION_001_WORKOUT_SETS = `
  CREATE TABLE IF NOT EXISTS workout_sets (
    id                    TEXT PRIMARY KEY NOT NULL,
    workout_exercise_id   TEXT NOT NULL REFERENCES workout_exercises(id) ON DELETE CASCADE,
    exercise_id           TEXT NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
    set_order             INTEGER NOT NULL DEFAULT 0,
    reps                  INTEGER NOT NULL DEFAULT 0,
    weight_kg             REAL NOT NULL DEFAULT 0,
    is_warmup             INTEGER NOT NULL DEFAULT 0,
    is_pr                 INTEGER NOT NULL DEFAULT 0,
    completed_at          TEXT
  );
`;

export const MIGRATION_001_FOOD_ENTRIES = `
  CREATE TABLE IF NOT EXISTS food_entries (
    id                    TEXT PRIMARY KEY NOT NULL,
    name                  TEXT NOT NULL,
    name_regional         TEXT,
    region                TEXT,
    calories_per_serving  REAL NOT NULL,
    protein_g             REAL NOT NULL,
    carbs_g               REAL NOT NULL,
    fat_g                 REAL NOT NULL,
    fiber_g               REAL NOT NULL DEFAULT 0,
    serving_size          TEXT NOT NULL,
    serving_unit          TEXT NOT NULL,
    category              TEXT NOT NULL,
    is_custom             INTEGER NOT NULL DEFAULT 0,
    created_by_user_id    TEXT REFERENCES users(id) ON DELETE SET NULL
  );
`;

export const MIGRATION_001_MEAL_LOGS = `
  CREATE TABLE IF NOT EXISTS meal_logs (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date                  TEXT NOT NULL,
    meal_type             TEXT NOT NULL CHECK(meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_001_MEAL_ENTRIES = `
  CREATE TABLE IF NOT EXISTS meal_entries (
    id                    TEXT PRIMARY KEY NOT NULL,
    meal_log_id           TEXT NOT NULL REFERENCES meal_logs(id) ON DELETE CASCADE,
    food_id               TEXT NOT NULL REFERENCES food_entries(id) ON DELETE RESTRICT,
    servings              REAL NOT NULL DEFAULT 1,
    calories              REAL NOT NULL,
    protein_g             REAL NOT NULL,
    carbs_g               REAL NOT NULL,
    fat_g                 REAL NOT NULL
  );
`;

export const MIGRATION_001_COACH_SESSIONS = `
  CREATE TABLE IF NOT EXISTS coach_sessions (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_001_COACH_MESSAGES = `
  CREATE TABLE IF NOT EXISTS coach_messages (
    id                    TEXT PRIMARY KEY NOT NULL,
    session_id            TEXT NOT NULL REFERENCES coach_sessions(id) ON DELETE CASCADE,
    role                  TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
    content               TEXT NOT NULL,
    timestamp             TEXT NOT NULL DEFAULT (datetime('now')),
    plan_generated        INTEGER NOT NULL DEFAULT 0,
    exercises_recommended TEXT NOT NULL DEFAULT '[]',
    meals_recommended     TEXT NOT NULL DEFAULT '[]'
  );
`;

export const MIGRATION_001_PERSONAL_RECORDS = `
  CREATE TABLE IF NOT EXISTS personal_records (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id           TEXT NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    weight_kg             REAL NOT NULL,
    reps                  INTEGER NOT NULL,
    achieved_at           TEXT NOT NULL
  );
`;

export const MIGRATION_001_BODY_MEASUREMENTS = `
  CREATE TABLE IF NOT EXISTS body_measurements (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date                  TEXT NOT NULL,
    weight_kg             REAL,
    body_fat_pct          REAL,
    measurements          TEXT NOT NULL DEFAULT '{}',
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

// Indexes — Phase 1
export const MIGRATION_001_INDEXES = [
  `CREATE INDEX IF NOT EXISTS idx_workouts_user_id ON workouts(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_workouts_started_at ON workouts(started_at);`,
  `CREATE INDEX IF NOT EXISTS idx_workouts_user_date ON workouts(user_id, started_at);`,
  `CREATE INDEX IF NOT EXISTS idx_workout_exercises_workout_id ON workout_exercises(workout_id);`,
  `CREATE INDEX IF NOT EXISTS idx_workout_sets_workout_exercise_id ON workout_sets(workout_exercise_id);`,
  `CREATE INDEX IF NOT EXISTS idx_workout_sets_exercise_id ON workout_sets(exercise_id);`,
  `CREATE INDEX IF NOT EXISTS idx_exercises_muscle_group ON exercises(muscle_group);`,
  `CREATE INDEX IF NOT EXISTS idx_exercises_name ON exercises(name COLLATE NOCASE);`,
  `CREATE INDEX IF NOT EXISTS idx_food_entries_name ON food_entries(name COLLATE NOCASE);`,
  `CREATE INDEX IF NOT EXISTS idx_food_entries_category ON food_entries(category);`,
  `CREATE INDEX IF NOT EXISTS idx_food_entries_region ON food_entries(region);`,
  `CREATE INDEX IF NOT EXISTS idx_meal_logs_user_date ON meal_logs(user_id, date);`,
  `CREATE INDEX IF NOT EXISTS idx_meal_entries_meal_log_id ON meal_entries(meal_log_id);`,
  `CREATE INDEX IF NOT EXISTS idx_coach_sessions_user_id ON coach_sessions(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_coach_messages_session_id ON coach_messages(session_id);`,
  `CREATE INDEX IF NOT EXISTS idx_personal_records_user_exercise ON personal_records(user_id, exercise_id);`,
  `CREATE INDEX IF NOT EXISTS idx_body_measurements_user_date ON body_measurements(user_id, date);`,
];

// ─────────────────────────────────────────────
// Phase 2 — Social + Supabase Sync
// ─────────────────────────────────────────────

export const MIGRATION_002_POSTS = `
  CREATE TABLE IF NOT EXISTS posts (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type                  TEXT NOT NULL CHECK(type IN ('workout', 'achievement', 'progress')),
    content               TEXT NOT NULL DEFAULT '',
    workout_id            TEXT REFERENCES workouts(id) ON DELETE SET NULL,
    likes_count           INTEGER NOT NULL DEFAULT 0,
    comments_count        INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_002_COMMENTS = `
  CREATE TABLE IF NOT EXISTS comments (
    id                    TEXT PRIMARY KEY NOT NULL,
    post_id               TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content               TEXT NOT NULL,
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_002_LIKES = `
  CREATE TABLE IF NOT EXISTS likes (
    id                    TEXT PRIMARY KEY NOT NULL,
    post_id               TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(post_id, user_id)
  );
`;

export const MIGRATION_002_FOLLOWS = `
  CREATE TABLE IF NOT EXISTS follows (
    id                    TEXT PRIMARY KEY NOT NULL,
    follower_id           TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(follower_id, following_id)
  );
`;

export const MIGRATION_002_CHALLENGES = `
  CREATE TABLE IF NOT EXISTS challenges (
    id                    TEXT PRIMARY KEY NOT NULL,
    title                 TEXT NOT NULL,
    description           TEXT NOT NULL DEFAULT '',
    type                  TEXT NOT NULL CHECK(type IN ('weekly', 'monthly', 'custom')),
    metric                TEXT NOT NULL CHECK(metric IN ('workouts', 'volume', 'streak', 'calories_burned')),
    target_value          REAL NOT NULL,
    start_date            TEXT NOT NULL,
    end_date              TEXT NOT NULL,
    created_by_user_id    TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_002_CHALLENGE_PARTICIPANTS = `
  CREATE TABLE IF NOT EXISTS challenge_participants (
    id                    TEXT PRIMARY KEY NOT NULL,
    challenge_id          TEXT NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_value         REAL NOT NULL DEFAULT 0,
    rank                  INTEGER,
    joined_at             TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(challenge_id, user_id)
  );
`;

export const MIGRATION_002_NOTIFICATIONS = `
  CREATE TABLE IF NOT EXISTS notifications (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type                  TEXT NOT NULL CHECK(type IN (
      'workout_reminder', 'streak_alert', 'social_like', 'social_comment',
      'social_follow', 'challenge_invite', 'challenge_complete', 'pr_achieved'
    )),
    title                 TEXT NOT NULL,
    body                  TEXT NOT NULL DEFAULT '',
    data                  TEXT NOT NULL DEFAULT '{}',
    is_read               INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_002_SYNC_QUEUE = `
  CREATE TABLE IF NOT EXISTS sync_queue (
    id                    TEXT PRIMARY KEY NOT NULL,
    table_name            TEXT NOT NULL,
    record_id             TEXT NOT NULL,
    operation             TEXT NOT NULL CHECK(operation IN ('INSERT', 'UPDATE', 'DELETE')),
    payload               TEXT NOT NULL DEFAULT '{}',
    status                TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'syncing', 'synced', 'failed')),
    retry_count           INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    synced_at             TEXT
  );
`;

// Indexes — Phase 2
export const MIGRATION_002_INDEXES = [
  `CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);`,
  `CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);`,
  `CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);`,
  `CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);`,
  `CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);`,
  `CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);`,
  `CREATE INDEX IF NOT EXISTS idx_challenge_participants_challenge ON challenge_participants(challenge_id);`,
  `CREATE INDEX IF NOT EXISTS idx_challenge_participants_user ON challenge_participants(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read);`,
  `CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status);`,
  `CREATE INDEX IF NOT EXISTS idx_sync_queue_table ON sync_queue(table_name, record_id);`,
];

// ─────────────────────────────────────────────
// Phase 3 — Intelligence + Scale
// ─────────────────────────────────────────────

export const MIGRATION_003_WORKOUT_PROGRAMS = `
  CREATE TABLE IF NOT EXISTS workout_programs (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name                  TEXT NOT NULL,
    description           TEXT NOT NULL DEFAULT '',
    sport                 TEXT,
    difficulty            TEXT NOT NULL DEFAULT 'intermediate' CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),
    duration_weeks        INTEGER NOT NULL DEFAULT 4,
    days_per_week         INTEGER NOT NULL DEFAULT 3,
    is_ai_generated       INTEGER NOT NULL DEFAULT 0,
    is_template           INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_003_PROGRAM_DAYS = `
  CREATE TABLE IF NOT EXISTS program_days (
    id                    TEXT PRIMARY KEY NOT NULL,
    program_id            TEXT NOT NULL REFERENCES workout_programs(id) ON DELETE CASCADE,
    week_number           INTEGER NOT NULL,
    day_number            INTEGER NOT NULL,
    name                  TEXT NOT NULL DEFAULT '',
    focus                 TEXT NOT NULL DEFAULT ''
  );
`;

export const MIGRATION_003_PROGRAM_EXERCISES = `
  CREATE TABLE IF NOT EXISTS program_exercises (
    id                    TEXT PRIMARY KEY NOT NULL,
    program_day_id        TEXT NOT NULL REFERENCES program_days(id) ON DELETE CASCADE,
    exercise_id           TEXT NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
    sort_order            INTEGER NOT NULL DEFAULT 0,
    target_sets           INTEGER NOT NULL DEFAULT 3,
    target_reps_min       INTEGER NOT NULL DEFAULT 8,
    target_reps_max       INTEGER NOT NULL DEFAULT 12,
    target_rpe            REAL,
    rest_seconds          INTEGER NOT NULL DEFAULT 90,
    notes                 TEXT
  );
`;

export const MIGRATION_003_BODY_PHOTOS = `
  CREATE TABLE IF NOT EXISTS body_photos (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    measurement_id        TEXT REFERENCES body_measurements(id) ON DELETE SET NULL,
    pose                  TEXT NOT NULL CHECK(pose IN ('front', 'side', 'back')),
    file_path             TEXT NOT NULL,
    taken_at              TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_003_USER_STREAKS = `
  CREATE TABLE IF NOT EXISTS user_streaks (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type                  TEXT NOT NULL CHECK(type IN ('workout', 'nutrition', 'login')),
    current_count         INTEGER NOT NULL DEFAULT 0,
    longest_count         INTEGER NOT NULL DEFAULT 0,
    last_activity_date    TEXT NOT NULL,
    UNIQUE(user_id, type)
  );
`;

export const MIGRATION_003_EXPANSION_PACKS = `
  CREATE TABLE IF NOT EXISTS expansion_packs (
    id                    TEXT PRIMARY KEY NOT NULL,
    name                  TEXT NOT NULL,
    description           TEXT NOT NULL DEFAULT '',
    type                  TEXT NOT NULL CHECK(type IN ('sport_program', 'cuisine_pack', 'pro_upgrade')),
    price_inr             INTEGER NOT NULL,
    price_usd_cents       INTEGER NOT NULL,
    store_product_id      TEXT NOT NULL,
    content_data          TEXT NOT NULL DEFAULT '{}',
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_003_USER_PURCHASES = `
  CREATE TABLE IF NOT EXISTS user_purchases (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pack_id               TEXT NOT NULL REFERENCES expansion_packs(id) ON DELETE RESTRICT,
    store_transaction_id  TEXT NOT NULL,
    purchased_at          TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, pack_id)
  );
`;

// Indexes — Phase 3
export const MIGRATION_003_INDEXES = [
  `CREATE INDEX IF NOT EXISTS idx_workout_programs_user_id ON workout_programs(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_program_days_program_id ON program_days(program_id);`,
  `CREATE INDEX IF NOT EXISTS idx_program_exercises_day_id ON program_exercises(program_day_id);`,
  `CREATE INDEX IF NOT EXISTS idx_body_photos_user_id ON body_photos(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_body_photos_measurement ON body_photos(measurement_id);`,
  `CREATE INDEX IF NOT EXISTS idx_user_streaks_user_id ON user_streaks(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON user_purchases(user_id);`,
];

// ─────────────────────────────────────────────
// Phase 4 — Marketplace + Growth
// ─────────────────────────────────────────────

export const MIGRATION_004_TRAINERS = `
  CREATE TABLE IF NOT EXISTS trainers (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio                   TEXT NOT NULL DEFAULT '',
    specializations       TEXT NOT NULL DEFAULT '[]',
    certifications        TEXT NOT NULL DEFAULT '[]',
    rating                REAL NOT NULL DEFAULT 0,
    total_reviews         INTEGER NOT NULL DEFAULT 0,
    commission_pct        REAL NOT NULL DEFAULT 20,
    is_verified           INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id)
  );
`;

export const MIGRATION_004_TRAINER_PROGRAMS = `
  CREATE TABLE IF NOT EXISTS trainer_programs (
    id                    TEXT PRIMARY KEY NOT NULL,
    trainer_id            TEXT NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    program_id            TEXT NOT NULL REFERENCES workout_programs(id) ON DELETE CASCADE,
    price_inr             INTEGER NOT NULL,
    price_usd_cents       INTEGER NOT NULL,
    is_published          INTEGER NOT NULL DEFAULT 0,
    total_sales           INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export const MIGRATION_004_TRAINER_REVIEWS = `
  CREATE TABLE IF NOT EXISTS trainer_reviews (
    id                    TEXT PRIMARY KEY NOT NULL,
    trainer_id            TEXT NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    program_id            TEXT REFERENCES workout_programs(id) ON DELETE SET NULL,
    rating                INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    review_text           TEXT NOT NULL DEFAULT '',
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(trainer_id, user_id, program_id)
  );
`;

export const MIGRATION_004_REFERRALS = `
  CREATE TABLE IF NOT EXISTS referrals (
    id                    TEXT PRIMARY KEY NOT NULL,
    referrer_id           TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referred_id           TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referral_code         TEXT NOT NULL,
    reward_type           TEXT NOT NULL CHECK(reward_type IN ('content_unlock', 'discount', 'badge')),
    reward_data           TEXT NOT NULL DEFAULT '{}',
    is_redeemed           INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(referrer_id, referred_id)
  );
`;

export const MIGRATION_004_REFERRAL_CODES = `
  CREATE TABLE IF NOT EXISTS referral_codes (
    code                  TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    uses_count            INTEGER NOT NULL DEFAULT 0,
    max_uses              INTEGER NOT NULL DEFAULT 10,
    created_at            TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id)
  );
`;

export const MIGRATION_004_WEARABLE_CONNECTIONS = `
  CREATE TABLE IF NOT EXISTS wearable_connections (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider              TEXT NOT NULL CHECK(provider IN ('google_fit', 'healthkit', 'fitbit', 'garmin')),
    access_token          TEXT,
    refresh_token         TEXT,
    last_synced_at        TEXT,
    is_active             INTEGER NOT NULL DEFAULT 1,
    connected_at          TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, provider)
  );
`;

export const MIGRATION_004_WEARABLE_DATA = `
  CREATE TABLE IF NOT EXISTS wearable_data (
    id                    TEXT PRIMARY KEY NOT NULL,
    user_id               TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider              TEXT NOT NULL,
    date                  TEXT NOT NULL,
    steps                 INTEGER,
    calories_burned       REAL,
    heart_rate_avg        INTEGER,
    heart_rate_max        INTEGER,
    sleep_hours           REAL,
    raw_data              TEXT NOT NULL DEFAULT '{}',
    synced_at             TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

// Indexes — Phase 4
export const MIGRATION_004_INDEXES = [
  `CREATE INDEX IF NOT EXISTS idx_trainers_user_id ON trainers(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_trainers_rating ON trainers(rating);`,
  `CREATE INDEX IF NOT EXISTS idx_trainer_programs_trainer ON trainer_programs(trainer_id);`,
  `CREATE INDEX IF NOT EXISTS idx_trainer_reviews_trainer ON trainer_reviews(trainer_id);`,
  `CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);`,
  `CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_id);`,
  `CREATE INDEX IF NOT EXISTS idx_referral_codes_user ON referral_codes(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_wearable_connections_user ON wearable_connections(user_id);`,
  `CREATE INDEX IF NOT EXISTS idx_wearable_data_user_date ON wearable_data(user_id, date);`,
  `CREATE INDEX IF NOT EXISTS idx_wearable_data_provider ON wearable_data(provider, date);`,
];

// ─────────────────────────────────────────────
// Internal — Migration Tracking
// ─────────────────────────────────────────────

export const MIGRATION_TRACKING_TABLE = `
  CREATE TABLE IF NOT EXISTS _migrations (
    version               INTEGER PRIMARY KEY NOT NULL,
    name                  TEXT NOT NULL,
    applied_at            TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;
