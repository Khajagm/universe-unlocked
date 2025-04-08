"use client"

import { useEffect } from "react"

export function ThemeScript() {
  useEffect(() => {
    // This script runs on the client after hydration
    const script = document.createElement("script")
    script.innerHTML = `
      (function() {
        try {
          const storedTheme = localStorage.getItem("theme")
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
          const theme = storedTheme ? storedTheme : (prefersDark ? "dark" : "light")
          
          if (theme === "dark") {
            document.documentElement.classList.add("dark")
          } else {
            document.documentElement.classList.remove("dark")
          }
        } catch (e) {
          console.error("Theme initialization failed:", e)
        }
      })()
    `
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}

