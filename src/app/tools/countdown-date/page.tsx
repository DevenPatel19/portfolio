"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function CountdownDatePage() {
  const [target, setTarget] = useState("2025-12-31");
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const targetDate = new Date(target).getTime();
      const diff = targetDate - now;
      if (diff <= 0) { setRemaining("Expired"); return; }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (86400000)) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <ToolLayout title="Countdown to Date" description="Live countdown to a future date." icon="⏳">
      <div className="space-y-4">
        <input type="date" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full p-2 border rounded" />
        <div className="text-center text-2xl font-mono">{remaining || "Set a date"}</div>
      </div>
    </ToolLayout>
  );
}