# Box

The most fundamental layout component. A `div` with Chakra style props.

## Import

```tsx
import { Box } from "@chakra-ui/react"
```

## Usage

```tsx
<Box background="tomato" width="100%" padding="4" color="white">
  This is the Box
</Box>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | `div` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

In addition to these, `Box` accepts all Chakra style props (padding, margin, color, background, etc.) and all HTML `div` attributes.

## Variants / Sizes

No built-in variants. Fully style via props.

## Notes

- Use `as` to render as any HTML element: `<Box as="section">`, `<Box as="article">`
- Supports pseudo props like `_hover`, `_focus`, `_active`
- Supports responsive values: `padding={{ base: "2", md: "4" }}`
- Use `hideBelow` / `hideFrom` for responsive visibility

## Related

- [Flex](./flex.md)
- [Grid](./grid.md)
- [Stack](./stack.md)
- [Center](./center.md)
