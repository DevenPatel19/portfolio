"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section 
    // className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-emerald-100"
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-emerald-600 text-white"
    >
      <div className="text-center text-emerald-500  px-4">
        {/* Heading with animated gradient text */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-pink-600 via-purple-300 to-yellow-300 bg-clip-text text-transparent animate-gradient">
            Deven Patel
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-stone-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Full-Stack Developer specializing in React, Next.js, and TypeScript
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a
            href="#projects"
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 hover:scale-105 transform transition"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 hover:scale-105 transform transition"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Gradient animation CSS */}
      <style jsx>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
