"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContentGrid } from "@/components/ContentGrid"
import PageTransition from "@/components/PageTransition"
import Slideshow from "@/components/Slideshow"
import contentItems, { ContentItem } from "@/lib/contentItems"
import contentTypes from "@/lib/contentTypes"

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

export default function ExplorePage() {
  const params = useParams()
  const type = params.type as string
  const { isDarkMode, toggleTheme } = useTheme()

  const isContentType = type in contentTypes
  const content = isContentType 
    ? contentItems.filter(item => item.contentType === type)
    : contentItems.filter(item => item.category === type)

  const title = isContentType 
    ? contentTypes[type].title 
    : type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  const description = isContentType
    ? contentTypes[type].description
    : `Explore ${content.length} items in ${title}`

  const slideshowImages = content
    .filter(item => item.imageSrc)
    .map(item => ({ src: item.imageSrc!, alt: item.title }))

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-1">
          <Slideshow images={slideshowImages} />
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center my-8">{title}</h1>
            <p className="text-center mb-8">{description}</p>
            <ContentGrid items={content} type={type} />
          </div>
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}