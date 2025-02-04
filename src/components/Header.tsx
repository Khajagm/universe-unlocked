'use client'

import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Rocket, Sun, Moon } from 'lucide-react'

interface HeaderProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

export function Header({ isDarkMode, toggleTheme }: HeaderProps) {
  return (
    <header className={`px-4 lg:px-6 h-14 flex items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <Link className="flex items-center justify-center" href="#">
        <Rocket className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <span className={`font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Universe Unlocked</span>
      </Link>
      <div className="ml-auto flex items-center space-x-2">
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          className={`${isDarkMode ? 'bg-purple-400' : 'bg-gray-200'}`}
        />
        <span className="text-sm font-medium">
          {isDarkMode ? <Moon className="h-4 w-4 text-purple-400" /> : <Sun className="h-4 w-4 text-purple-600" />}
        </span>
      </div>
    </header>
  )
}