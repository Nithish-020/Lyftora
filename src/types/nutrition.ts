export interface FoodEntry {
  id: string;
  name: string;
  nameRegional?: string;
  region?: string;
  caloriesPerServing: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  servingSize: string;
  servingUnit: string;
  category: FoodCategory;
}

export type FoodCategory =
  | 'grain' | 'protein' | 'dairy' | 'vegetable' | 'fruit'
  | 'legume' | 'snack' | 'beverage' | 'sweet' | 'condiment' | 'other';

export interface MealLog {
  id: string;
  userId: string;
  date: string;
  mealType: MealType;
  entries: MealEntry[];
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealEntry {
  foodId: string;
  servings: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}
