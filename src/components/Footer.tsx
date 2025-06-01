'use client'

import Link from "next/link"

interface FooterProps {
  isDarkMode: boolean
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className={`flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>© 2025 Universe Unlocked. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'} transition-colors`} href="#">
          Terms of Service
        </Link>
        <Link className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'} transition-colors`} href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  )
}