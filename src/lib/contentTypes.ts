import { ImageIcon as IconName } from 'lucide-react'

export interface ContentType {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

const contentTypes: Record<string, ContentType> = {
  "3d-models": { 
    id: "3d-models", 
    title: "3D Models", 
    description: "Explore interactive 3D models of celestial objects.", 
    iconName: "Cube"
  },
  "videos": { 
    id: "videos", 
    title: "Videos", 
    description: "Watch captivating videos about space phenomena.", 
    iconName: "Video"
  },
  "sonification": { 
    id: "sonification", 
    title: "Sonification", 
    description: "Experience the sounds of space through data sonification.", 
    iconName: "Music"
  },
  "stories": { 
    id: "stories", 
    title: "Stories", 
    description: "Discover fascinating stories and facts about the universe.", 
    iconName: "BookOpen"
  },
  "black-holes": { 
    id: "black-holes", 
    title: "Black Holes", 
    description: "Dive into the mysteries of black holes.", 
    iconName: "Star"
  },
  "galaxies": { 
    id: "galaxies", 
    title: "Galaxies", 
    description: "Explore the vast collections of stars, gas, and dust.", 
    iconName: "Galaxy"
  },
  "planetary-nebulas": { 
    id: "planetary-nebulas", 
    title: "Planetary Nebulas", 
    description: "Witness the beautiful death throes of sun-like stars.", 
    iconName: "Atom"
  },
  "supernovas": { 
    id: "supernovas", 
    title: "Supernovas", 
    description: "Observe the spectacular explosions of dying stars.", 
    iconName: "Sparkles"
  },
};

export default contentTypes;