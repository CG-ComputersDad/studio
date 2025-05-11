"use client";

import { Button } from "@/components/ui/button";
import { usePlate } from "@/context/PlateContext";
import { ShoppingBasket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PlateButton() {
  const { items, togglePlateOpen } = usePlate();
  const itemCount = items.reduce((sum, item) => sum + 1, 0); // Counts unique items in plate

  return (
    <Button
      variant="primary"
      size="lg"
      className="fixed bottom-6 right-6 rounded-full shadow-lg h-16 w-16 p-0 z-50 flex items-center justify-center"
      onClick={togglePlateOpen}
      aria-label="Open Plate"
    >
      <ShoppingBasket className="h-7 w-7" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 rounded-full px-2 text-xs"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}
