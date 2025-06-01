"use client"

import ModelViewer from "@/components/ModelViewer"
import type { ContentItem } from "@/lib/contentItems"

interface ModelContentProps {
  item: ContentItem
}

export default function ModelContent({ item }: ModelContentProps) {
  return (
    <div className="space-y-6">
      <ModelViewer src={item.modelSrc} alt={item.title} imageSrc={item.imageSrc} externalURL={item.externalURL} />
    </div>
  )
}
