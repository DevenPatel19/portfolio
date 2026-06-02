"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function DateDifferencePage() {
  const [date1, setDate1] = useState("2024-01-01");
  const [date2, setDate2] = useState("2025-01-01");
  const [diff, setDiff] = useState("");

  const calculate = () => {
    const d1 = new Date(date1), d2 = new Date(date2);
    const days = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    setDiff(`${Math.abs(days)} days apart`);
  };

  return (
    <ToolLayout title="Date Difference" description="Days between two dates." icon="📅">
      <div className="space-y-4">
        <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full p-2 border rounded" />
        <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full p-2 border rounded" />
        <button onClick={calculate} className="w-full bg-black text-white py-2 rounded">Calculate</button>
        {diff && <div className="p-3 border rounded">{diff}</div>}
      </div>
    </ToolLayout>
  );
}