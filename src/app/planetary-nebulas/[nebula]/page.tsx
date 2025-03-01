'use client'

import React from 'react'
import { use } from 'react'
import PageTransition from "@/components/PageTransition"
import SlideshowSingle from "@/components/SlideshowSingle"
import NebulaItems from "@/components/NebulaItems"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import nebulaSlides from "@/lib/nebulaSlides"
import nebulaItems from "@/lib/nebulaItems"
import { useState, useEffect } from "react"

interface NebulaPageProps {
  params: Promise<{ nebula: string }>
}

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

export default function NebulaPage({ params }: NebulaPageProps) {
  const { nebula } = use(params)
  const { isDarkMode, toggleTheme } = useTheme()

  const currentNebula = nebulaItems[nebula]

  if (!currentNebula) {
    return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Nebula not found</h1>
          <p>Requested nebula: {nebula}</p>
          <p>Available nebulas: {Object.keys(nebulaItems).join(', ')}</p>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  const slides = nebulaSlides[nebula] || []

  // Capitalize the nebula name for display
  const nebulaName = nebula.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{nebulaName}</h1>
            <SlideshowSingle slides={slides} />
            <div className="mt-8">
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>About {nebulaName}</h2>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{currentNebula["3d-models"][0].description}</p>
            </div>
            <div className="mt-8">
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Explore {nebulaName}</h2>
              <NebulaItems nebulaId={nebula} isDarkMode={isDarkMode} />
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}