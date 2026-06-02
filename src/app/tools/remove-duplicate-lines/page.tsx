"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function RemoveDuplicateLinesPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const dedupe = () => {
    const lines = input.split("\n");
    const unique = [...new Map(lines.map(l => [l, l])).values()];
    setOutput(unique.join("\n"));
  };

  return (
    <ToolLayout title="Remove Duplicate Lines" description="Deduplicate text lines." icon="🗑️">
      <div className="space-y-4">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full p-2 border rounded" />
        <button onClick={dedupe} className="w-full bg-black text-white py-2 rounded">Remove Duplicates</button>
        {output && <pre className="p-3 border rounded bg-gray-50">{output}</pre>}
      </div>
    </ToolLayout>
  );
}