interface HomepageSlide {
    id: string;
    src: string;
    alt: string;
  }
  
  const homepageSlides: HomepageSlide[] = [
    {
      id: "slide1",
      src: "/vercel.svg",
      alt: "Space Image 1"
    },
    {
      id: "slide2",
      src: "/placeholder.svg",
      alt: "Space Image 2"
    },
    {
      id: "slide3",
      src: "/placeholder.svg",
      alt: "Space Image 3"
    }
  ]
  
  export default homepageSlides;