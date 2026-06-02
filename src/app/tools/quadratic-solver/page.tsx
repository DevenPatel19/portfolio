"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function QuadraticSolverPage() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(2);
  const [roots, setRoots] = useState<{ root1: string; root2: string } | null>(null);

  const solve = () => {
    const discriminant = b * b - 4 * a * c;
    if (discriminant > 0) {
      const root1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(4);
      const root2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(4);
      setRoots({ root1, root2 });
    } else if (discriminant === 0) {
      const root = (-b / (2 * a)).toFixed(4);
      setRoots({ root1: root, root2: root });
    } else {
      const real = (-b / (2 * a)).toFixed(4);
      const imag = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
      setRoots({ root1: `${real} + ${imag}i`, root2: `${real} - ${imag}i` });
    }
  };

  return (
    <ToolLayout title="Quadratic Solver" description="Solve ax² + bx + c = 0" icon="📐">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <input type="number" value={a} onChange={(e) => setA(parseFloat(e.target.value))} placeholder="a" className="p-2 border rounded" />
          <input type="number" value={b} onChange={(e) => setB(parseFloat(e.target.value))} placeholder="b" className="p-2 border rounded" />
          <input type="number" value={c} onChange={(e) => setC(parseFloat(e.target.value))} placeholder="c" className="p-2 border rounded" />
        </div>
        <button onClick={solve} className="w-full bg-black text-white py-2 rounded">Solve</button>
        {roots && <div className="p-3 border rounded">x₁ = {roots.root1}<br />x₂ = {roots.root2}</div>}
      </div>
    </ToolLayout>
  );
}