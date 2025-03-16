"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContentGrid } from "@/components/ContentGrid"
import PageTransition from "@/components/PageTransition"
import { getObjectContent } from "@/lib/dataUtils"
import { useTheme } from "@/hooks/useTheme"

// ... rest of your component code

export default function ObjectPage() {
  const params = useParams()
  const type = params.type as string
  const object = params.object as string
  const { isDarkMode, toggleTheme } = useTheme()

  const content = getObjectContent(type, object)

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PageTransition>
        <main className="flex-1">
          <h1 className="text-3xl font-bold text-center my-8">{object.charAt(0).toUpperCase() + object.slice(1).replace('-', ' ')}</h1>
          <ContentGrid items={content} type={type} object={object} />
        </main>
      </PageTransition>
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}