import cardsData from '../data/cardsData'
import TransformationCard from './TransformationCard'

const hoverKeys = ['morning', 'manual', 'default']

export default function TransformationGrid({ onCardHover }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 [perspective:1400px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cardsData.map((card, i) => (
          <TransformationCard
            key={card.id}
            card={card}
            onHover={hoverKeys[i] ? (h) => onCardHover(h ? hoverKeys[i] : null) : undefined}
          />
        ))}
      </div>
    </section>
  )
}