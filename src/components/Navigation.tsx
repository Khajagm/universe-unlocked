"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import contentItems from "@/lib/contentItems"

// Helper function to get unique categories
const getUniqueCategories = () => {
  return Array.from(new Set(contentItems.map((item) => item.category)))
}

// Helper function to get unique content types
const getUniqueContentTypes = () => {
  const types = contentItems.map((item) => item.contentType)
  return Array.from(new Set(types))
}

// Helper function to get unique objects for a category
const getObjectsForCategory = (category: string) => {
  const objects = contentItems.filter((item) => item.category === category).map((item) => item.celestialObject)

  return Array.from(new Set(objects))
}

// Helper function to format display names
const formatDisplayName = (name: string) => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

type NavItemProps = {
  title: string
  href?: string
  isActive?: boolean
  isExpanded?: boolean
  onToggle?: () => void
  hasChildren?: boolean
  level?: number
  isDarkMode: boolean
}

const NavItem = ({
  title,
  href,
  isActive = false,
  isExpanded = false,
  onToggle,
  hasChildren = false,
  level = 0,
  isDarkMode,
}: NavItemProps) => {
  const bgColor = isActive ? (isDarkMode ? "bg-gray-700" : "bg-gray-200") : "bg-transparent"

  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
  const textColor = isDarkMode ? "text-white" : "text-gray-900"
  const paddingLeft = `pl-${level * 4 + 4}`

  return (
    <div className={`${bgColor} ${hoverBg} rounded-md transition-colors`}>
      <div className="flex items-center justify-between">
        {href ? (
          <Link href={href} className={`flex-grow py-2 ${paddingLeft} ${textColor} font-medium`}>
            {title}
          </Link>
        ) : (
          <button onClick={onToggle} className={`flex-grow text-left py-2 ${paddingLeft} ${textColor} font-medium`}>
            {title}
          </button>
        )}

        {hasChildren && (
          <button
            onClick={onToggle}
            className={`p-2 ${textColor} focus:outline-none`}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}

interface NavigationProps {
  isOpen: boolean
  toggleNav: () => void
}

export default function Navigation({ isOpen, toggleNav }: NavigationProps) {
  const pathname = usePathname()
  const { isDarkMode } = useTheme()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    categories: false,
    contentTypes: false,
  })
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const categories = getUniqueCategories()
  const contentTypes = getUniqueContentTypes()

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const textColor = isDarkMode ? "text-white" : "text-gray-900"

  return (
    <>
      {/* Navigation sidebar */}
      <div
        className={`
          ${bgColor} ${borderColor} ${textColor}
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 
          transform transition-transform duration-300 ease-in-out z-40
          border-r overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4">
          <div className="space-y-1">
            {/* Home link */}
            <NavItem title="Home" href="/" isActive={pathname === "/"} isDarkMode={isDarkMode} />

            {/* Categories section */}
            <NavItem
              title="Categories"
              hasChildren={true}
              isExpanded={expandedItems.categories}
              onToggle={() => toggleItem("categories")}
              isDarkMode={isDarkMode}
            />

            {expandedItems.categories && (
              <div className="ml-2 space-y-1 mt-1">
                {categories.map((category) => (
                  <div key={category}>
                    <NavItem
                      title={formatDisplayName(category)}
                      hasChildren={true}
                      isExpanded={expandedCategories[category]}
                      onToggle={() => toggleCategory(category)}
                      isActive={pathname === `/explore/${category}`}
                      href={`/explore/${category}`}
                      level={1}
                      isDarkMode={isDarkMode}
                    />

                    {expandedCategories[category] && (
                      <div className="ml-2 space-y-1 mt-1">
                        {getObjectsForCategory(category).map((object) => (
                          <NavItem
                            key={object}
                            title={formatDisplayName(object)}
                            href={`/explore/${category}/${object}`}
                            isActive={pathname === `/explore/${category}/${object}`}
                            level={2}
                            isDarkMode={isDarkMode}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Content Types section */}
            <NavItem
              title="Content Types"
              hasChildren={true}
              isExpanded={expandedItems.contentTypes}
              onToggle={() => toggleItem("contentTypes")}
              isDarkMode={isDarkMode}
            />

            {expandedItems.contentTypes && (
              <div className="ml-2 space-y-1 mt-1">
                {contentTypes.map((type) => (
                  <NavItem
                    key={type}
                    title={formatDisplayName(type)}
                    href={`/explore/${type}`}
                    isActive={pathname === `/explore/${type}`}
                    level={1}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleNav} />}
    </>
  )
}

