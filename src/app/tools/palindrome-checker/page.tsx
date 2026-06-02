"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function PalindromeCheckerPage() {
  const [input, setInput] = useState("");
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null);

  const check = () => {
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversed = cleaned.split("").reverse().join("");
    setIsPalindrome(cleaned === reversed);
  };

  return (
    <ToolLayout title="Palindrome Checker" description="Check if a string reads the same backward." icon="🔄">
      <div className="space-y-4">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="w-full p-2 border rounded" />
        <button onClick={check} className="w-full bg-black text-white py-2 rounded">Check</button>
        {isPalindrome !== null && <div className="p-3 border rounded">{input ? (isPalindrome ? "Palindrome!" : "Not a palindrome") : "Enter some text"}</div>}
      </div>
    </ToolLayout>
  );
}