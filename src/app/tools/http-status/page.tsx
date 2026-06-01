"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

const statusCodes: Record<number, string> = {
  200: "OK", 201: "Created", 400: "Bad Request", 401: "Unauthorized", 403: "Forbidden", 404: "Not Found", 500: "Internal Server Error",
};

export default function HttpStatusPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const lookup = () => {
    const num = parseInt(code);
    if (statusCodes[num]) setResult(`${num}: ${statusCodes[num]}`);
    else setResult("Unknown status code");
  };

  return (
    <ToolLayout title="HTTP Status Code Lookup" description="Search HTTP status codes and meanings." icon="🌐">
      <div className="space-y-4">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code (e.g., 404)" className="w-full border rounded p-2" />
        <button onClick={lookup} className="w-full bg-black text-white py-2 rounded">Lookup</button>
        {result && <div className="border rounded p-2">{result}</div>}
      </div>
    </ToolLayout>
  );
}