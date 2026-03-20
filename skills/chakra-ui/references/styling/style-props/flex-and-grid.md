# Flex and Grid Style Props

JSX style props for controlling flex and grid layouts.

## Props

### Flex

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `flex` | `flex` | — |
| `flexBasis` | `flex-basis` | — |
| `flexDir`, `flexDirection` | `flex-direction` | — |
| `flexWrap` | `flex-wrap` | — |
| `flexGrow` | `flex-grow` | — |
| `flexShrink` | `flex-shrink` | — |
| `order` | `order` | — |

### Grid

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `gridTemplate` | `grid-template` | — |
| `gridTemplateColumns` | `grid-template-columns` | — |
| `gridTemplateRows` | `grid-template-rows` | — |
| `gridTemplateAreas` | `grid-template-areas` | — |
| `gridArea` | `grid-area` | — |
| `gridColumn` | `grid-column` | — |
| `gridRow` | `grid-row` | — |
| `gridAutoColumns` | `grid-auto-columns` | — |
| `gridAutoRows` | `grid-auto-rows` | — |
| `gridAutoFlow` | `grid-auto-flow` | — |
| `columnGap`, `gapX` | `column-gap` | `spacing` |
| `rowGap`, `gapY` | `row-gap` | `spacing` |
| `gap` | `gap` | `spacing` |

### Alignment

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `alignItems` | `align-items` | — |
| `alignContent` | `align-content` | — |
| `alignSelf` | `align-self` | — |
| `justifyContent` | `justify-content` | — |
| `justifyItems` | `justify-items` | — |
| `justifySelf` | `justify-self` | — |
| `placeItems` | `place-items` | — |
| `placeContent` | `place-content` | — |
| `placeSelf` | `place-self` | — |

## Examples

```tsx
// Flex layout
<Flex direction="column" gap="4" align="center">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Flex>

// Flex wrap
<Flex wrap="wrap">
  <Box flexBasis="25%" />
  <Box flexBasis="75%" />
</Flex>

// Grid layout
<Grid templateColumns="repeat(3, 1fr)" gap="6">
  <Box>Col 1</Box>
  <Box>Col 2</Box>
  <Box>Col 3</Box>
</Grid>
```

## Notes

- The `Flex` component provides aliased props (`direction`, `wrap`) for convenience
- `gap`, `gapX`, `gapY` reference the `spacing` token category

## Related

- [Spacing Style Props](./spacing.md)
- [Layout Style Props](./layout.md)
