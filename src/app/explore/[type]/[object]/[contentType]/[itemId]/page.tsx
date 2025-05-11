"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import PageTransition from "@/components/PageTransition"
import { useTheme } from "@/contexts/ThemeContext"
import contentItems from "@/lib/contentItems"
import StoryContent from "@/components/content/StoryContent"
import VideoContent from "@/components/content/VideoContent"
import ImageContent from "@/components/content/ImageContent"
import ModelContent from "@/components/content/ModelContent"

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

  // Format display names
  const formatName = (name: string) =>
    name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

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
              <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold">{item?.title || "Content Not Found"}</h1>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    <span className={`px-2 py-1 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                      {formatName(type)}
                    </span>
                    <span className={`px-2 py-1 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                      {formatName(object)}
                    </span>
                    <span className={`px-2 py-1 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                      {formatName(contentType)}
                    </span>
                  </div>
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
