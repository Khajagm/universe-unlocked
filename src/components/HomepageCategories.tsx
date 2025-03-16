// src/components/HomepageCategories.tsx

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CategoryItem {
  id: string
  title: string
  description: string
  href: string
  imageSrc: string
}

interface HomepageCategoriesProps {
  title: string
  items: CategoryItem[]
  isDarkMode: boolean
}

export default function HomepageCategories({ title, items, isDarkMode }: HomepageCategoriesProps) {
  return (
    <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className={`relative overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.imageSrc || "/placeholder.svg"}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-50"
                />
              </div>
              <div className="relative z-10">
                <CardHeader>
                  <CardTitle className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    <Link href={item.href}>
                      Explore {item.title}
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}