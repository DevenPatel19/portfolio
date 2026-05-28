"use client";

import { useState, useCallback } from "react";
import ToolLayout from "../../components/ToolLayout";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let charset = "";
    if (useUpper) charset += UPPERCASE;
    if (useLower) charset += LOWERCASE;
    if (useNumbers) charset += NUMBERS;
    if (useSymbols) charset += SYMBOLS;
    if (!charset) return;

    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
    setCopied(false);
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const strength = () => {
    const score = [useUpper, useLower, useNumbers, useSymbols].filter(Boolean).length;
    if (length < 8 || score <= 1) return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (length < 12 || score === 2) return { label: "Fair", color: "bg-amber-500", width: "50%" };
    if (length < 16 || score === 3) return { label: "Strong", color: "bg-emerald-500", width: "75%" };
    return { label: "Very strong", color: "bg-emerald-400", width: "100%" };
  };

  const s = strength();

  const Toggle = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
        checked
          ? "bg-white/8 border-white/20 text-white"
          : "bg-transparent border-white/8 text-gray-500 hover:border-white/15"
      }`}
    >
      {label}
      <span
        className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${
          checked ? "bg-white" : "bg-white/15"
        }`}
      >
        <span
          className={`w-4 h-4 rounded-full transition-transform ${
            checked ? "bg-gray-950 translate-x-4" : "bg-white/50"
          }`}
        />
      </span>
    </button>
  );

  return (
    <ToolLayout
      icon="🔑"
      title="Password Generator"
      description="Generate a cryptographically random password using the Web Crypto API."
    >
      <div className="max-w-md flex flex-col gap-6">

        {/* Length slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs text-gray-400 uppercase tracking-wider">Length</label>
            <span className="text-sm font-mono text-white">{length}</span>
          </div>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-1">Include</label>
          <Toggle label="Uppercase (A–Z)" checked={useUpper} onChange={setUseUpper} />
          <Toggle label="Lowercase (a–z)" checked={useLower} onChange={setUseLower} />
          <Toggle label="Numbers (0–9)" checked={useNumbers} onChange={setUseNumbers} />
          <Toggle label="Symbols (!@#…)" checked={useSymbols} onChange={setUseSymbols} />
        </div>

        {/* Generate */}
        <button
          onClick={generate}
          className="w-full py-3 rounded-xl bg-white text-gray-950 font-medium text-sm hover:bg-gray-100 transition-colors"
        >
          Generate password
        </button>

        {/* Result */}
        {password && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <span className="font-mono text-sm text-gray-200 break-all">{password}</span>
              <button
                onClick={copy}
                className="text-xs text-gray-400 hover:text-white transition-colors shrink-0"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            {/* Strength bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>Strength</span>
                <span className="text-gray-300">{s.label}</span>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${s.color}`}
                  style={{ width: s.width }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
