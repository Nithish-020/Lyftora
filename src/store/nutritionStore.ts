import { create } from 'zustand';
import type { MealLog, MealEntry, FoodEntry, MealType } from '../types/nutrition';

interface NutritionState {
  todayLogs: MealLog[];
  foodDatabase: FoodEntry[];
  dailyTargets: DailyTargets;

  addMealEntry: (mealType: MealType, entry: MealEntry) => void;
  removeMealEntry: (mealLogId: string, foodId: string) => void;
  setDailyTargets: (targets: DailyTargets) => void;
  setFoodDatabase: (foods: FoodEntry[]) => void;
  clearDay: () => void;
}

interface DailyTargets {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

const DEFAULT_TARGETS: DailyTargets = {
  calories: 2000,
  proteinG: 150,
  carbsG: 200,
  fatG: 65,
};

export const useNutritionStore = create<NutritionState>((set) => ({
  todayLogs: [],
  foodDatabase: [],
  dailyTargets: DEFAULT_TARGETS,

  addMealEntry: (mealType, entry) =>
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      const existingLog = state.todayLogs.find(
        (log) => log.mealType === mealType && log.date === today
      );

      if (existingLog) {
        return {
          todayLogs: state.todayLogs.map((log) =>
            log.id === existingLog.id
              ? { ...log, entries: [...log.entries, entry] }
              : log
          ),
        };
      }

      const newLog: MealLog = {
        id: generateId(),
        userId: '',
        date: today,
        mealType,
        entries: [entry],
      };

      return { todayLogs: [...state.todayLogs, newLog] };
    }),

  removeMealEntry: (mealLogId, foodId) =>
    set((state) => ({
      todayLogs: state.todayLogs.map((log) =>
        log.id === mealLogId
          ? { ...log, entries: log.entries.filter((e) => e.foodId !== foodId) }
          : log
      ),
    })),

  setDailyTargets: (targets) => set({ dailyTargets: targets }),

  setFoodDatabase: (foods) => set({ foodDatabase: foods }),

  clearDay: () => set({ todayLogs: [] }),
}));
