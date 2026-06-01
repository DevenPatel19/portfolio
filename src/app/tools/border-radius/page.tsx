"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function BorderRadiusPage() {
  const [tl, setTl] = useState(10);
  const [tr, setTr] = useState(10);
  const [br, setBr] = useState(10);
  const [bl, setBl] = useState(10);

  const radius = `${tl}px ${tr}px ${br}px ${bl}px`;

  return (
    <ToolLayout title="Border Radius Generator" description="Create custom border-radius." icon="⬚">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div><label>Top-Left</label><input type="range" min={0} max={100} value={tl} onChange={(e) => setTl(parseInt(e.target.value))} /></div>
          <div><label>Top-Right</label><input type="range" min={0} max={100} value={tr} onChange={(e) => setTr(parseInt(e.target.value))} /></div>
          <div><label>Bottom-Right</label><input type="range" min={0} max={100} value={br} onChange={(e) => setBr(parseInt(e.target.value))} /></div>
          <div><label>Bottom-Left</label><input type="range" min={0} max={100} value={bl} onChange={(e) => setBl(parseInt(e.target.value))} /></div>
        </div>
        <div className="h-32 w-32 mx-auto bg-blue-500" style={{ borderRadius: radius }}></div>
        <pre className="text-xs bg-gray-600 p-2 rounded">border-radius: {radius};</pre>
      </div>
    </ToolLayout>
  );
}