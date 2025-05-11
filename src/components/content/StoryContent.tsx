"use client"

import Image from "next/image"
import MediaPlayer from "@/components/MediaPlayer"
import { useTheme } from "@/contexts/ThemeContext"
import type { ContentItem } from "@/lib/contentItems"

interface StoryContentProps {
  item: ContentItem
}

export default function StoryContent({ item }: StoryContentProps) {
  const { isDarkMode } = useTheme()

  return (
    <div className="space-y-6">
      {/* Featured Image */}
      {item.imageSrc && (
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={item.imageSrc || "/placeholder.svg"}
            alt={item.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Audio Player */}
      {item.audioSrc && (
        <div className="mt-6">
          <MediaPlayer src={item.audioSrc} isAudio title={item.title} />
        </div>
      )}

      {/* Description */}
      <div className={`prose max-w-none ${isDarkMode ? "prose-invert" : ""}`}>
        <p>{item.description}</p>
      </div>
    </div>
  )
}
