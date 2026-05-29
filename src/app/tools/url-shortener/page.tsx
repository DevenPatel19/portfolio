"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/app/components/ToolLayout";

interface ShortenedLink {
  code: string;
  url: string;
  createdAt: number;
}

export default function UrlShortenerPage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortLinks, setShortLinks] = useState<ShortenedLink[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("shortenedLinks");
    if (stored) {
      setShortLinks(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem("shortenedLinks", JSON.stringify(shortLinks));
  }, [shortLinks]);

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const shortenUrl = () => {
    if (!longUrl.trim()) {
      alert("Please enter a URL.");
      return;
    }
    // Basic URL validation
    let urlToStore = longUrl;
    if (!urlToStore.startsWith("http://") && !urlToStore.startsWith("https://")) {
      urlToStore = "https://" + urlToStore;
    }
    const existing = shortLinks.find((link) => link.url === urlToStore);
    if (existing) {
      alert(`Already shortened: /s/${existing.code}`);
      return;
    }
    const code = generateShortCode();
    const newLink: ShortenedLink = {
      code,
      url: urlToStore,
      createdAt: Date.now(),
    };
    setShortLinks([newLink, ...shortLinks]);
    setLongUrl("");
  };

  const getFullShortUrl = (code: string) => {
    return `${window.location.origin}/s/${code}`;
  };

  const copyToClipboard = (code: string) => {
    const fullUrl = getFullShortUrl(code);
    navigator.clipboard.writeText(fullUrl);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteLink = (code: string) => {
    setShortLinks(shortLinks.filter((link) => link.code !== code));
  };

  return (
    <ToolLayout title="URL Shortener" description="Create short URLs stored in your browser (localStorage)." icon="🔗">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Long URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="https://example.com/very/long/url"
              className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
            />
            <button
              onClick={shortenUrl}
              className="rounded-lg bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition"
            >
              Shorten
            </button>
          </div>
        </div>

        {shortLinks.length === 0 ? (
          <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm py-8">
            No shortened URLs yet. Create your first one above.
          </p>
        ) : (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Your Shortened Links</label>
            <div className="space-y-2">
              {shortLinks.map((link) => (
                <div
                  key={link.code}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium text-neutral-900 dark:text-white">
                      /s/{link.code}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {link.url}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(link.code)}
                      className="text-xs px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
                    >
                      {copied === link.code ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={() => deleteLink(link.code)}
                      className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
          These links are stored only in your browser’s local storage. They are not publicly accessible.
        </p>
      </div>
    </ToolLayout>
  );
}