export interface Nebula {
    id: string
    name: string
    description: string
  }
  
  export const nebulas: Nebula[] = [
    {
      id: "cats-eye-nebula",
      name: "Cat's Eye Nebula",
      description: "The Cat's Eye Nebula is a planetary nebula in the constellation of Draco."
    },
    {
      id: "ring-nebula",
      name: "Ring Nebula",
      description: "The Ring Nebula is a planetary nebula in the northern constellation of Lyra."
    },
    {
      id: "helix-nebula",
      name: "Helix Nebula",
      description: "The Helix Nebula is a large planetary nebula located in the constellation Aquarius."
    },
    {
      id: "butterfly-nebula",
      name: "Butterfly Nebula",
      description: "The Butterfly Nebula is a bipolar planetary nebula in the constellation Scorpius."
    }
  ]