import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Eye } from "lucide-react"
import type React from "react"

interface NebulaItem {
  id: string
  title: string
  description: string
  icon: React.ElementType
}

const nebulaItems: NebulaItem[] = [
  {
    id: "cats-eye-nebula",
    title: "Cat's Eye Nebula",
    description: "Explore the mesmerizing Cat's Eye Nebula",
    icon: Eye,
  },
  // Add more nebulas here as needed
]

interface CategoriesProps {
  isDarkMode: boolean
}

export default function CategoriesNebulas({ isDarkMode }: CategoriesProps) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nebulaItems.map((item) => (
            <Card key={item.id} className={isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}>
              <CardHeader>
                <item.icon className={`h-8 w-8 mb-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={isDarkMode ? "text-gray-300" : "text-gray-500"}>
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  <Link href={`/explore/${item.id}`}>Explore {item.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

