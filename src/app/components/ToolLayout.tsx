import Link from "next/link";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
}

export default function ToolLayout({ title, description, icon, children }: ToolLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          All tools
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="text-4xl mb-3">{icon}</div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">{title}</h1>
          <p className="text-gray-400 text-base">{description}</p>
        </div>

        {/* Tool content */}
        <div>{children}</div>
      </div>
    </main>
  );
}
