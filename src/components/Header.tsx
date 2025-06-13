
"use client";

import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePlate } from "@/context/PlateContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Recipes", href: "/recipes"},
  { name: "Sweet", href: "/foods/Sweet" },
  { name: "Vegetarian", href: "/foods/Vegetarian" },
  { name: "Meat", href: "/foods/Meat" },
];

export function Header() {
  const pathname = usePathname();
  const { recentlyAdded } = usePlate();

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <UtensilsCrossed className="h-7 w-7" />
            <span>NutriSnap</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4"> {/* Adjusted gap */}
            
            {/* Recently Added Items Section - Now visible on all screen sizes */}
            {recentlyAdded && recentlyAdded.length > 0 && (
              <TooltipProvider delayDuration={100}>
                {/* Adjusted classes for responsiveness */}
                <div className="flex items-center gap-1 sm:gap-2 border-r border-border pr-2 sm:pr-3 mr-1 sm:mr-2">
                  {/* "Recent:" text hidden on xs, shown on sm+ */}
                  <span className="hidden sm:inline text-xs text-muted-foreground whitespace-nowrap">Recent:</span>
                  {recentlyAdded.map((food) => (
                    <Tooltip key={`recent-${food.id}`}>
                      <TooltipTrigger asChild>
                        <Link href={`/food/${food.id}`} className="block" aria-label={`View ${food.name}`}>
                          <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-secondary/50 hover:border-primary transition-all cursor-pointer">
                            <Image
                              src={food.imageUrl}
                              alt={food.name}
                              fill
                              style={{ objectFit: 'cover' }}
                              className={food.isCustom ? "grayscale" : ""}
                              data-ai-hint={food.dataAiHint}
                              sizes="(max-width: 768px) 10vw, 32px" 
                            />
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{food.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            )}

            <nav className="hidden md:flex space-x-1 lg:space-x-2"> 
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-2 py-1.5 lg:px-3 lg:py-2 rounded-md text-xs lg:text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors", 
                    (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="md:hidden"> {/* Mobile navigation dropdown */}
              <select 
                  onChange={(e) => window.location.href = e.target.value} 
                  value={pathname}
                  className="bg-card border border-input rounded-md p-2 text-sm text-foreground focus:ring-primary"
                  aria-label="Navigation"
                >
                {navItems.map((item) => (
                  <option key={item.name} value={item.href}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <ThemeToggle /> 
          </div>
        </div>
      </div>
    </header>
  );
}
