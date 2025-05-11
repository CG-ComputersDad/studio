import type { FoodItem, Category } from "@/types";

// Renamed to initialFoodDatabase to distinguish from the dynamic list in FoodContext
export const initialFoodDatabase: FoodItem[] = [
  // Sweet
  {
    id: "1",
    name: "Chocolate Cake Slice",
    category: "Sweet",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "chocolate cake",
    nutritionPer100g: { calories: 350, protein: 5, carbs: 50, fat: 15 },
    isCustom: false,
  },
  {
    id: "2",
    name: "Apple Pie Slice",
    category: "Sweet",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "apple pie",
    nutritionPer100g: { calories: 280, protein: 3, carbs: 40, fat: 12 },
    isCustom: false,
  },
  {
    id: "3",
    name: "Ice Cream (Vanilla)",
    category: "Sweet",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "vanilla icecream",
    nutritionPer100g: { calories: 200, protein: 4, carbs: 25, fat: 10 },
    isCustom: false,
  },
  // Vegetarian
  {
    id: "4",
    name: "Lentil Soup",
    category: "Vegetarian",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "lentil soup",
    nutritionPer100g: { calories: 120, protein: 8, carbs: 20, fat: 1 },
    isCustom: false,
  },
  {
    id: "5",
    name: "Quinoa Salad",
    category: "Vegetarian",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "quinoa salad",
    nutritionPer100g: { calories: 180, protein: 6, carbs: 25, fat: 7 },
    isCustom: false,
  },
  {
    id: "6",
    name: "Tofu Stir-fry",
    category: "Vegetarian",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "tofu stirfry",
    nutritionPer100g: { calories: 150, protein: 10, carbs: 15, fat: 5 },
    isCustom: false,
  },
  // Meat
  {
    id: "7",
    name: "Grilled Chicken Breast",
    category: "Meat",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "grilled chicken",
    nutritionPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    isCustom: false,
  },
  {
    id: "8",
    name: "Beef Steak",
    category: "Meat",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "beef steak",
    nutritionPer100g: { calories: 250, protein: 26, carbs: 0, fat: 17 },
    isCustom: false,
  },
  {
    id: "9",
    name: "Salmon Fillet",
    category: "Meat",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "salmon fillet",
    nutritionPer100g: { calories: 208, protein: 20, carbs: 0, fat: 13 },
    isCustom: false,
  },
   {
    id: "10",
    name: "Banana",
    category: "Vegetarian", // Could also be sweet, but often grouped with fruits/veg
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "banana fruit",
    nutritionPer100g: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
    isCustom: false,
  },
  {
    id: "11",
    name: "Broccoli",
    category: "Vegetarian",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "broccoli vegetable",
    nutritionPer100g: { calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
    isCustom: false,
  },
  {
    id: "12",
    name: "Donut",
    category: "Sweet",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "donut pastry",
    nutritionPer100g: { calories: 420, protein: 4, carbs: 55, fat: 20 },
    isCustom: false,
  }
];

// The functions getFoodById and getFoodsByCategory will now be part of the FoodContext
// to operate on the combined list of initial and custom foods.
