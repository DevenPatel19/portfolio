"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function RandomItemPickerPage() {
  const [items, setItems] = useState("apple, banana, cherry");
  const [picked, setPicked] = useState("");

  const pick = () => {
    const arr = items.split(/[,\n]/).map(s => s.trim()).filter(s => s);
    if (arr.length) setPicked(arr[Math.floor(Math.random() * arr.length)]);
  };

  return (
    <ToolLayout title="Random Item Picker" description="Pick a random item from a list." icon="🎲">
      <div className="space-y-4">
        <textarea value={items} onChange={(e) => setItems(e.target.value)} rows={4} className="w-full p-2 border rounded" placeholder="Comma-separated list" />
        <button onClick={pick} className="w-full bg-black text-white py-2 rounded">Pick Random</button>
        {picked && <div className="text-center text-2xl font-bold">{picked}</div>}
      </div>
    </ToolLayout>
  );
}