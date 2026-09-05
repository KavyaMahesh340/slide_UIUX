import cardsData from '../data/cardsData'
import TransformationCard from './TransformationCard'

export default function TransformationGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cardsData.map((card) => (
          <TransformationCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}