# Spacing Customization

Add custom spacing tokens to extend the default spacing scale.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      spacing: {
        "128": { value: "32rem" },
        "144": { value: "36rem" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
```

## Examples

Adding semantically named spacing tokens:

```tsx
spacing: {
  "xs-custom": { value: "0.5rem" },
  "lg-custom": { value: "2.5rem" },
  "screen-full": { value: "100vw" },
}
```

## Notes

- Custom tokens merge with Chakra's built-in spacing scale
- Supports any valid CSS measurement unit (rem, px, %, vw, etc.)
- Custom spacing tokens work immediately with Chakra's style props (`padding`, `margin`, `gap`, etc.)

## Related

- [Spacing Tokens](../design-tokens/spacing.md)
- [Customization — Sizes](./sizes.md)
- [Customization Overview](./overview.md)
