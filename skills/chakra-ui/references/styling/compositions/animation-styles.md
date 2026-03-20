# Animation Styles

Define reusable motion property sets to minimize code repetition when animating components.

## Overview

Animation styles support three primary categories: animation properties (composition, delay, direction, duration, fill mode, iteration count, name, play state, timing function), animation range (range, start, end, timeline), and transform origin.

Chakra provides pre-built keyframe animations: `spin`, `pulse`, `bounce`, `slide`, `fade`.

## Usage

```tsx
import { defineAnimationStyles } from "@chakra-ui/react"

const animationStyles = defineAnimationStyles({
  bounceFadeIn: {
    value: {
      animationName: "bounce, fade-in",
      animationDuration: "1s",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
    },
  },
})

// Register in theme
import { createSystem, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: { animationStyles },
})
export default createSystem(config)

// Use in components
<Box animationStyle="bounceFadeIn">Animated</Box>
```

## Notes

- Animation styles integrate with the broader theming and tokens system
- Many common scenarios are covered by the built-in pre-configured styles
- Part of Chakra's composition system alongside text styles and layer styles

## Related

- [Layer Styles](./layer-styles.md)
- [Transitions Style Props](../style-props/transitions.md)
