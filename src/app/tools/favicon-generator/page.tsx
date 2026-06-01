"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import NextImage from "next/image";

export default function FaviconGeneratorPage() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImgSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateFavicon = () => {
    if (!imgSrc || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, 32, 32);
      const url = canvas.toDataURL("image/png");
      setFaviconUrl(url);
    };
    img.src = imgSrc;
  };

  return (
    <ToolLayout title="Favicon Generator" description="Upload an image and generate a 32x32 favicon." icon="⭐">
      <div className="space-y-4">
        <input type="file" accept="image/*" onChange={handleUpload} />
        {imgSrc && <NextImage src={imgSrc} alt="Preview" width={100} height={100} className="object-contain" unoptimized />}
        <button onClick={generateFavicon} className="w-full bg-black text-white py-2 rounded">Generate Favicon</button>
        {faviconUrl && (
          <div>
            <p>Download:</p>
            <a href={faviconUrl} download="favicon.png" className="text-blue-500 underline">favicon.png</a>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </ToolLayout>
  );
}