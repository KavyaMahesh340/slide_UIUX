import { useState } from 'react'
import TransformationCard from './TransformationCard'
import InteractionControl from './InteractionControl'

// One vertical column: top card + seam control + bottom card.
// Clicking a card promotes that card to the tall active card;
// the seam control activates the column's top card.
export default function TransformationColumn({ cards, active, onToggle }) {
  const [tallId, setTallId] = useState(cards[0].id)
  const tall = cards.find((c) => c.id === tallId) || cards[0]

  const handleCard = (card) => {
    if (!active) {
      setTallId(card.id)
      onToggle()
    } else if (card.id === tallId) {
      onToggle()
    } else {
      setTallId(card.id)
    }
  }

  const handleControl = () => {
    setTallId(cards[0].id)
    onToggle()
  }

  return (
    <div className={['transformation-column', active ? 'active' : ''].filter(Boolean).join(' ')}>
      {cards.map((card) => (
        <TransformationCard
          key={card.id}
          card={card}
          active={active && card.id === tallId}
          hidden={active && card.id !== tallId}
          onActivate={() => handleCard(card)}
        />
      ))}
      <InteractionControl
        active={active}
        label={active ? `Close ${tall.title}` : `Open ${cards[0].title}`}
        onClick={handleControl}
      />
    </div>
  )
}