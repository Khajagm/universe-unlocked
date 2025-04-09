"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomepageSlideshow from "@/components/HomepageSlideshow"
import HomepageCategories from "@/components/HomepageCategories"
import Navigation from "@/components/Navigation"
import contentItems from "@/lib/contentItems"
import { getUniqueCategories } from "@/lib/dataUtils"
import PageTransition from "@/components/PageTransition"
import { useTheme } from "@/contexts/ThemeContext"
import contentTypes from "@/lib/contentTypes"

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => setIsNavOpen((prev) => !prev)

  const categories = getUniqueCategories()

  const categoryItems = categories.map((category) => {
    const items = contentItems.filter((item) => item.category === category)
    const typeInfo = contentTypes[category]

    return {
      id: category,
      title:
        typeInfo?.title ||
        category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      description: typeInfo?.description || `Explore ${items.length} items in ${category}`,
      href: `/explore/${category}`,
      imageSrc: items[0]?.imageSrc || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(category)}`,
      icon: typeInfo?.icon,
    }
  })

  // Get unique content types from contentItems
  const uniqueContentTypes = Array.from(new Set(contentItems.map((item) => item.contentType)))

  const contentTypeItems = uniqueContentTypes.map((contentType) => {
    const items = contentItems.filter((item) => item.contentType === contentType)
    const typeInfo = contentTypes[contentType]

    return {
      id: contentType,
      title:
        typeInfo?.title ||
        contentType
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      description: typeInfo?.description || `Explore ${items.length} items in ${contentType}`,
      href: `/explore/${contentType}`,
      imageSrc: items[0]?.imageSrc || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(contentType)}`,
      icon: typeInfo?.icon,
    }
  })

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleNav={toggleNav} />
      <div className="flex flex-grow pt-14">
        <Navigation isOpen={isNavOpen} toggleNav={toggleNav} />
        <div className="flex-grow">
          <PageTransition>
            <main className="w-full">
              <HomepageSlideshow />
              <HomepageCategories title="Explore by Category" items={categoryItems} isDarkMode={isDarkMode} />
              <HomepageCategories title="Explore by Content Type" items={contentTypeItems} isDarkMode={isDarkMode} />
            </main>
          </PageTransition>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}
