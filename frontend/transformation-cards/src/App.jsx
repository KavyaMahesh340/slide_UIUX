import { useState } from 'react'
import TransformationGrid from './components/TransformationGrid'
import CustomCursor from './components/CustomCursor'
import BackgroundEffects from './components/BackgroundEffects'
import Floating3D from './components/Floating3D'

function App() {
  const [activeBg, setActiveBg] = useState(null)

  return (
    <div className="min-h-screen text-slate-100">
      <BackgroundEffects activeBg={activeBg} />
      <Floating3D />
      <CustomCursor />
      <TransformationGrid onCardHover={setActiveBg} />
    </div>
  )
}

export default App