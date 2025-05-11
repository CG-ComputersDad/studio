import type { FoodItem } from "@/types";

export const foodDatabase: FoodItem[] = [
  // Sweet
  {
    id: "1",
    name: "Chocolate Cake Slice",
    category: "Sweet",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "chocolate cake",
    nutritionPer100g: { calories: 350, protein: 5, carbs: 50, fat: 15 },
  },
  {
    id: "2",
    name: "Apple Pie Slice",
    category: "Sweet",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "apple pie",
    nutritionPer100g: { calories: 280, protein: 3, carbs: 40, fat: 12 },
  },
  {
    id: "3",
    name: "Ice Cream (Vanilla)",
    category: "Sweet",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "vanilla icecream",
    nutritionPer100g: { calories: 200, protein: 4, carbs: 25, fat: 10 },
  },
  // Vegetarian
  {
    id: "4",
    name: "Lentil Soup",
    category: "Vegetarian",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "lentil soup",
    nutritionPer100g: { calories: 120, protein: 8, carbs: 20, fat: 1 },
  },
  {
    id: "5",
    name: "Quinoa Salad",
    category: "Vegetarian",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "quinoa salad",
    nutritionPer100g: { calories: 180, protein: 6, carbs: 25, fat: 7 },
  },
  {
    id: "6",
    name: "Tofu Stir-fry",
    category: "Vegetarian",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "tofu stirfry",
    nutritionPer100g: { calories: 150, protein: 10, carbs: 15, fat: 5 },
  },
  // Meat
  {
    id: "7",
    name: "Grilled Chicken Breast",
    category: "Meat",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "grilled chicken",
    nutritionPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  },
  {
    id: "8",
    name: "Beef Steak",
    category: "Meat",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "beef steak",
    nutritionPer100g: { calories: 250, protein: 26, carbs: 0, fat: 17 },
  },
  {
    id: "9",
    name: "Salmon Fillet",
    category: "Meat",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "salmon fillet",
    nutritionPer100g: { calories: 208, protein: 20, carbs: 0, fat: 13 },
  },
   {
    id: "10",
    name: "Banana",
    category: "Vegetarian", // Could also be sweet, but often grouped with fruits/veg
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "banana fruit",
    nutritionPer100g: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  },
  {
    id: "11",
    name: "Broccoli",
    category: "Vegetarian",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "broccoli vegetable",
    nutritionPer100g: { calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
  },
  {
    id: "12",
    name: "Donut",
    category: "Sweet",
    imageUrl: "https://picsum.photos/300/200",
    dataAiHint: "donut pastry",
    nutritionPer100g: { calories: 420, protein: 4, carbs: 55, fat: 20 },
  }
];

export const getFoodById = (id: string): FoodItem | undefined => {
  return foodDatabase.find((food) => food.id === id);
};

export const getFoodsByCategory = (category: Category): FoodItem[] => {
  if (category === "All") return foodDatabase;
  return foodDatabase.filter((food) => food.category === category);
};
