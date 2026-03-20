# Container

A layout component that constrains content to a maximum width and centers it horizontally.

## Import

```tsx
import { Container } from "@chakra-ui/react"
```

## Usage

```tsx
<Container>
  <Box px="2">
    Lorem ipsum dolor sit amet...
  </Box>
</Container>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `centerContent` | `"true" \| "false"` | — | Centers the content inside the container |
| `fluid` | `"true" \| "false"` | — | Makes the container full-width (no max-width) |
| `colorPalette` | `string` | `"gray"` | The color palette of the component |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Variants / Sizes

Use `maxW` prop for size control:

```tsx
<Container maxW="sm">Small</Container>
<Container maxW="md">Medium</Container>
<Container maxW="xl">Extra large</Container>
<Container maxW="2xl">2XL</Container>
```

## Notes

- Default max-width follows the theme's container sizes
- Use `fluid` for full-width sections
- Use `centerContent` to center children with flexbox

## Related

- [Box](./box.md)
- [Bleed](./bleed.md)
