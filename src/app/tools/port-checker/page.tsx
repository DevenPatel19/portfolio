"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function PortCheckerPage() {
  const [port, setPort] = useState("");
  const [status, setStatus] = useState("");

  const checkPort = () => {
    const p = parseInt(port);
    if (isNaN(p) || p < 1 || p > 65535) {
      setStatus("Invalid port number");
      return;
    }
    // Client-side can only attempt to fetch from localhost; it's limited.
    fetch(`http://localhost:${p}`, { mode: "no-cors" }).catch(() => {});
    setStatus(`Port ${p} check attempted (browser restrictions apply). Actual reachability depends on CORS.`);
  };

  return (
    <ToolLayout title="Port Checker (local)" description="Check if a local port is reachable (limited browser capabilities)." icon="🔌">
      <div className="space-y-4">
        <input value={port} onChange={(e) => setPort(e.target.value)} placeholder="Port number" className="w-full border rounded p-2" />
        <button onClick={checkPort} className="w-full bg-black text-white py-2 rounded">Check</button>
        {status && <div className="border rounded p-2 text-sm">{status}</div>}
      </div>
    </ToolLayout>
  );
}