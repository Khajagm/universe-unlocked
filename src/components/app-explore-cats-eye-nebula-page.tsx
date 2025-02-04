"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Categories } from "@/components/Categories"

// Custom hook to manage theme
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    setIsDarkMode(storedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return { isDarkMode, toggleTheme }
}

export function BlockPage() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/planetary-nebulas">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Planetary Nebulas
          </Link>
        </Button>
        <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Explore the Cat's Eye Nebula</h1>
        <Categories isDarkMode={isDarkMode} />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}