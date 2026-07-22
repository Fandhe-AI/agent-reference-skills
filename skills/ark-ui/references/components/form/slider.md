# Slider

A control element that allows for a range of selections. Supports single and multiple values, customizable ranges, and both horizontal and vertical orientations.

## Anatomy

- `Root` — main container
- `Label` — text label for the slider
- `Control` — wrapper for interactive elements
- `Track` — background rail where the slider moves
- `Range` — filled portion between min/current value
- `Thumb` — draggable handle(s)
- `HiddenInput` — underlying form input
- `ValueText` — displays current value
- `MarkerGroup` / `Marker` — optional tick marks

## Signature / Usage

```tsx
import { Slider } from '@ark-ui/react/slider'

<Slider.Root min={0} max={100} defaultValue={[50]}>
  <Slider.Label>Select value</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0}>
      <Slider.HiddenInput />
    </Slider.Thumb>
  </Slider.Control>
</Slider.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `min` | `number` | Minimum value, default `0` |
| `max` | `number` | Maximum value, default `100` |
| `step` | `number` | Increment precision, default `1` |
| `value` | `number[]` | Controlled value array |
| `orientation` | `'horizontal' \| 'vertical'` | Layout direction |
| `disabled` | `boolean` | Disable interaction |
| `onValueChange` | `function` | Callback during drag |
| `onValueChangeEnd` | `function` | Callback when drag ends |

## Notes

- Supports range sliders with multiple thumbs (one `Thumb` per `index`)
- Customize `step` for decimal precision (e.g. `step={0.01}`)
- Use `minStepsBetweenThumbs` to prevent thumb overlap
- Control thumb collision with `thumbCollisionBehavior` (`push`, `swap`, `none`)
- Vertical orientation requires explicit height styling
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Angle Slider](./angle-slider.md)
- [Number Input](./number-input.md)
