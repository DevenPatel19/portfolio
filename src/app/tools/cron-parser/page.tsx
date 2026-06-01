"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function CronParserPage() {
  const [cron, setCron] = useState("*/5 * * * *");
  const [description, setDescription] = useState("");

  const parseCron = () => {
    const parts = cron.split(" ");
    if (parts.length !== 5) {
      setDescription("Invalid cron (need 5 parts)");
      return;
    }
    const [minute, hour, day, month, weekday] = parts;
    let desc = `At every ${minute} minute(s) of every ${hour} hour(s) on every day of month ${day}, every month ${month}, and every weekday ${weekday}.`;
    setDescription(desc);
  };

  return (
    <ToolLayout title="Cron Expression Parser" description="Describe cron schedule in plain English." icon="⏰">
      <div className="space-y-4">
        <input value={cron} onChange={(e) => setCron(e.target.value)} className="w-full border rounded p-2 font-mono" placeholder="* * * * *" />
        <button onClick={parseCron} className="w-full bg-black text-white py-2 rounded">Explain</button>
        {description && <div className="border rounded p-2">{description}</div>}
      </div>
    </ToolLayout>
  );
}