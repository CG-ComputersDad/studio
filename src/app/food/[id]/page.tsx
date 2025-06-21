
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFood } from "@/context/FoodContext";
import { usePlate } from "@/context/PlateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, PlusCircle, Flame, Beef, Wheat, Droplet, Bookmark, Sparkles } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddToRecipeDialog } from "@/components/recipe/AddToRecipeDialog";
import type { FoodItem, FoodNutrition } from "@/types";
import { FoodCard } from "@/components/FoodCard";


interface FoodDetailPageProps {
  params: { id: string };
}

export default function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { getFoodById, getAllFoods } = useFood();
  const food = getFoodById(params.id);
  const { addItemToPlate } = usePlate();
  const [quantity, setQuantity] = useState(100);
  const [isAddToRecipeDialogOpen, setIsAddToRecipeDialogOpen] = useState(false);

  const recommendedFoods = useMemo(() => {
    if (!food) return [];

    const allFoods = getAllFoods();

    // Helper function to get macronutrient percentages
    const getMacroPercentages = (nutrition: FoodNutrition) => {
      // Use total from macros to avoid division by zero and get a more accurate ratio
      const proteinCalories = nutrition.protein * 4;
      const carbCalories = nutrition.carbs * 4;
      const fatCalories = nutrition.fat * 9;
      const totalMacroCalories = proteinCalories + carbCalories + fatCalories;

      if (totalMacroCalories === 0) {
        return { protein: 0, carbs: 0, fat: 0 };
      }
      return {
        protein: (proteinCalories / totalMacroCalories) * 100,
        carbs: (carbCalories / totalMacroCalories) * 100,
        fat: (fatCalories / totalMacroCalories) * 100,
      };
    };

    const targetMacros = getMacroPercentages(food.nutritionPer100g);

    const scoredFoods = allFoods
      .filter(f => f.id !== food.id) // Exclude the current food
      .map(otherFood => {
        const otherMacros = getMacroPercentages(otherFood.nutritionPer100g);
        // Calculate similarity score (lower is better) using Euclidean distance
        const diff = Math.sqrt(
          Math.pow(targetMacros.protein - otherMacros.protein, 2) +
          Math.pow(targetMacros.carbs - otherMacros.carbs, 2) +
          Math.pow(targetMacros.fat - otherMacros.fat, 2)
        );
        return { food: otherFood, score: diff };
      });

    // Sort by score and take the top 3
    return scoredFoods
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map(item => item.food);

  }, [food, getAllFoods]);


  if (!food) {
    return (
      <div className="text-center py-10">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTitle>Food Not Found</AlertTitle>
          <AlertDescription>
            The food item you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back Home
            </Link>
          </Button>
      </div>
    );
  }

  const handleAdd = () => {
    if (quantity > 0) {
      addItemToPlate(food, quantity);
    }
  };

  const nutrition = food.nutritionPer100g;

  return (
    <>
    <div className="space-y-8">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Foods
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative w-full min-h-[300px] md:min-h-[400px]">
            <Image
              src={food.imageUrl}
              alt={food.name}
              fill
              style={{ objectFit: "cover" }}
              data-ai-hint={food.dataAiHint}
              priority
              className={food.isCustom ? "grayscale" : ""}
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center">
                <CardTitle className="text-3xl font-bold text-primary">{food.name}</CardTitle>
                {food.isCustom && <Sparkles className="ml-2 h-6 w-6 text-accent" title="Custom Food"/>}
              </div>
              <CardDescription className="text-md text-muted-foreground">Category: {food.category}</CardDescription>
            </CardHeader>

            <CardContent className="p-0 flex-grow space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Nutrition (per 100g)</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Nutrient</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium flex items-center"><Flame className="w-4 h-4 mr-2 text-orange-500" />Calories</TableCell>
                      <TableCell>{nutrition.calories.toFixed(0)} kcal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center"><Beef className="w-4 h-4 mr-2 text-red-500" />Protein</TableCell>
                      <TableCell>{nutrition.protein.toFixed(1)} g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center"><Wheat className="w-4 h-4 mr-2 text-yellow-600" />Carbohydrates</TableCell>
                      <TableCell>{nutrition.carbs.toFixed(1)} g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium flex items-center"><Droplet className="w-4 h-4 mr-2 text-blue-500" />Fat</TableCell>
                      <TableCell>{nutrition.fat.toFixed(1)} g</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <h3 className="text-lg font-semibold">Add to Plate / Recipe</h3>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    min="0"
                    step="10"
                    className="h-10 w-28 text-center text-base"
                    aria-label={`Quantity of ${food.name} in grams`}
                  />
                  <span className="text-md text-muted-foreground">grams</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button onClick={handleAdd} size="lg" className="flex-1" disabled={quantity <=0}>
                    <PlusCircle className="mr-2 h-5 w-5" /> Add to Plate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setIsAddToRecipeDialogOpen(true)} 
                    className="flex-1" 
                    disabled={quantity <=0}
                    title="Add to Recipe"
                  >
                    <Bookmark className="mr-2 h-5 w-5" /> Add to Recipe
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
      
      {recommendedFoods.length > 0 && (
        <section className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl font-bold text-center text-primary">Recommended For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedFoods.map((recFood) => (
              <FoodCard key={recFood.id} food={recFood} />
            ))}
          </div>
        </section>
      )}

    </div>
    {isAddToRecipeDialogOpen && food && (
      <AddToRecipeDialog
        food={food}
        quantity={quantity}
        isOpen={isAddToRecipeDialogOpen}
        onOpenChange={setIsAddToRecipeDialogOpen}
      />
    )}
    </>
  );
}
