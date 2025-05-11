
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono"; // Removed as per previous fix for module not found
import "./globals.css";
import { PlateProvider } from "@/context/PlateContext";
import { RecipeProvider } from "@/context/RecipeContext";
import { FoodProvider } from "@/context/FoodContext"; // Import FoodProvider
import { ThemeProvider } from "@/components/providers/theme-provider"; // Import ThemeProvider
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { PlateButton } from "@/components/plate/PlateButton";
import { PlateSheet } from "@/components/plate/PlateSheet";

export const metadata: Metadata = {
  title: "NutriSnap - Calorie Calculator",
  description: "Track your calories and nutrition with NutriSnap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FoodProvider>
            <PlateProvider>
              <RecipeProvider>
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                  {children}
                </main>
                <Footer />
                <PlateButton />
                <PlateSheet />
              </RecipeProvider>
            </PlateProvider>
          </FoodProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
