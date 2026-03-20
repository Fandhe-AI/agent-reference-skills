# Layer Styles

Define reusable visual property sets (color, background, border, shadow, opacity) for UI components.

## Overview

Layer styles allow you to define visual properties that can be reused across components. They complement text styles and animation styles in Chakra's composition system.

Supported properties: `color`, `backgroundColor`, `borderWidth`, `borderColor`, `boxShadow`, `opacity`.

## Usage

```tsx
import { defineLayerStyles } from "@chakra-ui/react"

const layerStyles = defineLayerStyles({
  container: {
    description: "container styles",
    value: {
      background: "gray.50",
      border: "2px solid",
      borderColor: "gray.500",
    },
  },
})

// Register in theme
import { createSystem, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: { layerStyles },
})
export default createSystem(config)

// Use in components
<Box layerStyle="container">Content</Box>
```

## Notes

- Each layer style definition includes a `description` field (optional but recommended) and a `value` object with CSS properties using Chakra tokens
- Built-in layer styles are accessible via the `layerStyle: fill.*` pattern
- Layer styles reduce repetitive style declarations across components

## Related

- [Text Styles](./text-styles.md)
- [Animation Styles](./animation-styles.md)
