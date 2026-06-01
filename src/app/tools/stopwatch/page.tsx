"use client";

import { useState, useRef, useEffect } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function StopwatchPage() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
    } else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const format = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;
  };

  return (
    <ToolLayout title="Stopwatch / Timer" description="Simple countdown timer (seconds)." icon="⏱️">
      <div className="space-y-4">
        <div className="text-4xl text-center">{format(time)}</div>
        <div className="flex gap-2">
          <button onClick={() => setRunning(true)} className="flex-1 bg-green-600 text-white py-2 rounded">Start</button>
          <button onClick={() => setRunning(false)} className="flex-1 bg-yellow-600 text-white py-2 rounded">Pause</button>
          <button onClick={() => { setRunning(false); setTime(0); }} className="flex-1 bg-red-600 text-white py-2 rounded">Reset</button>
        </div>
      </div>
    </ToolLayout>
  );
}