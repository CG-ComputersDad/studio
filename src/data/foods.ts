
import type { FoodItem } from "@/types";

// Renamed to initialFoodDatabase to distinguish from the dynamic list in FoodContext
export const initialFoodDatabase: FoodItem[] = [
  // Sweet
  {
    id: "sweet-1",
    name: "Apple",
    category: "Sweet",
    imageUrl: "https://i.postimg.cc/d37F9Qrf/apple.jpg",
    dataAiHint: "apple fruit",
    nutritionPer100g: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    isCustom: false,
  },
  {
    id: "sweet-2",
    name: "Banana",
    category: "Sweet",
    imageUrl: "https://i.postimg.cc/Kjd2pX58/banana.jpg", // Direct link for https://ibb.co/5WQfv3Xy
    dataAiHint: "banana fruit",
    nutritionPer100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    isCustom: false,
  },
  {
    id: "sweet-3",
    name: "Chocolate Bar (Milk)",
    category: "Sweet",
    imageUrl: "https://i.postimg.cc/CMtSxDVp/chocolate.jpg", // Direct link for https://ibb.co/TD5VL5YX
    dataAiHint: "chocolate bar",
    nutritionPer100g: { calories: 535, protein: 8, carbs: 59, fat: 30 },
    isCustom: false,
  },
  {
    id: "sweet-4",
    name: "Oatmeal Cookie",
    category: "Sweet",
    imageUrl: "https://i.postimg.cc/28Zmb6zb/oatmealcookie.jpg", // Direct link for https://ibb.co/chVPrJLf
    dataAiHint: "oatmeal cookie",
    nutritionPer100g: { calories: 450, protein: 5, carbs: 65, fat: 20 },
    isCustom: false,
  },
  {
    id: "sweet-5",
    name: "Orange Juice",
    category: "Sweet", 
    imageUrl: "https://i.postimg.cc/qqzrGs90/orange-juice.jpg", // Direct link for https://ibb.co/0jWcfmg9
    dataAiHint: "orange juice",
    nutritionPer100g: { calories: 45, protein: 0.7, carbs: 10, fat: 0.2 },
    isCustom: false,
  },
  // Vegetarian
  {
    id: "veg-1",
    name: "Broccoli (steamed)",
    category: "Vegetarian",
    imageUrl: "https://i.postimg.cc/pX5xhBfJ/steamed-brocolli.jpg",
    dataAiHint: "broccoli steamed",
    nutritionPer100g: { calories: 35, protein: 2.4, carbs: 7, fat: 0.4 },
    isCustom: false,
  },
  {
    id: "veg-2",
    name: "Carrot (raw)",
    category: "Vegetarian",
    imageUrl: "https://i.postimg.cc/N0cgwrr7/carrot.jpg",
    dataAiHint: "carrot raw",
    nutritionPer100g: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
    isCustom: false,
  },
  {
    id: "veg-3",
    name: "White Rice (cooked)",
    category: "Vegetarian",
    imageUrl: "https://i.postimg.cc/WzCvYDvZ/white-rice.jpg",
    dataAiHint: "white rice",
    nutritionPer100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    isCustom: false,
  },
  {
    id: "veg-4",
    name: "Plain Yogurt (Greek)",
    category: "Vegetarian",
    imageUrl: "https://i.postimg.cc/5ND4nr4r/greek-yogurt.jpg",
    dataAiHint: "greek yogurt",
    nutritionPer100g: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    isCustom: false,
  },
  {
    id: "veg-5",
    name: "Almonds (raw)",
    category: "Vegetarian",
    imageUrl: "https://i.postimg.cc/jqgdJ5Gt/almonds.jpg",
    dataAiHint: "almonds nuts",
    nutritionPer100g: { calories: 579, protein: 21, carbs: 22, fat: 50 },
    isCustom: false,
  },
  // Meat
  {
    id: "meat-1",
    name: "Chicken Breast (grilled)",
    category: "Meat",
    imageUrl: "https://i.postimg.cc/281jdYDv/chicken-berast.jpg",
    dataAiHint: "chicken breast",
    nutritionPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    isCustom: false,
  },
  {
    id: "meat-2",
    name: "Beef Steak (Sirloin, lean, broiled)",
    category: "Meat",
    imageUrl: "https://i.postimg.cc/rwW8b9zw/beef-steak.jpg",
    dataAiHint: "beef steak",
    nutritionPer100g: { calories: 183, protein: 28, carbs: 0, fat: 7 },
    isCustom: false,
  },
  {
    id: "meat-3",
    name: "Salmon Fillet (baked)",
    category: "Meat",
    imageUrl: "https://i.postimg.cc/3RL7pSfn/salmon-fillet.jpg",
    dataAiHint: "salmon fillet",
    nutritionPer100g: { calories: 208, protein: 20, carbs: 0, fat: 13 },
    isCustom: false,
  },
  {
    id: "meat-4",
    name: "Pork Chop (lean, broiled)",
    category: "Meat",
    imageUrl: "https://i.postimg.cc/s243fDYF/pork-chop.jpg",
    dataAiHint: "pork chop",
    nutritionPer100g: { calories: 190, protein: 29, carbs: 0, fat: 8 },
    isCustom: false,
  },
  {
    id: "meat-5",
    name: "Turkey Breast (roasted)",
    category: "Meat",
    imageUrl: "https://i.postimg.cc/xj4n1Zzd/turkey-berast.jpg",
    dataAiHint: "turkey breast",
    nutritionPer100g: { calories: 135, protein: 30, carbs: 0, fat: 1 },
    isCustom: false,
  },
];
