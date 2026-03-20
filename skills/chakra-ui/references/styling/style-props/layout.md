# Layout Style Props

JSX style props for controlling element layout, box model, and column breaks.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `aspectRatio` | `aspect-ratio` | `aspectRatios` |
| `boxSizing` | `box-sizing` | — |
| `boxDecorationBreak` | `box-decoration-break` | — |
| `breakAfter` | `break-after` | — |
| `breakBefore` | `break-before` | — |
| `breakInside` | `break-inside` | — |
| `columns` | `columns` | — |
| `float` | `float` | — |
| `clear` | `clear` | — |
| `overflow` | `overflow` | — |
| `overflowX` | `overflow-x` | — |
| `overflowY` | `overflow-y` | — |
| `overscrollBehavior` | `overscroll-behavior` | — |
| `position` | `position` | — |
| `top`, `right`, `bottom`, `left` | `top` / `right` / `bottom` / `left` | `spacing` |
| `inset` | `inset` | `spacing` |
| `zIndex` | `z-index` | `zIndex` |
| `isolation` | `isolation` | — |
| `visibility` | `visibility` | — |

## Examples

```tsx
// Aspect ratio with token
<Box aspectRatio="square" />
<Box aspectRatio="1.2" />

// Box sizing
<Box boxSizing="border-box" p="4" w="8" h="8" />

// Multi-column with break
<Box columns="2">
  <Box>Item 1</Box>
  <Box breakAfter="page">Item 2</Box>
</Box>

// Positioning
<Box position="relative">
  <Box position="absolute" top="0" right="0" />
</Box>
```

## Related

- [Sizing Style Props](./sizing.md)
- [Spacing Style Props](./spacing.md)
- [Display Style Props](./display.md)
