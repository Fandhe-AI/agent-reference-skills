# AspectRatio

Constrains a child element to a specific aspect ratio.

## Import

```tsx
import { AspectRatio } from "@chakra-ui/react"
```

## Usage

```tsx
<AspectRatio ratio={16 / 9} bg="bg.muted">
  <Center fontSize="xl">16 / 9</Center>
</AspectRatio>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `ConditionalValue<number>` | — | The aspect ratio. Common values: `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1` |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Notes

- Supports responsive `ratio` values via breakpoint objects: `ratio={{ base: 1, md: 16/9 }}`
- Works with images, videos, iframes, and any block element

## Related

- [Box](./box.md)
- [Center](./center.md)
