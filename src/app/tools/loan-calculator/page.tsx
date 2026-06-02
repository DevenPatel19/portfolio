"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState(200000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(30);
  const [payment, setPayment] = useState<number | null>(null);

  const calculate = () => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    setPayment(monthlyPayment);
  };

  return (
    <ToolLayout title="Loan Calculator" description="Calculate monthly mortgage payments." icon="🏦">
      <div className="space-y-4">
        <div><label>Loan Amount ($)</label><input type="number" value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value))} className="w-full p-2 border rounded" /></div>
        <div><label>Annual Interest Rate (%)</label><input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full p-2 border rounded" /></div>
        <div><label>Years</label><input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="w-full p-2 border rounded" /></div>
        <button onClick={calculate} className="w-full bg-black text-white py-2 rounded">Calculate</button>
        {payment !== null && <div className="p-3 border rounded">Monthly payment: ${payment.toFixed(2)}</div>}
      </div>
    </ToolLayout>
  );
}