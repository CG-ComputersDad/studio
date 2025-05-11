
export type Category = "Sweet" | "Vegetarian" | "Meat" | "All";

export interface FoodItem {
  id: string;
  name: string;
  category: Category;
  imageUrl: string;
  dataAiHint: string; // For placeholder image search query
  nutritionPer100g: {
    calories: number; // kcal
    protein: number;  // grams
    carbs: number;    // grams
    fat: number;      // grams
  };
}

export interface PlateItem {
  id: string; // Unique ID for this item in the plate
  food: FoodItem;
  quantityInGrams: number;
}
