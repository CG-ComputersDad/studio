
"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { FoodItem, PlateItem } from "@/types";
import { toast } from "@/hooks/use-toast";

interface PlateState {
  items: PlateItem[];
  isPlateOpen: boolean;
  recentlyAdded: FoodItem[]; // To store the last 3 added food items
}

type PlateAction =
  | { type: "ADD_ITEM"; payload: { food: FoodItem; quantityInGrams: number } }
  | { type: "REMOVE_ITEM"; payload: { itemId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { itemId: string; quantityInGrams: number } }
  | { type: "CLEAR_PLATE" }
  | { type: "TOGGLE_PLATE_OPEN" }
  | { type: "SET_PLATE_OPEN"; payload: boolean };

const initialState: PlateState = {
  items: [],
  isPlateOpen: false,
  recentlyAdded: [], // Initialize as empty
};

const PlateContext = createContext<
  | (PlateState & {
      addItemToPlate: (food: FoodItem, quantityInGrams: number) => void;
      removeItemFromPlate: (itemId: string) => void;
      updateItemQuantity: (itemId: string, quantityInGrams: number) => void;
      clearPlate: () => void;
      togglePlateOpen: () => void;
      setPlateOpen: (isOpen: boolean) => void;
      getTotalNutrients: () => { calories: number; protein: number; carbs: number; fat: number };
    })
  | undefined
>(undefined);

const plateReducer = (state: PlateState, action: PlateAction): PlateState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.food.id === action.payload.food.id
      );
      let updatedItems;
      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantityInGrams += action.payload.quantityInGrams;
      } else {
        // Add new item
        const newItem: PlateItem = {
          id: `${action.payload.food.id}_${Date.now()}`, // Unique ID for the plate item
          food: action.payload.food,
          quantityInGrams: action.payload.quantityInGrams,
        };
        updatedItems = [...state.items, newItem];
      }
      // Update recently added items
      const newRecentlyAdded = [action.payload.food, ...state.recentlyAdded].slice(0, 3);
      return { ...state, items: updatedItems, recentlyAdded: newRecentlyAdded };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.itemId),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantityInGrams: action.payload.quantityInGrams }
            : item
        ),
      };
    case "CLEAR_PLATE":
      // Clear recently added as well when plate is cleared, or keep them?
      // For now, let's keep them as they represent recent *additions*, not current plate state.
      return { ...state, items: [] };
    case "TOGGLE_PLATE_OPEN":
      return { ...state, isPlateOpen: !state.isPlateOpen };
    case "SET_PLATE_OPEN":
      return { ...state, isPlateOpen: action.payload };
    default:
      return state;
  }
};

export const PlateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(plateReducer, initialState);

  const addItemToPlate = useCallback((food: FoodItem, quantityInGrams: number) => {
    dispatch({ type: "ADD_ITEM", payload: { food, quantityInGrams } });
    toast({ title: `${food.name} added to plate!` });
  }, []);

  const removeItemFromPlate = useCallback((itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
    toast({ title: "Item removed from plate." });
  }, []);

  const updateItemQuantity = useCallback((itemId: string, quantityInGrams: number) => {
    if (quantityInGrams <= 0) {
      removeItemFromPlate(itemId);
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantityInGrams } });
    }
  }, [removeItemFromPlate]);

  const clearPlate = useCallback(() => {
    dispatch({ type: "CLEAR_PLATE" });
    toast({ title: "Plate cleared." });
  }, []);

  const togglePlateOpen = useCallback(() => {
    dispatch({ type: "TOGGLE_PLATE_OPEN" });
  }, []);
  
  const setPlateOpen = useCallback((isOpen: boolean) => {
    dispatch({ type: "SET_PLATE_OPEN", payload: isOpen });
  }, []);

  const getTotalNutrients = useCallback(() => {
    return state.items.reduce(
      (totals, item) => {
        const nutrition = item.food.nutritionPer100g;
        const factor = item.quantityInGrams / 100;
        totals.calories += nutrition.calories * factor;
        totals.protein += nutrition.protein * factor;
        totals.carbs += nutrition.carbs * factor;
        totals.fat += nutrition.fat * factor;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [state.items]);

  return (
    <PlateContext.Provider
      value={{
        ...state, // Includes recentlyAdded
        addItemToPlate,
        removeItemFromPlate,
        updateItemQuantity,
        clearPlate,
        togglePlateOpen,
        setPlateOpen,
        getTotalNutrients,
      }}
    >
      {children}
    </PlateContext.Provider>
  );
};

export const usePlate = () => {
  const context = useContext(PlateContext);
  if (context === undefined) {
    throw new Error("usePlate must be used within a PlateProvider");
  }
  return context;
};
