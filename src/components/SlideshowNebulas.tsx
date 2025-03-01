"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const slides = [
  {
    url: '/placeholder.svg?height=400&width=800',
    alt: 'Cat\'s Eye Nebula',
    caption: 'The mesmerizing Cat\'s Eye Nebula'
  },
  {
    url: '/placeholder.svg?height=400&width=800',
    alt: 'Ring Nebula',
    caption: 'The iconic Ring Nebula'
  },
  {
    url: '/placeholder.svg?height=400&width=800',
    alt: 'Helix Nebula',
    caption: 'The stunning Helix Nebula'
  },
  {
    url: '/placeholder.svg?height=400&width=800',
    alt: 'Butterfly Nebula',
    caption: 'The beautiful Butterfly Nebula'
  },
]

export default function SlideshowNebulas() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [currentIndex])

  return (
    <div className="relative w-full h-[400px] mb-8 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={slides[currentIndex].url || "/placeholder.svg"}
          alt={slides[currentIndex].alt}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <p className="text-white text-2xl font-bold text-center px-4">{slides[currentIndex].caption}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}