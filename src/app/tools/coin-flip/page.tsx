"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function CoinFlipPage() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const flip = () => {
    const res = Math.random() < 0.5 ? "Heads" : "Tails";
    setResult(res);
    setHistory(prev => [res, ...prev].slice(0, 10));
  };

  return (
    <ToolLayout title="Coin Flip" description="Flip a virtual coin." icon="🪙">
      <div className="space-y-4 text-center">
        <div className="text-6xl">{result === "Heads" ? "🪙 Heads" : result === "Tails" ? "🪙 Tails" : "⬜"}</div>
        <button onClick={flip} className="bg-black text-white px-6 py-2 rounded">Flip</button>
        {history.length > 0 && <div className="text-sm">Last 10: {history.join(", ")}</div>}
      </div>
    </ToolLayout>
  );
}