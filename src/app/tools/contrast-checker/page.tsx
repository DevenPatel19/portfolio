"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

function luminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16);
  const r = ((rgb >> 16) & 0xff) / 255;
  const g = ((rgb >> 8) & 0xff) / 255;
  const b = (rgb & 0xff) / 255;
  const linear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export default function ContrastCheckerPage() {
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [ratio, setRatio] = useState<number | null>(null);

  const check = () => {
    const L1 = luminance(fg);
    const L2 = luminance(bg);
    const contrast = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    setRatio(contrast);
  };

  const grade = ratio ? (ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "Fail") : "";

  return (
    <ToolLayout title="WCAG Contrast Checker" description="Check color contrast for accessibility." icon="👁️">
      <div className="space-y-4">
        <div><label>Foreground</label><input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-10" /></div>
        <div><label>Background</label><input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-10" /></div>
        <button onClick={check} className="w-full bg-black text-white py-2 rounded">Check Contrast</button>
        {ratio && <div className="p-3 border rounded" style={{ backgroundColor: bg, color: fg }}>Sample text: Contrast ratio = {ratio.toFixed(2)} ({grade})</div>}
      </div>
    </ToolLayout>
  );
}