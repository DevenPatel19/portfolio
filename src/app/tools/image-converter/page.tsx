"use client";

import { useState, useRef } from "react";
import ToolLayout from "../../components/ToolLayout";

type Format = "image/png" | "image/jpeg" | "image/webp";

const FORMAT_LABELS: Record<Format, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WebP",
};

export default function ImageConverterPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [format, setFormat] = useState<Format>("image/png");
  const [quality, setQuality] = useState(92);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const loadFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };

  const convert = () => {
    if (!imgRef.current || !preview) return;

    const canvas = document.createElement("canvas");
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;

    const ctx = canvas.getContext("2d")!;
    if (format === "image/jpeg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(imgRef.current, 0, 0);

    const ext = FORMAT_LABELS[format].toLowerCase();
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName || "image"}.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
      },
      format,
      quality / 100
    );
  };

  return (
    <ToolLayout
      icon="⬡"
      title="Image Converter"
      description="Convert images between PNG, JPG, and WebP entirely in your browser."
    >
      <div className="flex flex-col gap-6 max-w-lg">

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 h-48 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
            dragging
              ? "border-white/40 bg-white/8"
              : preview
              ? "border-white/15 bg-white/5"
              : "border-white/10 bg-white/3 hover:bg-white/5 hover:border-white/20"
          }`}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={preview}
              alt="Preview"
              className="max-h-40 max-w-full rounded-lg object-contain"
            />
          ) : (
            <>
              <span className="text-3xl">🖼</span>
              <p className="text-sm text-gray-400">Drop an image or <span className="text-white underline">browse</span></p>
              <p className="text-xs text-gray-600">PNG, JPG, WebP, GIF, BMP supported</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) loadFile(f); }}
          />
        </div>

        {preview && (
          <>
            {/* Format picker */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-3">Convert to</label>
              <div className="flex gap-2">
                {(Object.keys(FORMAT_LABELS) as Format[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      format === f
                        ? "bg-white text-gray-950 border-white"
                        : "bg-transparent text-gray-400 border-white/10 hover:border-white/25"
                    }`}
                  >
                    {FORMAT_LABELS[f]}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality (only for JPG/WebP) */}
            {format !== "image/png" && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Quality</label>
                  <span className="text-sm font-mono text-white">{quality}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={1}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-white"
                />
              </div>
            )}

            {/* Convert */}
            <button
              onClick={convert}
              className="w-full py-3 rounded-xl bg-white text-gray-950 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Convert & Download
            </button>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
