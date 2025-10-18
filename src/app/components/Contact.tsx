export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Let&apos;s Work Together</h2>
        <p className="text-xl mb-8 opacity-90">
          I&apos;m currently looking for new opportunities and would love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="mailto:SWEDevPatel@gmail.com" 
             className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Send Email
          </a>
          <a href="https://www.linkedin.com/in/devenhjpatel/" 
             target="_blank" rel="noopener noreferrer"
             className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            LinkedIn
          </a>
          <a href="https://github.com/DevenPatel19" 
             target="_blank" rel="noopener noreferrer"
             className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}