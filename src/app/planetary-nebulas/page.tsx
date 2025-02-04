"use client"

import { useState, useEffect } from "react"
import Header from "@/app/components/Header"
import Slideshow from "@/app/components/Slideshow"
import Categories from "@/app/components/CategoriesNebulas"
import Footer from "@/app/components/Footer"

// Custom hook to manage theme
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    setIsDarkMode(storedTheme === "dark")
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return { isDarkMode, toggleTheme }
}

export default function PlanetaryNebulasPage() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-1">
        <Slideshow />
        <Categories isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

