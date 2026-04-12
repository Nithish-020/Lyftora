/**
 * Lyftora — Database Client
 *
 * Initializes expo-sqlite, runs migrations, and exposes a typed query API.
 * All methods are synchronous (expo-sqlite v14+ uses JSI).
 */

import * as SQLite from 'expo-sqlite';
import { MIGRATION_TRACKING_TABLE } from './schema';
import { MIGRATIONS, type Migration } from './migrations';

const DB_NAME = 'lyftora.db';

let _db: SQLite.SQLiteDatabase | null = null;

/** Get or open the database singleton. */
export function getDatabase(): SQLite.SQLiteDatabase {
  if (_db) return _db;
  _db = SQLite.openDatabaseSync(DB_NAME);
  return _db;
}

/** Close the database (for testing / cleanup). */
export function closeDatabase(): void {
  if (_db) {
    _db.closeSync();
    _db = null;
  }
}

/**
 * Run all pending migrations up to `targetVersion`.
 * Defaults to the latest version if omitted.
 *
 * Each migration runs inside a transaction — if any statement fails,
 * the entire migration is rolled back and the error is thrown.
 */
export function runMigrations(targetVersion?: number): void {
  const db = getDatabase();

  // Enable WAL mode for better concurrent read performance
  db.execSync('PRAGMA journal_mode = WAL;');
  // Enable foreign keys (off by default in SQLite)
  db.execSync('PRAGMA foreign_keys = ON;');

  // Create the migrations tracking table
  db.execSync(MIGRATION_TRACKING_TABLE);

  const applied = getAppliedVersions(db);
  const maxTarget = targetVersion ?? Math.max(...MIGRATIONS.map((m) => m.version));

  for (const migration of MIGRATIONS) {
    if (migration.version > maxTarget) continue;
    if (applied.has(migration.version)) continue;

    applyMigration(db, migration);
  }
}

/** Get the set of already-applied migration versions. */
function getAppliedVersions(db: SQLite.SQLiteDatabase): Set<number> {
  const rows = db.getAllSync<{ version: number }>(
    'SELECT version FROM _migrations ORDER BY version ASC'
  );
  return new Set(rows.map((r: { version: number }) => r.version));
}

/** Apply a single migration inside a transaction. */
function applyMigration(db: SQLite.SQLiteDatabase, migration: Migration): void {
  db.execSync('BEGIN TRANSACTION;');

  try {
    for (const sql of migration.statements) {
      db.execSync(sql);
    }

    db.runSync(
      'INSERT INTO _migrations (version, name) VALUES (?, ?)',
      migration.version,
      migration.name
    );

    db.execSync('COMMIT;');
  } catch (error) {
    db.execSync('ROLLBACK;');
    throw new Error(
      `Migration v${migration.version} (${migration.name}) failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/** Get the current schema version (latest applied migration). */
export function getCurrentVersion(): number {
  const db = getDatabase();
  try {
    const row = db.getFirstSync<{ version: number }>(
      'SELECT MAX(version) as version FROM _migrations'
    );
    return row?.version ?? 0;
  } catch {
    return 0;
  }
}

// ─────────────────────────────────────────────
// Generic typed query helpers
// ─────────────────────────────────────────────

type BindArg = SQLite.SQLiteBindValue | SQLite.SQLiteBindParams;

function toSyncArgs(args: BindArg[]): [SQLite.SQLiteBindParams] | SQLite.SQLiteBindValue[] {
  if (
    args.length === 1 &&
    (Array.isArray(args[0]) ||
      (typeof args[0] === 'object' && args[0] !== null && !(args[0] instanceof Uint8Array)))
  ) {
    return [args[0] as SQLite.SQLiteBindParams];
  }
  return args as SQLite.SQLiteBindValue[];
}

/** Execute a SELECT and return all matching rows. */
export function queryAll<T>(sql: string, params: SQLite.SQLiteBindParams): T[];
export function queryAll<T>(sql: string, ...params: SQLite.SQLiteBindValue[]): T[];
export function queryAll<T>(sql: string, ...args: BindArg[]): T[] {
  const db = getDatabase();
  const bound = toSyncArgs(args);
  return db.getAllSync<T>(sql, ...(bound as SQLite.SQLiteBindValue[]));
}

/** Execute a SELECT and return the first matching row, or null. */
export function queryFirst<T>(sql: string, params: SQLite.SQLiteBindParams): T | null;
export function queryFirst<T>(sql: string, ...params: SQLite.SQLiteBindValue[]): T | null;
export function queryFirst<T>(sql: string, ...args: BindArg[]): T | null {
  const db = getDatabase();
  const bound = toSyncArgs(args);
  return db.getFirstSync<T>(sql, ...(bound as SQLite.SQLiteBindValue[])) ?? null;
}

/** Execute an INSERT / UPDATE / DELETE and return the result. */
export function execute(sql: string, params: SQLite.SQLiteBindParams): SQLite.SQLiteRunResult;
export function execute(sql: string, ...params: SQLite.SQLiteBindValue[]): SQLite.SQLiteRunResult;
export function execute(sql: string, ...args: BindArg[]): SQLite.SQLiteRunResult {
  const db = getDatabase();
  const bound = toSyncArgs(args);
  return db.runSync(sql, ...(bound as SQLite.SQLiteBindValue[]));
}

/** Run multiple statements in a transaction. */
export function transaction(fn: () => void): void {
  const db = getDatabase();
  db.execSync('BEGIN TRANSACTION;');
  try {
    fn();
    db.execSync('COMMIT;');
  } catch (error) {
    db.execSync('ROLLBACK;');
    throw error;
  }
}
