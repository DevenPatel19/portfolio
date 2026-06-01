"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function TimestampPage() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [output, setOutput] = useState("");

  const fromTimestamp = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) setOutput("Invalid timestamp");
    else setOutput(new Date(ts * 1000).toLocaleString());
  };

  const fromDate = () => {
    const d = new Date(date);
    if (isNaN(d.getTime())) setOutput("Invalid date");
    else setOutput(Math.floor(d.getTime() / 1000).toString());
  };

  return (
    <ToolLayout title="Unix Timestamp Converter" description="Convert between Unix time and human-readable date." icon="🕒">
      <div className="space-y-4">
        <div>
          <label>Unix Timestamp (seconds)</label>
          <input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-full border rounded p-2" />
          <button onClick={fromTimestamp} className="mt-1 w-full bg-black text-white py-1 rounded">To Date</button>
        </div>
        <div>
          <label>Date/Time</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded p-2" />
          <button onClick={fromDate} className="mt-1 w-full bg-black text-white py-1 rounded">To Timestamp</button>
        </div>
        {output && <div className="border rounded p-2">{output}</div>}
      </div>
    </ToolLayout>
  );
}