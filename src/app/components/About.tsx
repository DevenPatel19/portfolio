"use client"
import { motion } from "framer-motion"

export default function About() {
  const skills = [
    "JavaScript / TypeScript", "React / Next.js", "Node.js", "Tailwind CSS",
    "REST APIs", "Git / GitHub", "Vercel Deployment", "Responsive Design"
  ]

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6 text-center md:text-left">
        
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center"
        >
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Me</span>
          <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I’m a passionate full-stack developer who loves crafting intuitive, 
              performant web applications that make a real impact.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              My work blends creative design thinking with strong technical foundations, 
              helping turn complex ideas into elegant, user-friendly solutions.
            </p>
          </motion.div>

          {/* Right Skill Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white/60 backdrop-blur-md border border-blue-100 text-blue-700 font-medium rounded-xl shadow-sm hover:shadow-md transition"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
