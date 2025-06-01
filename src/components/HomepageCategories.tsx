"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface CategoryItem {
  id: string
  title: string
  description: string
  href: string
  imageSrc: string
  icon?: LucideIcon
}

interface HomepageCategoriesProps {
  title: string
  items: CategoryItem[]
  isDarkMode: boolean
}

export default function HomepageCategories({ title, items, isDarkMode }: HomepageCategoriesProps) {
  return (
    <section className={`py-12 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="container px-4 mx-auto">
        <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <div className="relative h-48">
                <Image src={item.imageSrc || "/placeholder.svg"} alt={item.title} fill style={{ objectFit: "cover" }} />
                {item.icon && (
                  <div className="absolute top-4 right-4 bg-purple-600 p-2 rounded-full">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  <Link href={item.href}>Explore</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
