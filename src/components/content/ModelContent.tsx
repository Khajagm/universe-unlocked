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
      {item.modelSrc && <ModelViewer src={item.modelSrc} alt={item.title} />}

      <div className={`prose max-w-none ${isDarkMode ? "prose-invert" : ""}`}>
        <h2 className="text-2xl font-bold">{item.title}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  )
}
