"use client"
import { Switch } from "@/components/ui/switch"
import { Rocket, Sun, Moon, ArrowLeft } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isDarkMode: boolean
  toggleTheme: () => void
  toggleNav?: () => void
}

export default function Header({ isDarkMode, toggleTheme, toggleNav }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Show back button on all pages except homepage
  const showBackButton = pathname !== "/"

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to homepage if no history
      router.push("/")
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-14 flex items-center border-b ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Logo section */}
      <div className="flex items-center justify-center cursor-pointer" onClick={toggleNav}>
        <Rocket className={`h-6 w-6 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
        <span className={`font-bold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>Universe Unlocked</span>
      </div>

      {/* Back button - positioned after logo */}
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className={`ml-4 ${
            isDarkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          } transition-colors`}
          aria-label="Go back to previous page"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Back</span>
        </Button>
      )}

      {/* Theme toggle - positioned at the right */}
      <div className="ml-auto flex items-center space-x-2">
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          className={`${isDarkMode ? "bg-purple-400" : "bg-gray-200"}`}
        />
        <span className="text-sm font-medium">
          {isDarkMode ? <Moon className="h-4 w-4 text-purple-400" /> : <Sun className="h-4 w-4 text-purple-600" />}
        </span>
      </div>
    </header>
  )
}
