import { CuboidIcon, VideoIcon, MusicIcon, BookOpenIcon, ImageIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Updated IconName type to only include content types that have icons
export type IconName = "Cube" | "Video" | "Music" | "BookOpen" | "Image"

export interface ContentType {
  id: string
  title: string
  description: string
  iconName?: IconName // Made optional since not all types have icons
  icon?: LucideIcon // Made optional since not all types have icons
  imageSrc?: string
  altText?: string
}

const contentTypes: Record<string, ContentType> = {
  "3d-models": {
    id: "3d-models",
    title: "3D Models",
    description: "Explore interactive websites and 3D models.",
    iconName: "Cube",
    icon: CuboidIcon,
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/3dmodels-casa-2025-astro.jpg",
    altText:
      "Cassiopeia A is one of the most well-studied supernova remnants in our galaxy. It's the expanding shell of material from a massive star that exploded approximately 340 years ago (from our perspective on Earth). What we're seeing is the aftermath of this violent stellar death - hot gas expanding outward at tremendous speeds, creating the complex structures visible in the image. This particular visualization is a composite or enhanced image that combines data from different wavelengths to highlight the intricate structures of the remnant. The purple regions likely represent different elements or temperature zones within the expanding shell of debris.",
  },
  videos: {
    id: "videos",
    title: "Videos",
    description: "Watch captivating videos about space phenomena.",
    iconName: "Video",
    icon: VideoIcon,
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/snr1181.jpg",
    altText:
      "This image reveals SNR 1181, where a star's explosive death 800 years ago created a vibrant cosmic dandelion of magenta gas filaments radiating from a bright central core, surrounded by distant stars against the velvet darkness of space.",
  },
  sonification: {
    id: "sonification",
    title: "Sonification",
    description: "Experience the sounds of space through data sonification.",
    iconName: "Music",
    icon: MusicIcon,
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/sonify10_wr124.jpg",
    altText:
      "This image showcases a sonification visualization of astronomical data, translating visual elements into auditory experiences to provide a new way of understanding cosmic phenomena.",
  },
  stories: {
    id: "stories",
    title: "Stories",
    description: "Discover fascinating stories and facts about the universe.",
    iconName: "BookOpen",
    icon: BookOpenIcon,
    imageSrc:
      "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/3dmodels_cygnus_astro-jRFsDp7pgAD9SyBBe4qP9vLOSPV2wJ.jpg",
    altText:
      "This image showcases the breathtaking Wolf-Rayet star WR124, where brilliant blue star-spike patterns punctuate clouds of magenta and pink cosmic gas expanding outward like a celestial flower, revealing a massive dying star that will eventually collapse into a black hole, captured through multiple wavelengths of light.",
  },
  images: {
    id: "images",
    title: "Images",
    description: "Explore stunning visual imagery of cosmic phenomena and celestial objects.",
    iconName: "Image",
    icon: ImageIcon,
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/ar_catseye.jpg",
    altText:
      "The Cat's Eye Nebula showcases the intricate beauty of a dying star's final moments, with concentric shells of glowing gas creating mesmerizing patterns in space.",
  },
  "black-holes": {
    id: "black-holes",
    title: "Black Holes",
    description: "Stand at the edge of the event horizon, and embrace a journey of discovery.",
    imageSrc:
      "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/25th_gcenter-FfrFzlCP2DAZJc1Z1rClm2SQyJCZ38.jpg",
    altText:
      "This composite image depicting the center of our Milky Way galaxy features a row of bright spots and translucent swirls, set against a backdrop of purple and red clouds and stars. The clouds show hot gas seen with Chandra. The translucent threads, which are mysterious sources of radio waves, create clusters, streaks, and ribbons. Several of these distinct shapes resemble smoke trails captured on film. While most of the distinct swirls and bright spots sit in an orderly row across the middle of the image, one very bright spot sits at our lower righthand corner. This is the area around Sagittarius C, a bright star forming region, which here resembles a golden white orb ringed with hints of green.",
  },
  galaxies: {
    id: "galaxies",
    title: "Galaxies",
    description:
      "Opens your eyes to the universe's structure—gain insights into the origins of the cosmos, how stars and planets form, and how the universe evolves.",
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/sonify9_ngc6872.jpg",
    altText:
      "In this composite image, a large spiral galaxy has some of its superheated gas stolen by a smaller, nearby neighbor. Centered in the frame, NGC 6872 is a large spiral galaxy with two elongated arms that stretch toward our upper right and lower left. Near the white dot at the heart of the galaxy, a cloud of neon purple tints the arms, which appear steel blue at the tips. The purple represents hot gas detected by Chandra. Just to the upper left of NGC 6872 is a second spiral galaxy. Its spiraling arms are much smaller, but the bright white dot at its core is quite large, suggesting a supermassive black hole. Some of the steel blue matter and gas from NGC 6872's lower arm appears to be floating toward the smaller galaxy, likely pulled toward the supermassive black hole.",
  },
  "planetary-nebulas": {
    id: "planetary-nebulas",
    title: "Planetary Nebulas",
    description: "Explore planetary nebulae to understand the fascinating journey into the life cycle of stars.",
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/30dor.jpg",
    altText:
      "This image features a highly detailed composite image of a star-forming region of space known as 30 Doradus, shaped like a bouquet, or a maple leaf. In this image, the X-ray wind and gas takes the shape of a massive purple and pink bouquet with an extended central flower, or perhaps a leaf from a maple tree. The hazy, mottled shape occupies much of the image, positioned just to our left of center, tilted slightly to our left. Inside the purple and pink gas and wind cloud are red and orange veins, and pockets of bright white light. The pockets of white light represent clusters of young stars. One cluster at the heart of 30 Doradus houses the most massive stars astronomers have ever found. The hazy purple and pink bouquet is surrounded by glowing dots of green, white, orange, and red. A second mottled purple cloud shape, which resembles a ring of smoke, sits in our lower righthand corner.",
  },
  supernovas: {
    id: "supernovas",
    title: "Supernovas",
    description:
      "Witness one of the most powerful and awe-inspiring events in the universe—the explosive death of a massive star.",
    imageSrc: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/25th_g21.jpg",
    altText:
      "This composite image depicts a supernova remnant, which has a bright nebula at its core, surrounded by a cloud of X-rays detected with Chandra. Here, the nebula is represented by a small golden yellow dot at the center of the image. The dot appears to hover inside a tangle of light blue veins, which resemble a lightning cluster. Enveloping the nebula is the massive x-ray cloud, which occupies much of the image. Round in shape, the diffuse X-ray cloud is shown here in mottled neon purple. It represents the debris from the star destroyed in the supernova explosion.",
  },
}

export default contentTypes
