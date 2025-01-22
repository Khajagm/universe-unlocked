"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Globe, Eye, Sun, Moon } from 'lucide-react'

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
    icon: Eye
  },
  // Add more nebulas here as needed
]

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return { isDarkMode, toggleTheme }
}

export default function PlanetaryNebulasPage() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className={`px-4 lg:px-6 h-14 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <Link href="/" className={`flex items-center ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="font-bold">Back to Home</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Switch
            id="theme-toggle"
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
          />
          <Label htmlFor="theme-toggle" className="sr-only">
            Toggle theme
          </Label>
          {isDarkMode ? (
            <Moon className="h-4 w-4 text-purple-400" />
          ) : (
            <Sun className="h-4 w-4 text-purple-600" />
          )}
        </div>
      </header>
      <main className="flex-1">
        <section className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Globe className={`h-16 w-16 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Planetary Nebulas
              </h1>
              <p className={`mx-auto max-w-[700px] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} md:text-xl`}>
                Witness the beauty and complexity of planetary nebulas, the remnants of dying stars that create some of the most stunning celestial objects in our universe.
              </p>
            </div>
          </div>
        </section>
        <section className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nebulaItems.map((item) => (
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
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>© 2024 Universe Unlocked. All rights reserved.</p>
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

