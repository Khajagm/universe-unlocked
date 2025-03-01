import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Box, Glasses } from 'lucide-react'
import React from 'react'

interface CategoryItem {
  id: string
  title: string
  description: string
  icon: React.ElementType
}

const categoryItems: CategoryItem[] = [
  { 
    id: "web-interactive", 
    title: "Web Interactive", 
    description: "Explore the nebula through interactive web experiences", 
    icon: Box
  },
  { 
    id: "augmented-reality", 
    title: "Augmented Reality", 
    description: "Experience the nebula in augmented reality", 
    icon: Glasses
  },
]

interface Nebula3dCategoriesProps {
  isDarkMode: boolean
  nebula: string
}

export default function Nebula3dCategories({ isDarkMode, nebula }: Nebula3dCategoriesProps) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryItems.map((item) => (
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
                <Link href={`/planetary-nebulas/${nebula}/3d-models/${item.id}`}>
                  Explore {item.title}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}