
"use client";

import React, { useState, useMemo } from "react";
import { useRecipes } from "@/context/RecipeContext";
import { useFood } from "@/context/FoodContext"; // Import useFood
import type { FoodItem } from "@/types";
// import { foodDatabase } from "@/data/foods"; // No longer directly used
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FoodSearch } from "@/components/FoodSearch";

interface AddFoodToExistingRecipeDialogProps {
  recipeId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AddFoodToExistingRecipeDialog({ recipeId, isOpen, onOpenChange }: AddFoodToExistingRecipeDialogProps) {
  const { addFoodToRecipe } = useRecipes();
  const { getAllFoods } = useFood(); // Get all foods from context
  const allAvailableFoods = getAllFoods();

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFoods = useMemo(() => {
    if (!searchTerm) return allAvailableFoods.slice(0, 20); // Show some initial items or limit
    return allAvailableFoods.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0,20); // Limit results for performance
  }, [searchTerm, allAvailableFoods]);

  const handleSubmit = () => {
    if (!selectedFood) {
      alert("Please select a food item."); // Or use toast
      return;
    }
    if (quantity <= 0) {
      alert("Quantity must be greater than 0."); // Or use toast
      return;
    }
    addFoodToRecipe(recipeId, selectedFood, quantity);
    onOpenChange(false);
    setSelectedFood(null);
    setSearchTerm("");
    setQuantity(100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Food to Recipe</DialogTitle>
          <DialogDescription>
            Search for a food item and specify the quantity to add to your recipe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FoodSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search for a food..."/>
          
          <ScrollArea className="h-[200px] border rounded-md mt-2">
            {filteredFoods.length > 0 ? (
              filteredFoods.map(food => (
                <div 
                  key={food.id} 
                  className={`p-2 cursor-pointer hover:bg-accent ${selectedFood?.id === food.id ? 'bg-accent font-semibold' : ''}`}
                  onClick={() => setSelectedFood(food)}
                >
                  {food.name} ({food.nutritionPer100g.calories} kcal/100g)
                  {food.isCustom && <span className="ml-2 text-xs text-primary">(Custom)</span>}
                </div>
              ))
            ) : (
              <p className="p-4 text-center text-sm text-muted-foreground">No food items found.</p>
            )}
          </ScrollArea>

          {selectedFood && (
            <div className="mt-4 p-3 border rounded-md bg-muted/50">
              <h4 className="font-semibold text-md mb-2">Selected: {selectedFood.name}</h4>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="quantity" className="text-right col-span-1">
                  Quantity (g)
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  min="1"
                  className="col-span-2"
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} disabled={!selectedFood || quantity <= 0}>
            Add to Recipe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
