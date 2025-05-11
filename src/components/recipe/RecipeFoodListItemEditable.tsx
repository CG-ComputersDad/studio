
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { FoodItem, RecipeFoodItem as RecipeFoodItemType } from "@/types";
import { useFood } from "@/context/FoodContext"; // Import useFood
import { useRecipes } from "@/context/RecipeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Save, Edit3, XCircle, Sparkles } from "lucide-react";

interface RecipeFoodListItemEditableProps {
  recipeId: string;
  recipeFoodItem: RecipeFoodItemType;
}

export function RecipeFoodListItemEditable({ recipeId, recipeFoodItem }: RecipeFoodListItemEditableProps) {
  const { updateFoodInRecipe, removeFoodFromRecipe } = useRecipes();
  const { getFoodById } = useFood(); // Use context
  const foodDetails = getFoodById(recipeFoodItem.foodId); // Fetch using context

  const [quantity, setQuantity] = useState(recipeFoodItem.quantityInGrams.toString());
  const [isEditing, setIsEditing] = useState(false);
  const [editQuantity, setEditQuantity] = useState(recipeFoodItem.quantityInGrams.toString());

  useEffect(() => {
    setQuantity(recipeFoodItem.quantityInGrams.toString());
    setEditQuantity(recipeFoodItem.quantityInGrams.toString());
  }, [recipeFoodItem.quantityInGrams]);

  if (!foodDetails) {
    return (
      <div className="flex items-center justify-between p-3 text-destructive">
        <span>Food item not found (ID: {recipeFoodItem.foodId})</span>
        <Button variant="ghost" size="icon" onClick={() => removeFoodFromRecipe(recipeId, recipeFoodItem.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const handleSaveQuantity = () => {
    const newQuantityNum = parseInt(editQuantity, 10);
    if (!isNaN(newQuantityNum) && newQuantityNum > 0) {
      updateFoodInRecipe(recipeId, recipeFoodItem.id, newQuantityNum);
      setIsEditing(false);
    } else if (!isNaN(newQuantityNum) && newQuantityNum <= 0) {
      removeFoodFromRecipe(recipeId, recipeFoodItem.id); // Or show error
      setIsEditing(false);
    } else {
      // Reset if invalid
      setEditQuantity(quantity);
    }
  };
  
  const handleCancelEdit = () => {
    setEditQuantity(quantity);
    setIsEditing(false);
  }

  const calculatedNutrition = {
    calories: (foodDetails.nutritionPer100g.calories * recipeFoodItem.quantityInGrams) / 100,
    protein: (foodDetails.nutritionPer100g.protein * recipeFoodItem.quantityInGrams) / 100,
    carbs: (foodDetails.nutritionPer100g.carbs * recipeFoodItem.quantityInGrams) / 100,
    fat: (foodDetails.nutritionPer100g.fat * recipeFoodItem.quantityInGrams) / 100,
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors">
      <Image
        src={foodDetails.imageUrl}
        alt={foodDetails.name}
        width={50}
        height={50}
        className={`rounded-md object-cover ${foodDetails.isCustom ? "grayscale" : ""}`}
        data-ai-hint={foodDetails.dataAiHint}
      />
      <div className="flex-grow">
        <h4 className="font-semibold text-sm flex items-center">
          {foodDetails.name}
          {foodDetails.isCustom && <Sparkles className="ml-1.5 h-3 w-3 text-accent" title="Custom Food"/>}
        </h4>
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="number"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
              className="h-8 w-20 text-center text-sm"
              min="1"
            />
            <span className="text-xs text-muted-foreground">g</span>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-green-600 hover:text-green-700" onClick={handleSaveQuantity}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:text-gray-600" onClick={handleCancelEdit}>
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground mt-1">
            {recipeFoodItem.quantityInGrams}g
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 text-primary/70 hover:text-primary" onClick={() => setIsEditing(true)}>
                <Edit3 className="h-3 w-3" />
            </Button>
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-0.5">
          {calculatedNutrition.calories.toFixed(0)} kcal | 
          P: {calculatedNutrition.protein.toFixed(1)}g | 
          C: {calculatedNutrition.carbs.toFixed(1)}g | 
          F: {calculatedNutrition.fat.toFixed(1)}g
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive self-center"
        onClick={() => removeFoodFromRecipe(recipeId, recipeFoodItem.id)}
        title="Remove from recipe"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
