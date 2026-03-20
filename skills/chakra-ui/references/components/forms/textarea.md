# Textarea

Multi-line text input field with optional auto-resize behavior.

## Import

```tsx
import { Textarea } from "@chakra-ui/react"
```

## Usage

```tsx
<Textarea placeholder="Enter description..." size="md" variant="outline" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | The size of the textarea |
| `variant` | `"outline" \| "subtle" \| "flushed"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `autoresize` | `boolean` | `false` | Whether the textarea grows to fit content |
| `disabled` | `boolean` | — | Whether the textarea is disabled |
| `readOnly` | `boolean` | — | Whether the textarea is read-only |
| `invalid` | `boolean` | — | Whether the textarea is invalid |
| `rows` | `number` | — | Number of visible text lines |

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`, `xl`
- **variants**: `outline`, `subtle`, `flushed`

## Notes

- Set `autoresize` to `true` to automatically expand the textarea height as content grows.
- Wrap with `Field.Root` for accessible label and error message associations.

## Related

- [input.md](./input.md)
- [editable.md](./editable.md)
- [field.md](./field.md)
