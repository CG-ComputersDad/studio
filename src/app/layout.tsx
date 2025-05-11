import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { PlateProvider } from "@/context/PlateContext";
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <PlateProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </main>
          <Footer />
          <PlateButton />
          <PlateSheet />
        </PlateProvider>
        <Toaster />
      </body>
    </html>
  );
}
