import { useEffect, useRef, useState } from 'react'
import TransformationColumn from './TransformationColumn'
import { gridCards } from '../data/cards'

const COLUMNS = [0, 1, 2].map((n) => ({
  cards: gridCards.filter((c) => c.column === n + 1),
}))

export default function TransformationGrid() {
  // Single column-based state: null | 0 | 1 | 2
  const [activeColumn, setActiveColumn] = useState(null)
  const gridRef = useRef(null)

  useEffect(() => {
    if (activeColumn === null) return undefined

    const onPointer = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) setActiveColumn(null)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveColumn(null)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [activeColumn])

  const toggle = (i) => setActiveColumn((cur) => (cur === i ? null : i))

  return (
    <main className="transformation-main">
      <div className="transformation-grid" ref={gridRef} aria-label="Cloud collection">
        {COLUMNS.map((col, i) => (
          <TransformationColumn
            key={i}
            cards={col.cards}
            active={activeColumn === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </main>
  )
}