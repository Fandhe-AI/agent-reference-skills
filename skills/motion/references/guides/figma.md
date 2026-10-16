# Figma Motion

Animate in Figma Motion and export Motion for React code, or rely on Motion inside Figma Sites and Figma Make.

## Signature / Usage

Export: add an animation via the (+) button in the Animations panel, edit in the timeline editor, then in Dev Mode select the layer and choose "React" in the Motion panel. Paste the code into a project that already has Motion installed.

```tsx
import { motion } from "motion/react"
```

Typical Figma Make output:

```jsx
<motion.div
  className={className}
  variants={container}
  initial="hidden"
  animate="visible"
>
  {words.map((word, index) => (
    <motion.span
      key={index}
      variants={child}
      style={{ display: "inline-block", marginRight: "0.25em" }}
    >
      {word}
    </motion.span>
  ))}
</motion.div>
```

## Notes

- Figma Motion can export React (Motion code), CSS and JSON in Dev Mode.
- Exported code assumes Motion is installed; follow the Motion for React quick start.
- Figma Sites: Motion powers published animations; add Hover / Press effects via the Interactions panel, no setup needed.
- Figma Make tends to import from `"framer-motion"` (former package name). It still works, but `motion` is current: change the import to `"motion/react"` and install `motion` instead of `framer-motion`.
- Source: https://motion.dev/docs/figma (fetched 2026-10).

## Related

- [Installation](./installation.md)
- [Upgrade from Framer Motion](./upgrade-guide.md)
