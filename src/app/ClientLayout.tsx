"use client"

import type React from "react"
import { AnimatePresence } from "framer-motion"
import { ThemeProvider } from "@/contexts/ThemeContext"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </ThemeProvider>
  )
}

