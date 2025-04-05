"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SlideImage } from "@/lib/slideshowImages"

interface InteriorSlideshowProps {
  slides: SlideImage[]
  autoPlayInterval?: number
  isDarkMode?: boolean
}

export default function InteriorSlideshow({
  slides,
  autoPlayInterval = 5000,
  isDarkMode = false,
}: InteriorSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const prevSlide = useCallback(() => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }, [currentIndex, slides.length])

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }, [currentIndex, slides.length])

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (!isPlaying || isHovering || slides.length <= 1) return

    const slideInterval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(slideInterval)
  }, [isPlaying, isHovering, nextSlide, autoPlayInterval, slides.length])

  if (!slides || slides.length === 0) {
    return (
      <div className="relative w-full h-[600px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No slides available</p>
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-[600px] group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main slide image */}
      <div className="w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src || "/placeholder.svg"}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
        <p className="text-lg font-medium">{slides[currentIndex].caption}</p>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Play/Pause button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-16 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      {/* Dot indicators */}
      <div className="absolute bottom-16 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              slideIndex === currentIndex ? "bg-white" : "bg-white bg-opacity-50 hover:bg-opacity-75"
            } transition-all`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

