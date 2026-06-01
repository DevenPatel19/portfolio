"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

type DiffItem = {
  type: "add" | "remove" | "same";
  text: string;
};

export default function TextDiffPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<DiffItem[]>([]);

  const computeDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const result: DiffItem[] = [];  // Explicitly typed
    const maxLen = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] ?? "";
      const l2 = lines2[i] ?? "";
      if (l1 === l2) {
        result.push({ type: "same", text: l1 });
      } else {
        if (l1) result.push({ type: "remove", text: l1 });
        if (l2) result.push({ type: "add", text: l2 });
      }
    }
    setDiff(result);
  };

  return (
    <ToolLayout title="Text Diff Checker" description="Compare two text blocks side by side." icon="🔍">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Original Text</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-2 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Modified Text</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-2 font-mono text-sm"
            />
          </div>
        </div>
        <button
          onClick={computeDiff}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-2 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100"
        >
          Compare
        </button>
        {diff.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1">Differences</label>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-3 font-mono text-sm overflow-auto max-h-80">
              {diff.map((item, idx) => (
                <div
                  key={idx}
                  className={`py-0.5 ${
                    item.type === "add"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : item.type === "remove"
                      ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 line-through"
                      : ""
                  }`}
                >
                  {item.text || " "}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}