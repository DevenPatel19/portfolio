"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

const emojis = ["😀", "😂", "😍", "🔥", "👍", "🎉", "❤️", "✅", "🚀", "✨"];

export default function EmojiPickerPage() {
  const [search, setSearch] = useState("");
  const filtered = emojis.filter(e => e.includes(search));

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    alert("Copied!");
  };

  return (
    <ToolLayout title="Emoji Picker" description="Search and copy emojis." icon="😊">
      <div className="space-y-4">
        <input placeholder="Search emoji..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border rounded p-2" />
        <div className="grid grid-cols-5 gap-2">
          {filtered.map(emoji => (
            <button key={emoji} onClick={() => copy(emoji)} className="text-2xl p-2 border rounded hover:bg-gray-100">{emoji}</button>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}