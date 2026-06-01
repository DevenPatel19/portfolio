"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function SvgOptimizerPage() {
  const [svg, setSvg] = useState("<svg viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='red'/></svg>");
  const [optimized, setOptimized] = useState("");

  const optimize = () => {
    // Simple removal of comments, whitespace, etc.
    let cleaned = svg
      .replace(/<!--.*?-->/g, "")
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .trim();
    setOptimized(cleaned);
  };

  return (
    <ToolLayout title="SVG Optimizer" description="Clean and minify SVG code." icon="📐">
      <div className="space-y-4">
        <textarea value={svg} onChange={(e) => setSvg(e.target.value)} rows={6} className="w-full border rounded p-2 font-mono text-sm" />
        <button onClick={optimize} className="w-full bg-black text-white py-2 rounded">Optimize</button>
        {optimized && <pre className="border rounded p-2 text-sm">{optimized}</pre>}
      </div>
    </ToolLayout>
  );
}