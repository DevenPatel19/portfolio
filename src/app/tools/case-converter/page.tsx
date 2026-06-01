"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function CaseConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const cases = {
    camelCase: (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
    snake_case: (s: string) => s.toLowerCase().replace(/\s+/g, "_"),
    kebabCase: (s: string) => s.toLowerCase().replace(/\s+/g, "-"),
    CONSTANT_CASE: (s: string) => s.toUpperCase().replace(/\s+/g, "_"),
    "PascalCase": (s: string) => {
      const camel = cases.camelCase(s);
      return camel.charAt(0).toUpperCase() + camel.slice(1);
    },
  };

  const convert = (type: keyof typeof cases) => {
    setOutput(cases[type](input));
  };

  return (
    <ToolLayout title="Case Converter" description="Convert text to camelCase, snake_case, kebab-case, etc." icon="🔤">
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full rounded-lg border p-2 font-mono text-sm"
          placeholder="Enter text..."
        />
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(cases).map((caseName) => (
            <button
              key={caseName}
              onClick={() => convert(caseName as keyof typeof cases)}
              className="px-3 py-1 rounded-md text-sm bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            >
              {caseName}
            </button>
          ))}
        </div>
        {output && (
          <div>
            <label className="block text-sm font-medium">Result</label>
            <pre className="rounded-lg border p-2 text-sm break-all">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}