// src/app/projects/page.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const projects = [
  {
    title: "Spellweaver Journal",
    description: "Full-stack mental wellness platform deployed to production with role-based access, therapist-patient management, and secure authentication. Features production deployment on Render.com with MongoDB Atlas cloud database.",
    technologies: ["React", "Node.js", "MongoDB", "JWT", "Render", "Tailwind CSS", "Framer Motion", "Express"],
    liveUrl: "https://spellweaver-frontend.onrender.com",
    githubUrl: "https://github.com/DevenPatel19/TherawizardFS",
    image: "/project-screenshots/thera-wizard.png",
    status: "Live Production",
    highlights: [
      "Production deployment with separate frontend/backend services",
      "Cloud database migration to MongoDB Atlas",
      "JWT authentication & security implementation",
      "Role-based access control (Patient/Therapist)",
      "Real-time progress tracking and analytics"
    ]
  },
  {
    title: "Seattle Tech Insights Dashboard",
    description: "Real-time analytics platform tracking Seattle's tech job market with live API data, interactive charts, and professional UI. Built with modern Next.js and TypeScript.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Adzuna API"],
    liveUrl: "https://seattle-tech-dashboard-ziwd.vercel.app/",
    githubUrl: "https://github.com/DevenPatel19/seattle-tech-dashboard",
    image: "/project-screenshots/dashboard.jpg",
    status: "Live Demo",
    highlights: [
      "Real-time API data integration",
      "Interactive data visualizations",
      "TypeScript for type safety",
      "Responsive design for all devices",
      "Modern Next.js App Router"
    ]
  },
  {
    title: "Portfolio Website",
    description: "A modern developer portfolio built with Next.js 15, featuring responsive design, smooth animations, and optimized performance. Showcasing full-stack development capabilities.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://portfolio-app-sigma-swart-49.vercel.app/",
    githubUrl: "https://github.com/DevenPatel19/portfolio",
    image: "/project-screenshots/portfolio.png",
    status: "Live",
    highlights: [
      "Next.js 15 with latest features",
      "Smooth animations with Framer Motion",
      "Optimized performance and SEO",
      "Responsive across all devices",
      "Modern design system"
    ]
  },
  {
    title: "Weather Forecast App",
    description: "Dynamic weather application that fetches live data using the OpenWeatherMap API and displays responsive forecasts with intuitive icons and detailed information.Note: This demo app is run locally without production deployment.git ",
    technologies: ["React", "OpenWeatherMap API", "CSS Grid", "Axios"],
    liveUrl: "https://weatherpro-demo.vercel.app/",
    githubUrl: "https://github.com/DevenPatel19/WeatherApp",
    image: "/project-screenshots/weather-app.png",
    status: "Live Demo",
    highlights: [
      "Live weather data integration",
      "Responsive grid layout",
      "Intuitive weather icons",
      "Location-based forecasts",
      "Clean, user-friendly interface"
    ]
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Live Production": return "bg-green-500 text-white";
    case "Live Demo": return "bg-blue-500 text-white";
    default: return "bg-gray-500 text-white";
  }
};

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition border border-gray-200"
          >
            ← Back to Home
          </Link>
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Project Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Full-stack applications from concept to production deployment. 
            Each project demonstrates real-world problem solving and technical execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                {/* Project Highlights */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.highlights?.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                  >
                    {project.status === "Live Production" ? "🚀 Live App" : "View Demo"}
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                  >
                    Source Code ↗
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