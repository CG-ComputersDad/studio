
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useReducer, useCallback, useEffect, useState } from "react";
import type { FoodItem, Recipe, RecipeFoodItem } from "@/types";
import { useFood } from "./FoodContext"; // Import useFood to get food details
import { usePlate } from "@/context/PlateContext";
import { toast } from "@/hooks/use-toast";

interface RecipeState {
  recipes: Recipe[];
}

type RecipeAction =
  | { type: "SET_RECIPES"; payload: Recipe[] }
  | { type: "CREATE_RECIPE"; payload: { name: string; initialFood: FoodItem; quantityInGrams: number } }
  | { type: "DELETE_RECIPE"; payload: { recipeId: string } }
  | { type: "ADD_FOOD_TO_RECIPE"; payload: { recipeId: string; food: FoodItem; quantityInGrams: number } }
  | { type: "REMOVE_FOOD_FROM_RECIPE"; payload: { recipeId: string; recipeFoodItemId: string } }
  | { type: "UPDATE_RECIPE_NAME"; payload: { recipeId: string; newName: string } }
  | { type: "UPDATE_FOOD_IN_RECIPE"; payload: { recipeId: string; recipeFoodItemId: string; newQuantityInGrams: number } };

const initialState: RecipeState = {
  recipes: [],
};

const RecipeContext = createContext<
  | (RecipeState & {
      createRecipe: (name: string, initialFood: FoodItem, quantityInGrams: number) => Recipe | undefined;
      deleteRecipe: (recipeId: string) => void;
      addFoodToRecipe: (recipeId: string, food: FoodItem, quantityInGrams: number) => void;
      removeFoodFromRecipe: (recipeId: string, recipeFoodItemId: string) => void;
      updateRecipeName: (recipeId: string, newName: string) => void;
      updateFoodInRecipe: (recipeId: string, recipeFoodItemId: string, newQuantityInGrams: number) => void;
      getRecipeById: (recipeId: string) => Recipe | undefined;
      addRecipeToPlate: (recipeId: string) => void;
      calculateRecipeTotals: (recipe: Recipe) => { calories: number; protein: number; carbs: number; fat: number, totalGrams: number };
    })
  | undefined
>(undefined);

