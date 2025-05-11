
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { FoodItem, Category, CustomFoodFormData } from "@/types";
import { initialFoodDatabase } from "@/data/foods";
import { toast } from "@/hooks/use-toast";

const DEFAULT_CUSTOM_FOOD_IMAGE_URL = "https://picsum.photos/300/200?grayscale&blur=1";
const DEFAULT_CUSTOM_FOOD_AI_HINT = "custom food";

interface FoodContextState {
  allFoods: FoodItem[];
  addCustomFood: (foodData: CustomFoodFormData) => void;
  getFoodById: (id: string) => FoodItem | undefined;
  getFoodsByCategory: (category: Category) => FoodItem[];
  getAllFoods: () => FoodItem[];
}

const FoodContext = createContext<FoodContextState | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [allFoods, setAllFoods] = useState<FoodItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedFoods = localStorage.getItem("nutrisnap_customFoods");
      const customFoods = storedFoods ? JSON.parse(storedFoods) : [];
      return [...initialFoodDatabase, ...customFoods];
    }
    return initialFoodDatabase;
  });

  useEffect(() => {
    // Persist custom foods to localStorage
    if (typeof window !== 'undefined') {
        const customFoods = allFoods.filter(food => food.isCustom);
        localStorage.setItem("nutrisnap_customFoods", JSON.stringify(customFoods));
    }
  }, [allFoods]);


  const addCustomFood = useCallback((foodData: CustomFoodFormData) => {
    const newFood: FoodItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`, // More robust unique ID
      name: foodData.name,
      category: foodData.category,
      imageUrl: DEFAULT_CUSTOM_FOOD_IMAGE_URL,
      dataAiHint: DEFAULT_CUSTOM_FOOD_AI_HINT,
      nutritionPer100g: {
        calories: foodData.calories,
        protein: foodData.protein,
        carbs: foodData.carbs,
        fat: foodData.fat,
      },
      isCustom: true,
    };
    setAllFoods((prevFoods) => [...prevFoods, newFood]);
    toast({ title: "Food Added!", description: `${newFood.name} has been added to your foods.` });
  }, []);

  const getFoodById = useCallback(
    (id: string): FoodItem | undefined => {
      return allFoods.find((food) => food.id === id);
    },
    [allFoods]
  );

  const getFoodsByCategory = useCallback(
    (category: Category): FoodItem[] => {
      if (category === "All") return allFoods;
      return allFoods.filter((food) => food.category === category);
    },
    [allFoods]
  );

  const getAllFoods = useCallback((): FoodItem[] => {
    return allFoods;
  }, [allFoods]);

  return (
    <FoodContext.Provider
      value={{
        allFoods,
        addCustomFood,
        getFoodById,
        getFoodsByCategory,
        getAllFoods,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};
