# Input

Single-line text input field.

## Import

```tsx
import { Input } from "@chakra-ui/react"
```

## Usage

```tsx
<Input placeholder="Enter text..." size="md" variant="outline" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | The size of the input |
| `variant` | `"outline" \| "subtle" \| "flushed"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `disabled` | `boolean` | — | Whether the input is disabled |
| `readOnly` | `boolean` | — | Whether the input is read-only |
| `invalid` | `boolean` | — | Whether the input is invalid |

## Variants / Sizes

- **sizes**: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **variants**: `outline`, `subtle`, `flushed`

## Notes

- Use `InputGroup` with `InputElement` or `InputAddon` to add icons or addons.
- Wrap with `Field.Root` for label and error message associations.

## Related

- [field.md](./field.md)
- [number-input.md](./number-input.md)
- [textarea.md](./textarea.md)
