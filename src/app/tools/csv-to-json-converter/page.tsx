"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState("g");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const test = () => {
    try {
      setError("");
      const regex = new RegExp(pattern, flags);
      const results = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(text)) !== null) {
          results.push(match[0]);
        }
      } else {
        match = regex.exec(text);
        if (match) results.push(match[0]);
      }

      setMatches(results);
    } catch (e) {
      setError((e as Error).message);
      setMatches([]);
    }
  };

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  };

  const clear = () => {
    setPattern("");
    setText("");
    setMatches([]);
    setError("");
  };

  return (
    <ToolLayout
      icon="🔍"
      title="Regex Tester"
      description="Test and debug regular expressions with live matching."
    >
      <div className="flex flex-col gap-6 max-w-2xl">
        {/* Pattern */}
        <div>
          <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-2">
            Regex Pattern
          </label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g., ^[a-z]+@[a-z]+\.[a-z]+$"
            className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 px-4 py-3 focus:outline-none focus:border-neutral-300 dark:focus:border-neutral-700 font-mono"
          />
        </div>

        {/* Flags */}
        <div>
          <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-2">
            Flags
          </label>
          <div className="flex gap-2 flex-wrap">
            {["g", "i", "m", "s"].map((flag) => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                  flags.includes(flag)
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                    : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                {flag === "g" && "Global"}
                {flag === "i" && "Case-insensitive"}
                {flag === "m" && "Multiline"}
                {flag === "s" && "Dotall"}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div>
          <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-2">
            Text to Match
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to test against the regex pattern..."
            className="w-full h-32 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 p-4 resize-none focus:outline-none focus:border-neutral-300 dark:focus:border-neutral-700"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={test}
            className="flex-1 py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Test Pattern
          </button>
          <button
            onClick={clear}
            className="flex-1 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Error or Results */}
        {error ? (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-200 font-mono">{error}</p>
          </div>
        ) : matches.length > 0 ? (
          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800">
            <p className="text-xs text-emerald-700 dark:text-emerald-200 uppercase tracking-wider mb-3">
              Matches ({matches.length})
            </p>
            <div className="space-y-2">
              {matches.map((match, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-white dark:bg-emerald-900 rounded border border-emerald-200 dark:border-emerald-700 font-mono text-sm text-neutral-900 dark:text-neutral-100 break-all"
                >
                  {match}
                </div>
              ))}
            </div>
          </div>
        ) : pattern && text ? (
          <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">No matches found</p>
          </div>
        ) : null}
      </div>
    </ToolLayout>
  );
}