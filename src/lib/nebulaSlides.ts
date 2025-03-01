interface NebulaSlide {
    src: string;
    alt: string;
  }
  
  const nebulaSlides: { [key: string]: NebulaSlide[] } = {
    "cats-eye-nebula": [
      {
        src: "/images/cats-eye-1.jpg",
        alt: "Cat's Eye Nebula - Hubble Image"
      },
      {
        src: "/images/cats-eye-2.jpg",
        alt: "Cat's Eye Nebula - Infrared View"
      },
      {
        src: "/images/cats-eye-3.jpg",
        alt: "Cat's Eye Nebula - Composite Image"
      }
    ],
    "ring-nebula": [
      {
        src: "/images/ring-1.jpg",
        alt: "Ring Nebula - Visible Light"
      },
      {
        src: "/images/ring-2.jpg",
        alt: "Ring Nebula - Infrared View"
      },
      {
        src: "/images/ring-3.jpg",
        alt: "Ring Nebula - X-ray Image"
      }
    ],
    "helix-nebula": [
      {
        src: "/images/helix-1.jpg",
        alt: "Helix Nebula - Full View"
      },
      {
        src: "/images/helix-2.jpg",
        alt: "Helix Nebula - Close-up of Central Star"
      },
      {
        src: "/images/helix-3.jpg",
        alt: "Helix Nebula - Infrared Image"
      }
    ]
  };
  
  export default nebulaSlides;