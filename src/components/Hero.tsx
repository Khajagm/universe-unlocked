import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'

interface HeroProps {
  title: string
  description: string
  icon: React.ReactNode
  isDarkMode: boolean
}

export function Hero({ title, description, icon, isDarkMode }: HeroProps) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
            <h1
              className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              {title}
            </h1>
            {icon}
          </div>
          <p className={`max-w-[900px] text-lg md:text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}