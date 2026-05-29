"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(baseHue: number): string[] {
  const hues = [
    (baseHue + 0) % 360,
    (baseHue + 30) % 360,
    (baseHue + 60) % 360,
    (baseHue + 120) % 360,
    (baseHue + 180) % 360,
  ];
  return hues.map(h => hslToHex(h, 70, 55));
}

export default function ColorPalettePage() {
  const [hue, setHue] = useState(200);
  const [palette, setPalette] = useState(() => generatePalette(200));

  const regenerate = () => {
    const newHue = Math.floor(Math.random() * 360);
    setHue(newHue);
    setPalette(generatePalette(newHue));
  };

  const updateHue = (newHue: number) => {
    setHue(newHue);
    setPalette(generatePalette(newHue));
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color}`);
  };

  return (
    <ToolLayout title="Color Palette Generator" description="Generate harmonious 5‑color palettes based on a hue." icon="🎨">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Base Hue: {hue}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => updateHue(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            <span>Red (0°)</span>
            <span>Green (120°)</span>
            <span>Blue (240°)</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={regenerate}
            className="flex-1 rounded-lg bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition"
          >
            Random Palette 🎲
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {palette.map((color, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => copyColor(color)}
            >
              <div
                className="h-24 w-full"
                style={{ backgroundColor: color }}
              />
              <div className="p-2 text-center bg-white dark:bg-neutral-900">
                <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200">{color}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-neutral-500 dark:text-neutral-400 mt-2">
          Click any color to copy its hex code.
        </p>
      </div>
    </ToolLayout>
  );
}