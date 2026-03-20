# SimpleGrid

A simplified Grid component for common equal-column layouts.

## Import

```tsx
import { SimpleGrid } from "@chakra-ui/react"
```

## Usage

```tsx
<SimpleGrid columns={2} gap="40px">
  <Box height="20" />
  <Box height="20" />
  <Box height="20" />
  <Box height="20" />
</SimpleGrid>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ConditionalValue<number>` | — | Number of columns |
| `minChildWidth` | `GridProps["minWidth"]` | — | Minimum child width; columns break automatically when children are narrower |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

Also accepts all `Grid` props (`gap`, `columnGap`, `rowGap`, etc.).

## Notes

- Use `columns` for a fixed number of columns
- Use `minChildWidth` for auto-fit responsive columns (no fixed column count needed)
- `columns` supports responsive values: `columns={{ base: 2, md: 4 }}`
- Can use `GridItem` with `colSpan` inside `SimpleGrid`

## Related

- [Grid](./grid.md)
- [Wrap](./wrap.md)
