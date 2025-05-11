
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFood } from "@/context/FoodContext";
import type { CustomFoodFormData, Category } from "@/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

interface AddFoodDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const foodCategories: Exclude<Category, "All">[] = ["Sweet", "Vegetarian", "Meat"];

const foodFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.enum(foodCategories, { required_error: "Please select a category." }),
  calories: z.coerce.number().min(0, { message: "Calories must be a positive number." }),
  protein: z.coerce.number().min(0, { message: "Protein must be a positive number." }),
  carbs: z.coerce.number().min(0, { message: "Carbs must be a positive number." }),
  fat: z.coerce.number().min(0, { message: "Fat must be a positive number." }),
});

export function AddFoodDialog({ isOpen, onOpenChange }: AddFoodDialogProps) {
  const { addCustomFood } = useFood();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomFoodFormData>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: "",
      category: undefined, // Or a default category
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  });

  const onSubmit = (data: CustomFoodFormData) => {
    addCustomFood(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) reset(); // Reset form if dialog is closed
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <PlusCircle className="mr-2 h-6 w-6 text-primary" /> Add Custom Food
          </DialogTitle>
          <DialogDescription>
            Enter the details for your custom food item. Nutritional information should be per 100g.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Food Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input id="name" placeholder="e.g., My Special Salad" {...field} />}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {foodCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="calories">Calories (kcal)</Label>
              <Controller
                name="calories"
                control={control}
                render={({ field }) => <Input id="calories" type="number" min="0" {...field} />}
              />
              {errors.calories && <p className="text-sm text-destructive">{errors.calories.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Controller
                name="protein"
                control={control}
                render={({ field }) => <Input id="protein" type="number" min="0" step="0.1" {...field} />}
              />
              {errors.protein && <p className="text-sm text-destructive">{errors.protein.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Controller
                name="carbs"
                control={control}
                render={({ field }) => <Input id="carbs" type="number" min="0" step="0.1" {...field} />}
              />
              {errors.carbs && <p className="text-sm text-destructive">{errors.carbs.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fat">Fat (g)</Label>
              <Controller
                name="fat"
                control={control}
                render={({ field }) => <Input id="fat" type="number" min="0" step="0.1" {...field} />}
              />
              {errors.fat && <p className="text-sm text-destructive">{errors.fat.message}</p>}
            </div>
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Food</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
