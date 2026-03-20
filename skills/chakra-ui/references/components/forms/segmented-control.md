# Segmented Control

Tab-like toggle group for mutually exclusive options with an animated selection indicator.

## Import

```tsx
import { SegmentGroup } from "@chakra-ui/react"
```

## Usage

```tsx
<SegmentGroup.Root defaultValue="react">
  <SegmentGroup.Indicator />
  <SegmentGroup.Item value="react">
    <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
    <SegmentGroup.ItemHiddenInput />
  </SegmentGroup.Item>
  <SegmentGroup.Item value="vue">
    <SegmentGroup.ItemText>Vue</SegmentGroup.ItemText>
    <SegmentGroup.ItemHiddenInput />
  </SegmentGroup.Item>
</SegmentGroup.Root>
```

## Props

### SegmentGroup.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the control |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation |
| `defaultValue` | `string` | — | Initial selected value |
| `value` | `string` | — | Controlled selected value |
| `disabled` | `boolean` | — | Whether the control is disabled |
| `readOnly` | `boolean` | — | Whether the control is read-only |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when selection changes |

## Sub-parts

`Root`, `Indicator`, `Item`, `ItemText`, `ItemHiddenInput`, `Items`, `Label`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`

## Notes

- The component is exported as `SegmentGroup` from `@chakra-ui/react` (not `SegmentedControl`).
- `SegmentGroup.Indicator` renders the animated sliding background; place it before the items.

## Related

- [radio.md](./radio.md)
- [tabs](../../navigation/tabs.md)
