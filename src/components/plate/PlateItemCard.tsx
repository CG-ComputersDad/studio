"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlate } from "@/context/PlateContext";
import type { PlateItem } from "@/types";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface PlateItemCardProps {
  item: PlateItem;
}

export function PlateItemCard({ item }: PlateItemCardProps) {
  const { updateItemQuantity, removeItemFromPlate } = usePlate();
  const [quantity, setQuantity] = useState(item.quantityInGrams.toString());

  useEffect(() => {
    setQuantity(item.quantityInGrams.toString());
  }, [item.quantityInGrams]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleQuantityBlur = () => {
    const newQuantity = parseInt(quantity, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateItemQuantity(item.id, newQuantity);
    } else if (!isNaN(newQuantity) && newQuantity <= 0) {
      removeItemFromPlate(item.id);
    }
    else {
      // Reset to original if invalid input
      setQuantity(item.quantityInGrams.toString());
    }
  };
  
  const incrementQuantity = () => {
    const newQuantity = item.quantityInGrams + (item.food.name.toLowerCase().includes("slice") || item.food.name.toLowerCase().includes("scoop") ? 1 : 10); // Smaller increment for items often counted by unit
    updateItemQuantity(item.id, newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = item.quantityInGrams - (item.food.name.toLowerCase().includes("slice") || item.food.name.toLowerCase().includes("scoop") ? 1 : 10);
    if (newQuantity > 0) {
      updateItemQuantity(item.id, newQuantity);
    } else {
      removeItemFromPlate(item.id);
    }
  };


  const itemNutrition = {
    calories: (item.food.nutritionPer100g.calories * item.quantityInGrams) / 100,
    protein: (item.food.nutritionPer100g.protein * item.quantityInGrams) / 100,
    carbs: (item.food.nutritionPer100g.carbs * item.quantityInGrams) / 100,
    fat: (item.food.nutritionPer100g.fat * item.quantityInGrams) / 100,
  };

  return (
    <div className="flex items-center gap-4 p-3 border-b">
      <Image
        src={item.food.imageUrl}
        alt={item.food.name}
        width={60}
        height={60}
        className="rounded-md object-cover"
        data-ai-hint={item.food.dataAiHint}
      />
      <div className="flex-grow">
        <h4 className="font-semibold text-sm">{item.food.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={decrementQuantity}>
            <MinusCircle className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            className="h-8 w-16 text-center text-sm"
            aria-label={`${item.food.name} quantity in grams`}
          />
           <span className="text-xs text-muted-foreground">g</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={incrementQuantity}>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
         <p className="text-xs text-muted-foreground mt-1">
          {itemNutrition.calories.toFixed(0)} kcal
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive"
        onClick={() => removeItemFromPlate(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
