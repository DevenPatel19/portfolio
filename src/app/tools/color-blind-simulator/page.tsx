"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import NextImage from "next/image";

// Simplified simulation matrices (protanopia)
const simulate = (r: number, g: number, b: number) => {
  // Protanopia matrix
  const rr = 0.567, rg = 0.433, rb = 0;
  const gr = 0.558, gg = 0.442, gb = 0;
  const br = 0, bg = 0.242, bb = 0.758;
  return {
    r: Math.min(255, Math.max(0, r * rr + g * rg + b * rb)),
    g: Math.min(255, Math.max(0, r * gr + g * gg + b * gb)),
    b: Math.min(255, Math.max(0, r * br + g * bg + b * bb))
  };
};

export default function ColorBlindSimulatorPage() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [simulatedSrc, setSimulatedSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImgSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const simulateImage = () => {
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
      for (let i = 0; i < data.length; i += 4) {
        const { r, g, b } = simulate(data[i], data[i+1], data[i+2]);
        data[i] = r; data[i+1] = g; data[i+2] = b;
      }
      ctx.putImageData(imageData, 0, 0);
      setSimulatedSrc(canvas.toDataURL());
    };
    img.src = imgSrc;
  };

  return (
    <ToolLayout title="Color Blind Simulator" description="Simulate protanopia on an image." icon="👓">
      <div className="space-y-4">
        <input type="file" accept="image/*" onChange={handleUpload} />
        <button onClick={simulateImage} disabled={!imgSrc} className="w-full bg-black text-white py-2 rounded">Simulate</button>
        <div className="flex gap-4">
          {imgSrc && <NextImage src={imgSrc} alt="Original" width={200} height={150} unoptimized />}
          {simulatedSrc && <NextImage src={simulatedSrc} alt="Simulated" width={200} height={150} unoptimized />}
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </ToolLayout>
  );
}