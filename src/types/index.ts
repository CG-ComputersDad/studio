
export type Category = "Sweet" | "Vegetarian" | "Meat" | "All";

export interface FoodNutrition {
  calories: number; // kcal
  protein: number;  // grams
  carbs: number;    // grams
  fat: number;      // grams
}

export interface FoodItem {
  id: string;
  name: string;
  category: Category;
  imageUrl: string;
  dataAiHint: string; // For placeholder image search query
  nutritionPer100g: FoodNutrition;
  isCustom?: boolean; // To identify user-added foods
}

export interface PlateItem {
  id: string; // Unique ID for this item in the plate
  food: FoodItem;
  quantityInGrams: number;
}

export interface RecipeFoodItem {
  id: string; // Unique ID for this specific food instance within the recipe (e.g., foodId + timestamp)
  foodId: string; // Reference to FoodItem.id
  quantityInGrams: number;
}

export interface Recipe {
  id: string; // Unique ID for the recipe
  name: string;
  items: RecipeFoodItem[];
}

// FormData for adding custom food
export interface CustomFoodFormData {
  name: string;
  category: Exclude<Category, "All">; // "All" is not a valid category for a food item
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
