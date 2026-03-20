# Typeset

A documentation block that displays typography samples to showcase fonts, weights, and sizes used in a project.

## Import

```ts
import { Typeset } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `fontFamily` | `string` | The font family to display |
| `fontSizes` | `(string \| number)[]` | List of available font sizes in `px` |
| `fontWeight` | `number` | Weight of the font to display |
| `sampleText` | `string` | Text string to display at each size |

## Usage

```tsx
import { Meta, Typeset } from '@storybook/addon-docs/blocks';

export const typography = {
  type: { primary: '"Nunito Sans", sans-serif' },
  weight: { regular: '400', bold: '700' },
  size: { s1: 12, m1: 20, l1: 32 },
};

<Meta title="Typography" />

<Typeset
  fontFamily={typography.type.primary}
  fontSizes={[typography.size.s1, typography.size.m1, typography.size.l1]}
  fontWeight={Number(typography.weight.bold)}
  sampleText="The quick brown fox jumps over the lazy dog"
/>
```

## Notes

- `fontSizes` expects numeric pixel values; wrap object-sourced values with `Number()` if needed
- Designed for typography system documentation in design documentation pages

## Related

- [color-palette.md](./color-palette.md)
- [icon-gallery.md](./icon-gallery.md)
