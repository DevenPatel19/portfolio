"use client";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Projects() {
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
      liveUrl: "https://portfolio-app-sigma-swart-49.vercel.app/",
      githubUrl: "https://github.com/DevenPatel19/portfolio",
      image: "/project-screenshots/portfolio.png",
    },
    {
      title: "Coping Skills Tracker App",
      description:
        "A Demo platform for people to create and cast Magic/Coping skills in hopes of developing emotional regulation.",
      technologies: ["Vite", "Tailwind CSS", "daisyUI"],
      liveUrl: "https://www.loom.com/share/43ee586df1ef43d8ac9518b307bf1619?sid=d32a6f25-d563-4e5d-acae-c69cec4ce53a/",
      githubUrl: "https://github.com/DevenPatel19/therawizard",
      image: "/project-screenshots/thera-wizard.png",
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useViewportScroll();
  const yRange = useTransform(scrollY, [0, 1000], [0, 20]); // subtle vertical parallax

  return (
    <section id="projects" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100 group"
              style={{ y: yRange }} // parallax effect
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Image Section with Hover Overlay */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-500">
                  <h3 className="text-white text-lg font-bold mb-3">{project.title}</h3>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition transform hover:scale-105"
                  >
                    View Project
                  </a>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 mb-4">
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

        {/* Internal Projects Page Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
