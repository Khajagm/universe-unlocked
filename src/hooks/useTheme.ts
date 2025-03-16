import { useState, useEffect } from "react"

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    setIsDarkMode(storedTheme === "dark")
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return { isDarkMode, toggleTheme }
}