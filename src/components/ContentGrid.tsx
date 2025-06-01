"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ContentItem } from "@/lib/contentItems"
import { useTheme } from "@/contexts/ThemeContext"
import contentTypes from "@/lib/contentTypes"
import { getCelestialObjectsByCategory } from "@/lib/celestialObjects"
import { FileIcon } from "lucide-react"
import { getAssetUrl } from "@/lib/assetUtils"
import { formatDisplayName } from "@/lib/dataUtils"

export interface ContentGridProps {
  items: ContentItem[]
  type: string
  object?: string
  useIcons?: boolean
  isDarkMode?: boolean
}

export function ContentGrid({ items, type, object, useIcons = false, isDarkMode: propIsDarkMode }: ContentGridProps) {
  // Use the theme context, but allow prop override for backward compatibility
  const { isDarkMode: contextIsDarkMode } = useTheme()
  const isDarkMode = propIsDarkMode !== undefined ? propIsDarkMode : contextIsDarkMode

  // If we have no items, show a message
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
          No content found for {formatDisplayName(type)}. Please check back later.
        </p>
      </div>
    )
  }

  // Special handling for category pages - show celestial objects
  const isOnCategoryPage = !object && items.some((item) => item.category === type)

  if (isOnCategoryPage) {
    // Get celestial objects for this category
    const categoryObjects = getCelestialObjectsByCategory(type)

    if (categoryObjects.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryObjects.map((celestialObj) => (
            <Card
              key={celestialObj.id}
              className={`overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <div className="relative h-48">
                <Image
                  src={
                    getAssetUrl(celestialObj.imageSrc) ||
                    `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(celestialObj.name) || "/placeholder.svg"}`
                  }
                  alt={celestialObj.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <CardHeader>
                <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{celestialObj.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
                  {celestialObj.description}
                </CardDescription>
                {celestialObj.distance && (
                  <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Distance: {celestialObj.distance}
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  <Link href={`/explore/${type}/${celestialObj.id}`}>Explore {celestialObj.name}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )
    }

    // Fallback to unique objects from content items if no celestial objects defined
    const uniqueObjects = Array.from(new Set(items.map((item) => item.celestialObject)))

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueObjects.map((objectId) => {
          if (!objectId) return null

          const objectItems = items.filter((item) => item.celestialObject === objectId)
          const objectName = formatDisplayName(objectId)
          const firstItem = objectItems[0]

          return (
            <Card
              key={objectId}
              className={`overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <div className="relative h-48">
                <Image
                  src={
                    getAssetUrl(firstItem.imageSrc) ||
                    `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(objectName) || "/placeholder.svg"}`
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        // Always use the internal link, never the external URL directly
        const href = `/explore/${type}/${item.celestialObject}/${item.contentType}/${item.id}`

        // Get the content type info to access the icon and title
        const contentTypeInfo = contentTypes[item.contentType]
        const IconComponent = contentTypeInfo?.icon || FileIcon

        // Get formatted names for display
        const contentTypeTitle = contentTypeInfo?.title || formatDisplayName(item.contentType)
        const objectTitle = formatDisplayName(item.celestialObject)

        // Determine what to show on the button
        const buttonText = item.contentType === type ? objectTitle : contentTypeTitle

        return (
          <Card
            key={item.id}
            className={`overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            {useIcons ? (
              <div className={`flex items-center justify-center h-48 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                <IconComponent className="h-24 w-24 text-purple-400" />
              </div>
            ) : (
              <div className="relative h-48">
                <Image
                  src={
                    getAssetUrl(item.imageSrc) ||
                    `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(item.title) || "/placeholder.svg"}`
                  }
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
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
                <Link href={href}>Explore {buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
