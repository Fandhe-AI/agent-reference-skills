# AbsoluteCenter

Centers a child element absolutely within a relatively-positioned parent, along a specified axis.

## Import

```tsx
import { AbsoluteCenter } from "@chakra-ui/react"
```

## Usage

```tsx
<Box position="relative" h="100px" bg="bg.muted" borderRadius="md">
  <AbsoluteCenter>
    <Box bg="bg.emphasized" px="4" py="2" borderRadius="md">
      Centered Content
    </Box>
  </AbsoluteCenter>
</Box>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `axis` | `"horizontal" \| "vertical" \| "both"` | `"both"` | The axis to center along |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Notes

- The parent element **must** have `position="relative"` (or other non-static positioning)
- `axis="both"` centers horizontally and vertically
- `axis="horizontal"` centers only on the x-axis
- `axis="vertical"` centers only on the y-axis
- Useful for overlay spinners, badges, and centered icons

## Related

- [Center](./center.md)
- [Float](./float.md)
- [Box](./box.md)
