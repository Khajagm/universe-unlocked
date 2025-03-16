"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { ContentGrid } from "@/components/ContentGrid"
import PageTransition from "@/components/PageTransition"
import nebulaItems, { NebulaItem } from "@/lib/nebulaItems"
import { CuboidIcon as Cube, Video, Music, BookOpen } from 'lucide-react'

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

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return { isDarkMode, toggleTheme }
}

const contentTypes = {
  "3d-models": {
    title: "3D Models",
    description: "Explore interactive 3D models of various nebulas.",
    icon: <Cube className="h-8 w-8 text-purple-500" />,
  },
  videos: {
    title: "Videos",
    description: "Watch captivating videos about nebulas and space phenomena.",
    icon: <Video className="h-8 w-8 text-purple-500" />,
  },
  sonification: {
    title: "Sonification",
    description: "Experience the sounds of space through data sonification.",
    icon: <Music className="h-8 w-8 text-purple-500" />,
  },
  stories: {
    title: "Stories",
    description: "Discover fascinating stories and facts about nebulas.",
    icon: <BookOpen className="h-8 w-8 text-purple-500" />,
  },
}

export default function ExploreMediaPage() {
  const params = useParams()
  const contentType = params.type as keyof typeof contentTypes
  const { isDarkMode, toggleTheme } = useTheme()

  const filteredContent = Object.values(nebulaItems).flatMap((nebula) => {
    return (nebula[contentType] as NebulaItem[]) || []
  })

  const { title, description, icon } = contentTypes[contentType] || {}

  if (!contentTypes[contentType]) {
    return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl font-bold">Content type not found</h1>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-1">
          <Hero title={title} description={description} icon={icon} isDarkMode={isDarkMode} />
          <ContentGrid items={filteredContent} isDarkMode={isDarkMode} />
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}