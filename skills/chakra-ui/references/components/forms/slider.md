# Slider

Draggable range input supporting single and multi-thumb configurations.

## Import

```tsx
import { Slider } from "@chakra-ui/react"
```

## Usage

```tsx
<Slider.Root min={0} max={100} defaultValue={[40]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0}>
      <Slider.HiddenInput />
    </Slider.Thumb>
  </Slider.Control>
  <Slider.ValueText />
</Slider.Root>
```

## Props

### Slider.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the slider |
| `variant` | `"outline" \| "solid"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `defaultValue` | `number[]` | `[0]` | Initial value(s) — array for multi-thumb |
| `value` | `number[]` | — | Controlled value(s) |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation |
| `origin` | `"start" \| "center" \| "end"` | `"start"` | Where the range fills from |
| `thumbAlignment` | `"contain" \| "center"` | `"contain"` | How thumbs align at track edges |
| `disabled` | `boolean` | — | Whether the slider is disabled |
| `readOnly` | `boolean` | — | Whether the slider is read-only |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback during drag |
| `onValueChangeEnd` | `(details: ValueChangeDetails) => void` | — | Callback when drag ends |

## Sub-parts

`Root`, `Control`, `Track`, `Range`, `Thumb`, `HiddenInput`, `Label`, `ValueText`, `MarkerGroup`, `Marker`, `DraggingIndicator`

## Variants / Sizes

- **sizes**: `sm`, `md`, `lg`
- **variants**: `outline`, `solid`

## Notes

- For a range slider, pass two values in `defaultValue` and render two `Slider.Thumb` components with `index={0}` and `index={1}`.
- `Slider.Marker` within `Slider.MarkerGroup` renders tick marks at specific values.

## Related

- [number-input.md](./number-input.md)
