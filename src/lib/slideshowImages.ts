export interface SlideImage {
    src: string
    alt: string
    caption: string
  }
  
  // For content type pages (e.g., /explore/3d-models)
  export const contentTypeSlides: Record<string, SlideImage[]> = {
    "3d-models": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=3D%20Models",
        alt: "Interactive 3D models of celestial objects",
        caption: "Explore celestial objects in three dimensions",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Interactive%20Exploration",
        alt: "Interactive exploration of space objects",
        caption: "Manipulate and examine celestial objects from any angle",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Detailed%20Structures",
        alt: "Detailed structures of nebulas and galaxies",
        caption: "See the intricate details of cosmic structures",
      },
    ],
    videos: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Space%20Videos",
        alt: "Videos of space phenomena",
        caption: "Watch captivating videos of cosmic events",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Time-lapse%20Footage",
        alt: "Time-lapse footage of celestial events",
        caption: "Witness the evolution of celestial objects over time",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Educational%20Content",
        alt: "Educational space videos",
        caption: "Learn about the universe through visual storytelling",
      },
    ],
    sonification: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Space%20Sounds",
        alt: "Sonification of space data",
        caption: "Listen to the sounds of the cosmos",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Data%20to%20Sound",
        alt: "Converting astronomical data to sound",
        caption: "Experience astronomical data through your ears",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cosmic%20Symphony",
        alt: "Cosmic symphony of sounds",
        caption: "Immerse yourself in the symphony of the universe",
      },
    ],
    stories: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Space%20Stories",
        alt: "Stories about space exploration",
        caption: "Discover fascinating narratives about our cosmos",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Astronomical%20Discoveries",
        alt: "Stories of astronomical discoveries",
        caption: "Learn about groundbreaking discoveries in astronomy",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Human%20Connection",
        alt: "Human connection to space",
        caption: "Explore humanity's enduring relationship with the stars",
      },
    ],
    "black-holes": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Black%20Holes",
        alt: "Black holes in space",
        caption: "Explore the mysterious nature of black holes",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Event%20Horizons",
        alt: "Event horizons of black holes",
        caption: "The point of no return: event horizons explained",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Gravitational%20Waves",
        alt: "Gravitational waves from black holes",
        caption: "Detecting ripples in spacetime from black hole collisions",
      },
    ],
    galaxies: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Galaxies",
        alt: "Galaxies in the universe",
        caption: "Discover the vast collections of stars, gas, and dust",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Galaxy%20Types",
        alt: "Different types of galaxies",
        caption: "From spiral to elliptical: the diversity of galaxies",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Galaxy%20Formation",
        alt: "Galaxy formation and evolution",
        caption: "How galaxies form and evolve over cosmic time",
      },
    ],
    "planetary-nebulas": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Planetary%20Nebulas",
        alt: "Planetary nebulas in space",
        caption: "The beautiful death throes of sun-like stars",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Nebula%20Structures",
        alt: "Structures of planetary nebulas",
        caption: "The intricate shapes and patterns of planetary nebulas",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Stellar%20Evolution",
        alt: "Stellar evolution and planetary nebulas",
        caption: "Understanding stellar life cycles through planetary nebulas",
      },
    ],
    supernovas: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Supernovas",
        alt: "Supernova explosions",
        caption: "Witness the most powerful explosions in the universe",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Supernova%20Remnants",
        alt: "Supernova remnants",
        caption: "The aftermath of stellar explosions",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Element%20Creation",
        alt: "Element creation in supernovas",
        caption: "How supernovas forge the elements that make up our world",
      },
    ],
  }
  
  // For object pages (e.g., /explore/planetary-nebulas/cats-eye)
  export const objectSlides: Record<string, SlideImage[]> = {
    "cats-eye": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Nebula",
        alt: "Cat's Eye Nebula in visible light",
        caption: "The mesmerizing Cat's Eye Nebula captured by Hubble",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20X-Ray",
        alt: "Cat's Eye Nebula in X-ray",
        caption: "X-ray emissions from the hot central star",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Infrared",
        alt: "Cat's Eye Nebula in infrared",
        caption: "Infrared view revealing dust structures",
      },
    ],
    ring: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Ring%20Nebula",
        alt: "Ring Nebula in visible light",
        caption: "The iconic Ring Nebula (M57)",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Ring%20Nebula%20Detail",
        alt: "Detailed view of Ring Nebula",
        caption: "Close-up of the intricate structures",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Ring%20Nebula%20Composite",
        alt: "Composite image of Ring Nebula",
        caption: "Multi-wavelength view combining different observations",
      },
    ],
    helix: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Helix%20Nebula",
        alt: "Helix Nebula in visible light",
        caption: "The Eye of God: Helix Nebula",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Helix%20Nebula%20Knots",
        alt: "Knots in the Helix Nebula",
        caption: "Cometary knots in the Helix Nebula",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Helix%20Nebula%20Central%20Star",
        alt: "Central star of Helix Nebula",
        caption: "The dying star at the heart of the Helix Nebula",
      },
    ],
    butterfly: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Butterfly%20Nebula",
        alt: "Butterfly Nebula in visible light",
        caption: "The spectacular Butterfly Nebula",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Butterfly%20Nebula%20Wings",
        alt: "Wings of the Butterfly Nebula",
        caption: "The expanding gas wings of the Butterfly Nebula",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Butterfly%20Nebula%20Center",
        alt: "Center of the Butterfly Nebula",
        caption: "The energetic center of the Butterfly Nebula",
      },
    ],
    "sagittarius-a": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Sagittarius%20A*",
        alt: "Sagittarius A* black hole",
        caption: "The supermassive black hole at the center of our galaxy",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Sagittarius%20A*%20Radio",
        alt: "Radio image of Sagittarius A*",
        caption: "Radio observations of the galactic center",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Sagittarius%20A*%20Environment",
        alt: "Environment around Sagittarius A*",
        caption: "The dynamic environment surrounding our galaxy's black hole",
      },
    ],
    m87: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=M87%20Black%20Hole",
        alt: "M87 black hole",
        caption: "The first-ever image of a black hole in M87",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=M87%20Galaxy",
        alt: "M87 galaxy",
        caption: "The elliptical galaxy M87 hosting the supermassive black hole",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=M87%20Jet",
        alt: "Relativistic jet from M87",
        caption: "The powerful jet emanating from M87's black hole",
      },
    ],
    andromeda: [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Andromeda%20Galaxy",
        alt: "Andromeda Galaxy",
        caption: "Our nearest spiral galaxy neighbor",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Andromeda%20Structure",
        alt: "Structure of Andromeda Galaxy",
        caption: "The spiral arms and galactic structure of Andromeda",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Andromeda%20Collision",
        alt: "Future collision with Andromeda",
        caption: "Visualization of the future Milky Way-Andromeda collision",
      },
    ],
    "milky-way": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Milky%20Way",
        alt: "Milky Way Galaxy",
        caption: "Our home galaxy: the Milky Way",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Milky%20Way%20Center",
        alt: "Center of the Milky Way",
        caption: "The bustling galactic center of the Milky Way",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Milky%20Way%20Arms",
        alt: "Spiral arms of the Milky Way",
        caption: "The spiral structure of our galaxy",
      },
    ],
    "crab-nebula": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Crab%20Nebula",
        alt: "Crab Nebula supernova remnant",
        caption: "The Crab Nebula: remnant of a supernova observed in 1054 AD",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Crab%20Nebula%20Pulsar",
        alt: "Pulsar in the Crab Nebula",
        caption: "The rapidly spinning neutron star at the heart of the Crab Nebula",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Crab%20Nebula%20Filaments",
        alt: "Filaments in the Crab Nebula",
        caption: "The intricate filamentary structure of the expanding gas",
      },
    ],
    "sn-1987a": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Supernova%201987A",
        alt: "Supernova 1987A",
        caption: "Supernova 1987A: one of the closest observed supernovas in recent history",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=SN%201987A%20Rings",
        alt: "Rings around SN 1987A",
        caption: "The mysterious rings surrounding Supernova 1987A",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=SN%201987A%20Evolution",
        alt: "Evolution of SN 1987A",
        caption: "The changing appearance of SN 1987A over decades",
      },
    ],
  }
  
  // For individual content items
  export const contentItemSlides: Record<string, SlideImage[]> = {
    "discovery-of-cats-eye-nebula": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Discovery",
        alt: "Discovery of the Cat's Eye Nebula",
        caption: "The historical discovery of the Cat's Eye Nebula",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Observations",
        alt: "Early observations of Cat's Eye Nebula",
        caption: "Early telescopic observations of this fascinating object",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Modern%20View",
        alt: "Modern view of Cat's Eye Nebula",
        caption: "How modern technology has transformed our understanding",
      },
    ],
    "cats-eye-nebula-3d-model": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%203D%20Model",
        alt: "3D model of Cat's Eye Nebula",
        caption: "Interactive 3D model revealing the nebula's structure",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Layers",
        alt: "Layers of the Cat's Eye Nebula model",
        caption: "Exploring the different layers of the nebula in 3D",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Visualization",
        alt: "Visualization techniques for the Cat's Eye Nebula",
        caption: "Advanced visualization techniques for complex astronomical data",
      },
    ],
    "sounds-of-cats-eye-nebula": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Sonification",
        alt: "Sonification of Cat's Eye Nebula data",
        caption: "Translating visual data into sound",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Audio%20Mapping",
        alt: "Audio mapping of Cat's Eye Nebula",
        caption: "How different features are mapped to different sounds",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Cat's%20Eye%20Sound%20Experience",
        alt: "Sound experience of Cat's Eye Nebula",
        caption: "The immersive audio experience of cosmic data",
      },
    ],
    "ring-nebula-formation-video": [
      {
        src: "/placeholder.svg?height=600&width=1200&text=Ring%20Nebula%20Formation",
        alt: "Formation of the Ring Nebula",
        caption: "Video simulation of the Ring Nebula's formation",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Ring%20Nebula%20Evolution",
        alt: "Evolution of the Ring Nebula",
        caption: "The evolutionary stages of the Ring Nebula",
      },
      {
        src: "/placeholder.svg?height=600&width=1200&text=Ring%20Nebula%20Future",
        alt: "Future of the Ring Nebula",
        caption: "Predictions for the future development of the nebula",
      },
    ],
  }
  
  