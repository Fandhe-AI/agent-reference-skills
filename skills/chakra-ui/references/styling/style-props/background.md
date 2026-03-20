# Background Style Props

JSX style props for styling background colors, gradients, and images.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `bg`, `background` | `background` | `colors` |
| `bgColor`, `backgroundColor` | `background-color` | `colors` |
| `bgAttachment` | `background-attachment` | — |
| `bgBlendMode` | `background-blend-mode` | — |
| `bgClip` | `background-clip` | — |
| `bgOrigin` | `background-origin` | — |
| `bgPosition` | `background-position` | — |
| `bgPositionX` | `background-position-x` | — |
| `bgPositionY` | `background-position-y` | — |
| `bgRepeat` | `background-repeat` | — |
| `bgSize` | `background-size` | — |
| `bgImage` | `background-image` | — |

## Examples

```tsx
// Color token
<Box bg="blue.500" />

// Color with opacity modifier
<Box bg="blue.200/30" />

// Background image with fixed attachment
<Box bgAttachment="fixed" bgImage="url('/bg.png')" bgSize="cover" />

// Blend mode
<Box bgBlendMode="multiply" bgColor="red.200" bgImage="url('/texture.png')" />
```

## Related

- [Color Opacity Modifier](../concepts/color-opacity-modifier.md)
- [Effects Style Props](./effects.md)
