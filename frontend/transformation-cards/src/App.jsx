import TransformationGrid from './components/TransformationGrid'
import CustomCursor from './components/CustomCursor'
import BackgroundEffects from './components/BackgroundEffects'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-100">
      <BackgroundEffects />
      <CustomCursor />
      <TransformationGrid />
    </div>
  )
}

export default App