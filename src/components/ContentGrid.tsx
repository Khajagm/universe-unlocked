"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ContentItem } from "@/lib/contentItems"
import { useTheme } from "@/contexts/ThemeContext"

interface ContentGridProps {
  items: ContentItem[]
  type: string
  object?: string
  isDarkMode?: boolean
}

export function ContentGrid({ items, type, object, isDarkMode: propIsDarkMode }: ContentGridProps) {
  // Use the theme context, but allow prop override for backward compatibility
  const { isDarkMode: contextIsDarkMode } = useTheme()
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode

  console.log("ContentGrid received items:", items.length, "for type:", type)

  // If we have no items, show a message
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
          No content found for {type}. Please check back later.
        </p>
      </div>
    )
  }

  // Special handling for category pages (like planetary-nebulas, black-holes, etc.)
  // We're on a category page if:
  // 1. We don't have an object parameter (not on an object detail page)
  // 2. The type matches one of our category values
  const isOnCategoryPage = !object && items.some((item) => item.category === type)

  if (isOnCategoryPage) {
    console.log("Rendering as category page for:", type)

    // Get unique celestial objects for this category
    const uniqueObjects = Array.from(new Set(items.map((item) => item.celestialObject)))
    console.log("Unique objects:", uniqueObjects)

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueObjects.map((objectId) => {
          if (!objectId) return null // Skip if no object ID

          const objectItems = items.filter((item) => item.celestialObject === objectId)
          const objectName = objectId
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
          const firstItem = objectItems[0]

          return (
            <Card
              key={objectId}
              className={`overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <div className="relative h-48">
                <Image
                  src={
                    firstItem.imageSrc || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(objectName)}`
                  }
                  alt={objectName}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardHeader>
                <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{objectName}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
                  {`Explore ${objectItems.length} items about the ${objectName}`}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  <Link href={`/explore/${type}/${objectId}`}>Explore {objectName}</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    )
  }

  // Default display for content type pages or object detail pages
  console.log("Rendering as content type page for:", type)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const href = item.externalURL
          ? item.externalURL
          : `/explore/${type}/${item.celestialObject}/${item.contentType}/${item.id}`

        return (
          <Card
            key={item.id}
            className={`overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <div className="relative h-48">
              <Image
                src={item.imageSrc || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(item.title)}`}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <CardHeader>
              <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                <Link href={href}>Explore {item.contentType === type ? item.celestialObject : item.contentType}</Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

