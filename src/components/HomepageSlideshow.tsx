'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import homepageSlides from "@/lib/homepageSlides"

export default function HomepageSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % homepageSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-[calc(100vh-3.5rem)] overflow-hidden">
      {homepageSlides.map((slide, index) => (
        <Image
          key={slide.id} // Use the unique id as the key
          src={slide.src || "/placeholder.svg"}
          alt={slide.alt}
          fill
          style={{
            objectFit: 'cover',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Explore the Cosmos Like Never Before
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8">Universe Unlocked transforms complex scientific concepts into accessible, inspiring experiences, allowing each individual to truly connect with the mysteries of the Universe and discover its vast beauty on their own terms.</p>
        </div>
      </div>
    </section>
  )
}