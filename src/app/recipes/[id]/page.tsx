
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRecipes } from "@/context/RecipeContext";
import type { Recipe as RecipeType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Save, Edit3, PlusCircle, Trash2, Zap, Drumstick, Salad as SaladIcon, Utensils as UtensilsIcon, NotebookPen } from "lucide-react";
import { RecipeFoodListItemEditable } from "@/components/recipe/RecipeFoodListItemEditable";
import { AddFoodToExistingRecipeDialog } from "@/components/recipe/AddFoodToExistingRecipeDialog";
import { Separator } from "@/components/ui/separator";
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
import { useRouter } from "next/navigation";


interface RecipeDetailPageProps {
  params: { id: string };
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const router = useRouter();
  const { 
    getRecipeById, 
    updateRecipeName, 
    calculateRecipeTotals, 
    addRecipeToPlate,
    deleteRecipe 
  } = useRecipes();
  
  const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined);
  const [recipeName, setRecipeName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddFoodDialogOpen, setIsAddFoodDialogOpen] = useState(false);

  useEffect(() => {
    const currentRecipe = getRecipeById(params.id);
    setRecipe(currentRecipe);
    if (currentRecipe) {
      setRecipeName(currentRecipe.name);
    }
  }, [params.id, getRecipeById]);

  if (!recipe) {
    return (
      <div className="text-center py-10">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <NotebookPen className="h-5 w-5"/>
          <AlertTitle>Recipe Not Found</AlertTitle>
          <AlertDescription>
            The recipe you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/recipes">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recipes
          </Link>
        </Button>
      </div>
    );
  }

  const handleSaveName = () => {
    if (recipeName.trim() && recipeName !== recipe.name) {
      updateRecipeName(recipe.id, recipeName.trim());
    }
    setIsEditingName(false);
  };
  
  const handleDeleteRecipe = () => {
    deleteRecipe(recipe.id);
    router.push("/recipes");
  };

  const totals = calculateRecipeTotals(recipe);

  return (
    <>
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/recipes">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recipes
          </Link>
        </Button>
        <div className="flex gap-2">
           <Button onClick={() => addRecipeToPlate(recipe.id)} variant="default" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Add All to Plate
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Recipe
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
                <AlertDialogAction onClick={handleDeleteRecipe}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="text-2xl font-bold h-10 flex-grow"
                aria-label="Recipe name"
              />
              <Button onClick={handleSaveName} size="icon" variant="ghost" className="text-green-600 hover:text-green-700">
                <Save className="h-5 w-5" />
              </Button>
              <Button onClick={() => { setIsEditingName(false); setRecipeName(recipe.name); }} size="icon" variant="ghost" className="text-muted-foreground">
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary flex-grow">{recipe.name}</CardTitle>
              <Button onClick={() => setIsEditingName(true)} variant="ghost" size="icon" title="Edit recipe name">
                <Edit3 className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Button>
            </div>
          )}
          <CardDescription>Manage the food items and quantities in your recipe.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Food Items ({recipe.items.length})</h3>
            {recipe.items.length > 0 ? (
              <div className="border rounded-md divide-y">
                {recipe.items.map((item) => (
                  <RecipeFoodListItemEditable key={item.id} recipeId={recipe.id} recipeFoodItem={item} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">This recipe is empty. Add some food items!</p>
            )}
            <Button onClick={() => setIsAddFoodDialogOpen(true)} variant="outline" className="w-full mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Food to this Recipe
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-3">Total Recipe Nutrition</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-md">
                <div className="flex items-center text-muted-foreground"><Zap className="w-4 h-4 mr-1.5 text-yellow-500" />Total Grams</div>
                <div className="font-semibold text-lg">{totals.totalGrams.toFixed(0)} g</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-md">
                <div className="flex items-center text-muted-foreground"><Zap className="w-4 h-4 mr-1.5 text-yellow-500" />Calories</div>
                <div className="font-semibold text-lg">{totals.calories.toFixed(0)} kcal</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-md">
                <div className="flex items-center text-muted-foreground"><Drumstick className="w-4 h-4 mr-1.5 text-red-500" />Protein</div>
                <div className="font-semibold text-lg">{totals.protein.toFixed(1)} g</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-md">
                <div className="flex items-center text-muted-foreground"><UtensilsIcon className="w-4 h-4 mr-1.5 text-green-500" />Carbs</div>
                <div className="font-semibold text-lg">{totals.carbs.toFixed(1)} g</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-md sm:col-span-2">
                <div className="flex items-center text-muted-foreground"><SaladIcon className="w-4 h-4 mr-1.5 text-blue-500" />Fat</div>
                <div className="font-semibold text-lg">{totals.fat.toFixed(1)} g</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {isAddFoodDialogOpen && (
        <AddFoodToExistingRecipeDialog
            recipeId={recipe.id}
            isOpen={isAddFoodDialogOpen}
            onOpenChange={setIsAddFoodDialogOpen}
        />
    )}
    </>
  );
}
