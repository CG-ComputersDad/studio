"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NutrientData {
  name: string;
  value: number; // Calories from this nutrient
}

interface NutrientPieChartProps {
  proteinKcal: number;
  carbsKcal: number;
  fatKcal: number;
}

const COLORS = {
  protein: "hsl(var(--chart-1))", // Primary (Emerald)
  carbs: "hsl(var(--chart-2))",   // Secondary (Orange)
  fat: "hsl(var(--chart-3))",     // Accent (Lime)
};

export function NutrientPieChart({ proteinKcal, carbsKcal, fatKcal }: NutrientPieChartProps) {
  const data: NutrientData[] = [
    { name: "Protein", value: proteinKcal },
    { name: "Carbs", value: carbsKcal },
    { name: "Fat", value: fatKcal },
  ].filter(item => item.value > 0); // Only show nutrients with values

  if (data.length === 0) {
    return <p className="text-center text-muted-foreground py-4">Add items to see nutritional breakdown.</p>;
  }

  return (
    <Card className="shadow-none border-0">
      <CardHeader className="p-4">
        <CardTitle className="text-lg text-center">Calorie Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              stroke="hsl(var(--background))"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value.toFixed(0)} kcal`, "Calories"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
