# Grid

A `Box` with `display: grid` and shorthand props for CSS Grid layout. Includes `GridItem` for controlling individual grid cells.

## Import

```tsx
import { Grid, GridItem } from "@chakra-ui/react"
```

## Usage

```tsx
<Grid templateColumns="repeat(3, 1fr)" gap="6">
  <Box h="20" />
  <Box h="20" />
  <Box h="20" />
</Grid>
```

## Props

### Grid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `templateColumns` | `SystemStyleObject["gridTemplateColumns"]` | — | Shorthand for `gridTemplateColumns` |
| `templateRows` | `SystemStyleObject["gridTemplateRows"]` | — | Shorthand for `gridTemplateRows` |
| `templateAreas` | `SystemStyleObject["gridTemplateAreas"]` | — | Shorthand for `gridTemplateAreas` |
| `autoFlow` | `SystemStyleObject["gridAutoFlow"]` | — | Shorthand for `gridAutoFlow` |
| `autoRows` | `SystemStyleObject["gridAutoRows"]` | — | Shorthand for `gridAutoRows` |
| `autoColumns` | `SystemStyleObject["gridAutoColumns"]` | — | Shorthand for `gridAutoColumns` |
| `column` | `SystemStyleObject["gridColumn"]` | — | Shorthand for `gridColumn` |
| `row` | `SystemStyleObject["gridRow"]` | — | Shorthand for `gridRow` |
| `inline` | `boolean` | — | Renders as `inline-grid` |

### GridItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colSpan` | `ConditionalValue<number \| "auto">` | — | Number of columns to span |
| `colStart` | `ConditionalValue<number \| "auto">` | — | Grid column start line |
| `colEnd` | `ConditionalValue<number \| "auto">` | — | Grid column end line |
| `rowSpan` | `ConditionalValue<number \| "auto">` | — | Number of rows to span |
| `rowStart` | `ConditionalValue<number \| "auto">` | — | Grid row start line |
| `rowEnd` | `ConditionalValue<number \| "auto">` | — | Grid row end line |
| `area` | `SystemStyleObject["gridArea"]` | — | Named grid area |

## Notes

- Use `templateAreas` with named areas for complex layouts
- `GridItem` with `rowSpan` and `colSpan` for spanning cells
- Supports responsive values for all props

## Related

- [SimpleGrid](./simple-grid.md)
- [Flex](./flex.md)
- [Box](./box.md)
