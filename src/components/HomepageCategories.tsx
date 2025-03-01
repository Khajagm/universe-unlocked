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
import homepageContentItems, { homepageCategories } from "@/lib/homepageContentItems"

interface HomepageCategoriesProps {
  isDarkMode: boolean
}

export default function HomepageCategories({ isDarkMode }: HomepageCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredItems = homepageContentItems.filter(item => 
    selectedCategory === "all" || item.category === selectedCategory
  )

  return (
    <section id="features" className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container-centered">
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
                <SelectItem value="media">{homepageCategories.media}</SelectItem>
                <SelectItem value="science">{homepageCategories.science}</SelectItem>
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
                  <Link href={`${item.id}`}>
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