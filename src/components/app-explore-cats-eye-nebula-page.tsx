"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, SkipBack, Sun, Moon } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

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

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSliderChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const restart = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setCurrentTime(0)
    if (!isPlaying) {
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="w-full max-w-md">
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CatsEye%20Description-Zl7h9DERPsxQbvikykKajjQAulXvfF.mp3" />
      <div className="flex items-center justify-between mb-2">
        <Button onClick={togglePlay} variant="outline" size="icon" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button onClick={restart} variant="outline" size="icon" aria-label="Restart">
          <SkipBack className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <Slider
        value={[currentTime]}
        max={duration}
        step={0.1}
        onValueChange={handleSliderChange}
        aria-label="Audio progress"
      />
    </div>
  )
}

export function BlockPage() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <Link href="/planetary-nebulas" className="flex items-center text-purple-600 dark:text-purple-400">
            <ArrowLeft className="h-6 w-6 mr-2" />
            <span className="font-bold">Back</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            />
            {isDarkMode ? (
              <Moon className="h-4 w-4 text-purple-400" />
            ) : (
              <Sun className="h-4 w-4 text-purple-600" />
            )}
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-600 dark:text-purple-400">
                    Cat's Eye Nebula
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center p-6">
                  <figure className="relative w-full max-w-lg aspect-square rounded-lg overflow-hidden mb-6">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ar_catseye-fpwlxUEikzYzWuCmuNWfMgGG9wOPbu.png"
                      alt="The Cat's Eye Nebula, showing concentric rings of purple and pink gas with a bright central core"
                      fill
                      className="object-cover"
                      priority
                    />
                  </figure>
                  <AudioPlayer />
                  <p className="mt-6 text-center text-gray-700 dark:text-gray-300 md:text-lg">
                    Listen to the description of the Cat's Eye Nebula and explore its mesmerizing structure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <footer className="py-6 w-full border-t border-gray-200 dark:border-gray-700">
          <div className="container px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Universe Unlocked. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-xs text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}