"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import ReactMarkdown from "react-markdown";

const defaultMarkdown = `# Hello, world!

This is a **Markdown previewer**.

## Features

- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://example.com)
- \`Inline code\`

\`\`\`javascript
// Code blocks
console.log("Hello");
\`\`\`

- Lists
- And more...
`;

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  return (
    <ToolLayout title="Markdown Previewer" description="Write Markdown and see the rendered HTML live." icon="📝">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={12}
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Preview</label>
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}