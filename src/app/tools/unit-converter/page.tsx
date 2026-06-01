// src\app\tools\unit-converter\page.tsx
"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";

type Category = "length" | "weight" | "temperature" | "currency";

const conversions: Record<Category, Record<string, number>> = {
  length: {
    "mm": 1,
    "cm": 10,
    "m": 1000,
    "km": 1000000,
    "in": 25.4,
    "ft": 304.8,
    "yd": 914.4,
    "mi": 1609344,
  },
  weight: {
    "mg": 1,
    "g": 1000,
    "kg": 1000000,
    "oz": 28349.5,
    "lb": 453592,
  },
  temperature: {
    "C": 0,
    "F": 32,
    "K": 273.15,
  },
  currency: {
    "USD": 1,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.5,
    "CAD": 1.36,
    "AUD": 1.53,
  },
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");

  const units = Object.keys(conversions[category]);

  const convert = (): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return "0";

    if (category === "temperature") {
      let celsius = 0;
      if (fromUnit === "F") celsius = (num - 32) * (5 / 9);
      else if (fromUnit === "K") celsius = num - 273.15;
      else celsius = num;

      if (toUnit === "F") return (celsius * (9 / 5) + 32).toFixed(2);
      if (toUnit === "K") return (celsius + 273.15).toFixed(2);
      return celsius.toFixed(2);
    }

    const baseValue = num * conversions[category][fromUnit];
    const result = baseValue / conversions[category][toUnit];
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  return (
    <ToolLayout
      icon="⚖️"
      title="Unit Converter"
      description="Convert between length, weight, temperature, and currency instantly."
    >
      <div className="flex flex-col gap-6 max-w-md">
        {/* Category */}
        <div>
          <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-3">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as Category);
              setFromUnit(Object.keys(conversions[e.target.value as Category])[0]);
              setToUnit(Object.keys(conversions[e.target.value as Category])[1]);
            }}
            className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 px-4 py-3 focus:outline-none focus:border-neutral-300 dark:focus:border-neutral-700"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
            <option value="currency">Currency</option>
          </select>
        </div>

        {/* Value Input */}
        <div>
          <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-2">Enter Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 px-4 py-3 focus:outline-none focus:border-neutral-300 dark:focus:border-neutral-700"
          />
        </div>

        {/* From Unit */}
        <div>
          <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-2">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 px-4 py-3 focus:outline-none focus:border-neutral-300 dark:focus:border-neutral-700"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        {/* To Unit */}
        <div>
          <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-2">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 px-4 py-3 focus:outline-none focus:border-neutral-300 dark:focus:border-neutral-700"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        {/* Result */}
        <div className="mt-4 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">Result</p>
          <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {convert()} {toUnit}
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}