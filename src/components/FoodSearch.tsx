"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type React from "react";

interface FoodSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export function FoodSearch({ searchTerm, onSearchChange, placeholder = "Search foods..." }: FoodSearchProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-3 text-base rounded-lg shadow-sm focus:ring-primary focus:border-primary"
      />
    </div>
  );
}
