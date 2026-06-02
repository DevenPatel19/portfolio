"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/app/components/ToolLayout";

const timezones = [
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Europe/London", "Europe/Paris", "Asia/Tokyo", "Australia/Sydney"
];

export default function WorldClockPage() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const update = () => {
      const newTimes: Record<string, string> = {};
      for (const tz of timezones) {
        newTimes[tz] = new Date().toLocaleTimeString("en-US", { timeZone: tz });
      }
      setTimes(newTimes);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ToolLayout title="World Clock" description="Current time in major cities." icon="🌍">
      <div className="space-y-2">
        {timezones.map(tz => (
          <div key={tz} className="flex justify-between p-2 border-b">
            <span>{tz.split("/")[1]}</span>
            <span className="font-mono">{times[tz] || "--:--:--"}</span>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}