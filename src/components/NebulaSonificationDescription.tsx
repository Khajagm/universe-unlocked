import React from 'react'
import nebulaItems from "@/lib/nebulaItems"

interface NebulaSonificationDescriptionProps {
  nebula: string
  isDarkMode: boolean
}

export default function NebulaSonificationDescription({ nebula, isDarkMode }: NebulaSonificationDescriptionProps) {
  const currentNebula = nebulaItems[nebula]
  const nebulaName = nebula.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className={`mt-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} md:text-lg space-y-4`}>
      <p>
        {currentNebula.sonification[0].description}
      </p>
      <p>
        This image of the {nebulaName} contains both X-rays from Chandra around the center and visible light data from 
        the Hubble Space Telescope, which show the series of structures expelled by the star over time.
      </p>
      <p>
        To listen to these data, there is a radar-like scan that moves clockwise emanating from the center point to produce pitch. 
        Light that is further from the center is heard as higher pitches while brighter light is louder. The X-rays are represented 
        by a harsher sound, while the visible light data sound smoother.
      </p>
      <p>
        The circular structures create a constant hum, interrupted by a few sounds from features in the data. The rising and falling 
        pitches that can be heard are due to the radar scan passing across the shells and jets in the nebula.
      </p>
    </div>
  )
}