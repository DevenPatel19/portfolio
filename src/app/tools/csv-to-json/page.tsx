// src\app\tools\csv-to-json-converter\page.tsx
"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";

export default function CSVToJSONPage() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [separator, setSeparator] = useState(",");

  const convert = () => {
    if (!csv.trim()) {
      setJson("");
      return;
    }

    const lines = csv.trim().split("\n");
    const headers = lines[0].split(separator).map((h) => h.trim());
    const rows = lines.slice(1);

    const result = rows.map((row) => {
      const values = row.split(separator);
      const obj: Record<string, string> = {};
      headers.forEach((header, idx) => {
        obj[header] = values[idx]?.trim() ?? "";
      });
      return obj;
    });

    setJson(JSON.stringify(result, null, 2));
  };

  return (
    <ToolLayout
      icon="📊"
      title="CSV to JSON"
      description="Convert CSV data to JSON format."
    >
      <div className="flex flex-col gap-4 max-w-3xl">
        <div>
          <label className="block text-sm font-medium mb-1">Separator</label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CSV Input</label>
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            rows={8}
            className="w-full rounded-lg border p-2 font-mono text-sm"
            placeholder="name,age,city
John,25,NYC
Jane,30,LA"
          />
        </div>
        <button
          onClick={convert}
          className="rounded-lg bg-black dark:bg-white text-white dark:text-black py-2"
        >
          Convert to JSON
        </button>
        {json && (
          <div>
            <label className="block text-sm font-medium mb-1">JSON Output</label>
            <pre className="rounded-lg border bg-neutral-50 dark:bg-neutral-900 p-3 font-mono text-sm overflow-auto">
              {json}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}