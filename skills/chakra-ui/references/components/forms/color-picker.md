# Color Picker

Full-featured color picker with area, channel sliders, eye dropper, and swatch support.

## Import

```tsx
import { ColorPicker } from "@chakra-ui/react"
```

## Usage

```tsx
<ColorPicker.Root defaultValue="#ff0000">
  <ColorPicker.Label>Pick a color</ColorPicker.Label>
  <ColorPicker.Control>
    <ColorPicker.Input />
    <ColorPicker.Trigger>
      <ColorPicker.Swatch />
    </ColorPicker.Trigger>
  </ColorPicker.Control>
  <ColorPicker.Positioner>
    <ColorPicker.Content>
      <ColorPicker.Area />
      <ColorPicker.ChannelSlider channel="hue" />
    </ColorPicker.Content>
  </ColorPicker.Positioner>
</ColorPicker.Root>
```

## Props

### ColorPicker.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | The size of the picker |
| `variant` | `"outline" \| "subtle"` | `"outline"` | The visual variant |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `defaultValue` | `string` | — | Initial color value |
| `value` | `string` | — | Controlled color value |
| `format` | `"hex" \| "rgb" \| "hsl" \| "hsb"` | `"hex"` | Color format |
| `closeOnSelect` | `boolean` | — | Close popup after swatch select |
| `disabled` | `boolean` | — | Whether the picker is disabled |
| `readOnly` | `boolean` | — | Whether the picker is read-only |
| `open` | `boolean` | — | Controlled open state |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when value changes |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |

## Sub-parts

`Root`, `Label`, `Control`, `Input`, `Trigger`, `Content`, `Positioner`, `Area`, `AreaBackground`, `AreaThumb`, `ChannelSlider`, `ChannelSliderTrack`, `ChannelSliderThumb`, `Swatch`, `SwatchGroup`, `SwatchTrigger`, `SwatchIndicator`, `EyeDropper`, `EyeDropperTrigger`, `FormatTrigger`, `FormatSelect`, `ChannelInput`, `ValueText`, `TransparencyGrid`

## Variants / Sizes

- **sizes**: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **variants**: `outline`, `subtle`

## Related

- [color-swatch.md](./color-swatch.md)
