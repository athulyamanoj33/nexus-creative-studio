# NEXUS Creative — Landing Page

A production-ready creative studio landing page built with Next.js 14+, TypeScript, Tailwind CSS, and GSAP.

## Setup

```bash
npm install
npm run dev        # Development server → http://localhost:3000
npm run build      # Production build
npm run start      # Production server
```

## Project Structure

```
app/
├── sections/
│   ├── Hero.tsx          # Full-viewport hero with floating shapes + text reveal
│   ├── Services.tsx      # Pinned horizontal scroll with 3-layer parallax
│   ├── Portfolio.tsx     # Clip-path reveal grid + hover slide-up overlays
│   ├── Testimonials.tsx  # Dual-track infinite marquee + scroll velocity boost
│   ├── Contact.tsx       # Split layout, floating labels, success animation
│   └── Footer.tsx        # Curtain reveal + social icons with rotation
├── components/
│   ├── AnimatedText.tsx  # Character-by-character 3D stagger reveal
│   ├── ParallaxLayer.tsx # Reusable ScrollTrigger parallax wrapper
│   ├── MagneticButton.tsx# Cursor-following magnetic button effect
│   ├── ScrollIndicator.tsx # Animated chevron, fades on scroll
│   └── CustomCursor.tsx  # Dual-layer custom cursor with hover expand
├── hooks/
│   ├── useMousePosition.ts   # Real-time mouse tracking
│   ├── useScrollVelocity.ts  # Scroll speed detection (marquee boost)
│   └── useReducedMotion.ts   # prefers-reduced-motion media query
├── lib/
│   └── gsap.ts           # Centralized GSAP + ScrollTrigger registration
├── page.tsx              # Loading screen + section assembly
├── layout.tsx            # Root layout with Geist font
└── globals.css           # CSS variables, custom cursor, float labels
```

## Animation Implementation Notes

### Text Reveal
`AnimatedText` splits each word into characters wrapped in `<span class="char">`. GSAP animates from `opacity:0, y:40, rotateX:-45` with stagger + perspective for a 3D flip effect.

### Horizontal Scroll (Services)
ScrollTrigger pins the section, scrubs a `gsap.to(track, { x: -totalWidth })`. Three `ParallaxLayer` components at 0.3×/0.6×/1.0× create foreground/midground/background depth.

### Clip-Path Reveals (Portfolio)
`clipPath: "inset(0 100% 0 0)"` → `inset(0 0% 0 0)` creates a left-to-right wipe. Stagger = 0.1s. Hover overlays use direct `gsap.to(overlay, { y: "0%" })` for crisp control.

### Infinite Marquee (Testimonials)
Two `gsap.to(track, { x: ..., repeat: -1 })` tweens run in opposite directions. `tween.timeScale(1 + velocity * 0.15)` boosts speed based on scroll velocity. Hover calls `tween.pause()/play()`.

### Magnetic Button
`onMouseMove` computes `(mouseX - rectCenterX) * strength` and applies via `gsap.to(btn, { x, y })`. `onMouseLeave` snaps back with `elastic.out(1, 0.5)`.

### Footer Curtain
`gsap.from(footer, { yPercent: 30, scrollTrigger: { scrub: 1 } })` — footer slides up from behind as you scroll into it.

## Performance

- `dynamic(() => import(...), { ssr: false })` for all GSAP-heavy components
- `gsap.context()` cleanup on every `useGSAP` call
- `will-change: transform` on actively-animated elements only
- `useReducedMotion()` gates ALL animations
- No image assets — CSS gradients only (zero LCP impact)
- `invalidateOnRefresh: true` on the horizontal scroll for resize correctness

## Deployment (Vercel)

Push to GitHub, connect repo to Vercel — zero config needed for Next.js App Router.
