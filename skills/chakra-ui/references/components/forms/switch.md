# Switch

Toggle switch for boolean on/off state.

## Import

```tsx
import { Switch } from "@chakra-ui/react"
```

## Usage

```tsx
<Switch.Root defaultChecked>
  <Switch.HiddenInput />
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label>Enable notifications</Switch.Label>
</Switch.Root>
```

## Props

### Switch.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the switch |
| `variant` | `"solid" \| "raised"` | `"solid"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Initial checked state |
| `disabled` | `boolean` | — | Whether the switch is disabled |
| `readOnly` | `boolean` | — | Whether the switch is read-only |
| `invalid` | `boolean` | — | Whether the switch is invalid |
| `onCheckedChange` | `(details: CheckedChangeDetails) => void` | — | Callback when checked state changes |

## Sub-parts

`Root`, `HiddenInput`, `Control`, `Thumb`, `Label`, `Indicator`, `ThumbIndicator`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`
- **variants**: `solid`, `raised`

## Related

- [checkbox.md](./checkbox.md)
- [field.md](./field.md)
