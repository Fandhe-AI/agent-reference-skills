# Animations Customization

Add custom keyframe animations and override built-in animation tokens.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    keyframes: {
      shakeX: {
        "0%, 100%": { transform: "translateX(-100%)" },
        "50%": { transform: "translateX(100%)" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
```

## Examples

Custom keyframes with CSS custom properties for dynamic control:

```tsx
const config = defineConfig({
  theme: {
    keyframes: {
      marqueeX: {
        from: { transform: "translateX(var(--marquee-translate))" },
        to: { transform: "translateX(calc(var(--marquee-translate) * -1))" },
      },
    },
  },
})
```

## Notes

- Keyframes are defined under `theme.keyframes`
- Supports CSS custom properties within keyframes for dynamic control (e.g., `--slide-from-*-distance`)
- Built-in duration tokens: `fastest` (50ms) through `slowest` (500ms)
- Built-in easing tokens: `ease-in`, `ease-out`, `ease-in-out`, `ease-in-smooth`

## Related

- [Animations Tokens](../design-tokens/animations.md)
- [Customization Overview](./overview.md)
