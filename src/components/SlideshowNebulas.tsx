import { useState, useEffect } from "react"
import Image from "next/image"
import { Globe } from "lucide-react"

const slideshowImages = [
  "/placeholder.svg?height=1080&width=1920&text=Nebula+1",
  "/placeholder.svg?height=1080&width=1920&text=Nebula+2",
  "/placeholder.svg?height=1080&width=1920&text=Nebula+3",
  "/placeholder.svg?height=1080&width=1920&text=Nebula+4",
]

export default function SlideshowNebulas() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      {slideshowImages.map((image, index) => (
        <Image
          key={index}
          src={image || "/placeholder.svg"}
          alt={`Nebula ${index + 1}`}
          fill
          style={{
            objectFit: "cover",
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
        <Globe className="h-16 w-16 mb-4 text-purple-400" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-400 mb-4">
          Planetary Nebulas
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl text-center px-4">
          Witness the beauty and complexity of planetary nebulas, the remnants of dying stars that create some of the
          most stunning celestial objects in our universe.
        </p>
      </div>
    </section>
  )
}

