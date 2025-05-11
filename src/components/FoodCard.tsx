
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePlate } from "@/context/PlateContext";
import type { FoodItem } from "@/types";
import { PlusCircle, Flame, Utensils, Info, Bookmark, Sparkles } from "lucide-react"; // Added Sparkles
import React, { useState } from "react";
import { AddToRecipeDialog } from "./recipe/AddToRecipeDialog";

interface FoodCardProps {
  food: FoodItem;
}

export function FoodCard({ food }: FoodCardProps) {
  const { addItemToPlate } = usePlate();
  const [quantity, setQuantity] = useState(100); // Default to 100g
  const [isAddToRecipeDialogOpen, setIsAddToRecipeDialogOpen] = useState(false);

  const handleAdd = () => {
    if (quantity > 0) {
      addItemToPlate(food, quantity);
    }
  };

  return (
    <>
      <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Link href={`/food/${food.id}`} className="block group">
          <div className="relative w-full h-48">
            <Image
              src={food.imageUrl}
              alt={food.name}
              fill
              style={{ objectFit: 'cover' }}
              className={`transition-transform duration-300 group-hover:scale-105 ${food.isCustom ? "grayscale" : ""}`}
              data-ai-hint={food.dataAiHint}
            />
          </div>
        </Link>
        <CardHeader className="pb-2">
          <Link href={`/food/${food.id}`} className="flex items-center">
            <CardTitle className="text-lg hover:text-primary transition-colors">{food.name}</CardTitle>
            {food.isCustom && <Sparkles className="ml-2 h-4 w-4 text-accent" title="Custom Food"/>}
          </Link>
          <CardDescription className="text-xs">Category: {food.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Flame className="w-4 h-4 mr-1 text-orange-500" />
            <span>{food.nutritionPer100g.calories.toFixed(0)} kcal / 100g</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Utensils className="w-4 h-4 mr-1 text-blue-500" />
            <span>
              P: {food.nutritionPer100g.protein.toFixed(1)}g, 
              C: {food.nutritionPer100g.carbs.toFixed(1)}g, 
              F: {food.nutritionPer100g.fat.toFixed(1)}g (per 100g)
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-0 p-4">
          <div className="flex items-center gap-2 flex-grow">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value, 10) || 0))}
              min="0"
              step="10"
              className="h-10 w-24 text-center"
              aria-label={`Quantity of ${food.name} in grams`}
            />
            <span className="text-sm text-muted-foreground">g</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={handleAdd} className="flex-grow sm:flex-grow-0" disabled={quantity <= 0}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsAddToRecipeDialogOpen(true)} 
              className="flex-grow sm:flex-grow-0"
              disabled={quantity <= 0}
              title="Add to Recipe"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
        <Link href={`/food/${food.id}`} className="block text-center p-2 bg-muted hover:bg-accent transition-colors text-xs font-medium">
            <Info className="inline-block mr-1 h-3 w-3" /> View Details
        </Link>
      </Card>
      
      {isAddToRecipeDialogOpen && (
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
