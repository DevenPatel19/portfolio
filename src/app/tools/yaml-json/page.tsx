"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import yaml from "js-yaml";

export default function YamlJsonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"yaml2json" | "json2yaml">("yaml2json");

  const convert = () => {
    try {
      if (mode === "yaml2json") {
        const obj = yaml.load(input);
        setOutput(JSON.stringify(obj, null, 2));
      } else {
        const obj = JSON.parse(input);
        setOutput(yaml.dump(obj));
      }
    } catch (err) {
      setOutput("Error: " + (err as Error).message);
    }
  };

  return (
    <ToolLayout title="YAML ↔ JSON Converter" description="Convert between YAML and JSON." icon="⚙️">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setMode("yaml2json")} className={`px-3 py-1 rounded ${mode === "yaml2json" ? "bg-black text-white" : "bg-gray-200"}`}>YAML → JSON</button>
          <button onClick={() => setMode("json2yaml")} className={`px-3 py-1 rounded ${mode === "json2yaml" ? "bg-black text-white" : "bg-gray-200"}`}>JSON → YAML</button>
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="w-full border rounded p-2 font-mono text-sm" placeholder={mode === "yaml2json" ? "Enter YAML..." : "Enter JSON..."} />
        <button onClick={convert} className="w-full bg-black text-white py-2 rounded">Convert</button>
        {output && <pre className="border rounded p-2 text-sm overflow-auto">{output}</pre>}
      </div>
    </ToolLayout>
  );
}
