"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const tools = [
  // ----- Existing Tools -----
  { href: "/tools/json-formatter", icon: "{ }", name: "JSON Formatter", description: "Format and validate JSON instantly.", tag: "Code" },
  { href: "/tools/password-generator", icon: "🔑", name: "Password Generator", description: "Generate strong, random passwords.", tag: "Security" },
  { href: "/tools/qr-generator", icon: "▦", name: "QR Code Generator", description: "Create QR codes from any URL or text.", tag: "Utility" },
  { href: "/tools/image-converter", icon: "⬡", name: "Image Converter", description: "Convert PNG, JPG, WebP in your browser.", tag: "Files" },
  { href: "/tools/unit-converter", icon: "📏", name: "Unit Converter", description: "Length, weight, temperature conversions.", tag: "Utility" },
  { href: "/tools/base64-encoder", icon: "🔐", name: "Base64 Encoder/Decoder", description: "Encode to or decode from Base64.", tag: "Code" },
  { href: "/tools/regex-tester", icon: "⚙️", name: "Regex Tester", description: "Test regular expressions with live results.", tag: "Code" },
  { href: "/tools/csv-to-json-converter", icon: "📊", name: "CSV to JSON", description: "Convert CSV/TSV to formatted JSON.", tag: "Files" },
  { href: "/tools/color-palette", icon: "🎨", name: "Color Palette", description: "Generate harmonious 5‑color palettes.", tag: "Design" },
  { href: "/tools/pdf-converter", icon: "📄", name: "PDF Converter", description: "Convert text, images, or documents to PDF.", tag: "Files" },
  { href: "/tools/pdf-tools", icon: "🔧", name: "PDF Tools", description: "Merge, split, or compress PDFs.", tag: "Files" },
  { href: "/tools/markdown-preview", icon: "📝", name: "Markdown Previewer", description: "Live Markdown editor with preview.", tag: "Code" },
  { href: "/tools/url-shortener", icon: "🔗", name: "URL Shortener", description: "Create short URLs (stored locally).", tag: "Utility" },
  // ----- Text & Code Tools -----
  { href: "/tools/text-diff", icon: "🔍", name: "Text Diff Checker", description: "Compare two text blocks side by side.", tag: "Code" },
  { href: "/tools/markdown-to-html", icon: "📝", name: "Markdown to HTML", description: "Convert Markdown to HTML source.", tag: "Code" },
  { href: "/tools/html-minifier", icon: "⚙️", name: "HTML Minifier/Formatter", description: "Minify or prettify HTML/JS/CSS.", tag: "Code" },
  { href: "/tools/jwt-decoder", icon: "🔑", name: "JWT Decoder", description: "Decode JSON Web Tokens (header/payload).", tag: "Code" },
  { href: "/tools/uuid-generator", icon: "🆔", name: "UUID Generator", description: "Generate v4 UUIDs in bulk.", tag: "Utility" },
  { href: "/tools/hash-generator", icon: "🔒", name: "Hash Generator", description: "MD5, SHA-1, SHA-256 hashes.", tag: "Code" },
  { href: "/tools/case-converter", icon: "🔤", name: "Case Converter", description: "camelCase, snake_case, kebab-case, etc.", tag: "Code" },
  { href: "/tools/string-escape", icon: "🔓", name: "String Escape/Unescape", description: "Escape/unescape JSON, URL, HTML.", tag: "Code" },
  // ----- Design & UX -----
  { href: "/tools/gradient-generator", icon: "🎨", name: "CSS Gradient Generator", description: "Linear/radial gradient builder.", tag: "Design" },
  { href: "/tools/box-shadow", icon: "⬚", name: "Box Shadow Generator", description: "Live preview with sliders.", tag: "Design" },
  { href: "/tools/border-radius", icon: "⬚", name: "Border Radius Generator", description: "Visual corner radius creator.", tag: "Design" },
  { href: "/tools/favicon-generator", icon: "⭐", name: "Favicon Generator", description: "Generate favicon from uploaded image.", tag: "Design" },
  // ----- Developer Tools -----
  { href: "/tools/yaml-json", icon: "⚙️", name: "YAML ↔ JSON", description: "Bidirectional conversion.", tag: "Code" },
  { href: "/tools/cron-parser", icon: "⏰", name: "Cron Expression Parser", description: "Describe cron schedule in plain English.", tag: "Dev" },
  { href: "/tools/timestamp-converter", icon: "🕒", name: "Unix Timestamp Converter", description: "Convert between Unix time and human date.", tag: "Dev" },
  { href: "/tools/http-status", icon: "🌐", name: "HTTP Status Code Lookup", description: "Searchable table with codes and meanings.", tag: "Dev" },
  { href: "/tools/port-checker", icon: "🔌", name: "Port Checker (local)", description: "Check if a local port is reachable.", tag: "Dev" },
  // ----- Media & Files -----
  { href: "/tools/audio-trimmer", icon: "🎵", name: "Audio Trimmer", description: "Trim audio files using Web Audio API.", tag: "Files" },
  { href: "/tools/svg-optimizer", icon: "📐", name: "SVG Optimizer", description: "Clean and minify SVG code.", tag: "Files" },
  { href: "/tools/favicon-previewer", icon: "⭐", name: "Favicon Previewer", description: "See how an image looks as favicon.", tag: "Design" },
  // ----- Fun / Misc -----
  { href: "/tools/lorem-ipsum", icon: "📄", name: "Lorem Ipsum Generator", description: "Generate placeholder text.", tag: "Utility" },
  { href: "/tools/dice-roller", icon: "🎲", name: "Dice Roller", description: "Configurable dice and modifiers.", tag: "Fun" },
  { href: "/tools/password-strength", icon: "🔒", name: "Password Strength Tester", description: "Estimate entropy and show feedback.", tag: "Security" },
  { href: "/tools/emoji-picker", icon: "😊", name: "Emoji Picker", description: "Search and copy emojis.", tag: "Fun" },
  { href: "/tools/stopwatch", icon: "⏱️", name: "Stopwatch / Timer", description: "Simple countdown timer.", tag: "Utility" },
  // Math & Geometry
  { href: "/tools/quadratic-solver", icon: "📐", name: "Quadratic Solver", description: "Solve ax²+bx+c=0", tag: "Math" },
  { href: "/tools/prime-checker", icon: "🔢", name: "Prime Checker", description: "Check if a number is prime", tag: "Math" },
  { href: "/tools/fraction-simplifier", icon: "➗", name: "Fraction Simplifier", description: "Reduce fractions", tag: "Math" },
  { href: "/tools/percentage-calculator", icon: "%", name: "Percentage Calculator", description: "Various percentage calculations", tag: "Math" },
  { href: "/tools/loan-calculator", icon: "🏦", name: "Loan Calculator", description: "Monthly mortgage payments", tag: "Math" },
  { href: "/tools/fibonacci", icon: "🌀", name: "Fibonacci Generator", description: "First N Fibonacci numbers", tag: "Math" },
  // Date & Time
  { href: "/tools/date-difference", icon: "📅", name: "Date Difference", description: "Days between dates", tag: "Date" },
  { href: "/tools/age-calculator", icon: "🎂", name: "Age Calculator", description: "Exact age from birthdate", tag: "Date" },
  { href: "/tools/countdown-date", icon: "⏳", name: "Countdown to Date", description: "Live countdown timer", tag: "Date" },
  { href: "/tools/world-clock", icon: "🌍", name: "World Clock", description: "Multiple time zones", tag: "Date" },
  // Advanced Color
  { href: "/tools/contrast-checker", icon: "👁️", name: "WCAG Contrast Checker", description: "Accessible color contrast", tag: "Design" },
  { href: "/tools/color-mixer", icon: "🎨", name: "Color Mixer", description: "Blend two colors", tag: "Design" },
  { href: "/tools/palette-from-image", icon: "🖼️", name: "Palette from Image", description: "Extract dominant colors", tag: "Design" },
  { href: "/tools/color-blind-simulator", icon: "👓", name: "Color Blind Simulator", description: "Protanopia simulation", tag: "Design" },
  // Advanced Text
  { href: "/tools/frequency-counter", icon: "📊", name: "Word Frequency Counter", description: "Count word occurrences", tag: "Code" },
  { href: "/tools/palindrome-checker", icon: "🔄", name: "Palindrome Checker", description: "Check palindromic strings", tag: "Code" },
  { href: "/tools/text-reverser", icon: "🔃", name: "Text Reverser/Sorter", description: "Reverse or sort lines", tag: "Code" },
  { href: "/tools/remove-duplicate-lines", icon: "🗑️", name: "Remove Duplicate Lines", description: "Deduplicate text", tag: "Code" },
  // Data & File
  { href: "/tools/xml-to-json", icon: "🗂️", name: "XML to JSON", description: "Convert XML to JSON", tag: "Code" },
  { href: "/tools/file-to-base64", icon: "📁", name: "File to Base64", description: "Encode file to data URL", tag: "Files" },
  { href: "/tools/exif-reader", icon: "📷", name: "EXIF Reader", description: "Image metadata", tag: "Files" },
  { href: "/tools/audio-waveform", icon: "🎵", name: "Audio Waveform", description: "Visualize audio", tag: "Files" },
  // Random & Fun
  { href: "/tools/random-item-picker", icon: "🎲", name: "Random Item Picker", description: "Pick from a list", tag: "Fun" },
  { href: "/tools/coin-flip", icon: "🪙", name: "Coin Flip", description: "Virtual coin toss", tag: "Fun" },
  { href: "/tools/random-color", icon: "🎨", name: "Random Color", description: "Random hex generator", tag: "Fun" },
  // CSS Helpers
  { href: "/tools/cubic-bezier", icon: "📈", name: "Cubic Bezier Editor", description: "Custom easing curves", tag: "Design" },
  { href: "/tools/transform-generator", icon: "🔄", name: "CSS Transform Generator", description: "Combine transforms", tag: "Design" },
  { href: "/tools/filter-generator", icon: "🎭", name: "CSS Filter Generator", description: "Build filter effects", tag: "Design" },
  // Performance & Diagnostics
  { href: "/tools/performance-check", icon: "⚡", name: "Page Performance", description: "Load metrics", tag: "Dev" },
  { href: "/tools/browser-info", icon: "🖥️", name: "Browser Info", description: "Device details", tag: "Dev" },
];

