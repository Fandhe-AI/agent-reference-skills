# Stack

A layout component that stacks children with equal spacing. Also exports `HStack` (horizontal) and `VStack` (vertical) aliases.

## Import

```tsx
import { Stack, HStack, VStack, StackSeparator } from "@chakra-ui/react"
```

## Usage

```tsx
<Stack gap="4">
  <Box h="20" />
  <Box h="20" />
  <Box h="20" />
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"row" \| "column" \| "row-reverse" \| "column-reverse"` | `"column"` | Stack direction |
| `align` | `SystemStyleObject["alignItems"]` | — | Shorthand for `alignItems` |
| `justify` | `SystemStyleObject["justifyContent"]` | — | Shorthand for `justifyContent` |
| `wrap` | `SystemStyleObject["flexWrap"]` | — | Shorthand for `flexWrap` |
| `separator` | `React.ReactElement` | — | Separator element between items |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Variants / Sizes

**HStack** — horizontal stack (row direction) with `align="center"`:

```tsx
<HStack gap="4">
  <Box />
  <Box />
</HStack>
```

**VStack** — vertical stack (column direction):

```tsx
<VStack gap="4">
  <Box />
  <Box />
</VStack>
```

**With separator:**

```tsx
<Stack separator={<StackSeparator />}>
  <Box />
  <Box />
</Stack>
```

## Notes

- `direction` supports responsive values: `direction={{ base: "column", md: "row" }}`
- `StackSeparator` renders a `Separator` between items
- Custom separators also supported: `separator={<Separator borderColor="red.500" />}`

## Related

- [Flex](./flex.md)
- [Separator](./separator.md)
- [Grid](./grid.md)
