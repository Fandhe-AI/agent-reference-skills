# Virtual Color

Create color placeholders for better theming and customization, allowing components to dynamically reference colors from any palette without hardcoding specific values.

## Overview

The `colorPalette` prop establishes a virtual color reference. When set, it provides access to an entire color scale (50–950) referenced as `colorPalette.100`, `colorPalette.500`, etc. All built-in Chakra colors follow the `50–950` naming scheme, making virtual colors predictable across the system.

## Usage

```tsx
// Basic usage
<Box colorPalette="blue" bg="colorPalette.100" _hover={{ bg: "colorPalette.200" }}>
  Hello World
</Box>

// With dark mode
<Box colorPalette="blue" bg={{ base: "colorPalette.600", _dark: "colorPalette.400" }}>
  Adaptive color
</Box>
```

## Notes

- Virtual colors are most useful when used with recipes, enabling reusable and themable component patterns
- Most built-in Chakra components support the `colorPalette` property
- Decouples component logic from specific color values, improving maintainability

## Related

- [CSS Variables](./css-variables.md)
- [Dark Mode](./dark-mode.md)
- [Conditional Styles](./conditional-styles.md)
