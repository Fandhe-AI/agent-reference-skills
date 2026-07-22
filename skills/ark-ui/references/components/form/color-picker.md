# Color Picker

A component that allows users to select a color from a color picker.

## Anatomy

- `Root` — main container wrapping the entire component
- `Label` — text label for the color picker
- `Control` — container for trigger and input elements
- `Trigger` — button that opens the color picker popover
- `ValueSwatch` — visual display of the currently selected color
- `Positioner` — manages popup positioning logic
- `Content` — popover container holding picker tools
- `Area` / `AreaBackground` / `AreaThumb` — 2D color selection gradient surface, background, and cursor
- `ChannelSlider` / `ChannelSliderTrack` / `ChannelSliderThumb` — controls for individual color channels (R, G, B, A)
- `ChannelInput` — text inputs for direct color value entry
- `EyeDropperTrigger` — button for the eyedropper tool
- `SwatchGroup` / `Swatch` / `SwatchTrigger` / `SwatchIndicator` — preset color palette
- `TransparencyGrid` — checkerboard background for alpha display
- `HiddenInput` — form integration element

## Signature / Usage

```tsx
import { ColorPicker } from '@ark-ui/react/color-picker'

<ColorPicker.Root defaultValue="#ff0000">
  <ColorPicker.Label>Color</ColorPicker.Label>
  <ColorPicker.Control>
    <ColorPicker.Trigger>
      <ColorPicker.ValueSwatch />
    </ColorPicker.Trigger>
  </ColorPicker.Control>
  <ColorPicker.Positioner>
    <ColorPicker.Content>
      <ColorPicker.Area>
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <ColorPicker.ChannelSlider channel="hue">
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
    </ColorPicker.Content>
  </ColorPicker.Positioner>
  <ColorPicker.HiddenInput />
</ColorPicker.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` / `defaultValue` | `string` | Set or track the selected color |
| `open` / `defaultOpen` | `boolean` | Control popover visibility |
| `format` | `'rgba' \| 'hsla' \| ...` | Choose color format |
| `disabled` | `boolean` | Disable user interaction |
| `inline` | `boolean` | Render without popover |
| `closeOnSelect` | `boolean` | Auto-close after swatch selection |
| `onValueChange` | `function` | Fires when color changes |
| `onOpenChange` | `function` | Fires when popover open state changes |
| `onFormatChange` | `function` | Fires when format changes |

## Notes

- Keyboard: Enter opens picker or confirms selection, Arrow keys navigate color area and sliders, Esc closes the picker
- Can integrate with `Field` for form accessibility
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Angle Slider](./angle-slider.md)
