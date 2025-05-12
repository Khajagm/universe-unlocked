interface HomepageSlide {
    id: string;
    src: string;
    alt: string;
  }
  
  const homepageSlides: HomepageSlide[] = [
    {
      id: "slide1",
      src: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/m/ar_catseye.jpg",
      alt: "Space Image 1"
    },
    {
      id: "slide2",
      src: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/sonify_casa_life.jpg",
      alt: "Space Image 2"
    },
    {
      id: "slide3",
      src: "https://fwaw7h413ibzbblr.public.blob.vercel-storage.com/assets/sgra_radio.jpg",
      alt: "Space Image 3"
    }
  ]
  
  export default homepageSlides;