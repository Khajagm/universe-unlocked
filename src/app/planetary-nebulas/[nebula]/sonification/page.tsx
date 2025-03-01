"use client"

import { useState, useEffect } from "react"
import { use } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PageTransition from "@/components/PageTransition"
import VideoPlayer from "@/components/VideoPlayer"
import NebulaSonificationDescription from "@/components/NebulaSonificationDescription"
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

interface NebulaSonificationPageProps {
  params: Promise<{ nebula: string }>
}

export default function NebulaSonificationPage({ params }: NebulaSonificationPageProps) {
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

  const nebulaName = nebula.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 max-w-4xl">
              <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-600 dark:text-purple-400">
                    {nebulaName} Sonification
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center p-6">
                  <VideoPlayer videoSrc={currentNebula.sonification[0].videoSrc} />
                  <NebulaSonificationDescription nebula={nebula} isDarkMode={isDarkMode} />
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}