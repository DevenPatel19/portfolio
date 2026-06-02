"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function FilterGeneratorPage() {
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);

  const filter = `filter: blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%);`;

  return (
    <ToolLayout title="CSS Filter Generator" description="Build filter effects live." icon="🎭">
      <div className="space-y-4">
        <div><label>Blur (px)</label><input type="range" min={0} max={20} value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" /></div>
        <div><label>Brightness %</label><input type="range" min={0} max={200} value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} className="w-full" /></div>
        <div><label>Contrast %</label><input type="range" min={0} max={200} value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} className="w-full" /></div>
        <div><label>Grayscale %</label><input type="range" min={0} max={100} value={grayscale} onChange={(e) => setGrayscale(parseInt(e.target.value))} className="w-full" /></div>
        <div><label>Sepia %</label><input type="range" min={0} max={100} value={sepia} onChange={(e) => setSepia(parseInt(e.target.value))} className="w-full" /></div>
        <div className="h-32 w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500" style={{ filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%)` }} />
        <pre className="p-2 bg-gray-100 rounded">{filter}</pre>
      </div>
    </ToolLayout>
  );
}