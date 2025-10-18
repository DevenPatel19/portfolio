"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const projects = [
  {
    title: "Seattle Tech Insights Dashboard",
    description:
      "Real-time analytics platform tracking Seattle's tech job market with live API data, interactive charts, and professional UI.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Adzuna API"],
    liveUrl: "https://seattle-tech-dashboard-ziwd.vercel.app/",
    githubUrl: "https://github.com/DevenPatel19/seattle-tech-dashboard",
    image: "/project-screenshots/dashboard.jpg",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern developer portfolio built with Next.js, featuring responsive design, smooth animations, and optimized performance.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://yourportfolio.vercel.app/",
    githubUrl: "https://github.com/DevenPatel19/portfolio",
    image: "/project-screenshots/portfolio.png",
  },
  {
    title: "Weather Forecast App",
    description:
      "Dynamic weather app that fetches live data using the OpenWeatherMap API and displays responsive forecasts with icons.",
    technologies: ["React", "OpenWeatherMap API", "CSS Grid", "Axios"],
    liveUrl: "https://weatherpro-demo.vercel.app/",
    githubUrl: "https://github.com/DevenPatel19/WeatherApp",
    image: "/project-screenshots/weather-app.png",
  },
];

const techColors: { [key: string]: string } = {
  "Next.js": "bg-gray-900 text-white",
  "React": "bg-blue-400 text-white",
  "TypeScript": "bg-blue-700 text-white",
  "Tailwind CSS": "bg-teal-500 text-white",
  "Chart.js": "bg-yellow-400 text-black",
  "Adzuna API": "bg-purple-500 text-white",
  "Framer Motion": "bg-pink-400 text-white",
  "OpenWeatherMap API": "bg-orange-400 text-white",
  "CSS Grid": "bg-green-400 text-white",
  "Axios": "bg-red-400 text-white",
};

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back to Home */}
        <div className="mb-8 text-left">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold transition"
          >
            ← Back to Home
          </Link>
        </div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          All Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Image Section */}
              <div
                className="relative h-64 w-full cursor-pointer overflow-hidden"
                onClick={() => setSelectedImage(project.image)}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-sm px-3 py-1 rounded-full font-medium ${
                        techColors[tech] || "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 mt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    Live Demo →
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-11/12 md:w-3/4 lg:w-1/2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Image
                src={selectedImage}
                alt="Project Screenshot"
                width={1200}
                height={800}
                className="rounded-xl shadow-2xl object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-gray-800/70 rounded-full p-2 hover:bg-gray-800 transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
