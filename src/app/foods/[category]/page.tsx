
"use client"; 

import React from "react"; // Import React for React.use
import { useFood } from "@/context/FoodContext"; // Import useFood
import type { Category as CategoryType } from "@/types";
import { FoodCard } from "@/components/FoodCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CategoryPageProps {
  params: { category: CategoryType };
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function CategoryPage({ params }: CategoryPageProps) {
  // As per Next.js warning, `params` (the prop) should be unwrapped if it's a Promise.
  // React.use() will unwrap the promise or return the value if it's not a promise (though it expects a promise or context).
  // Given the warning "params is now a Promise", we should use React.use().
  const resolvedParams = React.use(params);
  const category = resolvedParams.category;
  
  const { getFoodsByCategory } = useFood(); // Use context
  const foods = getFoodsByCategory(category); // Fetch foods using context

  if (!category || !["Sweet", "Vegetarian", "Meat"].includes(category as string)) {
    return (
      <div className="text-center py-10">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTitle>Invalid Category</AlertTitle>
          <AlertDescription>
            The food category you're looking for doesn't exist.
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">
          {capitalize(category as string)} Foods
        </h1>
        <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Foods
            </Link>
        </Button>
      </div>

      {foods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            No foods found in the "{capitalize(category as string)}" category.
          </p>
        </div>
      )}
    </div>
  );
}

