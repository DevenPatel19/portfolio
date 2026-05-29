import Link from "next/link";

const tools = [
  {
    href: "/tools/base64-encoder",
    icon: "※",
    name: "Base 64 Encoder",
    description: "Base 64 Encoder/Decoder",
    tag: "Utility",
  },
  {
    href: "/tools/color-palette",
    icon: "🎨",
    name: "Color Palette",
    description: "Generate harmonious 5‑color palettes.",
    tag: "Design",
  },
  {
    href: "/tools/csv-to-json",
    icon: "⁖",
    name: "CSV to JSON",
    description: "CSV to JSON",
    tag: "Utility",
  },
  {
    href: "/tools/image-converter",
    icon: "⬡",
    name: "Image Converter",
    description:
      "Convert images between PNG, JPG, and WebP formats in-browser.",
    tag: "Files",
  },
  {
    href: "/tools/json-formatter",
    icon: "{ }",
    name: "JSON Formatter",
    description:
      "Paste messy JSON and get it back clean, indented, and validated.",
    tag: "Files",
  },
  {
    href: "/tools/markdown-preview",
    icon: "📝",
    name: "Markdown Previewer",
    description: "Live Markdown editor with preview.",
    tag: "Code",
  },
  {
    href: "/tools/password-generator",
    icon: "🔑",
    name: "Password Generator",
    description: "Generate strong, random passwords with custom rules.",
    tag: "Security",
  },
  {
    href: "/tools/pdf-converter",
    icon: "📄",
    name: "PDF Converter",
    description: "Convert text or images to PDF.",
    tag: "Files",
  },
  {
    href: "/tools/pdf-tools",
    icon: "🔧",
    name: "PDF Tools",
    description: "Merge, split, or compress PDFs.",
    tag: "Files",
  },
  {
    href: "/tools/qr-generator",
    icon: "▦",
    name: "QR Code Generator",
    description: "Turn any URL or text into a downloadable QR code instantly.",
    tag: "Utility",
  },
  {
    href: "/tools/regex-tester",
    icon: "▦",
    name: "RegEx Tester",
    description: "Test Regular Expressions",
    tag: "Code",
  },
  {
    href: "/tools/unit-convert",
    icon: "⚖️",
    name: "Unit Converter",
    description: "Convert from different Unit Types",
    tag: "Utility",
  },
  {
    href: "/tools/url-shortener",
    icon: "🔗",
    name: "URL Shortener",
    description: "Create short URLs (stored locally).",
    tag: "Utility",
  },
];

const tagColors: Record<string, string> = {
  Code: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  Security:
    "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  Utility:
    "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
  Files:
    "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-3">
            Free browser tools
          </p>
          <h1 className="text-4xl font-semibold tracking-tight mb-3 text-neutral-900 dark:text-white">
            Toolbox
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
            A collection of useful utilities that run entirely in your browser —
            no sign-up, no uploads to any server.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex flex-col gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
            >
              {/* Tag */}
              <span
                className={`self-start text-xs px-2.5 py-0.5 rounded border font-medium ${tagColors[tool.tag]}`}
              >
                {tool.tag}
              </span>

              {/* Icon + Name */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono leading-none">
                  {tool.icon}
                </span>
                <span className="text-lg font-medium tracking-tight text-neutral-900 dark:text-white">
                  {tool.name}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {tool.description}
              </p>

              {/* Arrow */}
              <span className="absolute top-5 right-5 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-lg">
                ↗
              </span>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-neutral-500 dark:text-neutral-500 text-center">
          All tools run client-side. Nothing you enter leaves your browser.
        </p>
      </div>
    </main>
  );
}
