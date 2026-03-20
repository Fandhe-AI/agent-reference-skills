# Conditional Styles

Apply styles based on pseudo-states, media queries, and custom data attributes using underscore-prefixed props.

## Overview

Chakra UI provides a system for writing interactive and responsive styles directly in component props. Conditions include pseudo-states (hover, focus, active, disabled), media queries (breakpoints), and custom data attributes.

## Usage

```tsx
// Hover state
<Box bg="red.500" _hover={{ bg: "red.700" }}>
  Hover me
</Box>

// Focus state
<Box _focus={{ outline: "2px solid blue" }}>
  Focus me
</Box>

// Disabled state
<Button disabled _disabled={{ opacity: 0.5, cursor: "not-allowed" }}>
  Disabled
</Button>

// Dark mode condition
<Box bg={{ base: "white", _dark: "black" }}>
  Adaptive
</Box>

// Combined conditions
<Box
  bg="gray.100"
  _hover={{ bg: "gray.200" }}
  _dark={{ bg: "gray.800", _hover: { bg: "gray.700" } }}
>
  Hover in dark mode
</Box>
```

## Notes

- The underscore prefix (`_`) denotes conditional style props
- Conditions can be nested (e.g., `_dark={{ _hover: { bg: "gray.700" } }}`)
- A comprehensive list of built-in conditions is available in the official docs

## Related

- [Dark Mode](./dark-mode.md)
- [Responsive Design](./responsive-design.md)
- [Focus Ring](../compositions/focus-ring.md)
