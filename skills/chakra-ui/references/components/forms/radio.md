# Radio

Radio button group for single-option selection.

## Import

```tsx
import { RadioGroup } from "@chakra-ui/react"
```

## Usage

```tsx
<RadioGroup.Root defaultValue="react">
  <RadioGroup.Item value="react">
    <RadioGroup.ItemHiddenInput />
    <RadioGroup.ItemIndicator />
    <RadioGroup.ItemText>React</RadioGroup.ItemText>
  </RadioGroup.Item>
  <RadioGroup.Item value="vue">
    <RadioGroup.ItemHiddenInput />
    <RadioGroup.ItemIndicator />
    <RadioGroup.ItemText>Vue</RadioGroup.ItemText>
  </RadioGroup.Item>
</RadioGroup.Root>
```

## Props

### RadioGroup.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the radio buttons |
| `variant` | `"solid" \| "outline" \| "subtle"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Layout orientation |
| `defaultValue` | `string` | — | Initial selected value |
| `value` | `string` | — | Controlled selected value |
| `disabled` | `boolean` | — | Whether the group is disabled |
| `readOnly` | `boolean` | — | Whether the group is read-only |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when selection changes |

## Sub-parts

`Root`, `Item`, `ItemHiddenInput`, `ItemIndicator`, `ItemText`, `Label`

## Variants / Sizes

- **sizes**: `sm`, `md`, `lg`
- **variants**: `solid`, `outline`, `subtle`

## Notes

- The component is exported as `RadioGroup` from `@chakra-ui/react` (not `Radio`).

## Related

- [radio-card.md](./radio-card.md)
- [field.md](./field.md)
