"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function CubicBezierPage() {
  const [x1, setX1] = useState(0.25);
  const [y1, setY1] = useState(0.1);
  const [x2, setX2] = useState(0.25);
  const [y2, setY2] = useState(1);

  const bezier = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;

  return (
    <ToolLayout title="Cubic Bezier Editor" description="Create custom easing curves." icon="📈">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <label>X1 <input type="range" min={0} max={1} step={0.01} value={x1} onChange={(e) => setX1(parseFloat(e.target.value))} className="w-full" /></label>
          <label>Y1 <input type="range" min={0} max={1} step={0.01} value={y1} onChange={(e) => setY1(parseFloat(e.target.value))} className="w-full" /></label>
          <label>X2 <input type="range" min={0} max={1} step={0.01} value={x2} onChange={(e) => setX2(parseFloat(e.target.value))} className="w-full" /></label>
          <label>Y2 <input type="range" min={0} max={1} step={0.01} value={y2} onChange={(e) => setY2(parseFloat(e.target.value))} className="w-full" /></label>
        </div>
        <div className="h-32 w-full border rounded relative">
          <svg width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">
            <path d={`M0,1 C${x1},${1-y1} ${x2},${1-y2} 1,0`} stroke="blue" fill="none" strokeWidth="0.02" />
          </svg>
        </div>
        <pre className="p-2 bg-gray-100 rounded">{bezier}</pre>
      </div>
    </ToolLayout>
  );
}