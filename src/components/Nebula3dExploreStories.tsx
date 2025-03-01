import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Nebula3dExploreStoriesProps {
  isDarkMode: boolean
  nebula: string
}

export default function Nebula3dExploreStories({ isDarkMode, nebula }: Nebula3dExploreStoriesProps) {
  const nebulaName = nebula.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="flex flex-col items-center space-y-4 text-center">
        <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          Discover {nebulaName} Stories
        </h2>
        <p className={`mx-auto max-w-[700px] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} md:text-xl`}>
          Immerse yourself in captivating stories about the {nebulaName}.
        </p>
        <Button asChild className="mt-4 bg-purple-600 text-white hover:bg-purple-700">
          <Link href={`/planetary-nebulas/${nebula}/stories`}>
            Explore Stories
          </Link>
        </Button>
      </div>
    </section>
  )
}