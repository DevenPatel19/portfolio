"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import CryptoJS from "crypto-js";

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<"MD5" | "SHA1" | "SHA256">("MD5");
  const [hash, setHash] = useState("");

  const generateHash = () => {
    let result = "";
    if (algorithm === "MD5") result = CryptoJS.MD5(input).toString();
    else if (algorithm === "SHA1") result = CryptoJS.SHA1(input).toString();
    else result = CryptoJS.SHA256(input).toString();
    setHash(result);
  };

  return (
    <ToolLayout title="Hash Generator" description="Generate MD5, SHA-1, or SHA-256 hashes." icon="🔒">
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full rounded-lg border p-2 font-mono text-sm"
          placeholder="Enter text to hash..."
        />
        <div className="flex gap-2">
          {(["MD5", "SHA1", "SHA256"] as const).map((algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
              className={`px-3 py-1 rounded-md text-sm ${algorithm === algo ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : "bg-neutral-200 dark:bg-neutral-800"}`}
            >
              {algo}
            </button>
          ))}
        </div>
        <button
          onClick={generateHash}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black py-2 text-sm font-medium"
        >
          Generate Hash
        </button>
        {hash && (
          <div>
            <label className="block text-sm font-medium">Hash ({algorithm})</label>
            <pre className="rounded-lg border p-2 text-sm break-all">{hash}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}