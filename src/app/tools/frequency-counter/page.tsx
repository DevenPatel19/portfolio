"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function FrequencyCounterPage() {
  const [text, setText] = useState("");
  const [wordFreq, setWordFreq] = useState<[string, number][]>([]);

  const count = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const map = new Map<string, number>();
    for (const w of words) map.set(w, (map.get(w) || 0) + 1);
    const sorted = Array.from(map.entries()).sort((a,b) => b[1] - a[1]);
    setWordFreq(sorted.slice(0,20));
  };

  return (
    <ToolLayout title="Word Frequency Counter" description="Count how often each word appears." icon="📊">
      <div className="space-y-4">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} className="w-full p-2 border rounded" />
        <button onClick={count} className="w-full bg-black text-white py-2 rounded">Count</button>
        <div className="space-y-1 max-h-60 overflow-auto">
          {wordFreq.map(([w, c]) => <div key={w} className="flex justify-between border-b"><span>{w}</span><span className="font-mono">{c}</span></div>)}
        </div>
      </div>
    </ToolLayout>
  );
}