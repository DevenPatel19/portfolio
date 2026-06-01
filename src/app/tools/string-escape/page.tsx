"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

type Type = "json" | "url" | "html";

export default function StringEscapePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const [type, setType] = useState<Type>("json");

  const process = () => {
    try {
      if (mode === "escape") {
        if (type === "json") setOutput(JSON.stringify(input));
        else if (type === "url") setOutput(encodeURIComponent(input));
        else setOutput(input.replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m] || m)));
      } else {
        if (type === "json") setOutput(JSON.parse(input));
        else if (type === "url") setOutput(decodeURIComponent(input));
        else setOutput(input.replace(/&amp;|&lt;|&gt;/g, (m) => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">" }[m] || m)));
      }
    } catch (err) {
      setOutput("Error: " + (err as Error).message);
    }
  };

  return (
    <ToolLayout title="String Escape / Unescape" description="Escape/unescape JSON, URL, or HTML strings." icon="🔓">
      <div className="space-y-4">
        <div className="flex gap-2">
          {(["json", "url", "html"] as Type[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1 rounded-md text-sm ${type === t ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : "bg-neutral-200 dark:bg-neutral-800"}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("escape")}
            className={`flex-1 py-1 rounded-md ${mode === "escape" ? "bg-blue-600 text-white" : "bg-neutral-200"}`}
          >
            Escape
          </button>
          <button
            onClick={() => setMode("unescape")}
            className={`flex-1 py-1 rounded-md ${mode === "unescape" ? "bg-blue-600 text-white" : "bg-neutral-200"}`}
          >
            Unescape
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full rounded-lg border p-2 font-mono text-sm"
          placeholder="Enter string..."
        />
        <button
          onClick={process}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black py-2 text-sm font-medium"
        >
          Process
        </button>
        {output && (
          <div>
            <label className="block text-sm font-medium">Output</label>
            <pre className="rounded-lg border p-2 text-sm break-all">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}