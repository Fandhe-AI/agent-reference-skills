# Separator

A horizontal or vertical visual divider between content sections.

## Import

```tsx
import { Separator } from "@chakra-ui/react"
```

## Usage

```tsx
<Stack>
  <Text>First</Text>
  <Separator />
  <Text>Second</Text>
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | The orientation of the separator |
| `variant` | `"solid" \| "dashed" \| "dotted"` | `"solid"` | The line style |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"sm"` | The thickness of the separator |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Notes

- For vertical separators, set a `height` to make them visible
- Use with `HStack` for inline separators: `<Separator orientation="vertical" height="4" />`
- Supports responsive `orientation` values
- Combine with `HStack` and `Text` for labeled separators

## Related

- [Stack](./stack.md)
- [Flex](./flex.md)
