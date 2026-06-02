"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function RandomColorPage() {
  const [color, setColor] = useState("#ff0000");

  const random = () => {
    const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColor(randomHex);
  };

  const copy = () => { navigator.clipboard.writeText(color); alert("Copied!"); };

  return (
    <ToolLayout title="Random Color" description="Generate random hex colors." icon="🎨">
      <div className="space-y-4 text-center">
        <div className="h-32 rounded" style={{ backgroundColor: color }} />
        <div className="font-mono">{color}</div>
        <div className="flex gap-2">
          <button onClick={random} className="flex-1 bg-black text-white py-2 rounded">Generate</button>
          <button onClick={copy} className="flex-1 border py-2 rounded">Copy</button>
        </div>
      </div>
    </ToolLayout>
  );
}