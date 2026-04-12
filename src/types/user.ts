export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
  preferences: UserPreferences;
  medicalProfile?: MedicalProfile;
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  theme: 'dark' | 'light' | 'system';
  language: string;
  notificationsEnabled: boolean;
}

export interface MedicalProfile {
  age: number;
  sex: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  dietaryRestrictions: string[];
  medicalConditions: string[];
}

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
export type FitnessGoal = 'lose' | 'maintain' | 'gain';
