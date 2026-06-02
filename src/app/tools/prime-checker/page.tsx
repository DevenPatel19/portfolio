"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function PrimeCheckerPage() {
  const [num, setNum] = useState(17);
  const [isPrime, setIsPrime] = useState<boolean | null>(null);

  const check = () => {
    if (num < 2) { setIsPrime(false); return; }
    for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) { setIsPrime(false); return; }
    setIsPrime(true);
  };

  return (
    <ToolLayout title="Prime Number Checker" description="Check if a number is prime." icon="🔢">
      <div className="space-y-4">
        <input type="number" value={num} onChange={(e) => setNum(parseInt(e.target.value))} className="w-full p-2 border rounded" />
        <button onClick={check} className="w-full bg-black text-white py-2 rounded">Check</button>
        {isPrime !== null && <div className="p-3 border rounded">{num} is {isPrime ? "prime" : "not prime"}</div>}
      </div>
    </ToolLayout>
  );
}