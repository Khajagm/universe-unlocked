"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContentGrid } from "@/components/ContentGrid"
import PageTransition from "@/components/PageTransition"
import InteriorSlideshow from "@/components/InteriorSlideshow.tsx"
import contentItems from "@/lib/contentItems"
import contentTypes from "@/lib/contentTypes"
import { contentTypeSlides } from "@/lib/slideshowImages"


export default function ExplorePage() {
  const params = useParams()
  const type = params.type as string
  // Get theme from context instead of local state
  const { isDarkMode, toggleTheme } = useTheme()

  // Check if the type is a content type or a category
  const isContentType = type in contentTypes

  // Filter items based on whether we're looking at a content type or category
  let content
  if (isContentType) {
    // If it's a content type, filter by contentType
    content = contentItems.filter((item) => item.contentType === type)

    // Special case: if the content type is also a category (like planetary-nebulas)
    // and we have no items, try filtering by category instead
    if (content.length === 0 && contentItems.some((item) => item.category === type)) {
      content = contentItems.filter((item) => item.category === type)
    }
  } else {
    // If it's not a content type, filter by category
    content = contentItems.filter((item) => item.category === type)
  }

  console.log("Page filtered items:", content.length, "for type:", type)

  const title = isContentType
    ? contentTypes[type].title
    : type
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

  const description = isContentType ? contentTypes[type].description : `Explore ${content.length} items in ${title}`

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-1">
          <InteriorSlideshow slides={contentTypeSlides[type] || []} isDarkMode={isDarkMode} />
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center my-8">{title}</h1>
            <p className="text-center mb-8">{description}</p>

            <ContentGrid items={content} type={type} isDarkMode={isDarkMode} />
          </div>
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

