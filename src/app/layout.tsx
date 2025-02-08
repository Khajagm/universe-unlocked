import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import React from 'react'; // Import React

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Planetary Nebulas Explorer',
  description: 'Explore the wonders of planetary nebulas in our universe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}