// src/lib/contentItems.ts

export interface ContentItem {
  id: string
  title: string
  description: string
  celestialObject: string
  category: string
  contentType: string
  audioSrc?: string
  videoSrc?: string
  modelSrc?: string
  imageSrc?: string
  externalURL?: string
  altText?: string // Added altText to the interface
}

const contentItems: ContentItem[] = [
  // Planetary Nebulas
  {
    id: "cats-eye-nebula-stories",
    title: "Stories About the Cat's Eye Nebula",
    description:
      "Journey through the Cat's Eye Nebula as immersive storytelling reveals how this 3,000 light-year distant fossil record captures a dying star's final, beautiful transformation.",
    audioSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/cats_description_audio.mp3",
    celestialObject: "cats-eye",
    category: "planetary-nebulas",
    contentType: "stories",
  },
  {
    id: "cats-eye-nebula-3d-model",
    title: "Cat's Eye Nebula 3D Model",
    description:
      "Interact with our 3D model of the Cat's Eye Nebula to witness the mesmerizing layers and cosmic architecture of a star's magnificent final chapter.",
    modelSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/cats-eye-nebula.glb",
    externalURL: "https://chandra.si.edu/vr/ar/Tours/cats_eye/cats-eye-ar.html",
    celestialObject: "cats-eye",
    category: "planetary-nebulas",
    contentType: "3d-models",
  },
  {
    id: "cats-eye-nebula-sonification",
    title: "Sounds of the Cat's Eye Nebula",
    description:
      "Experience the Cat's Eye Nebula translated into sound, where stellar energies and gas formations become an otherworldly symphony of cosmic transitions.",
    audioSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/cats_comp.mp4",
    celestialObject: "cats-eye",
    category: "planetary-nebulas",
    contentType: "sonification",
  },
  {
    id: "cats-eye-nebula-videos",
    title: "Video Tour of the Cat's Eye Nebula",
    description:
      "A planetary nebula is a phase of stellar evolution that the sun should experience several billion years from now, when it expands to become a red giant.",
    videoSrc: "https://www.youtube.com/watch?v=rXiMWrNC6T0",
    celestialObject: "cats-eye",
    category: "planetary-nebulas",
    contentType: "videos",
  },
  {
    id: "cats-eye-nebula-images",
    title: "Images of the Cat's Eye Nebula",
    description: "Look at images of the Cat's Eye Nebula",
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/ar_catseye.jpg",
    altText:
      "The Cat's Eye Nebula is an image of an ethereal shape surrounded by concentric circles. The shape is a huge cloud of gas and dust blown off of a dying star. The concentric circles are bubbles expelled by the star over time. The dust cloud resembles a translucent pastry pulled to golden yellow points near our upper right and lower left, with a blob of bright purple jelly inside the bulbous pale blue core. The jelly-like center represents X-ray data from Chandra. The outer cloud and translucent circles represent visible light data from the Hubble Space Telescope.",
    celestialObject: "cats-eye",
    category: "planetary-nebulas",
    contentType: "images",
  },

  // Black Holes
  {
    id: "galactic-center-stories",
    title: "Stories About the Galactic Center",
    description: "Hear stories about our Galactic Center",
    audioSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/GalacticCenter_VisualDescription.mp3",
    celestialObject: "galactic-center",
    category: "black-holes",
    contentType: "stories",
  },
  {
    id: "galactic-center-sonification",
    title: "Sounds of the Galactic Center",
    description: "Listen to the Galactic Center's cosmic symphony",
    audioSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/galactic_all.mp4", // Fixed path structure
    celestialObject: "galactic-center",
    category: "black-holes",
    contentType: "sonification",
  },
  {
    id: "galactic-center-videos",
    title: "A 360 Visualization of the Galactic Center",
    description:
      "Explore our Galaxy's center from the black hole's perspective through this 360° visualization of stellar winds and superheated gas",
    videoSrc: "https://youtu.be/wBxW2_B9_Is?si=J3hQACoBKrJu2k0D",
    celestialObject: "galactic-center",
    category: "black-holes",
    contentType: "videos",
  },
  {
    id: "galactic-center-images",
    title: "Images of the Galactic Center",
    description: "Look at images of the Galactic Center",
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/sgra_radio.jpg",
    altText:
      "The image a close-up image of the space between the glowing light blue spots, courtesy of Chandra and NASA's Imaging X-ray Polarimetry Explorer (IXPE). Thin white lines layered onto the top panel frame the area being highlighted, and indicate that the perspective in the bottom panel has been rotated approximately 45 degrees to our right. In the bottom panel, dappled orange mist overlaps with cloudy indigo veins, and light purple specks. These patches of veiny mist are molecular clouds. By combining data from IXPE and Chandra, researchers have determined that the X-ray light in the clouds originated from Sagittarius A* during an outburst approximately 200 years ago.",
    celestialObject: "galactic-center",
    category: "black-holes",
    contentType: "images",
  },

  // Galaxies
  {
    id: "messier-51-stories", // Fixed typo in ID
    title: "Stories About Messier 51",
    description:
      "Journey through narrated tales of Messier 51, where majestic spiral arms craft new stars from cosmic dust.",
    audioSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/M51_VisualDescription.mp3",
    celestialObject: "messier-51",
    category: "galaxies",
    contentType: "stories",
  },
  {
    id: "messier-51-nebula-3d-model",
    title: "Messier 51 3D Model",
    description: "Download Messier 51's stunning spiral structure to explore or 3D print your own Whirlpool Galaxy.",
    modelSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/M51_ULS1_All_Edges_On.obj", // Added path prefix
    celestialObject: "messier-51",
    category: "galaxies",
    contentType: "3d-models",
  },
  {
    id: "messier-51-sonification",
    title: "Sounds of Messier 51",
    description:
      "Experience Messier 51's spiral arms translated into sound, where star formation and galactic rotation create a captivating sonic journey.",
    audioSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/m51_all_feb5.mp4",
    celestialObject: "messier-51",
    category: "galaxies",
    contentType: "sonification",
  },
  {
    id: "messier-51-videos",
    title: "Video Tour of Messier 51",
    description:
      "Like our own Milky Way, Messier 51 (the Whirlpool Galaxy) showcases magnificent spiral arms that serve as stellar nurseries, where compressed hydrogen gas transforms into brilliant new star clusters along its grand cosmic staircase structure.",
    videoSrc: "https://www.youtube.com/watch?v=-TRsoZBAXH0",
    celestialObject: "messier-51",
    category: "galaxies",
    contentType: "videos",
  },
  {
    id: "messier-51-images",
    title: "Images of Messier 51",
    description: "Look at images of Messier 51",
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/m51_comp.jpg",
    altText:
      "The composite image includes data from both X-ray and Optical light. It features the entirety of the M51 galaxy, which indeed resembles a swirling whirlpool in a black sea, viewed from above. At the core of the cloudy blue whirlpool is a bright white light from which wispy spiraling arms appear to swirl. The swirling arms are the color of red wine and resemble long tendrils of smoke. Along the lengths of the spiraling arms are specks of light in white and neon purple. One of the spiraling arms curves up toward our upper left. There, it appears to dissipate in a pool of pale purple light. Overlaid on one of the spiraling arms, to our right of the bright white core, is a box rendered in thin white lines. Inside this box is a speck of white light. Here, astronomers have detected the first evidence of a possible planet passing in front of a star outside of our Milky Way. In this small spot in the M51 galaxy, Astronomers and researchers have detected a dimming of X-rays from a system where a large star is in orbit around a small, dense neutron star or black hole. The dimming is interpreted as being a planet passing in front of the bright, dense object. For this release, that interpretation has been illustrated by an artist.",
    celestialObject: "messier-51",
    category: "galaxies",
    contentType: "images",
  },

  // Supernovas
  {
    id: "cassiopeia-a",
    title: "Stories About Cassiopeia A",
    description:
      "Explore the stories of Cassiopeia A where a massive star's violent end 350 years ago scattered cosmic debris across 10 light-years.",
    audioSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/CasA_description_audio.mp3", // Removed space in filename
    celestialObject: "cassiopeia-a",
    category: "supernovas", // Fixed category typo
    contentType: "stories",
  },
  {
    id: "cassiopeia-a-nebula-3d-model",
    title: "Cassiopeia A 3D Model",
    description:
      "Explore the stellar explosion of Cassiopeia A in immersive 3D, walking through the actual remnants of this 340-year-old supernova.",
    modelSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/cassiopeia-a.glb",
    externalURL: "https://chandra.si.edu/vr/casa/",
    celestialObject: "cassiopeia-a",
    category: "supernovas",
    contentType: "3d-models",
  },
  {
    id: "cassiopeia-a-sonification",
    title: "Sounds of Cassiopeia A",
    description:
      "Hear Cassiopeia A's stellar elements transform into musical notes, radiating outward from its central neutron star.",
    audioSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/mcasa_all.mp4",
    celestialObject: "cassiopeia-a",
    category: "supernovas",
    contentType: "sonification",
  },
  {
    id: "cassiopeia-a-videos",
    title: "Fly Through Cassiopeia A",
    description:
      "This video guides viewers through a stunning 3D visualization of Cassiopeia A, letting you soar through colorful layers of stellar debris while different elements create a cosmic symphony that intensifies as you approach the supernova's heart.",
    videoSrc: "https://www.youtube.com/watch?v=4EHzrRAW3ng",
    celestialObject: "cassiopeia-a",
    category: "supernovas",
    contentType: "videos",
  },
  {
    id: "cassiopeia-a-images",
    title: "Images of Cassiopeia A",
    description: "Look at images of Cassiopeia A", // Fixed incorrect description
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/sonify9_casa.jpg", // Added file extension
    altText:
      "This image of Cassiopeia A resembles a disk of electric light with red clouds, glowing white streaks, red and orange flames, and an area near the center of the remnant resembling a somewhat circular region of green lightning. X-rays from Chandra are blue and reveal hot gas, mostly from supernova debris from the destroyed star, and include elements like silicon and iron. X-rays are also present as thin arcs in the outer regions of the remnant. Infrared data from Webb is red, green, and blue. Webb highlights infrared emission from dust that is warmed up because it is embedded in the hot gas seen by Chandra, and from much cooler supernova debris. Hubble data shows a multitude of stars that permeate the field of view.",
    celestialObject: "cassiopeia-a", // Added celestialObject property
    category: "supernovas",
    contentType: "images",
  },
]

export default contentItems
