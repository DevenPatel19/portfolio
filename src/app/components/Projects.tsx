// src/app/components/Projects.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "Spellweaver Journal",
      description: "Full-stack mental wellness platform with role-based access, therapist-patient management, and production deployment. Successfully deployed on Render.com with MongoDB Atlas.",
      technologies: ["React", "Node.js", "MongoDB", "JWT", "Render", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://spellweaver-frontend.onrender.com",
      githubUrl: "https://github.com/DevenPatel19/TherawizardFS",
      image: "/project-screenshots/thera-wizard.png",
      status: "Live Production",
      features: ["Production Deployment", "Cloud Database", "Role-Based Access", "Real-time Tracking"]
    },
    {
      title: "Seattle Tech Insights Dashboard",
      description: "Real-time analytics platform tracking Seattle's tech job market with live API data, interactive charts, and professional UI.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Adzuna API"],
      liveUrl: "https://seattle-tech-dashboard-ziwd.vercel.app/",
      githubUrl: "https://github.com/DevenPatel19/seattle-tech-dashboard",
      image: "/project-screenshots/dashboard.jpg",
      status: "Live Demo",
      features: ["Real-time Data", "Interactive Charts", "TypeScript", "API Integration"]
    },
    {
      title: "Portfolio Website",
      description: "A modern developer portfolio built with Next.js, featuring responsive design, smooth animations, and optimized performance.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://portfolio-app-sigma-swart-49.vercel.app/",
      githubUrl: "https://github.com/DevenPatel19/portfolio",
      image: "/project-screenshots/portfolio.png",
      status: "Live",
      features: ["Next.js 15", "Modern Design", "Performance", "Responsive"]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live Production": return "bg-green-500 text-white";
      case "Live Demo": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <section id="projects" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Production Projects
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          From concept to production deployment – showcasing full-stack applications with real impact
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

                {/* Feature Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.features?.map((feature, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex justify-between items-center">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors flex items-center gap-1"
                  >
                    {project.status === "Live Production" ? "🚀 Live App" : "View Demo"} →
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-semibold text-sm transition-colors"
                  >
                    Source Code ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
          >
            View All Projects & Case Studies
          </Link>
        </motion.div>
      </div>
    </section>
  );
}