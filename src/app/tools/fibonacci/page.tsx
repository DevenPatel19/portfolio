"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function FibonacciPage() {
  const [count, setCount] = useState(10);
  const [sequence, setSequence] = useState<number[]>([]);

  const generate = () => {
    const seq = [0, 1];
    for (let i = 2; i < count; i++) seq.push(seq[i-1] + seq[i-2]);
    setSequence(seq.slice(0, count));
  };

  return (
    <ToolLayout title="Fibonacci Generator" description="Generate first N Fibonacci numbers." icon="🌀">
      <div className="space-y-4">
        <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full p-2 border rounded" />
        <button onClick={generate} className="w-full bg-black text-white py-2 rounded">Generate</button>
        {sequence.length > 0 && <div className="p-3 border rounded break-all">{sequence.join(", ")}</div>}
      </div>
    </ToolLayout>
  );
}