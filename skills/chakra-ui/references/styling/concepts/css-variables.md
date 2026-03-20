# CSS Variables

Chakra UI provides token-aware CSS variables that enable shared values without prop interpolation or classname regeneration.

## Overview

The `css` prop on any Chakra component allows declaring CSS custom properties. Variables can reference design tokens via their full token path (e.g., `"colors.red.500"`, `"sizes.10"`), and they support responsive syntax and color opacity modifiers.

## Usage

```tsx
// Basic variable declaration
<Box css={{ "--font-size": "18px" }}>
  <p style={{ fontSize: "var(--font-size)" }}>Text</p>
</Box>

// Referencing a design token
<Box css={{ "--color": "colors.red.500" }}>
  <p style={{ color: "var(--color)" }}>Styled text</p>
</Box>

// Responsive variable
<Box css={{ "--font-size": { base: "18px", lg: "24px" } }}>
  <p style={{ fontSize: "var(--font-size)" }}>Responsive text</p>
</Box>

// Color with opacity modifier
<Box css={{ "--bg": "{colors.red.400/40}" }}>
  <Box bg="var(--bg)" />
</Box>
```

## Notes

- Token references use the dot-path format without curly braces (e.g., `"colors.red.500"`)
- The `{}` wrapper is required only when using opacity modifiers in token references (e.g., `"{colors.red.400/40}"`)
- Variables automatically respect theme transitions (light/dark modes)
- This approach reduces runtime overhead compared to traditional prop interpolation

## Related

- [Color Opacity Modifier](./color-opacity-modifier.md)
- [Virtual Color](./virtual-color.md)
- [Dark Mode](./dark-mode.md)
