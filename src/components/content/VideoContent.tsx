"use client"

import MediaPlayer from "@/components/MediaPlayer"
import YouTubeEmbed from "@/components/YouTubeEmbed"
import { useTheme } from "@/contexts/ThemeContext"
import type { ContentItem } from "@/lib/contentItems"

interface VideoContentProps {
  item: ContentItem
}

export default function VideoContent({ item }: VideoContentProps) {
  const { isDarkMode } = useTheme()

  // Check if it's a YouTube URL
  const isYouTubeUrl = item.videoSrc && (item.videoSrc.includes("youtube.com") || item.videoSrc.includes("youtu.be"))

  return (
    <div className="space-y-6">
      {/* Video Player */}
      {item.videoSrc && isYouTubeUrl && <YouTubeEmbed url={item.videoSrc} title={item.title} />}

      {item.videoSrc && !isYouTubeUrl && <MediaPlayer src={item.videoSrc} poster={item.imageSrc} />}

      {/* Description */}
      <div className={`prose max-w-none ${isDarkMode ? "prose-invert" : ""}`}>
        <h2 className="text-2xl font-bold">{item.title}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  )
}
