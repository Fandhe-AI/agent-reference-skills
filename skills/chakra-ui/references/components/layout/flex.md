# Flex

A `Box` with `display: flex` and shorthand props for common flexbox properties. Also exports `HStack` and `VStack` as convenient aliases.

## Import

```tsx
import { Flex, HStack, VStack, Spacer } from "@chakra-ui/react"
```

## Usage

```tsx
<Flex gap="4" align="center" justify="space-between">
  <Box height="10" />
  <Box height="10" />
  <Box height="10" />
</Flex>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `SystemStyleObject["alignItems"]` | — | Shorthand for `alignItems` |
| `justify` | `SystemStyleObject["justifyContent"]` | — | Shorthand for `justifyContent` |
| `wrap` | `SystemStyleObject["flexWrap"]` | — | Shorthand for `flexWrap` |
| `direction` | `SystemStyleObject["flexDirection"]` | — | Shorthand for `flexDirection` |
| `basis` | `SystemStyleObject["flexBasis"]` | — | Shorthand for `flexBasis` |
| `grow` | `SystemStyleObject["flexGrow"]` | — | Shorthand for `flexGrow` |
| `shrink` | `SystemStyleObject["flexShrink"]` | — | Shorthand for `flexShrink` |
| `inline` | `boolean` | — | Renders as `inline-flex` |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Variants / Sizes

**HStack** — horizontal flex with `gap` and `align="center"` by default:

```tsx
<HStack gap="4">
  <Box />
  <Box />
</HStack>
```

**VStack** — vertical flex (`direction="column"`) with centered alignment:

```tsx
<VStack gap="4">
  <Box />
  <Box />
</VStack>
```

**Spacer** — a flex child that expands to fill remaining space:

```tsx
<Flex>
  <Box>Left</Box>
  <Spacer />
  <Box>Right</Box>
</Flex>
```

## Notes

- All standard flexbox values are supported for `align`, `justify`, `direction`, `wrap`
- Supports responsive values for all props

## Related

- [Box](./box.md)
- [Grid](./grid.md)
- [Stack](./stack.md)
