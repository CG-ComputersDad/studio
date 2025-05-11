
"use client";

import Link from "next/link";
import type { Recipe, FoodNutrition } from "@/types";
import { useRecipes } from "@/context/RecipeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, Eye, PlusSquare, Trash2, Zap, Drumstick, Salad, Utensils } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RecipeListItemProps {
  recipe: Recipe;
}

export function RecipeListItem({ recipe }: RecipeListItemProps) {
  const { deleteRecipe, addRecipeToPlate, calculateRecipeTotals } = useRecipes();
  const totals: FoodNutrition & { totalGrams: number } = calculateRecipeTotals(recipe);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl text-primary">{recipe.name}</CardTitle>
        <CardDescription>{recipe.items.length} item(s) - {totals.totalGrams.toFixed(0)}g total</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center text-sm">
          <Zap className="w-4 h-4 mr-2 text-yellow-500" />
          <span>Calories: {totals.calories.toFixed(0)} kcal</span>
        </div>
        <div className="flex items-center text-sm">
          <Drumstick className="w-4 h-4 mr-2 text-red-500" /> 
          <span>Protein: {totals.protein.toFixed(1)} g</span>
        </div>
        <div className="flex items-center text-sm">
          <Utensils className="w-4 h-4 mr-2 text-green-500" />
          <span>Carbs: {totals.carbs.toFixed(1)} g</span>
        </div>
         <div className="flex items-center text-sm">
          <Salad className="w-4 h-4 mr-2 text-blue-500" /> {/* Using Salad for Fat as an example */}
          <span>Fat: {totals.fat.toFixed(1)} g</span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2 pt-4 border-t">
        <Button asChild variant="outline" size="sm">
          <Link href={`/recipes/${recipe.id}`}>
            <Eye className="mr-1 h-4 w-4" /> View
          </Link>
        </Button>
        <Button variant="default" size="sm" onClick={() => addRecipeToPlate(recipe.id)}>
          <PlusSquare className="mr-1 h-4 w-4" /> Add to Plate
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-1 h-4 w-4" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the recipe "{recipe.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteRecipe(recipe.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
