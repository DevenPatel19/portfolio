"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function DiceRollerPage() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(1);
  const [result, setResult] = useState<number[]>([]);

  const roll = () => {
    const rolls = [];
    for (let i = 0; i < count; i++) rolls.push(Math.floor(Math.random() * sides) + 1);
    setResult(rolls);
  };

  return (
    <ToolLayout title="Dice Roller" description="Roll custom dice." icon="🎲">
      <div className="space-y-4">
        <div><label>Sides</label><input type="number" min={2} value={sides} onChange={(e) => setSides(parseInt(e.target.value))} className="w-full border rounded p-2" /></div>
        <div><label>Number of dice</label><input type="number" min={1} max={10} value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full border rounded p-2" /></div>
        <button onClick={roll} className="w-full bg-black text-white py-2 rounded">Roll</button>
        {result.length > 0 && <div className="text-center text-2xl">{result.join(", ")}</div>}
      </div>
    </ToolLayout>
  );
}