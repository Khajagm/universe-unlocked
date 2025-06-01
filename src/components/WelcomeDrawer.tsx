"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Rocket } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export default function WelcomeDrawer() {
  const { isDarkMode } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisited")

    if (!hasVisited) {
      // Show drawer after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasAnimatedIn(true)
      }, 2500) // 2.5 second delay after page load

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Handle scroll to dismiss
    const handleScroll = () => {
      if (isVisible && window.scrollY > 100) {
        handleClose()
      }
    }

    // Handle ESC key to dismiss
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose()
      }
    }

    if (isVisible) {
      window.addEventListener("scroll", handleScroll)
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    // Mark as visited so it doesn't show again
    localStorage.setItem("hasVisited", "true")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Drawer */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.5,
            }}
            className={`
              fixed bottom-0 left-0 right-0 z-50
              ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
              border-t shadow-2xl
              max-h-[40vh] md:max-h-[30vh]
              overflow-hidden
            `}
          >
            <div className="relative p-6 md:p-8">
              {/* Content */}
              <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  >
                    <Rocket className={`h-6 w-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </motion.div>
                  <h2 className={`text-xl md:text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Welcome to Your Cosmic Journey
                  </h2>
                </div>

                {/* Main Copy */}
                <div className="mb-6">
                  <p
                    className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Embark on an adventure that allows you to explore the cosmos in your own way. You'll choose how you
                    want to experience the blackholes, stars, and galaxies. Will you soar through nebulae on a wave of
                    sound, or will you sculpt the jets of a black hole with your hands using 3D-printed models? You are
                    the navigator, and together, we'll uncover the mysteries of the cosmos one decision at a time.
                  </p>
                  <p
                    className={`text-lg md:text-xl font-semibold mt-3 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                  >
                    The universe awaits!
                  </p>
                </div>

                {/* Bouncing Down Arrow */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className={`${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                  >
                    <ChevronDown className="h-8 w-8" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Decorative gradient */}
            <div
              className={`
              absolute top-0 left-0 right-0 h-1
              bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500
            `}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
