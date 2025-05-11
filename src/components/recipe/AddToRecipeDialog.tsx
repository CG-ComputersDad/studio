
"use client";

import type React from "react";
import { useState } from "react";
import { useRecipes } from "@/context/RecipeContext";
import type { FoodItem, Recipe } from "@/types";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddToRecipeDialogProps {
  food: FoodItem;
  quantity: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AddToRecipeDialog({ food, quantity, isOpen, onOpenChange }: AddToRecipeDialogProps) {
  const { recipes, createRecipe, addFoodToRecipe } = useRecipes();
  const [mode, setMode] = useState<"new" | "existing">("new");
  const [newRecipeName, setNewRecipeName] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    if (mode === "new") {
      if (newRecipeName.trim() === "") {
        // Consider showing a toast or inline error
        alert("Recipe name cannot be empty.");
        return;
      }
      createRecipe(newRecipeName, food, quantity);
    } else {
      if (!selectedRecipeId) {
         // Consider showing a toast or inline error
        alert("Please select a recipe.");
        return;
      }
      addFoodToRecipe(selectedRecipeId, food, quantity);
    }
    onOpenChange(false); // Close dialog on success
    setNewRecipeName("");
    setSelectedRecipeId(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add "{food.name}" to Recipe</DialogTitle>
          <DialogDescription>
            Add {quantity}g of {food.name} to a new or existing recipe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup defaultValue="new" onValueChange={(value: "new" | "existing") => setMode(value)} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="r-new" />
              <Label htmlFor="r-new">Create New Recipe</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existing" id="r-existing" disabled={recipes.length === 0}/>
              <Label htmlFor="r-existing">Add to Existing</Label>
            </div>
          </RadioGroup>

          {mode === "new" && (
            <div className="grid gap-2">
              <Label htmlFor="recipe-name">New Recipe Name</Label>
              <Input
                id="recipe-name"
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
                placeholder="e.g., My Morning Smoothie"
              />
            </div>
          )}

          {mode === "existing" && recipes.length > 0 && (
            <div className="grid gap-2">
              <Label htmlFor="select-recipe">Select Recipe</Label>
              <Select onValueChange={setSelectedRecipeId} value={selectedRecipeId}>
                <SelectTrigger id="select-recipe">
                  <SelectValue placeholder="Choose a recipe..." />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-[150px]">
                    {recipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id}>
                        {recipe.name}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
          )}
           {mode === "existing" && recipes.length === 0 && (
             <p className="text-sm text-muted-foreground text-center py-2">No existing recipes. Create one first!</p>
           )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} disabled={mode === 'existing' && !selectedRecipeId && recipes.length > 0}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
