import React from 'react'
import { motion } from 'framer-motion'
import backgroundImg from '../../../../assets/phototune.ai_1788631093.jpg'
import defaultImg from '../../../../assets/default-landscape.jpeg'
import morningImg from '../../../../assets/Morning.jpeg'
import manualImg from '../../../../assets/manuall-landscape.jpeg'

const bgImages = {
  morning: morningImg,
  manual: manualImg,
  default: backgroundImg,
}

// Diagonal band polygon. o = sweep offset (%), topW = band width at top, slant = bottom offset.
const band = (o, topW, slant) =>
  `polygon(${o}% 0%, ${o + topW}% 0%, ${o + topW + slant}% 100%, ${o + slant}% 100%)`

const slabs = [
  { topW: 62, slant: 34, duration: 1.0, delay: 0 },
  { topW: 46, slant: 26, duration: 1.05, delay: 0.12 },
  { topW: 54, slant: 30, duration: 1.1, delay: 0.24 },
]

const BrushBackground = ({ image, active }) => {
  if (!image) return null
  const imgStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.78)',
  }
  return (
    <div className="absolute inset-0">
      {/* Paint passes - each sweeps diagonally across and fills the screen */}
      {slabs.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ ...imgStyle, willChange: 'clip-path' }}
          initial={{ clipPath: band(-140, s.topW, s.slant) }}
          animate={{ clipPath: active ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : band(-140, s.topW, s.slant) }}
          transition={{ duration: s.duration, ease: [0.16, 1, 0.3, 1], delay: s.delay }}
        />
      ))}
    </div>
  )
}

const BackgroundEffects = ({ activeBg }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Default base background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${defaultImg})`, filter: 'brightness(0.78)' }}
      />
      <BrushBackground image={bgImages[activeBg]} active={!!activeBg} />
      <div className="absolute inset-0 bg-slate-950/55" />
    </div>
  )
}

export default BackgroundEffects