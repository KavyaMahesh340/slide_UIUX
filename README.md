# Slide Up UI/UX

An animated landing page prototype for **PathFinder**, a financial planning product. Built with React and Framer Motion, featuring slide-up transformation cards, a custom star cursor, dynamic background reveals, and interactive 3D parallax effects.

## Features

- **Transformation Cards** — Three cards that slide upward on hover to reveal photos and overlay copy, with 3D mouse-tracking tilt (up to 8 degrees on both axes) using spring physics.
- **Brush Background Reveal** — A diagonal clip-path animation sweeps a new background photo into view when a card is hovered, with staggered slab timing.
- **Custom Star Cursor** — Replaces the native cursor with a star pointer, trailing star, and SVG sparkle particles that spawn on mouse movement.
- **Floating 3D Parallax** — A rotating ring and sparkle elements that respond to mouse position at different depth multipliers.
- **Reduced Motion Support** — All animations respect `useReducedMotion()` for accessibility.

## Stack

| Library | Version | Purpose |
| --- | --- | --- |
| React | 19.2 | UI framework |
| Vite | 8.2 | Build tool & dev server |
| Framer Motion | 13.2 | Animation, springs, 3D transforms |
| Tailwind CSS | 4.3 | Utility-first styling |
| lucide-react | 1.41 | Icons |
| oxlint | 1.79 | Linting |

## Project Structure

```
Slide_up_UIUX/
├── assets/                                  # shared image assets (card photos, backgrounds)
│   ├── _.jpeg
│   ├── Kawaii Animal Clouds....jpeg
│   ├── Three Adorable Kawaii....jpeg
│   ├── default-landscape.jpeg
│   ├── Morning.jpeg
│   ├── manuall-landscape.jpeg
│   └── phototune.ai_1788631093.jpg
└── frontend/
    └── transformation-cards/                # the React app
        ├── package.json
        ├── vite.config.js
        ├── index.html
        └── src/
            ├── main.jsx                     # entry point
            ├── App.jsx                      # composes all layers
            ├── index.css                    # Tailwind import, global styles
            ├── data/
            │   └── cardsData.js             # card labels, images, overlay copy
            └── components/
                ├── TransformationCard.jsx   # slide-up card with 3D tilt
                ├── TransformationGrid.jsx   # responsive 3-column grid
                ├── BackgroundEffects.jsx    # brush-clip-path background reveal
                ├── CustomCursor.jsx         # star pointer, trailing star, sparkles
                ├── Floating3D.jsx           # parallax ring + floating sparkles
                └── Header.jsx               # header with tab switcher (not wired up)
```

## Getting Started

**Prerequisites:** Node.js 18+

```bash
cd frontend/transformation-cards
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with oxlint |

## Architecture

The app is a single-page overlay composition rendered by `App.jsx`:

1. **BackgroundEffects** — Fixed full-screen layer. Shows a default landscape; on card hover, a diagonal brush animation reveals a mapped background photo.
2. **Floating3D** — Decorative parallax layer. A rotating ring tilts toward the cursor; sparkles pulse at varying depths.
3. **CustomCursor** — Replaces the native cursor (`cursor: none`). Tracks mouse position directly via `useMotionValue`; spring-animates a trailing star and spawns SVG particles.
4. **TransformationGrid** — Renders three `TransformationCard` components. Manages which card is hovered and passes the index to `BackgroundEffects`.
5. **TransformationCard** — Three stacked layers: a white "shutter" that slides up on hover, reveal content (photo + gradient + text), and before/after labels. Uses `useMotionValue` + `useSpring` for 3D tilt.
