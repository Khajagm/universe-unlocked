"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "@/contexts/ThemeContext"

interface MediaPlayerProps {
  src: string
  poster?: string
  isAudio?: boolean
  title?: string
}

export default function MediaPlayer({ src, poster, isAudio = false, title }: MediaPlayerProps) {
  const { isDarkMode } = useTheme()
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(media.duration)
    }

    const handleLoadedMetadata = () => {
      setDuration(media.duration)
      setIsLoaded(true)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    media.addEventListener("timeupdate", handleTimeUpdate)
    media.addEventListener("durationchange", handleDurationChange)
    media.addEventListener("loadedmetadata", handleLoadedMetadata)
    media.addEventListener("ended", handleEnded)

    return () => {
      media.removeEventListener("timeupdate", handleTimeUpdate)
      media.removeEventListener("durationchange", handleDurationChange)
      media.removeEventListener("loadedmetadata", handleLoadedMetadata)
      media.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause()
      } else {
        mediaRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleSeek = (value: number[]) => {
    if (mediaRef.current) {
      const newTime = value[0]
      mediaRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const skipBackward = () => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = Math.max(0, mediaRef.current.currentTime - 10)
    }
  }

  const skipForward = () => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = Math.min(duration, mediaRef.current.currentTime + 10)
    }
  }

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {!isAudio && (
        <div className="relative">
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            className="w-full"
            poster={poster}
            preload="metadata"
          >
            <source src={src} type={src.endsWith(".mp4") ? "video/mp4" : "video/mp4"} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {isAudio && (
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{title || "Audio"}</h3>
          <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} preload="metadata">
            <source
              src={src}
              type={
                src.endsWith(".mp3")
                  ? "audio/mp3"
                  : src.endsWith(".wav")
                    ? "audio/wav"
                    : src.endsWith(".mp4")
                      ? "video/mp4"
                      : "audio/mpeg"
              }
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className={`p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} flex flex-col space-y-2`}>
        {isLoaded ? (
          <>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
            />

            <div className="flex justify-between text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={skipBackward} aria-label="Skip backward 10 seconds">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={skipForward} aria-label="Skip forward 10 seconds">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              <Button variant="ghost" size="icon" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex justify-center py-4">
            <div className="animate-pulse text-center">
              <p>Loading media...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
