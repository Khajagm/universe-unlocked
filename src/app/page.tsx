"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomepageSlideshow from "@/components/HomepageSlideshow"
import HomepageCategories from "@/components/HomepageCategories"
import contentItems, { ContentItem } from "@/lib/contentItems"
import PageTransition from "@/components/PageTransition"

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

const getUniqueCategories = (items: ContentItem[]): string[] => {
  return Array.from(new Set(items.map(item => item.category)))
}

const getUniqueContentTypes = (items: ContentItem[]): string[] => {
  return Array.from(new Set(items.map(item => item.contentType)))
}

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme()
  const categories = getUniqueCategories(contentItems)
  const contentTypes = getUniqueContentTypes(contentItems)

  const categoryItems = categories.map((category) => {
    const items = contentItems.filter((item) => item.category === category)
    return {
      id: category,
      title: category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      description: `Explore ${items.length} items in ${category}`,
      href: `/explore/${category}`,
      imageSrc: items[0]?.imageSrc || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(category)}`,
    }
  })

  const contentTypeItems = contentTypes.map((contentType) => {
    const items = contentItems.filter((item) => item.contentType === contentType)
    return {
      id: contentType,
      title: contentType
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      description: `Explore ${items.length} ${contentType}`,
      href: `/explore/${contentType}`,
      imageSrc: items[0]?.imageSrc || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(contentType)}`,
    }
  })

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-grow">
          <HomepageSlideshow isDarkMode={isDarkMode} />
          <HomepageCategories title="Explore by Category" items={categoryItems} isDarkMode={isDarkMode} />
          <HomepageCategories title="Explore by Content Type" items={contentTypeItems} isDarkMode={isDarkMode} />
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}