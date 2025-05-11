
"use client";

import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Recipes", href: "/recipes"},
  { name: "Sweet", href: "/foods/Sweet" },
  { name: "Vegetarian", href: "/foods/Vegetarian" },
  { name: "Meat", href: "/foods/Meat" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <UtensilsCrossed className="h-7 w-7" />
            <span>NutriSnap</span>
          </Link>
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Basic Mobile Menu (can be improved with a dropdown) */}
          <div className="md:hidden">
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
        </div>
      </div>
    </header>
  );
}
