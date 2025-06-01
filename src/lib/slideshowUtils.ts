import type { SlideImage } from "@/lib/slideshowImages"
import contentTypes from "@/lib/contentTypes"
import contentItems from "@/lib/contentItems"
import { getCelestialObjectById } from "@/lib/celestialObjects"
import { getAssetUrl } from "@/lib/assetUtils"

/**
 * Creates a fallback slide from an image source
 */
export function createFallbackSlide(imageSrc: string, title?: string, altText?: string): SlideImage[] {
  return [
    {
      src: getAssetUrl(imageSrc),
      alt: altText || title || "Image",
      caption: title || "Image",
    },
  ]
}

/**
 * Gets slides for a specific type, with fallback to contentTypes image
 */
export function getSlidesWithFallback(type: string, slides?: SlideImage[]): SlideImage[] {
  // If we have slides, use them
  if (slides && slides.length > 0) {
    return slides
  }

  // Try to get fallback from contentTypes
  const contentType = contentTypes[type]
  if (contentType?.imageSrc) {
    return createFallbackSlide(
      contentType.imageSrc,
      contentType.title,
      contentType.altText || `Image of ${contentType.title}`,
    )
  }

  // No fallback available
  return []
}

/**
 * Gets slides for a specific type and object, with fallbacks
 */
export function getObjectSlidesWithFallback(type: string, object: string, slides?: SlideImage[]): SlideImage[] {
  // If we have slides, use them
  if (slides && slides.length > 0) {
    return slides
  }

  // Try to get fallback from celestialObjects
  const celestialObject = getCelestialObjectById(object)
  if (celestialObject?.imageSrc) {
    return createFallbackSlide(
      celestialObject.imageSrc,
      celestialObject.name,
      celestialObject.altText || `Image of ${celestialObject.name}`,
    )
  }

  // Find matching content items for this object
  const matchingItems = contentItems.filter(
    (item) => item.celestialObject === object && (item.category === type || item.contentType === type),
  )

  // Try to get fallback from matching content items
  if (matchingItems.length > 0 && matchingItems[0].imageSrc) {
    return createFallbackSlide(
      matchingItems[0].imageSrc,
      matchingItems[0].title,
      matchingItems[0].altText || `Image of ${matchingItems[0].title}`,
    )
  }

  // Fall back to content type image
  return getSlidesWithFallback(type)
}

/**
 * Gets slides for a specific content item, with fallbacks
 */
export function getContentItemSlidesWithFallback(
  type: string,
  object: string,
  contentType: string,
  itemId: string,
  slides?: SlideImage[],
): SlideImage[] {
  // If we have slides, use them
  if (slides && slides.length > 0) {
    return slides
  }

  // Try to get the specific content item
  const contentItem = contentItems.find(
    (item) =>
      item.id === itemId &&
      item.celestialObject === object &&
      (item.category === type || item.contentType === type) &&
      item.contentType === contentType,
  )

  // If we have a content item with an image, use it
  if (contentItem?.imageSrc) {
    return createFallbackSlide(
      contentItem.imageSrc,
      contentItem.title,
      contentItem.altText || `Image of ${contentItem.title}`,
    )
  }

  // Try to get fallback from celestialObjects
  const celestialObject = getCelestialObjectById(object)
  if (celestialObject?.imageSrc) {
    return createFallbackSlide(
      celestialObject.imageSrc,
      celestialObject.name,
      celestialObject.altText || `Image of ${celestialObject.name}`,
    )
  }

  // Fall back to content type image
  const contentTypeInfo = contentTypes[contentType]
  if (contentTypeInfo?.imageSrc) {
    return createFallbackSlide(
      contentTypeInfo.imageSrc,
      contentTypeInfo.title,
      contentTypeInfo.altText || `Image of ${contentTypeInfo.title}`,
    )
  }

  // Last resort: fall back to category/type image
  return getSlidesWithFallback(type)
}