const recipeReducer = (state: RecipeState, action: RecipeAction): RecipeState => {
  switch (action.type) {
    case "SET_RECIPES":
      return { ...state, recipes: action.payload };
    case "CREATE_RECIPE": {
      const newRecipeFoodItem: RecipeFoodItem = {
        id: `${action.payload.initialFood.id}_${Date.now()}`,
        foodId: action.payload.initialFood.id,
        quantityInGrams: action.payload.quantityInGrams,
      };
      const newRecipe: Recipe = {
        id: `recipe_${Date.now()}`,
        name: action.payload.name,
        items: [newRecipeFoodItem],
      };
      return { ...state, recipes: [...state.recipes, newRecipe] };
    }
    case "DELETE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload.recipeId),
      };
    case "ADD_FOOD_TO_RECIPE": {
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.payload.recipeId) {
            const newFoodItem: RecipeFoodItem = {
              id: `${action.payload.food.id}_${Date.now()}`,
              foodId: action.payload.food.id,
              quantityInGrams: action.payload.quantityInGrams,
            };
            return { ...recipe, items: [...recipe.items, newFoodItem] };
          }
          return recipe;
        }),
      };
    }
    case "REMOVE_FOOD_FROM_RECIPE": {
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.payload.recipeId) {
            return {
              ...recipe,
              items: recipe.items.filter((item) => item.id !== action.payload.recipeFoodItemId),
            };
          }
          return recipe;
        }),
      };
    }
    case "UPDATE_RECIPE_NAME": {
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.payload.recipeId ? { ...recipe, name: action.payload.newName } : recipe
        ),
      };
    }
    case "UPDATE_FOOD_IN_RECIPE": {
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.payload.recipeId) {
            return {
              ...recipe,
              items: recipe.items.map((item) =>
                item.id === action.payload.recipeFoodItemId
                  ? { ...item, quantityInGrams: action.payload.newQuantityInGrams }
                  : item
              ),
            };
          }
          return recipe;
        }),
      };
    }
    default:
      return state;
  }
};

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const { addItemToPlate } = usePlate();
  const { getFoodById: getFoodDetailsById } = useFood(); // Use FoodContext's getFoodById

  // Load recipes from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRecipes = localStorage.getItem("nutrisnap_recipes");
      if (storedRecipes) {
        dispatch({ type: "SET_RECIPES", payload: JSON.parse(storedRecipes) });
      }
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("nutrisnap_recipes", JSON.stringify(state.recipes));
    }
  }, [state.recipes]);


  const createRecipe = useCallback((name: string, initialFood: FoodItem, quantityInGrams: number): Recipe | undefined => {
    if (!name.trim()) {
      toast({ title: "Error", description: "Recipe name cannot be empty.", variant: "destructive" });
      return undefined;
    }
    dispatch({ type: "CREATE_RECIPE", payload: { name, initialFood, quantityInGrams } });
    toast({ title: "Recipe Created", description: `"${name}" has been created.` });
    // Note: The actual created recipe object isn't directly returned here due to reducer's async nature.
    // If immediate access is needed, it might require a different approach or state structure.
    // For now, we rely on the state update.
    return state.recipes.find(r => r.name === name); // Attempt to find, might not be updated yet
  }, [state.recipes]);

  const deleteRecipe = useCallback((recipeId: string) => {
    dispatch({ type: "DELETE_RECIPE", payload: { recipeId } });
    toast({ title: "Recipe Deleted", description: "The recipe has been removed." });
  }, []);

  const addFoodToRecipe = useCallback((recipeId: string, food: FoodItem, quantityInGrams: number) => {
    dispatch({ type: "ADD_FOOD_TO_RECIPE", payload: { recipeId, food, quantityInGrams } });
    toast({ title: "Food Added", description: `${food.name} added to recipe.` });
  }, []);

  const removeFoodFromRecipe = useCallback((recipeId: string, recipeFoodItemId: string) => {
    dispatch({ type: "REMOVE_FOOD_FROM_RECIPE", payload: { recipeId, recipeFoodItemId } });
    toast({ title: "Food Removed", description: "Food item removed from recipe." });
  }, []);
  
  const updateRecipeName = useCallback((recipeId: string, newName: string) => {
    if (!newName.trim()) {
      toast({ title: "Error", description: "Recipe name cannot be empty.", variant: "destructive" });
      return;
    }
    dispatch({ type: "UPDATE_RECIPE_NAME", payload: { recipeId, newName } });
    toast({ title: "Recipe Updated", description: "Recipe name changed." });
  }, []);

  const updateFoodInRecipe = useCallback((recipeId: string, recipeFoodItemId: string, newQuantityInGrams: number) => {
    if (newQuantityInGrams <= 0) {
      removeFoodFromRecipe(recipeId, recipeFoodItemId); // Or show error/confirmation
    } else {
      dispatch({ type: "UPDATE_FOOD_IN_RECIPE", payload: { recipeId, recipeFoodItemId, newQuantityInGrams } });
      toast({ title: "Recipe Updated", description: "Food quantity updated." });
    }
  }, [removeFoodFromRecipe]);

  const getRecipeById = useCallback((recipeId: string) => {
    return state.recipes.find((recipe) => recipe.id === recipeId);
  }, [state.recipes]);

  const addRecipeToPlate = useCallback((recipeId: string) => {
    const recipe = getRecipeById(recipeId);
    if (recipe) {
      recipe.items.forEach(item => {
        const foodDetails = getFoodDetailsById(item.foodId); // Use FoodContext's getter
        if (foodDetails) {
          addItemToPlate(foodDetails, item.quantityInGrams);
        }
      });
      toast({ title: "Recipe Added to Plate", description: `All items from "${recipe.name}" added.` });
    }
  }, [getRecipeById, addItemToPlate, getFoodDetailsById]);

  const calculateRecipeTotals = useCallback((recipe: Recipe) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalGrams = 0;

    recipe.items.forEach(item => {
      const foodDetails = getFoodDetailsById(item.foodId); // Use FoodContext's getter
      if (foodDetails) {
        const factor = item.quantityInGrams / 100;
        totalCalories += foodDetails.nutritionPer100g.calories * factor;
        totalProtein += foodDetails.nutritionPer100g.protein * factor;
        totalCarbs += foodDetails.nutritionPer100g.carbs * factor;
        totalFat += foodDetails.nutritionPer100g.fat * factor;
        totalGrams += item.quantityInGrams;
      }
    });
    return { calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fat: totalFat, totalGrams };
  }, [getFoodDetailsById]);

  return (
    <RecipeContext.Provider
      value={{
        ...state,
        createRecipe,
        deleteRecipe,
        addFoodToRecipe,
        removeFoodFromRecipe,
        updateRecipeName,
        updateFoodInRecipe,
        getRecipeById,
        addRecipeToPlate,
        calculateRecipeTotals,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
};
