"use client"

import { useTheme } from "@/contexts/ThemeContext"
import ModelViewer from "@/components/ModelViewer"
import type { ContentItem } from "@/lib/contentItems"

interface ModelContentProps {
  item: ContentItem
}

export default function ModelContent({ item }: ModelContentProps) {
  const { isDarkMode } = useTheme()

  return (
    <div className="space-y-6">
      <ModelViewer src={item.modelSrc} alt={item.title} imageSrc={item.imageSrc} externalURL={item.externalURL} />
    </div>
  )
}
