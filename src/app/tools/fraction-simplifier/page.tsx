"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

export default function FractionSimplifierPage() {
  const [num, setNum] = useState(8);
  const [den, setDen] = useState(12);
  const [result, setResult] = useState("");

  const simplify = () => {
    const divisor = gcd(num, den);
    const newNum = num / divisor;
    const newDen = den / divisor;
    setResult(`${num}/${den} = ${newNum}/${newDen}`);
  };

  return (
    <ToolLayout title="Fraction Simplifier" description="Reduce fractions to lowest terms." icon="➗">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input type="number" value={num} onChange={(e) => setNum(parseInt(e.target.value))} placeholder="Numerator" className="flex-1 p-2 border rounded" />
          <span>/</span>
          <input type="number" value={den} onChange={(e) => setDen(parseInt(e.target.value))} placeholder="Denominator" className="flex-1 p-2 border rounded" />
        </div>
        <button onClick={simplify} className="w-full bg-black text-white py-2 rounded">Simplify</button>
        {result && <div className="p-3 border rounded">{result}</div>}
      </div>
    </ToolLayout>
  );
}