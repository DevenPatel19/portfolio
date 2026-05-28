"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import ToolLayout from "../../components/ToolLayout";

export default function QrGeneratorPage() {
  const [value, setValue] = useState("");
  const [size, setSize] = useState(256);
  const qrRef = useRef<HTMLDivElement>(null);

  const download = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      icon="▦"
      title="QR Code Generator"
      description="Enter any URL or text to generate a QR code. Download as SVG."
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* Controls */}
        <div className="flex flex-col gap-5 flex-1 max-w-sm">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400 uppercase tracking-wider">URL or text</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="https://yoursite.com"
              className="w-full rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 placeholder-gray-600 px-4 py-3 focus:outline-none focus:border-white/25 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Size</label>
              <span className="text-sm font-mono text-white">{size}px</span>
            </div>
            <input
              type="range"
              min={128}
              max={512}
              step={8}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-white"
            />
          </div>

          {value && (
            <button
              onClick={download}
              className="w-full py-3 rounded-xl bg-white text-gray-950 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Download SVG
            </button>
          )}
        </div>

        {/* QR Preview */}
        <div className="flex items-center justify-center rounded-2xl bg-white p-6">
          {value ? (
            <div ref={qrRef}>
              <QRCodeSVG value={value} size={size} bgColor="#ffffff" fgColor="#0a0a0a" />
            </div>
          ) : (
            <div
              className="rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs"
              style={{ width: size, height: size }}
            >
              Preview
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
