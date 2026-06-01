"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function BoxShadowPage() {
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [inset, setInset] = useState(false);

  const shadow = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${color}`;

  return (
    <ToolLayout title="Box Shadow Generator" description="Create custom box shadow CSS." icon="⬚">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div><label>X offset</label><input type="range" min={-50} max={50} value={x} onChange={(e) => setX(parseInt(e.target.value))} className="w-full" /></div>
          <div><label>Y offset</label><input type="range" min={-50} max={50} value={y} onChange={(e) => setY(parseInt(e.target.value))} className="w-full" /></div>
          <div><label>Blur</label><input type="range" min={0} max={100} value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" /></div>
          <div><label>Spread</label><input type="range" min={-50} max={50} value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full" /></div>
        </div>
        <div><label>Color</label><input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></div>
        <div><label><input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} /> Inset</label></div>
        <div className="h-32 w-32 mx-auto bg-white dark:bg-gray-800 rounded-lg" style={{ boxShadow: shadow }}></div>
        <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">box-shadow: {shadow};</pre>
      </div>
    </ToolLayout>
  );
}