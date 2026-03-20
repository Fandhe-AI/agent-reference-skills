# Float

Positions a child element at a specific corner or edge of a relatively-positioned parent. Useful for badges, indicators, and status dots.

## Import

```tsx
import { Float } from "@chakra-ui/react"
```

## Usage

```tsx
<Box position="relative" w="80px" h="80px" bg="bg.emphasized">
  <Float>
    <Circle size="5" bg="red" color="white">
      3
    </Circle>
  </Float>
</Box>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `"bottom-end" \| "bottom-start" \| "top-end" \| "top-start" \| "bottom-center" \| "top-center" \| "middle-center" \| "middle-end" \| "middle-start"` | `"top-end"` | The placement of the floating element |
| `offsetX` | `SystemStyleObject["left"]` | — | Horizontal offset |
| `offsetY` | `SystemStyleObject["top"]` | — | Vertical offset |
| `offset` | `SystemStyleObject["top"]` | — | Both x and y offset |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Notes

- The parent element **must** have `position="relative"` (or non-static positioning)
- Commonly used for notification badges on avatars or icons
- Use `offset`, `offsetX`, `offsetY` for fine-tuned positioning

## Related

- [AbsoluteCenter](./absolute-center.md)
- [Box](./box.md)
