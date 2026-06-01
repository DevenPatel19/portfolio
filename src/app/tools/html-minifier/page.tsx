"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function HtmlMinifierPage() {
  const [input, setInput] = useState("<div>  <p>Hello</p>  </div>");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "format">("minify");

  const process = () => {
    if (mode === "minify") {
      // Remove extra whitespace, newlines, and spaces between tags
      let minified = input
        .replace(/\s+/g, " ")
        .replace(/>\s+</g, "><")
        .trim();
      setOutput(minified);
    } else {
      // Simple pretty print (indent 2 spaces) – not perfect but works for demo
      let formatted = "";
      let indent = 0;
      const lines = input.split(/>\s*</g);
      for (let line of lines) {
        line = line.trim();
        if (line.startsWith("</")) indent--;
        formatted += "  ".repeat(indent) + "<" + line + ">\n";
        if (line.startsWith("<") && !line.startsWith("</") && !line.endsWith("/>")) indent++;
      }
      setOutput(formatted);
    }
  };

  return (
    <ToolLayout title="HTML Minifier / Formatter" description="Minify or prettify HTML code." icon="⚙️">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("minify")}
            className={`px-3 py-1 rounded-md text-sm ${mode === "minify" ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : "bg-neutral-200 dark:bg-neutral-800"}`}
          >
            Minify
          </button>
          <button
            onClick={() => setMode("format")}
            className={`px-3 py-1 rounded-md text-sm ${mode === "format" ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : "bg-neutral-200 dark:bg-neutral-800"}`}
          >
            Format
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="w-full rounded-lg border p-2 font-mono text-sm"
          placeholder="Enter HTML..."
        />
        <button
          onClick={process}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black py-2 text-sm font-medium"
        >
          Process
        </button>
        {output && (
          <div>
            <label className="block text-sm font-medium mb-1">Output</label>
            <pre className="rounded-lg border p-3 text-sm overflow-auto max-h-80">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}