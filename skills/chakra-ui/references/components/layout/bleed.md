# Bleed

Applies negative margins to allow a child element to "bleed" outside its parent's padding.

## Import

```tsx
import { Bleed } from "@chakra-ui/react"
```

## Usage

```tsx
<Box padding="10" rounded="sm" borderWidth="1px">
  <Bleed inline="10">
    <Box height="20">Full-width bleed content</Box>
  </Bleed>
</Box>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inline` | `SystemStyleObject["marginInline"]` | — | Negative margin on the x-axis (both sides) |
| `block` | `SystemStyleObject["marginBlock"]` | — | Negative margin on the y-axis (both sides) |
| `inlineStart` | `SystemStyleObject["marginInlineStart"]` | — | Negative margin on the inline-start axis |
| `inlineEnd` | `SystemStyleObject["marginInlineEnd"]` | — | Negative margin on the inline-end axis |
| `blockStart` | `SystemStyleObject["marginBlockStart"]` | — | Negative margin on the block-start axis |
| `blockEnd` | `SystemStyleObject["marginBlockEnd"]` | — | Negative margin on the block-end axis |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Notes

- Typically used inside padded containers to make a child span the full width
- The value passed should match the parent's padding value

## Related

- [Box](./box.md)
- [Container](./container.md)
