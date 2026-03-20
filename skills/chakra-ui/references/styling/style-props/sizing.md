# Sizing Style Props

JSX style props for controlling element width and height dimensions.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `w`, `width` | `width` | `sizes` |
| `h`, `height` | `height` | `sizes` |
| `minW`, `minWidth` | `min-width` | `sizes` |
| `maxW`, `maxWidth` | `max-width` | `sizes` |
| `minH`, `minHeight` | `min-height` | `sizes` |
| `maxH`, `maxHeight` | `max-height` | `sizes` |
| `boxSize` | `width` + `height` | `sizes` |

## Examples

```tsx
// Hardcoded value
<Box width="64px" />
<Box w="4rem" />

// Token value
<Box w="5" />

// Fractional widths
<Flex>
  <Box width="1/2" />
  <Box width="1/2" />
</Flex>

// Viewport units
<Box w="dvw" />   // 100dvw
<Box w="svw" />   // 100svw
<Box w="lvw" />   // 100lvw

// Width and height together
<Box boxSize="10" />
```

## Notes

- Fractional values supported: thirds, fourths, fifths, sixths, twelfths (e.g., `"1/3"`, `"2/4"`, `"5/12"`)
- Viewport token values: `dvw` (dynamic), `svw` (small), `lvw` (large) for width; similarly `dvh`, `svh`, `lvh` for height
- Token values reference the `sizes` token category

## Related

- [Layout Style Props](./layout.md)
- [Spacing Style Props](./spacing.md)
