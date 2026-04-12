import { create } from 'zustand';
import type { Workout, WorkoutExercise, WorkoutSet, Exercise } from '../types/workout';

interface WorkoutState {
  activeWorkout: Workout | null;
  workoutHistory: Workout[];
  exercises: Exercise[];

  startWorkout: (name: string, userId: string) => void;
  addExerciseToWorkout: (exerciseId: string) => void;
  addSet: (exerciseId: string, set: Omit<WorkoutSet, 'id'>) => void;
  updateSet: (exerciseId: string, setId: string, updates: Partial<WorkoutSet>) => void;
  removeSet: (exerciseId: string, setId: string) => void;
  completeWorkout: () => void;
  discardWorkout: () => void;
  setExercises: (exercises: Exercise[]) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  activeWorkout: null,
  workoutHistory: [],
  exercises: [],

  startWorkout: (name, userId) =>
    set({
      activeWorkout: {
        id: generateId(),
        userId,
        name,
        exercises: [],
        startedAt: new Date().toISOString(),
        durationMinutes: 0,
      },
    }),

  addExerciseToWorkout: (exerciseId) =>
    set((state) => {
      if (!state.activeWorkout) return state;
      const newExercise: WorkoutExercise = {
        exerciseId,
        sets: [],
        restTimerSeconds: 90,
      };
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: [...state.activeWorkout.exercises, newExercise],
        },
      };
    }),

  addSet: (exerciseId, setData) =>
    set((state) => {
      if (!state.activeWorkout) return state;
      const newSet: WorkoutSet = { ...setData, id: generateId() };
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: state.activeWorkout.exercises.map((ex) =>
            ex.exerciseId === exerciseId
              ? { ...ex, sets: [...ex.sets, newSet] }
              : ex
          ),
        },
      };
    }),

  updateSet: (exerciseId, setId, updates) =>
    set((state) => {
      if (!state.activeWorkout) return state;
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: state.activeWorkout.exercises.map((ex) =>
            ex.exerciseId === exerciseId
              ? {
                  ...ex,
                  sets: ex.sets.map((s) =>
                    s.id === setId ? { ...s, ...updates } : s
                  ),
                }
              : ex
          ),
        },
      };
    }),

  removeSet: (exerciseId, setId) =>
    set((state) => {
      if (!state.activeWorkout) return state;
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: state.activeWorkout.exercises.map((ex) =>
            ex.exerciseId === exerciseId
              ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) }
              : ex
          ),
        },
      };
    }),

  completeWorkout: () =>
    set((state) => {
      if (!state.activeWorkout) return state;
      const completed: Workout = {
        ...state.activeWorkout,
        completedAt: new Date().toISOString(),
        durationMinutes: Math.round(
          (Date.now() - new Date(state.activeWorkout.startedAt).getTime()) / 60000
        ),
      };
      return {
        activeWorkout: null,
        workoutHistory: [completed, ...state.workoutHistory],
      };
    }),

  discardWorkout: () => set({ activeWorkout: null }),

  setExercises: (exercises) => set({ exercises }),
}));
