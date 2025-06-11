"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
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
  isTopLevel?: boolean
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
  isTopLevel = false,
}: NavItemProps) => {
  // Enhanced styling based on hierarchy
  const getItemStyles = () => {
    const baseTransition = "transition-all duration-100 ease-in-out"

    if (isTopLevel) {
      // Top level styling
      const activeBg = isActive
        ? isDarkMode
          ? "bg-purple-600/20 border-l-4 border-purple-400"
          : "bg-purple-100 border-l-4 border-purple-600"
        : "border-l-4 border-transparent"

      const hoverBg = isDarkMode
        ? "hover:bg-gray-700/60 hover:border-l-purple-400/50"
        : "hover:bg-gray-50 hover:border-l-purple-600/50"

      const textColor = isActive
        ? isDarkMode
          ? "text-purple-300"
          : "text-purple-700"
        : isDarkMode
          ? "text-white"
          : "text-gray-900"

      return `${baseTransition} ${activeBg} ${hoverBg} rounded-r-md font-semibold text-base py-2 px-4 ${textColor}`
    } else {
      // Sub-level styling - increased indentation for all sub-items
      const paddingLeft = level === 1 ? "pl-8" : "pl-12" // Increased indentation
      const activeBg = isActive ? (isDarkMode ? "bg-gray-700/60" : "bg-gray-100") : "bg-transparent"

      const hoverBg = isDarkMode ? "hover:bg-gray-700/40" : "hover:bg-gray-50"
      const textColor = isActive
        ? isDarkMode
          ? "text-purple-300"
          : "text-purple-600"
        : isDarkMode
          ? "text-gray-300"
          : "text-gray-700"

      return `${baseTransition} ${activeBg} ${hoverBg} rounded-md font-medium text-sm py-2 ${paddingLeft} ${textColor} px-2`
    }
  }

  return (
    <div className={`${getItemStyles()} group`}>
      <div className="flex items-center justify-between">
        {href ? (
          <Link href={href} className="flex-grow">
            {title}
          </Link>
        ) : (
          <button onClick={onToggle} className="flex-grow text-left">
            {title}
          </button>
        )}

        {/* Only show chevron for top-level items with children */}
        {hasChildren && isTopLevel && (
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-150"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${isExpanded ? "rotate-0" : "-rotate-90"} ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
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

  const bgColor = isDarkMode ? "bg-gray-900/95" : "bg-white/95"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const backdropBlur = "backdrop-blur-sm"

  return (
    <>
      {/* Navigation sidebar */}
      <div
        className={`
          ${bgColor} ${borderColor} ${backdropBlur}
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 
          transform transition-transform duration-300 ease-in-out z-40
          border-r overflow-y-auto shadow-lg
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 space-y-2">
          {/* Home link - Top Level */}
          <NavItem title="Home" href="/" isActive={pathname === "/"} isDarkMode={isDarkMode} isTopLevel={true} />

          {/* Categories section - Top Level */}
          <NavItem
            title="Categories"
            hasChildren={true}
            isExpanded={expandedItems.categories}
            onToggle={() => toggleItem("categories")}
            isDarkMode={isDarkMode}
            isTopLevel={true}
          />

          {/* Categories sub-items */}
          {expandedItems.categories && (
            <div className="space-y-1 mt-2">
              {categories.map((category) => (
                <div key={category} className="space-y-1">
                  {/* Category link - no chevron */}
                  <NavItem
                    title={formatDisplayName(category)}
                    href={`/explore/${category}`}
                    isActive={pathname === `/explore/${category}`}
                    level={1}
                    isDarkMode={isDarkMode}
                    hasChildren={false} // No chevron for category links
                    isTopLevel={false}
                  />

                  {/* Manually handle expansion for category objects */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-full text-left text-xs px-8 py-1 ${
                      isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                    } transition-colors`}
                  >
                    {expandedCategories[category] ? "Hide objects" : "Show objects"}
                  </button>

                  {/* Category objects */}
                  {expandedCategories[category] && (
                    <div className="space-y-1 mt-1">
                      {getObjectsForCategory(category).map((object) => (
                        <NavItem
                          key={object}
                          title={formatDisplayName(object)}
                          href={`/explore/${category}/${object}`}
                          isActive={pathname === `/explore/${category}/${object}`}
                          level={2}
                          isDarkMode={isDarkMode}
                          hasChildren={false}
                          isTopLevel={false}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Content Types section - Top Level */}
          <NavItem
            title="Content Types"
            hasChildren={true}
            isExpanded={expandedItems.contentTypes}
            onToggle={() => toggleItem("contentTypes")}
            isDarkMode={isDarkMode}
            isTopLevel={true}
          />

          {/* Content Types sub-items */}
          {expandedItems.contentTypes && (
            <div className="space-y-1 mt-2">
              {contentTypes.map((type) => (
                <NavItem
                  key={type}
                  title={formatDisplayName(type)}
                  href={`/explore/${type}`}
                  isActive={pathname === `/explore/${type}`}
                  level={1}
                  isDarkMode={isDarkMode}
                  hasChildren={false}
                  isTopLevel={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleNav}
        />
      )}
    </>
  )
}
