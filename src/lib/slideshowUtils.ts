import type { SlideImage } from "@/lib/slideshowImages"
import contentTypes from "@/lib/contentTypes"
import contentItems from "@/lib/contentItems"

/**
 * Creates a fallback slide from an image source
 * @param imageSrc The image source URL
 * @param title Optional title for the slide caption
 * @param altText Optional alt text for accessibility
 * @returns An array with a single slide object
 */
export function createFallbackSlide(imageSrc: string, title?: string, altText?: string): SlideImage[] {
  return [
    {
      src: imageSrc,
      alt: altText || title || "Image",
      caption: title || "Image",
    },
  ]
}

/**
 * Gets slides for a specific type, with fallback to contentTypes image
 * @param type The content type
 * @param slides The existing slides array (if any)
 * @returns Slides array with fallback if needed
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
 * @param type The category or content type
 * @param object The celestial object
 * @param slides The existing slides array (if any)
 * @returns Slides array with fallback if needed
 */
export function getObjectSlidesWithFallback(type: string, object: string, slides?: SlideImage[]): SlideImage[] {
  // If we have slides, use them
  if (slides && slides.length > 0) {
    return slides
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
