
"use client";

import { useRecipes } from "@/context/RecipeContext";
import { RecipeListItem } from "@/components/recipe/RecipeListItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, ListOrdered } from "lucide-react";

export default function RecipesPage() {
  const { recipes } = useRecipes();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <ListOrdered className="mr-3 h-8 w-8" /> Your Recipes
        </h1>
        {/* This button could lead to a dedicated "create recipe" page or open a modal */}
        {/* For now, recipes are created via the "Add to Recipe" dialog on food items */}
         <p className="text-sm text-muted-foreground">
          New recipes are created by adding food items via the <PlusCircle className="inline h-4 w-4 mx-1"/> icon on food cards.
        </p>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-tabs mx-auto text-muted-foreground mb-4"><path d="M4 6V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/><path d="M4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6"/><path d="M8 6h12"/><path d="M8 10h12"/><path d="M8 14h12"/><path d="M8 18h12"/><path d="M18 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M9 22V4"/><path d="M15 22V4"/></svg>
          <h2 className="text-xl font-semibold text-foreground mb-2">No Recipes Yet!</h2>
          <p className="text-muted-foreground mb-4">
            Start creating recipes by adding foods from the main page or food detail pages.
          </p>
          <Button asChild>
            <Link href="/">
              <PlusCircle className="mr-2 h-4 w-4" /> Find Foods to Add
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
