"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { FoodItem, PlateItem } from "@/types";
import { toast } from "@/hooks/use-toast";

interface PlateState {
  items: PlateItem[];
  isPlateOpen: boolean;
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
      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantityInGrams += action.payload.quantityInGrams;
        return { ...state, items: updatedItems };
      }
      // Add new item
      const newItem: PlateItem = {
        id: `${action.payload.food.id}_${Date.now()}`, // Unique ID for the plate item
        food: action.payload.food,
        quantityInGrams: action.payload.quantityInGrams,
      };
      return { ...state, items: [...state.items, newItem] };
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
        ...state,
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
