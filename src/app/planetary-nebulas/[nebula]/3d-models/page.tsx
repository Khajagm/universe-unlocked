"use client"

import { useState, useEffect } from "react"
import { use } from 'react'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PageTransition from "@/components/PageTransition"
import Nebula3dHero from "@/components/Nebula3dHero"
import Nebula3dCategories from "@/components/Nebula3dCategories"
import Nebula3dExploreStories from "@/components/Nebula3dExploreStories"
import nebulaItems from "@/lib/nebulaItems"

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

interface Nebula3dModelsPageProps {
  params: Promise<{ nebula: string }>
}

export default function Nebula3dModelsPage({ params }: Nebula3dModelsPageProps) {
  const { nebula } = use(params)
  const { isDarkMode, toggleTheme } = useTheme()

  const currentNebula = nebulaItems[nebula]

  if (!currentNebula) {
    return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Nebula not found</h1>
            <p>Requested nebula: {nebula}</p>
            <p>Available nebulas: {Object.keys(nebulaItems).join(', ')}</p>
          </div>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-1">
          <Nebula3dHero nebula={nebula} />
          <div className="container mx-auto px-4 max-w-6xl">
            <Nebula3dCategories isDarkMode={isDarkMode} nebula={nebula} />
            <Nebula3dExploreStories isDarkMode={isDarkMode} nebula={nebula} />
          </div>
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}