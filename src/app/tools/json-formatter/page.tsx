"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      icon="{ }"
      title="JSON Formatter"
      description="Paste your JSON below to format and validate it instantly."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Input</label>
            <button
              onClick={clear}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "Deven", "role": "developer"}'
            className="h-80 w-full rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-gray-200 placeholder-gray-600 p-4 resize-none focus:outline-none focus:border-white/25 transition-colors"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Output</label>
            {output && (
              <button
                onClick={copy}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            )}
          </div>
          <div
            className={`h-80 w-full rounded-xl border text-sm font-mono p-4 overflow-auto whitespace-pre ${
              error
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-white/5 border-white/10 text-emerald-400"
            }`}
          >
            {error || output || <span className="text-gray-600">Formatted JSON will appear here…</span>}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={format}
          className="px-5 py-2.5 rounded-xl bg-white text-gray-950 text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Format
        </button>
        <button
          onClick={minify}
          className="px-5 py-2.5 rounded-xl bg-white/8 border border-white/10 text-sm text-gray-200 hover:bg-white/12 transition-colors"
        >
          Minify
        </button>
      </div>
    </ToolLayout>
  );
}
