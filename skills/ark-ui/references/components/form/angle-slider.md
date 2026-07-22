# Angle Slider

A component for selecting a value within a circular range, enabling intuitive angle-based input selection.

## Anatomy

- `Root` — main container
- `Label` — accessible label element
- `Control` — wrapper for interactive elements
- `Thumb` — draggable handle
- `MarkerGroup` / `Marker` — visual angle indicators
- `ValueText` — current value display
- `HiddenInput` — form submission support

## Signature / Usage

```tsx
import { AngleSlider } from '@ark-ui/react/angle-slider'

<AngleSlider.Root>
  <AngleSlider.Label />
  <AngleSlider.Control>
    <AngleSlider.Thumb />
    <AngleSlider.MarkerGroup>
      <AngleSlider.Marker />
    </AngleSlider.MarkerGroup>
  </AngleSlider.Control>
  <AngleSlider.ValueText />
  <AngleSlider.HiddenInput />
</AngleSlider.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `defaultValue` | `number` | Initial slider value, default `0` |
| `value` | `number` | Controlled value |
| `onValueChange` | `function` | Controlled state callback |
| `step` | `number` | Discrete step increments, default `1` |
| `disabled` | `boolean` | Disables interaction |
| `readOnly` | `boolean` | Prevents modification |
| `invalid` | `boolean` | Validation indicator |
| `name` | `string` | Form field identifier |

## Notes

- Provides CSS variables (`--value`, `--angle`) for custom styling
- Full keyboard accessibility with ARIA support
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Slider](./slider.md)
- [Color Picker](./color-picker.md)
