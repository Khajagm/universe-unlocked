import React from 'react';
import { Rocket, Video, Music, BookOpen, Star, Orbit, Globe, Zap } from 'lucide-react'

interface HomepageContentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: 'media' | 'science';
}

const homepageContentItems: HomepageContentItem[] = [
  { id: "3d-models", title: "3D Models", description: "Explore interactive 3D models of celestial objects", icon: Rocket, category: 'media' },
  { id: "videos", title: "Videos", description: "Watch stunning videos of space phenomena", icon: Video, category: 'media' },
  { id: "sonification", title: "Sonification", description: "Listen to the sounds of the universe", icon: Music, category: 'media' },
  { id: "stories", title: "Stories", description: "Read captivating stories about space exploration", icon: BookOpen, category: 'media' },
  { id: "black-holes", title: "Black Holes", description: "Discover the mysteries of black holes", icon: Star, category: 'science' },
  { id: "galaxies", title: "Galaxies", description: "Explore the vast expanse of galaxies", icon: Orbit, category: 'science' },
  { id: "planetary-nebulas", title: "Planetary Nebulas", description: "Witness the beauty of planetary nebulas", icon: Globe, category: 'science' },
  { id: "supernovas", title: "Supernovas", description: "Experience the power of supernovas", icon: Zap, category: 'science' },
]

export const homepageCategories = {
  media: "Media",
  science: "Science Topics"
}

export default homepageContentItems;