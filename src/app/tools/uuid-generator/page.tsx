"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    alert("Copied!");
  };

  return (
    <ToolLayout title="UUID Generator" description="Generate random v4 UUIDs in bulk." icon="🆔">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Number of UUIDs</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full rounded-lg border p-2"
          />
        </div>
        <button
          onClick={generate}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black py-2 text-sm font-medium"
        >
          Generate
        </button>
        {uuids.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Generated UUIDs</label>
              <button onClick={copyAll} className="text-xs underline">Copy All</button>
            </div>
            <pre className="rounded-lg border p-2 text-sm overflow-auto max-h-80">
              {uuids.join("\n")}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}