"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import zxcvbn from "zxcvbn";

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);

  const checkStrength = () => {
    const result = zxcvbn(password);
    setScore(result.score);
  };

  const strengthLabels = ["Very weak", "Weak", "Medium", "Strong", "Very strong"];

  return (
    <ToolLayout title="Password Strength Tester" description="Estimate password entropy and strength." icon="🔒">
      <div className="space-y-4">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded p-2" />
        <button onClick={checkStrength} className="w-full bg-black text-white py-2 rounded">Check Strength</button>
        {score > 0 && <div className="border rounded p-2">Strength: {strengthLabels[score]}</div>}
      </div>
    </ToolLayout>
  );
}