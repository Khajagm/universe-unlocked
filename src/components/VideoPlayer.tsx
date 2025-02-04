"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack } from 'lucide-react'

export const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSliderChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const restart = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    setCurrentTime(0)
    if (!isPlaying) {
      video.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="relative aspect-video mb-4">
        <video
          ref={videoRef}
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sonify3_catseye_optical-sxWb56AelGKpcEbN4Rco3osuOdhMaH.mp4"
          className="w-full h-full rounded-lg"
          playsInline
        />
      </div>
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
        aria-label="Video progress"
      />
    </div>
  )
}