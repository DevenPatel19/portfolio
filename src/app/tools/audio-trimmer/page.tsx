"use client";

import { useState, useRef } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function AudioTrimmerPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAudioFile(e.target.files[0]);
  };

  const trim = async () => {
    if (!audioFile) return;
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const sampleRate = audioBuffer.sampleRate;
    const startSample = start * sampleRate;
    const endSample = end * sampleRate;
    const length = endSample - startSample;
    const newBuffer = audioContext.createBuffer(1, length, sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    const newData = newBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) newData[i] = channelData[startSample + i];
    // Convert to WAV and download
    const wav = audioBufferToWav(newBuffer);
    const blob = new Blob([wav], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trimmed.wav";
    a.click();
    URL.revokeObjectURL(url);
  };

  const audioBufferToWav = (buffer: AudioBuffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    let samples = buffer.getChannelData(0);
    const dataLength = samples.length * (bitDepth / 8);
    const bufferLength = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);
    // Write WAV header...
    writeString(view, 0, "RIFF");
    view.setUint32(4, bufferLength - 8, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
    view.setUint16(32, numChannels * (bitDepth / 8), true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, "data");
    view.setUint32(40, dataLength, true);
    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
      view.setInt16(offset, samples[i] * 0x7FFF, true);
      offset += 2;
    }
    return arrayBuffer;
  };

  const writeString = (view: DataView, offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  return (
    <ToolLayout title="Audio Trimmer" description="Trim an audio file (WAV/MP3 support via Web Audio)." icon="🎵">
      <div className="space-y-4">
        <input type="file" accept="audio/*" onChange={handleUpload} />
        {audioFile && <audio ref={audioRef} controls src={URL.createObjectURL(audioFile)} />}
        <div><label>Start (seconds)</label><input type="number" value={start} onChange={(e) => setStart(parseFloat(e.target.value))} className="w-full border rounded p-2" /></div>
        <div><label>End (seconds)</label><input type="number" value={end} onChange={(e) => setEnd(parseFloat(e.target.value))} className="w-full border rounded p-2" /></div>
        <button onClick={trim} className="w-full bg-black text-white py-2 rounded">Trim and Download</button>
      </div>
    </ToolLayout>
  );
}