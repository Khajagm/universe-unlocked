"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { VideoPlayer } from "@/components/VideoPlayer"

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    setIsDarkMode(storedTheme === 'dark')
    document.documentElement.classList.toggle('dark', storedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark')
    document.documentElement.classList.toggle('dark', !isDarkMode)
  }

  return { isDarkMode, toggleTheme }
}

export default function CatsEyeNebulaSonificationPage() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-600 dark:text-purple-400">
                    Cat's Eye Nebula Sonification
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center p-6">
                  <VideoPlayer />
                  <div className="mt-6 text-gray-700 dark:text-gray-300 md:text-lg space-y-4">
                    <p>
                      When a star like the Sun begins to run out of helium to burn, it will blow off huge clouds of gas and dust. 
                      These outbursts can form spectacular structures such as the one seen in the Cat's Eye nebula.
                    </p>
                    <p>
                      This image of the Cat's Eye contains both X-rays from Chandra around the center and visible light data from 
                      the Hubble Space Telescope, which show the series of bubbles expelled by the star over time.
                    </p>
                    <p>
                      To listen to these data, there is a radar-like scan that moves clockwise emanating from the center point to produce pitch. 
                      Light that is further from the center is heard as higher pitches while brighter light is louder. The X-rays are represented 
                      by a harsher sound, while the visible light data sound smoother.
                    </p>
                    <p>
                      The circular rings create a constant hum, interrupted by a few sounds from spokes in the data. The rising and falling 
                      pitches that can be heard are due to the radar scan passing across the shells and jets in the nebula.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}