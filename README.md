# Slide Up UIUX

An animated landing page built with React and Framer Motion, featuring slide-up "transformation" cards, a custom star cursor, and interactive 3D parallax effects.

## Stack

- **Vite 8** + **React 19**
- **Framer Motion 13** — card reveal/tilt, background brush reveal, cursor springs
- **Tailwind CSS 4**
- **lucide-react** — icons
- **oxlint** — linting

## Project structure

```
assets/                              # image assets used by the frontend
frontend/transformation-cards/       # the app
├── src/
│   ├── App.jsx                      # mounts background, 3D layer, cursor, grid
│   ├── components/
│   │   ├── BackgroundEffects.jsx    # photo bg + clip-path brush reveal on hover
│   │   ├── CustomCursor.jsx         # star pointer + trailing star + sparkles
│   │   ├── Floating3D.jsx           # parallax ring + star sparks
│   │   ├── TransformationCard.jsx   # slide-up card, tilt, labels, overlay text
│   │   └── TransformationGrid.jsx   # grid + per-card hover background mapping
│   ├── data/cardsData.js            # card labels, images, overlay copy
│   └── index.css
└── package.json
```

## Getting started

```bash
cd frontend/transformation-cards
npm install
npm run dev
```

## Scripts

| Command      | Description                  |
| ------------ | ---------------------------- |
| `npm run dev`    | Start the Vite dev server |
| `npm run build`  | Production build        |
| `npm run preview`| Preview the production build |
| `npm run lint`   | Lint with oxlint       |
