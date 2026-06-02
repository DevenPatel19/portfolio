"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function FileToBase64Page() {
  const [base64, setBase64] = useState("");
  const [filename, setFilename] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => setBase64(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const download = () => {
    const link = document.createElement("a");
    link.href = base64;
    link.download = filename || "file";
    link.click();
  };

  return (
    <ToolLayout title="File to Base64" description="Convert any file to Base64 data URL." icon="📁">
      <div className="space-y-4">
        <input type="file" onChange={handleFile} />
        {base64 && <div className="flex gap-2"><button onClick={download} className="bg-black text-white px-4 py-1 rounded">Download</button><span className="text-xs break-all">{base64.slice(0,80)}…</span></div>}
      </div>
    </ToolLayout>
  );
}