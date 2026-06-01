"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import ReactMarkdown from "react-markdown";
import { marked } from "marked";  // static import after npm install

export default function MarkdownToHtmlPage() {
  const [markdown, setMarkdown] = useState("# Hello\nThis is **markdown**.");
  const [html, setHtml] = useState("");

  const convert = async () => {
    const rawHtml = await marked.parse(markdown);  // await the promise
    setHtml(rawHtml);
  };

  return (
    <ToolLayout title="Markdown to HTML" description="Convert Markdown to HTML source." icon="📝">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={6}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-2 font-mono text-sm"
          />
        </div>
        <button
          onClick={convert}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-2 text-sm font-medium"
        >
          Convert to HTML
        </button>
        {html && (
          <div>
            <label className="block text-sm font-medium mb-1">HTML Output</label>
            <pre className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-3 text-sm overflow-auto max-h-80">
              {html}
            </pre>
            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">Preview</label>
              <div className="rounded-lg border p-3 prose dark:prose-invert max-w-none">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}