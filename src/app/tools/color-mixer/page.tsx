"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default function ColorMixerPage() {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [mix, setMix] = useState("");
  const [ratio, setRatio] = useState(50);

  const mixColors = () => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const r = Math.round((rgb1.r * (100 - ratio) + rgb2.r * ratio) / 100);
    const g = Math.round((rgb1.g * (100 - ratio) + rgb2.g * ratio) / 100);
    const b = Math.round((rgb1.b * (100 - ratio) + rgb2.b * ratio) / 100);
    setMix(rgbToHex(r, g, b));
  };

  return (
    <ToolLayout title="Color Mixer" description="Blend two colors." icon="🎨">
      <div className="space-y-4">
        <div><label>Color 1</label><input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-10" /></div>
        <div><label>Color 2</label><input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-10" /></div>
        <div><label>Mix ratio (Color 2 %)</label><input type="range" min={0} max={100} value={ratio} onChange={(e) => setRatio(parseInt(e.target.value))} className="w-full" /></div>
        <button onClick={mixColors} className="w-full bg-black text-white py-2 rounded">Mix</button>
        {mix && <div className="h-16 rounded" style={{ backgroundColor: mix }} />}
        {mix && <div className="font-mono text-center">{mix}</div>}
      </div>
    </ToolLayout>
  );
}