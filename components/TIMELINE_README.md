# Scroll-Driven Vertical Timeline Component

A complete, production-ready scroll-driven vertical timeline component for portfolio "Journey / The path so far" sections.

## Features

✅ **Scroll-driven animations** - Line progressively reveals as user scrolls  
✅ **Three dot states** - Inactive (dim), Active (glowing), Completed (bright)  
✅ **IntersectionObserver** - Tracks active section automatically  
✅ **Responsive design** - Desktop: two-column, Mobile: single column  
✅ **Accessibility** - Semantic HTML, reduced-motion support  
✅ **Dark theme** - Subtle glow effects matching portfolio style  

## Files Created

1. **`components/timeline.tsx`** - Main Timeline component
2. **`hooks/use-scroll-progress.tsx`** - Helper hooks (optional, can be used separately)
3. **`components/experience-section-minimal.tsx`** - Updated to use Timeline component

## Usage

```tsx
import { Timeline, type TimelineItem } from "@/components/timeline"

const timelineData: TimelineItem[] = [
  {
    id: "1",
    period: "Aug 2025 - Present",
    title: "xNerds Solution",
    description: "Full Stack Developer / UI UX Developer",
  },
  {
    id: "2",
    period: "Apr 2025 - Aug 2025",
    title: "Devsloop",
    description: "Software Engineer",
  },
]

export function MyComponent() {
  return (
    <div className="container">
      <Timeline items={timelineData} />
    </div>
  )
}
```

## Customization

Edit the constants at the top of `components/timeline.tsx`:

```tsx
const DOT_SIZE = 12        // Size of timeline dots (pixels)
const DOT_GLOW = 20        // Glow intensity for active dot (pixels)
const LINE_WIDTH = 2       // Width of timeline line (pixels)
const ANIMATION_DURATION = 0.5  // Duration of fade/slide animations (seconds)
```

### Spacing

Change the spacing between items by modifying the `space-y-*` class:

```tsx
<div className="space-y-16 md:space-y-20">  // Change 16/20 to your preferred spacing
```

### Colors

The component uses CSS variables:
- `--primary` - Main timeline color (dots, line, glow)
- `--muted-foreground` - Text color for periods/descriptions

Update these in your `globals.css` or Tailwind config.

### Animation Easing

Modify the `ease` property in the dot animation:

```tsx
transition={{
  duration: prefersReducedMotion ? 0 : 0.3,
  ease: "easeOut",  // Change to "easeIn", "easeInOut", etc.
}}
```

## How It Works

1. **Scroll Progress**: Uses Framer Motion's `useScroll` to track scroll position
2. **Line Reveal**: Line height animates from 0% to 100% based on scroll progress
3. **Active Section**: IntersectionObserver detects which section is in viewport
4. **Dot States**: 
   - **Inactive**: Dim (30% opacity)
   - **Active**: Bright with glow (100% opacity, 20px glow)
   - **Completed**: Bright but less glow (100% opacity, 10px glow)
5. **Content Animation**: Content fades in and slides up as it enters viewport

## Accessibility

- ✅ Semantic HTML (`<section>`, `<time>`, `<h3>`)
- ✅ ARIA labels for screen readers
- ✅ Respects `prefers-reduced-motion`
- ✅ Keyboard navigable

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires IntersectionObserver API (supported in all modern browsers)
- Gracefully degrades if JavaScript is disabled

## Performance

- Uses `requestAnimationFrame` via Framer Motion
- IntersectionObserver is efficient and native
- Animations are GPU-accelerated
- No layout thrashing

## Troubleshooting

**Line not appearing?**
- Check that `containerRef` is properly attached
- Ensure parent container has sufficient height
- Verify scroll offset settings match your layout

**Dots not changing state?**
- Check IntersectionObserver threshold (default: 0.5)
- Adjust `rootMargin` if needed: `"-20% 0px -20% 0px"`

**Animations too fast/slow?**
- Adjust `ANIMATION_DURATION` constant
- Modify transition delays: `delay: index * 0.1`

