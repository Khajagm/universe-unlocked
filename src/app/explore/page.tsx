"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Navigation from "@/components/Navigation"
import { ContentGrid } from "@/components/ContentGrid"
import PageTransition from "@/components/PageTransition"
import { useTheme } from "@/contexts/ThemeContext"
import contentItems from "@/lib/contentItems"
import { getUniqueCategories } from "@/lib/dataUtils"

export default function ExplorePage() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const toggleNav = () => setIsNavOpen((prev) => !prev)

  const categories = getUniqueCategories()

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleNav={toggleNav} />
      <div className="flex flex-grow pt-14">
        <Navigation isOpen={isNavOpen} toggleNav={toggleNav} />
        <div className="flex-grow">
          <PageTransition>
            <main className="w-full p-6">
              <h1 className="text-3xl font-bold mb-6">Explore the Universe</h1>
              <ContentGrid items={contentItems} type="explore" isDarkMode={isDarkMode} />
            </main>
          </PageTransition>
        </div>
      </div>
      <Footer />
    </div>
  )
}
