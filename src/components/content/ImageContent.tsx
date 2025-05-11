"use client"

import { useTheme } from "@/contexts/ThemeContext"
import ImageGallery from "@/components/ImageGallery"
import type { ContentItem } from "@/lib/contentItems"

interface ImageContentProps {
  item: ContentItem
}

export default function ImageContent({ item }: ImageContentProps) {
  const { isDarkMode } = useTheme()

  // For a real implementation, you would fetch multiple images
  // For now, we'll create a gallery with the single image
  const images = [
    {
      src: item.imageSrc || "/placeholder.svg",
      alt: item.title,
      caption: item.description,
    },
  ]

  return (
    <div className="space-y-6">
      <div className={`prose max-w-none ${isDarkMode ? "prose-invert" : ""}`}>
        <h2 className="text-2xl font-bold">{item.title}</h2>
        <p>{item.description}</p>
      </div>

      <ImageGallery images={images} />
    </div>
  )
}
