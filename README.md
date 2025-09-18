# Brijesh Solanki Portfolio

A clean, minimalist portfolio website built with React and CSS.

## Features

- **Single Page Design** - Everything fits in one viewport
- **Responsive Navigation** - "About Me", "LinkedIn", "Resume" with dark borders
- **Elegant Typography** - "port" in serif font + custom SVG "folio"
- **Animated Background** - Subtle grid squares animation
- **Curved Arrow** - Dynamic connection between name and title
- **No Scroll** - Fixed height, no scrolling needed

## Project Structure

```
src/
├── components/
│   ├── animation/
│   │   └── AnimatedSquares.jsx    # Background animation
│   ├── layout/
│   │   ├── Header.jsx             # Main portfolio content
│   │   └── Navigation.jsx         # Top navigation bar
│   ├── ui/
│   │   └── CurvedArrow.jsx        # SVG arrow connection
│   └── index.js                   # Component exports
├── hooks/
│   ├── useResponsive.js           # Responsive utilities
│   └── index.js                    # Hook exports
├── App.jsx                         # Main app component
├── main.jsx                        # App entry point
└── index.css                       # All styles
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5174/ in your browser

## Technologies Used

- React 19
- CSS3 (no external CSS frameworks)
- Vite (build tool)
- SVG for custom "folio" text

## Design Features

- **Background**: Light cream (#F2F1E0) with subtle grid
- **Navigation**: Dark borders, large centered text
- **Typography**: Playfair Display serif + custom SVG
- **Responsive**: Mobile, tablet, desktop optimized
- **Performance**: Optimized animations and rendering

---

Built with ❤️ for Brijesh Solanki's portfolio