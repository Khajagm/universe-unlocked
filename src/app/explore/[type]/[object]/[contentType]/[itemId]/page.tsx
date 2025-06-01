"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import PageTransition from "@/components/PageTransition"
import InteriorSlideshow from "@/components/InteriorSlideshow"
import { useTheme } from "@/contexts/ThemeContext"
import contentItems from "@/lib/contentItems"
import StoryContent from "@/components/content/StoryContent"
import VideoContent from "@/components/content/VideoContent"
import ImageContent from "@/components/content/ImageContent"
import ModelContent from "@/components/content/ModelContent"
import { getContentItemSlidesWithFallback } from "@/lib/slideshowUtils"
import type { SlideImage } from "@/lib/slideshowImages"

export default function ItemPage() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const toggleNav = () => setIsNavOpen((prev) => !prev)

  const params = useParams()
  const type = params.type as string
  const object = params.object as string
  const contentType = params.contentType as string
  const itemId = params.itemId as string

  // Find the content item
  const item = contentItems.find((item) => item.id === itemId)

  // Get slides for this content item
  const slides: SlideImage[] = getContentItemSlidesWithFallback(type, object, contentType, itemId)

  // Render content based on content type
  const renderContent = () => {
    if (!item) {
      return <div className="text-center py-12">Item not found</div>
    }

    switch (contentType) {
      case "stories":
      case "sonification":
        return <StoryContent item={item} />
      case "videos":
        return <VideoContent item={item} />
      case "images":
        return <ImageContent item={item} />
      case "3d-models":
        return <ModelContent item={item} />
      default:
        return (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p>{item.description}</p>
          </div>
        )
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleNav={toggleNav} />
      <div className="flex flex-grow pt-14">
        <Navigation isOpen={isNavOpen} toggleNav={toggleNav} />
        <div className="flex-grow">
          <PageTransition>
            <main className="w-full">
              {/* Add the slideshow component */}
              {slides.length > 0 && <InteriorSlideshow slides={slides} isDarkMode={isDarkMode} />}

              <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-4">{item?.title || "Content Not Found"}</h1>
                  {/* Add description under the title */}
                  {item?.description && (
                    <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {item.description}
                    </p>
                  )}
                </div>

                {renderContent()}
              </div>
            </main>
          </PageTransition>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
