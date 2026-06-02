"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import NextImage from "next/image";

export default function PaletteFromImagePage() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImgSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const extractColors = () => {
    if (!imgSrc || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const colorMap = new Map<string, number>();
      for (let i = 0; i < data.length; i += 20) { // sample step
        const r = data[i], g = data[i+1], b = data[i+2];
        const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
      const sorted = Array.from(colorMap.entries()).sort((a,b) => b[1] - a[1]).slice(0,5).map(([c]) => c);
      setColors(sorted);
    };
    img.src = imgSrc;
  };

  return (
    <ToolLayout title="Palette from Image" description="Extract dominant colors from an image." icon="🖼️">
      <div className="space-y-4">
        <input type="file" accept="image/*" onChange={handleUpload} />
        {imgSrc && <NextImage src={imgSrc} alt="Uploaded" width={200} height={150} className="object-contain" unoptimized />}
        <button onClick={extractColors} disabled={!imgSrc} className="w-full bg-black text-white py-2 rounded">Extract Palette</button>
        <div className="flex gap-2">
          {colors.map(c => <div key={c} className="h-12 w-12 rounded" style={{ backgroundColor: c }} title={c} />)}
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </ToolLayout>
  );
}