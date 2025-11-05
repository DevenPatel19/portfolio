// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deven Patel - Full-Stack Developer | From Operations Leader to Software Engineer",
  description: "Full-stack developer specializing in React, Next.js, and Node.js. Building production-ready applications with real-world impact. Recently deployed Spellweaver Journal - a mental wellness platform.",
  keywords: ["full-stack developer", "React", "Next.js", "Node.js", "TypeScript", "software engineer", "portfolio", "Seattle"],
  authors: [{ name: "Deven Patel" }],
  creator: "Deven Patel",
  publisher: "Deven Patel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://portfolio-app-sigma-swart-49.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-app-sigma-swart-49.vercel.app',
    title: 'Deven Patel - Full-Stack Developer',
    description: 'Full-stack developer specializing in React, Next.js, and Node.js. Building production-ready applications with real-world impact.',
    siteName: 'Deven Patel Portfolio',
    images: [
      {
        url: '/og-image.png', // We'll create this next
        width: 1200,
        height: 630,
        alt: 'Deven Patel - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deven Patel - Full-Stack Developer',
    description: 'Full-stack developer specializing in React, Next.js, and Node.js.',
    creator: '@devenpatel',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<head>
  <link rel="icon" href="/favicon.ico" sizes="any" />
</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}