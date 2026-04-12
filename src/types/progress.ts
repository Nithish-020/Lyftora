export interface PersonalRecord {
  id: string;
  userId: string;
  exerciseId: string;
  weightKg: number;
  reps: number;
  achievedAt: string;
}

export interface BodyMeasurement {
  id: string;
  userId: string;
  date: string;
  weightKg?: number;
  bodyFatPct?: number;
  measurements?: Record<string, number>;
}
