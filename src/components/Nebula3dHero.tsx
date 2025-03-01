import Image from "next/image"
import { Globe } from 'lucide-react'
import nebulaItems from "@/lib/nebulaItems"

interface Nebula3dHeroProps {
  nebula: string
}

export default function Nebula3dHero({ nebula }: Nebula3dHeroProps) {
  const nebulaData = nebulaItems[nebula]
  const nebulaName = nebula.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <section className="relative h-[70vh] overflow-hidden">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt={`${nebulaName} 3D Models`}
        fill
        style={{
          objectFit: 'cover',
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 container mx-auto px-4 max-w-4xl">
          <Globe className="h-16 w-16 text-purple-400 mx-auto" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
            {nebulaName} 3D Models
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-200 text-xl md:text-2xl">
            Discover the mesmerizing {nebulaName} through interactive 3D models and augmented reality experiences.
          </p>
        </div>
      </div>
    </section>
  )
}