export interface NebulaItem {
  id: string;
  title: string;
  description: string;
}

interface SonificationItem extends NebulaItem {
  videoSrc: string;
}

interface StoryItem extends NebulaItem {
  audioSrc: string;
}

interface NebulaItems {
  [key: string]: {
    "3d-models": NebulaItem[];
    "videos": NebulaItem[];
    "sonification": SonificationItem[];
    "stories": StoryItem[];
  };
}

const nebulaItems: NebulaItems = {
  "cats-eye": {
    "3d-models": [
      { id: "model1", title: "Cat's Eye 3D Model", description: "Explore an interactive 3D model of the Cat's Eye Nebula" }
    ],
    "videos": [
      { id: "video1", title: "Cat's Eye Nebula Flythrough", description: "Take a virtual journey through the Cat's Eye Nebula" }
    ],
    "sonification": [
      { 
        id: "sound1", 
        title: "Cat's Eye Nebula Sonification", 
        description: "When a star like the Sun begins to run out of helium to burn, it will blow off huge clouds of gas and dust. These outbursts can form spectacular structures such as the one seen in the Cat's Eye nebula.",
        videoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sonify3_catseye_optical-sxWb56AelGKpcEbN4Rco3osuOdhMaH.mp4"
      }
    ],
    "stories": [
      { 
        id: "story1", 
        title: "The Discovery of the Cat's Eye Nebula", 
        description: "Learn about the history and discovery of the Cat's Eye Nebula, one of the most complex planetary nebulae known to astronomers.",
        audioSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CatsEye%20Description-Zl7h9DERPsxQbvikykKajjQAulXvfF.mp3"
      }
    ]
  },
  "ring": {
    "3d-models": [
      { id: "model2", title: "Ring Nebula 3D Model", description: "Explore an interactive 3D model of the Ring Nebula" }
    ],
    "videos": [
      { id: "video2", title: "Ring Nebula Time-lapse", description: "Watch the Ring Nebula evolve over time" }
    ],
    "sonification": [
      { 
        id: "sound2", 
        title: "Ring Nebula Sonification", 
        description: "Experience the Ring Nebula through sound. This sonification translates the visual data of the Ring Nebula into an auditory experience.",
        videoSrc: "/placeholder-video.mp4"
      }
    ],
    "stories": [
      { 
        id: "story2", 
        title: "Myths and Legends of the Ring Nebula", 
        description: "Discover cultural stories and scientific insights inspired by the Ring Nebula's distinctive shape and appearance.",
        audioSrc: "/placeholder-audio.mp3"
      }
    ]
  },
  "helix": {
    "3d-models": [
      { id: "model3", title: "Helix Nebula 3D Model", description: "Interact with a detailed 3D model of the Helix Nebula" }
    ],
    "videos": [
      { id: "video3", title: "Helix Nebula in Different Wavelengths", description: "See how the Helix Nebula appears across the electromagnetic spectrum" }
    ],
    "sonification": [
      { 
        id: "sound3", 
        title: "Helix Nebula Sonification", 
        description: "Hear the cosmic symphony of the Helix Nebula. This sonification transforms the intricate structures of the Helix Nebula into a unique auditory experience.",
        videoSrc: "/placeholder-video.mp4"
      }
    ],
    "stories": [
      { 
        id: "story3", 
        title: "The Eye of God: Helix Nebula", 
        description: "Explore why the Helix Nebula is often called 'The Eye of God' and learn about its unique characteristics and scientific importance.",
        audioSrc: "/placeholder-audio.mp3"
      }
    ]
  }
};

export default nebulaItems;