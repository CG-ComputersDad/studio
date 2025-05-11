"use client";

import { useState, useMemo } from "react";
import { foodDatabase, getFoodsByCategory } from "@/data/foods";
import type { FoodItem, Category } from "@/types";
import { FoodCard } from "@/components/FoodCard";
import { FoodSearch } from "@/components/FoodSearch";
import { Button } from "@/components/ui/button";
import { Cake, Leaf, Beef, ListFilter } from "lucide-react"; // Assuming ListFilter for All

const categoryFilters: { name: Category; icon: React.ElementType }[] = [
  { name: "All", icon: ListFilter },
  { name: "Sweet", icon: Cake },
  { name: "Vegetarian", icon: Leaf },
  { name: "Meat", icon: Beef },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredFoods = useMemo(() => {
    let foods: FoodItem[] = foodDatabase;

    if (selectedCategory !== "All") {
      foods = getFoodsByCategory(selectedCategory);
    }

    if (searchTerm) {
      foods = foods.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return foods;
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-gradient-to-r from-primary/10 via-background to-accent/10 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Welcome to NutriSnap!
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Easily find nutritional information and calculate calories for your meals. Start by searching for a food or selecting a category below.
        </p>
      </section>

      <section className="space-y-6">
        <FoodSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="flex flex-wrap justify-center gap-3">
          {categoryFilters.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className="text-sm sm:text-base shadow-sm"
            >
              <category.icon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {category.name}
            </Button>
          ))}
        </div>
      </section>

      {filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No foods found matching your criteria.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or category.</p>
        </div>
      )}
    </div>
  );
}
