# Scope Landing Page

A modern, animated landing page for Scope - a composable engine for real-time video world models.

## Tech Stack

- **Next.js 14** - React framework with static export
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and interactions
- **Lucide React** - Beautiful icons

## Features

- Static site generation for optimal performance
- Beautiful, modern design with glass morphism effects
- Smooth scroll-based animations
- Infinite scrolling workflow gallery
- Fully responsive design
- Dark theme with gradient accents

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Generate a static export:

```bash
npm run build
```

The static files will be in the `out` directory, ready to be deployed to any static hosting service.

## Project Structure

```
src/
├── app/
│   ├── globals.css    # Global styles and utilities
│   ├── layout.tsx     # Root layout with metadata
│   └── page.tsx       # Main page component
└── components/
    ├── Navigation.tsx      # Fixed header with glass effect
    ├── Hero.tsx           # Hero section with animated background
    ├── Features.tsx       # Feature cards grid
    ├── WorkflowGallery.tsx # Infinite scroll carousel
    ├── Download.tsx       # Platform download cards
    ├── Community.tsx      # Community CTA section
    └── Footer.tsx         # Footer with links
```

## Customization

- **Colors**: Edit `tailwind.config.ts` to modify the color scheme
- **Animations**: Adjust Framer Motion props in components
- **Content**: Update text and data arrays in each component

## License

MIT
