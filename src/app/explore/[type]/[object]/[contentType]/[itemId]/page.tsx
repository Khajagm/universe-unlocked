"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ContentPage from "@/components/ContentPage"
import PageTransition from "@/components/PageTransition"
import { getSpecificContent } from "@/lib/dataUtils"
import { useTheme } from "@/contexts/ThemeContext"

export default function SpecificContentPage() {
  const params = useParams()
  const type = params.type as string
  const object = params.object as string
  const contentType = params.contentType as string
  const itemId = params.itemId as string
  const { isDarkMode, toggleTheme } = useTheme()

  const content = getSpecificContent(type, object, contentType, itemId)

  if (!content) {
    return <div>Content not found</div>
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-1">
          <ContentPage content={content} />
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}