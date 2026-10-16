# Number Input

Numeric input with increment/decrement controls and formatting support.

## Import

```tsx
import { NumberInput } from "@chakra-ui/react"
```

## Usage

```tsx
<NumberInput.Root min={0} max={100} defaultValue="10">
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
  <NumberInput.Input />
</NumberInput.Root>
```

## Props

### NumberInput.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the input |
| `variant` | `"outline" \| "subtle" \| "flushed"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `min` | `number` | — | Minimum allowed value |
| `max` | `number` | — | Maximum allowed value |
| `step` | `number` | `1` | Step increment |
| `defaultValue` | `string` | — | Initial value |
| `value` | `string` | — | Controlled value |
| `allowMouseWheel` | `boolean` | — | Whether mouse wheel changes the value |
| `formatOptions` | `Intl.NumberFormatOptions` | — | Number format options |
| `disabled` | `boolean` | — | Whether the input is disabled |
| `readOnly` | `boolean` | — | Whether the input is read-only |
| `invalid` | `boolean` | — | Whether the input is invalid |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when value changes |
| `largeStep` | `number` | `10 * step` | Amount to increment or decrement by when `Shift` is held |
| `smallStep` | `number` | `step / 10` | Amount to increment or decrement by when `Alt` is held |

```tsx
<NumberInput.Root step={1} largeStep={20} smallStep={0.5} />
```

The defaults match what the arrow keys already did, so existing inputs behave the same until you set them (3.37.0).

## Sub-parts

`Root`, `Input`, `Control`, `IncrementTrigger`, `DecrementTrigger`, `Scrubber`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`
- **variants**: `outline`, `subtle`, `flushed`

## Related

- [input.md](./input.md)
- [field.md](./field.md)
