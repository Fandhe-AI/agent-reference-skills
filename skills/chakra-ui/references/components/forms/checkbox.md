# Checkbox

Accessible checkbox input supporting indeterminate state, sizes, and variants.

## Import

```tsx
import { Checkbox } from "@chakra-ui/react"
```

## Usage

```tsx
<Checkbox.Root>
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Accept terms</Checkbox.Label>
</Checkbox.Root>
```

## Props

### Checkbox.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the checkbox |
| `variant` | `"outline" \| "solid" \| "subtle"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Initial checked state |
| `indeterminate` | `boolean` | — | Whether in indeterminate state |
| `disabled` | `boolean` | — | Whether the checkbox is disabled |
| `readOnly` | `boolean` | — | Whether the checkbox is read-only |
| `invalid` | `boolean` | — | Whether the checkbox is invalid |
| `onCheckedChange` | `(details: CheckedChangeDetails) => void` | — | Callback when checked state changes |

## Sub-parts

`Root`, `HiddenInput`, `Control`, `Indicator`, `Label`, `Group`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`
- **variants**: `outline`, `solid`, `subtle`

## Related

- [checkbox-card.md](./checkbox-card.md)
- [field.md](./field.md)
