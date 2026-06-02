"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function TransformGeneratorPage() {
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [skew, setSkew] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const transform = `transform: rotate(${rotate}deg) scale(${scale}) skew(${skew}deg) translate(${translateX}px, ${translateY}px);`;

  return (
    <ToolLayout title="CSS Transform Generator" description="Combine transform functions live." icon="🔄">
      <div className="space-y-4">
        <div><label>Rotate (deg)</label><input type="range" min={-180} max={180} value={rotate} onChange={(e) => setRotate(parseInt(e.target.value))} className="w-full" /></div>
        <div><label>Scale</label><input type="range" min={0} max={2} step={0.01} value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="w-full" /></div>
        <div><label>Skew (deg)</label><input type="range" min={-45} max={45} value={skew} onChange={(e) => setSkew(parseInt(e.target.value))} className="w-full" /></div>
        <div><label>Translate X</label><input type="range" min={-100} max={100} value={translateX} onChange={(e) => setTranslateX(parseInt(e.target.value))} className="w-full" /></div>
        <div><label>Translate Y</label><input type="range" min={-100} max={100} value={translateY} onChange={(e) => setTranslateY(parseInt(e.target.value))} className="w-full" /></div>
        <div className="h-32 w-32 mx-auto bg-red-500 flex items-center justify-center text-white text-sm" style={{ transform: `rotate(${rotate}deg) scale(${scale}) skew(${skew}deg) translate(${translateX}px, ${translateY}px)` }}>Preview</div>
        <pre className="p-2 bg-gray-100 rounded">{transform}</pre>
      </div>
    </ToolLayout>
  );
}