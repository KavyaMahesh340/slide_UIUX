import cloudAnimals from '../assets/cloud-animals.jpg'
import cloudFriends from '../assets/cloud-friends.jpg'
import kawaiiCloud from '../assets/kawaii-cloud.jpg'

// Six cards placed in a 3×2 grid in this exact order:
//   row 1 -> cards 1, 2, 3
//   row 2 -> cards 4, 5, 6
// Vertical pairs (columns): (1,4), (2,5), (3,6).
// `position` controls object-position so the image's subject stays
// visible when the card expands to fill its column.
export const cards = [
  { id: 1, title: 'Cloud Animals', eyebrow: 'Collection 01', tag: 'kawaii', image: cloudAnimals, position: 'center 28%', description: 'A playful parade of panda, bunny and kitty clouds drifting through a dreamy tropical sky.' },
  { id: 2, title: 'Cloud Friends', eyebrow: 'Collection 01', tag: 'soft', image: cloudFriends, position: 'center 40%', description: 'Three adorable cloud companions floating together, calm and weightless above the world.' },
  { id: 3, title: 'Daydream Sky', eyebrow: 'Collection 02', tag: 'calm', image: kawaiiCloud, position: 'center 32%', description: 'A gentle kawaii cloud resting in its own little world, framed by a warm blue horizon.' },
  { id: 4, title: 'Soft Landing', eyebrow: 'Collection 02', tag: 'calm', image: kawaiiCloud, position: 'center 32%', description: 'Petals of cloud settle over a pastel afternoon, where light and fluff meet in slow motion.' },
  { id: 5, title: 'Tiny Parade', eyebrow: 'Collection 03', tag: 'kawaii', image: cloudAnimals, position: 'center 28%', description: 'Rows of little cloud animals in a joyful line, each one eager to say hello to the day.' },
  { id: 6, title: 'Weightless', eyebrow: 'Collection 03', tag: 'soft', image: cloudFriends, position: 'center 40%', description: 'Three round cloud friends hover in stillness, a quiet study in gentle pastel colour.' },
]

export const gridCards = cards.map((card, index) => ({
  ...card,
  column: (index % 3) + 1,
  row: index < 3 ? 1 : 2,
}))