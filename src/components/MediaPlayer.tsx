"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "@/contexts/ThemeContext"
import { getAssetUrl } from "@/lib/assetUtils"

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

  // Check if the source is an MP4 file - if so, treat as video even if isAudio is true
  const isMP4 = src.toLowerCase().endsWith(".mp4")
  const shouldRenderAsVideo = !isAudio || isMP4

  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    console.log("Setting up media player for:", src)

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime)
    }

    const handleDurationChange = () => {
      console.log("Duration changed:", media.duration)
      setDuration(media.duration)
      if (media.duration > 0) {
        setIsLoaded(true)
      }
    }

    const handleLoadedMetadata = () => {
      console.log("Loaded metadata, duration:", media.duration)
      setDuration(media.duration)
      setIsLoaded(true)
    }

    const handleLoadedData = () => {
      console.log("Loaded data")
      setIsLoaded(true)
    }

    const handleCanPlay = () => {
      console.log("Can play")
      setIsLoaded(true)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleError = (e: Event) => {
      console.error("Media error:", e)
    }

    media.addEventListener("timeupdate", handleTimeUpdate)
    media.addEventListener("durationchange", handleDurationChange)
    media.addEventListener("loadedmetadata", handleLoadedMetadata)
    media.addEventListener("loadeddata", handleLoadedData)
    media.addEventListener("canplay", handleCanPlay)
    media.addEventListener("ended", handleEnded)
    media.addEventListener("play", handlePlay)
    media.addEventListener("pause", handlePause)
    media.addEventListener("error", handleError)

    // Force load the media
    media.load()

    return () => {
      media.removeEventListener("timeupdate", handleTimeUpdate)
      media.removeEventListener("durationchange", handleDurationChange)
      media.removeEventListener("loadedmetadata", handleLoadedMetadata)
      media.removeEventListener("loadeddata", handleLoadedData)
      media.removeEventListener("canplay", handleCanPlay)
      media.removeEventListener("ended", handleEnded)
      media.removeEventListener("play", handlePlay)
      media.removeEventListener("pause", handlePause)
      media.removeEventListener("error", handleError)
    }
  }, [src])

  // Also set a timeout fallback to show controls after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Timeout fallback - showing controls")
      setIsLoaded(true)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause()
      } else {
        mediaRef.current.play()
      }
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
    if (!isFinite(time) || isNaN(time)) return "0:00"
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

  // Handle YouTube URLs
  if (src.includes("youtube.com") || src.includes("youtu.be")) {
    return (
      <div className="aspect-video max-h-[70vh]">
        <iframe
          src={src.replace("watch?v=", "embed/")}
          title={title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    )
  }

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {shouldRenderAsVideo && (
        <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            className="w-full h-full max-h-[70vh] object-contain"
            poster={getAssetUrl(poster)}
            preload="metadata"
          >
            <source src={getAssetUrl(src)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {!shouldRenderAsVideo && (
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{title || "Audio"}</h3>
          <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} preload="metadata">
            <source
              src={getAssetUrl(src)}
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
              <p className="text-xs mt-2">Source: {getAssetUrl(src)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
