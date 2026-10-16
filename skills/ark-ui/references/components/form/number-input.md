# Number Input

A field that allows user input of numeric values. Complies with the WAI-ARIA spinbutton design pattern.

## Anatomy

- `Root` — main container
- `Label` — associated label element
- `Input` — the numeric input field
- `Control` — wrapper for input and triggers
- `IncrementTrigger` — button to increase value
- `DecrementTrigger` — button to decrease value
- `Scrubber` — interactive drag area for value changes

## Signature / Usage

```tsx
import { NumberInput } from '@ark-ui/react/number-input'

<NumberInput.Root>
  <NumberInput.Label />
  <NumberInput.Control>
    <NumberInput.Input />
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `min` | `number` | Minimum allowed value, default `MIN_SAFE_INTEGER` |
| `max` | `number` | Maximum allowed value, default `MAX_SAFE_INTEGER` |
| `step` | `number` | Increment/decrement amount, default `1` |
| `allowMouseWheel` | `boolean` | Enable mouse wheel changes, default `false` |
| `formatOptions` | `Intl.NumberFormatOptions` | Locale/format options |
| `largeStep` | `number` | The amount to increment or decrement the value by when the `Shift` key is held, default `10 * step` (added in 5.38.0) |
| `smallStep` | `number` | The amount to increment or decrement the value by when the `Alt` key is held, default `step / 10` (added in 5.38.0) |
| `clampValueOnBlur` | `boolean` | Restrict value to min/max on blur, default `true` |
| `disabled` | `boolean` | Disable the input |

## Notes

- Use string values for controlled inputs, especially with formatting options, to avoid locale-specific parsing issues
- `Scrubber` uses the Pointer Lock API and is disabled in Safari
- Keyboard support: ArrowUp/Down (step), Shift+Arrow (large step), Alt+Arrow (small step), Home/End (min/max)
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Slider](./slider.md)
