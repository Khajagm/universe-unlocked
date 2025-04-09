import {
  CuboidIcon,
  VideoIcon,
  MusicIcon,
  BookOpenIcon,
  StarIcon,
  AtomIcon,
  SparklesIcon,
  GlobeIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Remove the unused IconName import and create a proper type
export type IconName = "Cube" | "Video" | "Music" | "BookOpen" | "Star" | "Galaxy" | "Atom" | "Sparkles"

export interface ContentType {
  id: string
  title: string
  description: string
  iconName: IconName
  icon: LucideIcon
}

const contentTypes: Record<string, ContentType> = {
  "3d-models": {
    id: "3d-models",
    title: "3D Models",
    description: "Explore interactive 3D models of celestial objects.",
    iconName: "Cube",
    icon: CuboidIcon,
  },
  videos: {
    id: "videos",
    title: "Videos",
    description: "Watch captivating videos about space phenomena.",
    iconName: "Video",
    icon: VideoIcon,
  },
  sonification: {
    id: "sonification",
    title: "Sonification",
    description: "Experience the sounds of space through data sonification.",
    iconName: "Music",
    icon: MusicIcon,
  },
  stories: {
    id: "stories",
    title: "Stories",
    description: "Discover fascinating stories and facts about the universe.",
    iconName: "BookOpen",
    icon: BookOpenIcon,
  },
  "black-holes": {
    id: "black-holes",
    title: "Black Holes",
    description: "Dive into the mysteries of black holes.",
    iconName: "Star",
    icon: StarIcon,
  },
  galaxies: {
    id: "galaxies",
    title: "Galaxies",
    description: "Explore the vast collections of stars, gas, and dust.",
    iconName: "Galaxy",
    icon: GlobeIcon, // Using GlobeIcon as a substitute for Galaxy
  },
  "planetary-nebulas": {
    id: "planetary-nebulas",
    title: "Planetary Nebulas",
    description: "Witness the beautiful death throes of sun-like stars.",
    iconName: "Atom",
    icon: AtomIcon,
  },
  supernovas: {
    id: "supernovas",
    title: "Supernovas",
    description: "Observe the spectacular explosions of dying stars.",
    iconName: "Sparkles",
    icon: SparklesIcon,
  },
}

export default contentTypes