const tagColors: Record<string, string> = {
  Code: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  Security: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  Utility: "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
  Files: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  Design: "bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  Dev: "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  Fun: "bg-fuchsia-50 dark:bg-fuchsia-950 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800",
  Math: "bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
  Date: "bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",
};

const allTags = Array.from(new Set(tools.map((t) => t.tag))).sort();

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      if (selectedTag && tool.tag !== selectedTag) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          tool.name.toLowerCase().includes(term) ||
          tool.description.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [searchTerm, selectedTag]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedTag(null);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-3">Free browser tools</p>
          <h1 className="text-4xl font-semibold tracking-tight mb-3 text-neutral-900 dark:text-white">Toolbox</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
            A collection of useful utilities that run entirely in your browser - no sign-up or no uploads to any server, safe and client side only.
            (Basically I got tired of looking online for tools and started making and collecting them.)
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Search tools by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 mr-1">Filter by tag:</span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition ${
                selectedTag === null
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition ${
                  selectedTag === tag
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`}
              >
                {tag}
              </button>
            ))}
            {(searchTerm || selectedTag) && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 underline ml-2"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          Showing {filteredTools.length} of {tools.length} tools
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">No tools match your filters.</p>
            <button
              onClick={handleClearFilters}
              className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative flex flex-col gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
              >
                <span className={`self-start text-xs px-2.5 py-0.5 rounded border font-medium ${tagColors[tool.tag]}`}>
                  {tool.tag}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-mono leading-none">{tool.icon}</span>
                  <span className="text-lg font-medium tracking-tight text-neutral-900 dark:text-white">{tool.name}</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{tool.description}</p>
                <span className="absolute top-5 right-5 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-lg">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        )}

        <p className="mt-12 text-xs text-neutral-500 dark:text-neutral-500 text-center">
          All tools run client-side. Nothing you enter leaves your browser.
        </p>
      </div>
    </main>
  );
}