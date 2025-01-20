"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight, Rocket, Video, Music, BookOpen, Search, Star, Orbit, Globe, Zap, Sun, Moon } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  description: string
  icon: React.ElementType
  category: 'media' | 'science'
}

const contentItems: ContentItem[] = [
  { id: "3d-models", title: "3D Models", description: "Explore interactive 3D models of celestial objects", icon: Rocket, category: 'media' },
  { id: "videos", title: "Videos", description: "Watch stunning videos of space phenomena", icon: Video, category: 'media' },
  { id: "sonification", title: "Sonification", description: "Listen to the sounds of the universe", icon: Music, category: 'media' },
  { id: "stories", title: "Stories", description: "Read captivating stories about space exploration", icon: BookOpen, category: 'media' },
  { id: "black-holes", title: "Black Holes", description: "Discover the mysteries of black holes", icon: Star, category: 'science' },
  { id: "galaxies", title: "Galaxies", description: "Explore the vast expanse of galaxies", icon: Orbit, category: 'science' },
  { id: "planetary-nebulas", title: "Planetary Nebulas", description: "Witness the beauty of planetary nebulas", icon: Globe, category: 'science' },
  { id: "supernovas", title: "Supernovas", description: "Experience the power of supernovas", icon: Zap, category: 'science' },
]

const categories = {
  media: "Media",
  science: "Science Topics"
}

// Custom hook to manage theme
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    setIsDarkMode(storedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return { isDarkMode, toggleTheme }
}

export function BlockPage() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery, "in category:", selectedCategory)
  }

  const filteredItems = contentItems.filter(item => 
    (selectedCategory === "all" || item.category === selectedCategory) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className={`px-4 lg:px-6 h-14 flex items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <Link className="flex items-center justify-center" href="#">
          <Rocket className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className={`font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Universe Unlocked</span>
        </Link>
        <div className="ml-auto flex items-center space-x-2">
          <Switch
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
            className={`${isDarkMode ? 'bg-purple-400' : 'bg-gray-200'}`}
          />
          <span className="text-sm font-medium">
            {isDarkMode ? <Moon className="h-4 w-4 text-purple-400" /> : <Sun className="h-4 w-4 text-purple-600" />}
          </span>
        </div>
      </header>
      <main className="flex-1">
        <section className={`w-full py-12 md:py-24 lg:py-32 xl:py-48 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  Explore the Cosmos Like Never Before
                </h1>
                <p className={`mx-auto max-w-[700px] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} md:text-xl`}>
                  Embark on a journey through space and time with Universe Unlocked. Discover the wonders of our universe through interactive 3D models, stunning videos, cosmic sonification, and captivating stories.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className={isDarkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'}>
                  <Link href="#features">
                    Start Exploring
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className={isDarkMode ? 'border-purple-400 text-purple-400 hover:bg-purple-950' : 'border-purple-600 text-purple-600 hover:bg-purple-100'}>Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 mb-8">
              <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Unlock the Universe
              </h2>
              <form onSubmit={handleSearch} className="w-full max-w-sm space-y-2">
                <div className="flex items-center space-x-2">
                  <Select onValueChange={setSelectedCategory} defaultValue="all">
                    <SelectTrigger className={`w-[180px] ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="media">{categories.media}</SelectItem>
                      <SelectItem value="science">{categories.science}</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-grow">
                    <Input
                      type="search"
                      placeholder="Search the cosmos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'}`}
                    />
                    <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full">
                      <Search className={`h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                  <CardHeader>
                    <item.icon className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}>
                      {item.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                      <Link href={`/explore/${item.id}`}>
                        Explore {item.title}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className={`flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>© 2023 Universe Unlocked. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'} transition-colors`} href="#">
            Terms of Service
          </Link>
          <Link className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'} transition-colors`} href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}