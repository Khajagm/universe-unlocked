"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import PageTransition from "@/components/PageTransition"
import InteriorSlideshow from "@/components/InteriorSlideshow"
import { ContentGrid } from "@/components/ContentGrid"
import contentItems from "@/lib/contentItems"
import contentTypes from "@/lib/contentTypes"
import { useTheme } from "@/contexts/ThemeContext"
import { getObjectSlidesWithFallback } from "@/lib/slideshowUtils"
import type { SlideImage } from "@/lib/slideshowImages"

export default function ObjectPage() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const toggleNav = () => setIsNavOpen((prev) => !prev)

  const params = useParams()
  const type = params.type as string
  const object = params.object as string

  // Format display names
  const formatName = (name: string) =>
    name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

  // Get content type information
  const typeInfo = contentTypes[type]
  const objectName = formatName(object)

  // Get title and description
  const title = `${objectName} - ${typeInfo?.title || formatName(type)}`
  const description = `Explore ${objectName} content in the ${formatName(type)} category`

  // Get items for this object and type
  const items = contentItems.filter(
    (item) => item.celestialObject === object && (item.category === type || item.contentType === type),
  )

  // Example slides - in a real app, you might fetch these from an API or database
  // For now, we'll use the fallback logic
  const slides: SlideImage[] = []

  // Get slides with fallback if needed
  const displaySlides = getObjectSlidesWithFallback(type, object, slides)

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleNav={toggleNav} />
      <div className="flex flex-grow pt-14">
        <Navigation isOpen={isNavOpen} toggleNav={toggleNav} />
        <div className="flex-grow">
          <PageTransition>
            <main className="w-full">
              {displaySlides.length > 0 && <InteriorSlideshow slides={displaySlides} isDarkMode={isDarkMode} />}
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <p className="mb-8">{description}</p>
                {items.length > 0 ? (
                  <ContentGrid items={items} type={type} object={object} useIcons={true} />
                ) : (
                  <p>No content found for {objectName}.</p>
                )}
              </div>
            </main>
          </PageTransition>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
