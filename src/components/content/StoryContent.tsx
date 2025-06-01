"use client"

import Image from "next/image"
import MediaPlayer from "@/components/MediaPlayer"
import type { ContentItem } from "@/lib/contentItems"

interface StoryContentProps {
  item: ContentItem
}

export default function StoryContent({ item }: StoryContentProps) {
  // Check if the audio source is actually an MP4 file (likely a video)
  const isVideoAudio = item.audioSrc && item.audioSrc.toLowerCase().endsWith(".mp4")

  return (
    <div className="space-y-6">
      {/* Featured Image */}
      {item.imageSrc && !isVideoAudio && (
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

      {/* Audio/Video Player */}
      {item.audioSrc && (
        <div className="mt-6">
          {isVideoAudio ? (
            <MediaPlayer src={item.audioSrc} isAudio={false} title={item.title} poster={item.imageSrc} />
          ) : (
            <MediaPlayer src={item.audioSrc} isAudio={true} title={item.title} />
          )}
        </div>
      )}
    </div>
  )
}
