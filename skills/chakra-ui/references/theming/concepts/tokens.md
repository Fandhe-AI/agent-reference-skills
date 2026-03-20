# Design Tokens

Platform-agnostic key-value pairs for managing design decisions, influenced by the W3C Token Format.

## Overview

Each token contains:
- **`value`**: The actual CSS value (color, size, font, etc.)
- **`description`**: Optional context about the token's intended use

Tokens are configured under `theme.tokens` in your system configuration.

## Usage

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#0FEE0F" },
        secondary: { value: "#EE0F0F" },
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
```

## Token Categories

| Category | Description |
|----------|-------------|
| `colors` | Color palettes (gray, red, blue, purple, etc.) |
| `fonts` | Font family stacks |
| `fontSizes` | Text size scale |
| `fontWeights` | Font weight values |
| `lineHeights` | Line height values |
| `letterSpacings` | Letter spacing values |
| `spacing` | Padding, margin, gap scale |
| `sizes` | Width and height values |
| `radii` | Border radius values |
| `shadows` | Box shadow values |
| `animations` | Keyframe animation tokens |
| `zIndex` | Z-index layering values |
| `breakpoints` | Responsive breakpoint values |
| `blurs` | Blur filter values |
| `borders` | Border shorthand values |
| `durations` | Animation duration values |

## Notes

- Tokens are converted to CSS custom properties at build time
- Use the `{}` reference syntax in semantic tokens to reference base tokens

## Related

- [Semantic Tokens](./semantic-tokens.md)
- [Overview](./overview.md)
