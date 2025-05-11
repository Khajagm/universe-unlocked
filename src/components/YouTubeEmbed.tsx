"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"

interface YouTubeEmbedProps {
  url: string
  title?: string
}

export default function YouTubeEmbed({ url, title = "YouTube video" }: YouTubeEmbedProps) {
  const { isDarkMode } = useTheme()
  const [isLoading, setIsLoading] = useState(true)

  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : ""
  }

  const videoId = getYouTubeId(url)

  if (!videoId) {
    return (
      <div className={`rounded-lg p-4 ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
        <p>Invalid YouTube URL</p>
      </div>
    )
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="relative pb-[56.25%] h-0">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <p className={isDarkMode ? "text-white" : "text-gray-900"}>Loading video...</p>
            </div>
          </div>
        )}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    </div>
  )
}
