# ColorPalette / ColorItem

A doc block that documents color-related items such as color swatches used throughout a project.

## Import

```ts
import { ColorPalette, ColorItem } from '@storybook/addon-docs/blocks';
```

## Props

### `ColorPalette`

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Accepts only `ColorItem` children |

### `ColorItem`

| Name | Type | Description |
|------|------|-------------|
| `title` | `string` | **(Required)** Name/label for the color grouping |
| `subtitle` | `string` | **(Required)** Additional context or category description |
| `colors` | `string[] \| { [key: string]: string }` | **(Required)** Color swatches as CSS color values; object keys display above values |

## Usage

```tsx
import { Meta, ColorPalette, ColorItem } from '@storybook/addon-docs/blocks';

<Meta title="Colors" />

<ColorPalette>
  <ColorItem
    title="theme.color.primary"
    subtitle="Coral"
    colors={{ WildWatermelon: '#FF4785' }}
  />
  <ColorItem
    title="theme.color.positive"
    subtitle="Green"
    colors={{
      Apple: 'rgba(102,191,60,1)',
      Apple80: 'rgba(102,191,60,.8)',
    }}
  />
</ColorPalette>
```

## Notes

- `colors` accepts any valid CSS color format: hex, RGB, HSL, gradients (`'linear-gradient(to right, white, black)'`)
- Particularly useful for design system color documentation

## Related

- [typeset.md](./typeset.md)
- [icon-gallery.md](./icon-gallery.md)
