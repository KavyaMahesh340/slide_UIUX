import TransformationGrid from './components/TransformationGrid'
import CustomCursor from './components/CustomCursor'
import BackgroundEffects from './components/BackgroundEffects'

function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <BackgroundEffects />
      <CustomCursor />
      <TransformationGrid />
    </div>
  )
}

export default App