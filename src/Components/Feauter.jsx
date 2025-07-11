import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  FiUploadCloud,
  FiZap,
  FiLink2,
  FiShield,
  FiCode,
  FiImage
} from "react-icons/fi"

const iconMap = [
  FiUploadCloud,
  FiZap,
  FiLink2,
  FiShield,
  FiCode,
  FiImage,
]

export default function FeaturesSection() {
  const features = [
    {
      title: "One-Click Upload",
      description: "Drag, drop, or click to upload. Get your CDN URL instantly without any registration hassle.",
      highlight: "No Sign-up Required",
    },
    {
      title: "CDN-Powered Delivery",
      description: "Global content delivery network ensures your media loads fast from anywhere in the world.",
      highlight: "Lightning Fast",
    },
    {
      title: "Instant Shareable URLs",
      description:
        "Get permanent, shareable links immediately after upload. Perfect for demos, documentation, and production.",
      highlight: "Immediate Access",
    },
    {
      title: "Reliable & Secure",
      description: "Enterprise-grade infrastructure with 99.9% uptime and secure file handling you can trust.",
      highlight: "Enterprise Grade",
    },
    {
      title: "Developer-Focused",
      description: "Built specifically for developers with API access, webhook support, and seamless integrations.",
      highlight: "API Ready",
    },
    {
      title: "All Media Types",
      description: "Support for images, videos, and documents with automatic optimization and format conversion.",
      highlight: "Universal Support",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 px-6 AboutUsBg font-['Urbanist']">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Why Developers Choose <span className="ImagerFont text-blue-600">GetURI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built for speed, efficiency, and ease of use. GetSrc eliminates the complexity of media hosting so you can focus on what matters most—building amazing products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[index]
            return (
              <motion.div
                key={index}
                className="bg-white shadow-2xl rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>

                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                    {feature.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div className="text-center mt-16" variants={itemVariants}>
          <Link to="/upgrade">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Using GetSrc Today
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
