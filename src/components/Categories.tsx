'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Rocket, Video, Music, BookOpen, Star, Orbit, Globe, Zap } from 'lucide-react'
import React from 'react'; // Added import for React

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

interface CategoriesProps {
  isDarkMode: boolean
}

export function Categories({ isDarkMode }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredItems = contentItems.filter(item => 
    selectedCategory === "all" || item.category === selectedCategory
  )

  return (
    <section id="features" className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            Unlock the Universe
          </h2>
          <div className="w-full max-w-sm">
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
          </div>
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
  )
}