# Color Opacity Modifier

A shorthand syntax for dynamically setting the opacity of colors or color tokens using CSS `color-mix()`.

## Overview

The modifier uses the format `{color}/{opacity}` appended directly to color prop values. No new color tokens are needed; opacity is applied dynamically at the CSS level.

## Usage

```tsx
// Inline color with opacity
<Text bg="red.300/40" color="white">
  Hello World
</Text>

// In CSS variable (requires {} wrapper)
<Box css={{ "--bg": "{colors.red.400/40}" }}>
  <Box bg="var(--bg)" />
</Box>
```

## Notes

- Generated CSS uses `color-mix(in srgb, var(--colors-red-300) 40%, transparent)`
- The `{}` token reference wrapper is **required** when using opacity modifiers inside CSS variable values
- Works with any color-related style property (`bg`, `color`, `borderColor`, etc.)

## Related

- [CSS Variables](./css-variables.md)
- [Background Style Props](../style-props/background.md)
