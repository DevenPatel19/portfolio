"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<"pctOf" | "whatPct" | "change">("pctOf");
  const [x, setX] = useState(20);
  const [y, setY] = useState(100);
  const [result, setResult] = useState("");

  const calculate = () => {
    if (mode === "pctOf") setResult(`${x}% of ${y} = ${(x / 100) * y}`);
    else if (mode === "whatPct") setResult(`${x} is ${(x / y) * 100}% of ${y}`);
    else setResult(`Increase from ${x} to ${y} is ${((y - x) / x) * 100}%`);
  };

  return (
    <ToolLayout title="Percentage Calculator" description="Calculate percentages easily." icon="%">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setMode("pctOf")} className={`flex-1 p-2 rounded ${mode === "pctOf" ? "bg-black text-white" : "bg-gray-200"}`}>X% of Y</button>
          <button onClick={() => setMode("whatPct")} className={`flex-1 p-2 rounded ${mode === "whatPct" ? "bg-black text-white" : "bg-gray-200"}`}>X is ?% of Y</button>
          <button onClick={() => setMode("change")} className={`flex-1 p-2 rounded ${mode === "change" ? "bg-black text-white" : "bg-gray-200"}`}>% Change</button>
        </div>
        <div className="flex gap-2">
          <input type="number" value={x} onChange={(e) => setX(parseFloat(e.target.value))} placeholder="X" className="flex-1 p-2 border rounded" />
          <input type="number" value={y} onChange={(e) => setY(parseFloat(e.target.value))} placeholder="Y" className="flex-1 p-2 border rounded" />
        </div>
        <button onClick={calculate} className="w-full bg-black text-white py-2 rounded">Calculate</button>
        {result && <div className="p-3 border rounded">{result}</div>}
      </div>
    </ToolLayout>
  );
}