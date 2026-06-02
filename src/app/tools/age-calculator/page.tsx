"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function AgeCalculatorPage() {
  const [birthdate, setBirthdate] = useState("2000-01-01");
  const [age, setAge] = useState("");

  const calculate = () => {
    const today = new Date();
    const birth = new Date(birthdate);
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    setAge(`${years} years, ${months} months, ${days} days`);
  };

  return (
    <ToolLayout title="Age Calculator" description="Exact age from birthdate." icon="🎂">
      <div className="space-y-4">
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full p-2 border rounded" />
        <button onClick={calculate} className="w-full bg-black text-white py-2 rounded">Calculate Age</button>
        {age && <div className="p-3 border rounded">{age}</div>}
      </div>
    </ToolLayout>
  );
}