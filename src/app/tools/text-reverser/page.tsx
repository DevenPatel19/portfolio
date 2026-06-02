"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function TextReverserPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"reverse" | "sort">("reverse");

  const process = () => {
    if (mode === "reverse") setOutput(input.split("").reverse().join(""));
    else setOutput(input.split("\n").sort().join("\n"));
  };

  return (
    <ToolLayout title="Text Reverser / Sorter" description="Reverse or sort lines." icon="🔃">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setMode("reverse")} className={`flex-1 p-2 rounded ${mode === "reverse" ? "bg-black text-white" : "bg-gray-200"}`}>Reverse</button>
          <button onClick={() => setMode("sort")} className={`flex-1 p-2 rounded ${mode === "sort" ? "bg-black text-white" : "bg-gray-200"}`}>Sort Lines</button>
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="w-full p-2 border rounded" />
        <button onClick={process} className="w-full bg-black text-white py-2 rounded">Process</button>
        {output && <pre className="p-3 border rounded bg-gray-50">{output}</pre>}
      </div>
    </ToolLayout>
  );
}