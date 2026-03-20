# Styling Overview

Chakra UI provides a prop-based styling system where all components are designed to be styled using props, applying CSS styles directly through component properties rather than external stylesheets.

## Overview

Chakra UI's styling system is built around style props — CSS properties passed directly as component arguments. The system includes predefined design tokens (colors, spacing, typography) and supports responsive modifiers, dark mode, and conditional styles out of the box.

Key foundational topics:

- **Style Props** — Primary method for styling; CSS properties as component arguments
- **Responsive Design** — Adaptive layouts via breakpoint-based props
- **CSS Variables** — Custom properties for dynamic theming
- **Dark Mode** — Built-in light/dark color scheme support
- **Conditional Styles** — State-based styling with underscore-prefixed props
- **Cascade Layers** — CSS specificity organization via `@layer`

## Usage

```tsx
<Box
  bg="blue.500"
  color="white"
  px="4"
  py="2"
  rounded="md"
  _hover={{ bg: "blue.600" }}
>
  Hello World
</Box>
```

## Related

- [Chakra Factory](./chakra-factory.md)
- [Responsive Design](./responsive-design.md)
- [CSS Variables](./css-variables.md)
- [Dark Mode](./dark-mode.md)
- [Conditional Styles](./conditional-styles.md)
- [Cascade Layers](./cascade-layers.md)
