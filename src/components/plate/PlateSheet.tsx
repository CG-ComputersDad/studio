"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { usePlate } from "@/context/PlateContext";
import { NutrientPieChart } from "./NutrientPieChart";
import { PlateItemCard } from "./PlateItemCard";
import { Trash2 } from "lucide-react";

export function PlateSheet() {
  const { items, isPlateOpen, setPlateOpen, getTotalNutrients, clearPlate } = usePlate();
  const totals = getTotalNutrients();

  // Nutrient values in kcal for pie chart
  const proteinKcal = totals.protein * 4;
  const carbsKcal = totals.carbs * 4;
  const fatKcal = totals.fat * 9;

  return (
    <Sheet open={isPlateOpen} onOpenChange={setPlateOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-2 border-b">
          <SheetTitle className="text-xl">Your Plate</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket text-muted-foreground mb-4"><path d="m5 11 4-7"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"/><path d="M9 11v6"/><path d="M15 11v6"/></svg>
            <p className="text-muted-foreground">Your plate is empty.</p>
            <p className="text-xs text-muted-foreground">Add some food items to see them here.</p>
            <SheetClose asChild>
                 <Button variant="outline" className="mt-4">Continue Browsing</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow">
              <div className="divide-y">
                {items.map((item) => (
                  <PlateItemCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 border-t">
              <NutrientPieChart
                proteinKcal={proteinKcal}
                carbsKcal={carbsKcal}
                fatKcal={fatKcal}
              />
            </div>
            
            <Separator />

            <div className="p-6 space-y-2">
              <h3 className="font-semibold text-md mb-2">Total Nutrients:</h3>
              <div className="flex justify-between text-sm">
                <span>Calories:</span>
                <span>{totals.calories.toFixed(0)} kcal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Protein:</span>
                <span>{totals.protein.toFixed(1)} g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Carbs:</span>
                <span>{totals.carbs.toFixed(1)} g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fat:</span>
                <span>{totals.fat.toFixed(1)} g</span>
              </div>
            </div>
          </>
        )}

        <SheetFooter className="p-6 border-t bg-muted/50">
          {items.length > 0 && (
            <Button variant="destructive" className="w-full" onClick={clearPlate}>
              <Trash2 className="mr-2 h-4 w-4" /> Clear Plate
            </Button>
          )}
           <SheetClose asChild>
             <Button variant="outline" className="w-full">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
