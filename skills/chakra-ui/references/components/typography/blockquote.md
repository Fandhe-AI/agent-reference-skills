# Blockquote

A styled blockquote component for displaying quoted content with optional citation and icon. Composed of `Blockquote.Root`, `Blockquote.Content`, `Blockquote.Caption`, and `Blockquote.Icon`.

## Import

```tsx
import { Blockquote } from "@chakra-ui/react"
```

## Usage

```tsx
<Blockquote.Root>
  <Blockquote.Content cite="Uzumaki Naruto">
    If anyone thinks he is something when he is nothing, he deceives himself.
  </Blockquote.Content>
  <Blockquote.Caption>
    — <cite>Uzumaki Naruto</cite>
  </Blockquote.Caption>
</Blockquote.Root>
```

## Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"subtle" \| "solid" \| "plain"` | `"subtle"` | Visual style |
| `justify` | `"start" \| "center" \| "end"` | `"start"` | Text alignment |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `unstyled` | `boolean` | — | Remove component styles |

## Variants / Sizes

- `variant="subtle"` — light background border accent (default)
- `variant="solid"` — solid color background
- `variant="plain"` — no background, minimal styling

## Notes

- `Blockquote.Content` accepts a `cite` prop for the URL of the source
- `Blockquote.Caption` is used for the citation text (the author/source)
- Use `Blockquote.Icon` with `Float` for decorative quote icons
- Supports all color palettes

## Related

- [Text](./text.md)
- [Mark](./mark.md)
