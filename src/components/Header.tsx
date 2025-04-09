"use client"
import { Switch } from "@/components/ui/switch"
import { Rocket, Sun, Moon } from "lucide-react"

interface HeaderProps {
  isDarkMode: boolean
  toggleTheme: () => void
  toggleNav?: () => void
}

export default function Header({ isDarkMode, toggleTheme, toggleNav }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-14 flex items-center border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="flex items-center justify-center cursor-pointer" onClick={toggleNav}>
        <Rocket className={`h-6 w-6 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
        <span className={`font-bold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>Universe Unlocked</span>
      </div>
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

