'use client'

import { useState, useEffect } from "react"
import Image from "next/image"

const slideImages = [
  "/vercel.svg",
]

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-[calc(100vh-3.5rem)] overflow-hidden">
      {slideImages.map((src, index) => (
        <Image
          key={src}
          src={src || "/placeholder.svg"}
          alt={`Space Image ${index + 1}`}
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
          <p className="text-xl sm:text-2xl text-gray-200 mb-8">
            Embark on a journey through space and time with Universe Unlocked. Discover the wonders of our universe through interactive 3D models, stunning videos, cosmic sonification, and captivating stories.
          </p>
        </div>
      </div>
    </section>
  )
}