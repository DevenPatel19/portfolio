"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function AudioWaveformPage() {
  const [url, setUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
      const audioContext = new AudioContext();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const data = audioBuffer.getChannelData(0);
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = 800; canvas.height = 200;
      ctx.fillStyle = "#ddd"; ctx.fillRect(0,0,800,200);
      const step = Math.floor(data.length / 800);
      for (let i = 0; i < 800; i++) {
        const sample = data[i * step];
        const height = Math.abs(sample) * 200;
        ctx.fillStyle = "black";
        ctx.fillRect(i, 100 - height/2, 1, height);
      }
    }
  };

  return (
    <ToolLayout title="Audio Waveform" description="Visualize audio file waveform." icon="🎵">
      <div className="space-y-4">
        <input type="file" accept="audio/*" onChange={handleFile} />
        <canvas ref={canvasRef} width={800} height={200} className="w-full border rounded" />
        {url && <audio controls src={url} className="w-full" />}
      </div>
    </ToolLayout>
  );
}