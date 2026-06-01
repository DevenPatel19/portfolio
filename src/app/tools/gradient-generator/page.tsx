"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function GradientGeneratorPage() {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const gradientStyle = type === "linear"
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  return (
    <ToolLayout title="CSS Gradient Generator" description="Create linear or radial gradients." icon="🎨">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setType("linear")} className={`px-3 py-1 rounded-md ${type === "linear" ? "bg-black text-white" : "bg-gray-200"}`}>Linear</button>
          <button onClick={() => setType("radial")} className={`px-3 py-1 rounded-md ${type === "radial" ? "bg-black text-white" : "bg-gray-200"}`}>Radial</button>
        </div>
        <div>
          <label>Color 1</label>
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-10" />
        </div>
        <div>
          <label>Color 2</label>
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-10" />
        </div>
        {type === "linear" && (
          <div>
            <label>Angle: {angle}°</label>
            <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full" />
          </div>
        )}
        <div className="h-32 rounded-lg" style={{ background: gradientStyle }}></div>
        <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">background: {gradientStyle};</pre>
      </div>
    </ToolLayout>
  );
}
