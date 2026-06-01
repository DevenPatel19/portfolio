"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<{ header: any; payload: any } | null>(null);
  const [error, setError] = useState("");

  const decodeJWT = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT format");
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      setDecoded({ header, payload });
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setDecoded(null);
    }
  };

  return (
    <ToolLayout title="JWT Decoder" description="Decode JSON Web Tokens (header and payload)." icon="🔑">
      <div className="space-y-4">
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          className="w-full rounded-lg border p-2 font-mono text-sm"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        />
        <button
          onClick={decodeJWT}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black py-2 text-sm font-medium"
        >
          Decode
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {decoded && (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium">Header</label>
              <pre className="rounded-lg border p-2 text-sm overflow-auto">{JSON.stringify(decoded.header, null, 2)}</pre>
            </div>
            <div>
              <label className="block text-sm font-medium">Payload</label>
              <pre className="rounded-lg border p-2 text-sm overflow-auto">{JSON.stringify(decoded.payload, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}