import React from 'react'
import backgroundImg from '../../../../assets/phototune.ai_1788631093.png'

const BackgroundEffects = () => {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    />
  )
}

export default BackgroundEffects