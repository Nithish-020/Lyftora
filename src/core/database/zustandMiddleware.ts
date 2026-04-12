/**
 * Lyftora — Zustand ↔ SQLite Persistence Middleware
 *
 * Bridges Zustand stores with the SQLite database layer.
 * Instead of Zustand's built-in `persist` (which uses AsyncStorage/MMKV),
 * this middleware hydrates from SQLite on store creation and writes back
 * on every state change via a debounced flush.
 *
 * Usage:
 *   const useWorkoutStore = create<WorkoutState>()(
 *     withSQLite({
 *       hydrate: () => ({ workoutHistory: WorkoutRepo.getByUser(userId) }),
 *       flush: (state) => { /* write changed state to SQLite *\/ },
 *     }, (set, get) => ({ ... }))
 *   );
 */

import type { StateCreator, StoreApi, StoreMutatorIdentifier } from 'zustand';

interface SQLiteMiddlewareConfig<T> {
  /** Load initial state from SQLite. Called once on store creation. */
  hydrate: () => Partial<T>;
  /** Write changed state to SQLite. Called on every state change (debounced). */
  flush: (state: T, prevState: T) => void;
  /** Debounce interval in ms for flush calls. Default: 300. */
  debounceMs?: number;
}

type SQLiteMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  config: SQLiteMiddlewareConfig<T>,
  initializer: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

/**
 * Zustand middleware that hydrates from SQLite and flushes on changes.
 *
 * Note: This is a factory function that returns a StateCreator.
 * The `hydrate` runs synchronously (expo-sqlite is sync via JSI),
 * so the store is fully populated before first render.
 */
export const withSQLite: SQLiteMiddleware = (config, initializer) => (set, get, api) => {
  const { hydrate, flush, debounceMs = 300 } = config;

  // Create the store with the original initializer
  const state = initializer(set, get, api);

  // Hydrate from SQLite synchronously
  try {
    const hydrated = hydrate();
    if (hydrated && Object.keys(hydrated).length > 0) {
      set(hydrated as Partial<typeof state>);
    }
  } catch (error) {
    console.warn('[Lyftora DB] Hydration failed:', error);
  }

  // Set up debounced flush on state changes
  let flushTimer: ReturnType<typeof setTimeout> | null = null;
  let prevState = get();

  const originalSubscribe = api.subscribe;

  api.subscribe = ((listener) => {
    return originalSubscribe((newState) => {
      // Call the original listener
      listener(newState, prevState);

      // Debounced flush to SQLite
      if (flushTimer) clearTimeout(flushTimer);
      flushTimer = setTimeout(() => {
        try {
          flush(newState, prevState);
        } catch (error) {
          console.warn('[Lyftora DB] Flush failed:', error);
        }
        prevState = newState;
      }, debounceMs);
    });
  }) as typeof api.subscribe;

  return state;
};

/**
 * One-shot hydrate helper for simpler cases where you just want to
 * load data into a store without the full middleware.
 *
 * Usage:
 *   useEffect(() => {
 *     hydrateStore(useWorkoutStore, () => ({
 *       workoutHistory: WorkoutRepo.getByUser(userId),
 *       exercises: ExerciseRepo.getAll(),
 *     }));
 *   }, []);
 */
export function hydrateStore<T>(
  store: StoreApi<T>,
  loader: () => Partial<T>
): void {
  try {
    const data = loader();
    store.setState(data);
  } catch (error) {
    console.warn('[Lyftora DB] hydrateStore failed:', error);
  }
}
