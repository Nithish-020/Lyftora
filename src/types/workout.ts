export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment;
  instructions: string;
  imageUrl?: string;
}

export type MuscleGroup =
  | 'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps'
  | 'forearms' | 'core' | 'quads' | 'hamstrings' | 'glutes'
  | 'calves' | 'fullBody';

export type Equipment =
  | 'barbell' | 'dumbbell' | 'machine' | 'cable'
  | 'bodyweight' | 'kettlebell' | 'band' | 'other';

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  reps: number;
  weightKg: number;
  isWarmup: boolean;
  isPR: boolean;
  completedAt?: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  exercises: WorkoutExercise[];
  startedAt: string;
  completedAt?: string;
  durationMinutes: number;
  notes?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
  restTimerSeconds: number;
}
