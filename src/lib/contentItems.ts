// src/lib/contentItems.ts

export interface ContentItem {
    id: string;
    title: string;
    description: string;
    celestialObject: string;
    category: string;
    contentType: string;
    audioSrc?: string;
    videoSrc?: string;
    modelSrc?: string;
    imageSrc?: string;
    externalURL?: string;
  }

const contentItems: ContentItem[] = [
  // Planetary Nebulas
  { 
    id: "discovery-of-cats-eye-nebula", 
    title: "The Discovery of the Cat's Eye Nebula", 
    description: "Learn about the history and discovery of the Cat's Eye Nebula, one of the most complex planetary nebulae known to astronomers.",
    audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CatsEye%20Description-Zl7h9DERPsxQbvikykKajjQAulXvfF.mp3",
    celestialObject: "cats-eye",
    category: "planetary-nebulas",
    contentType: "stories"
  },
  { 
    id: "cats-eye-nebula-3d-model", 
    title: "Cat's Eye Nebula 3D Model", 
    description: "Explore an interactive 3D model of the Cat's Eye Nebula.",
    modelSrc: "/models/cats-eye-nebula.glb",
    celestialObject: "cats-eye",
    category: "planetary-nebulas",
    contentType: "3d-models"
  },
  { 
    id: "sounds-of-cats-eye-nebula", 
    title: "Sounds of the Cat's Eye Nebula", 
    description: "Listen to the sonification of data from the Cat's Eye Nebula.",
    audioSrc: "/audio/cats-eye-nebula-sonification.mp3",
    celestialObject: "cats-eye",
    category: "planetary-nebulas",
    contentType: "sonification"
  },
  { 
    id: "ring-nebula-formation-video", 
    title: "Ring Nebula Formation", 
    description: "Watch a video simulation of the Ring Nebula's formation over time.",
    videoSrc: "/videos/ring-nebula-formation.mp4",
    celestialObject: "ring",
    category: "planetary-nebulas",
    contentType: "videos"
  },
  { 
    id: "ring-nebula-3d-model", 
    title: "Ring Nebula 3D Model", 
    description: "Explore an interactive 3D model of the Ring Nebula.",
    modelSrc: "/models/ring-nebula.glb",
    celestialObject: "ring",
    category: "planetary-nebulas",
    contentType: "3d-models"
  },
  { 
    id: "eye-of-god-helix-nebula", 
    title: "The Eye of God: Helix Nebula", 
    description: "Discover why the Helix Nebula is often called 'The Eye of God'.",
    celestialObject: "helix",
    category: "planetary-nebulas",
    contentType: "stories"
  },
  { 
    id: "sounds-of-helix-nebula", 
    title: "Sounds of the Helix Nebula", 
    description: "Listen to the sonification of data from the Helix Nebula.",
    audioSrc: "/audio/helix-nebula-sonification.mp3",
    celestialObject: "helix",
    category: "planetary-nebulas",
    contentType: "sonification"
  },

  // Black Holes
  {
    id: "sagittarius-a-3d-model",
    title: "Sagittarius A* 3D Model",
    description: "Explore a 3D model of the supermassive black hole at the center of our galaxy.",
    modelSrc: "/models/sagittarius-a.glb",
    celestialObject: "sagittarius-a",
    category: "black-holes",
    contentType: "3d-models"
  },
  {
    id: "first-image-of-black-hole",
    title: "First Image of a Black Hole",
    description: "See the groundbreaking first image of a black hole, captured by the Event Horizon Telescope.",
    imageSrc: "/images/m87-black-hole.jpg",
    celestialObject: "m87",
    category: "black-holes",
    contentType: "stories",
    externalURL: "https://eventhorizontelescope.org/blog/astronomers-reveal-first-image-black-hole-heart-our-galaxy"
  },
  {
    id: "sound-of-colliding-black-holes",
    title: "Sound of Colliding Black Holes",
    description: "Listen to the gravitational waves produced by two merging black holes.",
    audioSrc: "/audio/black-hole-merger-sonification.mp3",
    celestialObject: "binary-black-hole",
    category: "black-holes",
    contentType: "sonification"
  },

  // Galaxies
  {
    id: "andromeda-galaxy-3d-model",
    title: "Andromeda Galaxy 3D Model",
    description: "Explore a detailed 3D model of our nearest spiral galaxy neighbor, Andromeda.",
    modelSrc: "/models/andromeda-galaxy.glb",
    celestialObject: "andromeda",
    category: "galaxies",
    contentType: "3d-models"
  },
  {
    id: "our-home-the-milky-way",
    title: "Our Home: The Milky Way",
    description: "Learn about the structure and history of our home galaxy, the Milky Way.",
    celestialObject: "milky-way",
    category: "galaxies",
    contentType: "stories",
    externalURL: "https://science.nasa.gov/resource/the-milky-way-galaxy/"
  },
  {
    id: "when-galaxies-collide",
    title: "When Galaxies Collide",
    description: "Watch a simulation of the future collision between the Milky Way and Andromeda galaxies.",
    videoSrc: "/videos/galaxy-collision.mp4",
    celestialObject: "milky-way-andromeda",
    category: "galaxies",
    contentType: "videos"
  },

  // Supernovas
  {
    id: "crab-nebula-3d-model",
    title: "Crab Nebula 3D Model",
    description: "Explore a 3D model of the Crab Nebula, the remnant of a supernova observed in 1054 AD.",
    modelSrc: "/models/crab-nebula.glb",
    celestialObject: "crab-nebula",
    category: "supernovas",
    contentType: "3d-models"
  },
  {
    id: "supernova-1987a-stellar-explosion",
    title: "Supernova 1987A: A Stellar Explosion",
    description: "Learn about Supernova 1987A, one of the closest observed supernovas in recent history.",
    celestialObject: "sn-1987a",
    category: "supernovas",
    contentType: "stories",
    externalURL: "https://hubblesite.org/contents/media/images/2017/08/3989-Image.html"
  },
  {
    id: "sound-of-a-supernova",
    title: "The Sound of a Supernova",
    description: "Listen to the sonification of data from a supernova explosion.",
    audioSrc: "/audio/supernova-sonification.mp3",
    celestialObject: "generic-supernova",
    category: "supernovas",
    contentType: "sonification"
  }
];

export default contentItems;