# Text Styles

Define reusable typography property sets (font, size, weight, line height, letter spacing) across an application.

## Overview

Text styles encapsulate common textual CSS properties into composable, maintainable definitions. Chakra provides built-in text styles from `xs` through `7xl` covering common typography scales, with progressive font sizes, line heights, and letter spacing adjustments for larger sizes.

Supported properties: `fontFamily`, `fontWeight`, `fontSize`, `lineHeight`, `letterSpacing`, `textDecoration`, `textTransform`.

## Usage

```tsx
// Define custom text styles
import { defineTextStyles } from "@chakra-ui/react"

export const textStyles = defineTextStyles({
  body: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "24",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
})

// Register in theme
import { createSystem, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: { textStyles },
})
export default createSystem(config)

// Use in components
<Text textStyle="body">Hello World</Text>
<Text textStyle="2xl">Large Heading</Text>
```

## Notes

- Built-in text styles range from `xs` to `7xl`
- Larger sizes (4xl and above) include letter spacing adjustments for visual hierarchy
- Use `textStyle` prop on any Chakra component to apply a named style

## Related

- [Layer Styles](./layer-styles.md)
- [Typography Style Props](../style-props/typography.md)
