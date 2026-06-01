"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default function LoremIpsumPage() {
  const [paragraphs, setParagraphs] = useState(1);
  const [text, setText] = useState("");

  const generate = () => {
    let result = "";
    for (let i = 0; i < paragraphs; i++) result += lorem + " ";
    setText(result);
  };

  return (
    <ToolLayout title="Lorem Ipsum Generator" description="Generate placeholder text." icon="📄">
      <div className="space-y-4">
        <div><label>Paragraphs</label><input type="number" min={1} max={20} value={paragraphs} onChange={(e) => setParagraphs(parseInt(e.target.value))} className="w-full border rounded p-2" /></div>
        <button onClick={generate} className="w-full bg-black text-white py-2 rounded">Generate</button>
        {text && <div className="border rounded p-2">{text}</div>}
      </div>
    </ToolLayout>
  );
}