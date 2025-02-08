"use client"

import { useState, useEffect } from "react"
import Categories from "@/components/Categories"
import Slideshow from "@/components/Slideshow"
import { nebulas } from "@/lib/nebulas"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

// Custom hook to manage theme
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    setIsDarkMode(storedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', !isDarkMode)
  }

  return { isDarkMode, toggleTheme }
}

export default function PlanetaryNebulasPage() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            Explore Planetary Nebulas
          </h1>
        </div>
        <Slideshow />
        <div className="container mx-auto px-4 py-8">
          <Categories nebulas={nebulas} />
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}