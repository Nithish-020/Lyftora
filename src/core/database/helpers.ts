/**
 * Lyftora — Database Helpers
 *
 * Utility functions for ID generation, row mapping (snake_case → camelCase),
 * and JSON field serialization/deserialization.
 */

/** Generate a compact, collision-resistant ID (base36 timestamp + random). */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

/** Convert a snake_case string to camelCase. */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** Convert a camelCase string to snake_case. */
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

/**
 * Map a database row (snake_case columns) to a typed object (camelCase keys).
 * Handles JSON deserialization for string fields that look like arrays/objects.
 */
export function mapRow<T>(
  row: Record<string, unknown>,
  jsonFields?: readonly string[]
): T {
  const result: Record<string, unknown> = {};
  const jsonSet = new Set(jsonFields ?? []);

  for (const [key, value] of Object.entries(row)) {
    const camelKey = snakeToCamel(key);

    if (jsonSet.has(camelKey) && typeof value === 'string') {
      try {
        result[camelKey] = JSON.parse(value);
      } catch {
        result[camelKey] = value;
      }
    } else if (typeof value === 'number' && (key.startsWith('is_') || key === 'notifications_enabled')) {
      // SQLite stores booleans as 0/1 — convert back
      result[camelKey] = value === 1;
    } else {
      result[camelKey] = value;
    }
  }

  return result as T;
}

/**
 * Prepare a typed object (camelCase) for database insertion (snake_case).
 * Serializes arrays/objects to JSON strings. Converts booleans to 0/1.
 */
export function prepareRow(
  obj: Record<string, unknown>
): Record<string, string | number | null> {
  const result: Record<string, string | number | null> = {};

  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = camelToSnake(key);

    if (value === undefined || value === null) {
      result[snakeKey] = null;
    } else if (typeof value === 'boolean') {
      result[snakeKey] = value ? 1 : 0;
    } else if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      result[snakeKey] = JSON.stringify(value);
    } else if (typeof value === 'number') {
      result[snakeKey] = value;
    } else {
      result[snakeKey] = String(value);
    }
  }

  return result;
}

/**
 * Build a parameterized INSERT statement from a prepared row.
 * Returns [sql, params] tuple.
 */
export function buildInsert(
  table: string,
  row: Record<string, string | number | null>
): [string, (string | number | null)[]] {
  const columns = Object.keys(row);
  const placeholders = columns.map(() => '?').join(', ');
  const values = Object.values(row);

  return [
    `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
    values,
  ];
}

/**
 * Build a parameterized UPDATE statement.
 * Returns [sql, params] tuple (params includes the WHERE value at the end).
 */
export function buildUpdate(
  table: string,
  row: Record<string, string | number | null>,
  whereColumn: string,
  whereValue: string | number
): [string, (string | number | null)[]] {
  const setClauses = Object.keys(row).map((col) => `${col} = ?`);
  const values = [...Object.values(row), whereValue];

  return [
    `UPDATE ${table} SET ${setClauses.join(', ')} WHERE ${whereColumn} = ?`,
    values,
  ];
}

/** Get current ISO timestamp. */
export function nowISO(): string {
  return new Date().toISOString();
}
