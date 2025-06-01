"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { getAssetUrl } from "@/lib/assetUtils"

interface ImageItem {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: ImageItem[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const { isDarkMode } = useTheme()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openImage = (index: number) => {
    setSelectedImage(index)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage + 1) % images.length)
  }

  const prevImage = () => {
    if (selectedImage === null) return
    setSelectedImage((selectedImage - 1 + images.length) % images.length)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") closeImage()
  }

  return (
    <div className="w-full">
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative h-64 cursor-pointer rounded-lg overflow-hidden ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
            onClick={() => openImage(index)}
          >
            <Image
              src={getAssetUrl(image.src) || "/placeholder.svg"}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform hover:scale-105 duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeImage}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-full flex items-center justify-center">
              <img
                src={getAssetUrl(images[selectedImage].src) || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-[90vh] object-contain"
                onError={(e) => {
                  console.error("Image failed to load:", getAssetUrl(images[selectedImage].src))
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
            </div>

            {images[selectedImage].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
                {images[selectedImage].caption}
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full"
              onClick={closeImage}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </Button>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
