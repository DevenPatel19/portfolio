"use client";

import { useState } from "react";
import ToolLayout from "../../components/ToolLayout";

type Mode = "encode" | "decode";

export default function Base64Page() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

const encode = () => {
  try {
    const encoded = btoa(unescape(encodeURIComponent(input)));
    setOutput(encoded);
  } catch {
    setOutput("Error encoding");
  }
};

const decode = () => {
  try {
    const decoded = decodeURIComponent(escape(atob(input)));
    setOutput(decoded);
  } catch {
    setOutput("Error decoding - invalid Base64");
  }
};

  const execute = () => {
    if (mode === "encode") encode();
    else decode();
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
  };

  return (
    <ToolLayout
      icon="🔐"
      title="Base64 Encoder/Decoder"
      description="Encode text to Base64 or decode Base64 strings instantly."
    >
      <div className="flex flex-col gap-6 max-w-lg">
        {/* Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode("encode")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
              mode === "encode"
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${
              mode === "decode"
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
            }`}
          >
            Decode
          </button>
        </div>

        {/* Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
              {mode === "encode" ? "Text to encode" : "Base64 to decode"}
            </label>
            <button
              onClick={clear}
              className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="w-full h-40 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 p-4 resize-none focus:outline-none focus:border-neutral-300 dark:focus:border-neutral-700 font-mono"
          />
        </div>

        {/* Execute */}
        <button
          onClick={execute}
          className="w-full py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          {mode === "encode" ? "Encode" : "Decode"}
        </button>

        {/* Output */}
        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Result</label>
              <button
                onClick={copy}
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <p className="font-mono text-sm text-neutral-900 dark:text-neutral-100 break-all whitespace-pre-wrap">
                {output}
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}