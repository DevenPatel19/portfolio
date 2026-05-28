import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-neutral-900 dark:text-white">
          Deven Patel
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/projects" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/tools" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Tools
          </Link>
          <a href="#contact" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}