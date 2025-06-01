export interface CelestialObject {
    id: string
    name: string
    description: string
    category: string
    imageSrc?: string
    altText?: string
    // Additional properties we might want
    distance?: string
    constellation?: string
    discoveredBy?: string
    yearDiscovered?: number
  }
  
  const celestialObjects: CelestialObject[] = [
    // Planetary Nebulas
    {
      id: "cats-eye",
      name: "Cat's Eye Nebula",
      description:
        "The Cat's Eye Nebula (NGC 6543) is one of the most complex nebulae known, with intricate knots, jets, and arc-like features. Its structure is believed to be the result of a binary central star system.",
      category: "planetary-nebulas",
      imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/ar_catseye.jpg",
      altText:
        "The Cat's Eye Nebula showcases the intricate beauty of a dying star's final moments, with concentric shells of glowing gas creating mesmerizing patterns in space.",
      distance: "3,300 light-years",
      constellation: "Draco",
      discoveredBy: "William Herschel",
      yearDiscovered: 1786,
    },
  
    // Black Holes
    {
      id: "galactic-center",
      name: "Galactic Center",
      description:
        "The center of our Milky Way galaxy, home to the supermassive black hole Sagittarius A*. This region is dense with stars, gas, and cosmic phenomena.",
      category: "black-holes",
      imageSrc:
        "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/gcenter_chandra_ixpe-jCkrFiB4M96jmjuvKyOX07DcoVkOLi.jpg",
      altText:
        "This composite image depicting the center of our Milky Way galaxy features a row of bright spots and translucent swirls, set against a backdrop of purple and red clouds and stars.",
      distance: "26,000 light-years",
      constellation: "Sagittarius",
    },
  
    // Galaxies
    {
      id: "messier-51",
      name: "Messier 51 (Whirlpool Galaxy)",
      description:
        "The Whirlpool Galaxy is a grand design spiral galaxy interacting with a smaller companion galaxy. Its prominent spiral structure makes it one of the most photographed galaxies.",
      category: "galaxies",
      imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/sonify9_ngc6872-APDEbvYrpz5P4GMYfgMU4w7DrerdYb.jpg",
      altText:
        "The composite image includes data from both X-ray and Optical light. It features the entirety of the M51 galaxy, which indeed resembles a swirling whirlpool in a black sea, viewed from above.",
      distance: "23 million light-years",
      constellation: "Canes Venatici",
      discoveredBy: "Charles Messier",
      yearDiscovered: 1773,
    },
  
    // Supernovas
    {
      id: "cassiopeia-a",
      name: "Cassiopeia A",
      description:
        "Cassiopeia A is the remnant of a supernova explosion that occurred around 1680. It's one of the strongest radio sources in the sky and provides insights into stellar death and element formation.",
      category: "supernovas",
      imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/sonify9_casa-1YYsEv8QApP6DNjJgCCTCMGnnzXCTV.jpg",
      altText:
        "This image of Cassiopeia A resembles a disk of electric light with red clouds, glowing white streaks, red and orange flames, and an area near the center of the remnant resembling a somewhat circular region of green lightning.",
      distance: "11,000 light-years",
      constellation: "Cassiopeia",
      yearDiscovered: 1680,
    },
  ]
  
  export default celestialObjects
  
  // Helper functions
  export function getCelestialObjectsByCategory(category: string): CelestialObject[] {
    return celestialObjects.filter((obj) => obj.category === category)
  }
  
  export function getCelestialObjectById(id: string): CelestialObject | undefined {
    return celestialObjects.find((obj) => obj.id === id)
  }
  
  export function getUniqueCelestialObjectCategories(): string[] {
    return Array.from(new Set(celestialObjects.map((obj) => obj.category)))
  }
  