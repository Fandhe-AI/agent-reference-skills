# Animating with Tailwind CSS

Combine Motion with Tailwind CSS v4: Tailwind handles styling, Motion handles animation.

## Signature / Usage

```tsx
import { motion } from "motion/react";

function Button() {
  return (
    <motion.button
      className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Click Me!
    </motion.button>
  );
}
```

Responsive animation via CSS variables:

```tsx
<motion.div
  className="[--entry-distance-y:20px] md:[--entry-distance-y:50px]"
  initial={{ opacity: 0, y: "var(--entry-distance-y)" }}
  animate={{ opacity: 1, y: 0 }}
/>
```

CSS springs as Tailwind theme utilities (generated with Motion AI Kit):

```css
@theme {
  --ease-spring-snappy: linear(0, 0.2375, 0.5904, 0.8358, 0.9599, 1.0061, 1.0152, 1.0116, 1.0062, 1.0025, 1.0006, 0.9999, 1);
}
```

```tsx
<div className="transition-transform duration-700 ease-spring-snappy">
```

## Notes

- Motion animates via inline styles or native browser animations, both of which override Tailwind classes.
- You can animate to and/or from a CSS variable, so animations can target or move between responsive values.
- CSS can do springs with `linear()`; the AI Kit generates the curves (see the AI Kit "generate CSS" page). Motion can also generate them at runtime or on the server (CSS spring animation guide covers React Server Components, Astro, Vue, CSS-in-JS).
- Stuttery or odd movement is usually a conflict with a Tailwind transition class: remove `transition-*` (e.g. `transition-all`) from the element.
- Source: https://motion.dev/docs/react-tailwind (fetched 2026-10).

## Related

- [Installation](./installation.md)
