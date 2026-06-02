"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";

function xmlToJson(xml: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  function elementToObj(el: Element): any {
    const obj: any = {};
    if (el.children.length === 0) return el.textContent;
    for (const child of Array.from(el.children)) {
      const tag = child.tagName;
      const val = elementToObj(child);
      if (obj[tag]) {
        if (!Array.isArray(obj[tag])) obj[tag] = [obj[tag]];
        obj[tag].push(val);
      } else obj[tag] = val;
    }
    return obj;
  }
  return JSON.stringify(elementToObj(doc.documentElement), null, 2);
}

export default function XmlToJsonPage() {
  const [xml, setXml] = useState("<root><item>Hello</item></root>");
  const [json, setJson] = useState("");

  const convert = () => {
    try { setJson(xmlToJson(xml)); } catch (err) { setJson("Invalid XML"); }
  };

  return (
    <ToolLayout title="XML to JSON" description="Convert XML to JSON." icon="🗂️">
      <div className="space-y-4">
        <textarea value={xml} onChange={(e) => setXml(e.target.value)} rows={6} className="w-full font-mono text-sm p-2 border rounded" />
        <button onClick={convert} className="w-full bg-black text-white py-2 rounded">Convert</button>
        {json && <pre className="p-3 border rounded bg-gray-50 overflow-auto">{json}</pre>}
      </div>
    </ToolLayout>
  );
}