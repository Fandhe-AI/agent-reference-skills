# Sizes Customization

Add custom dimension tokens to extend the default size scale.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      sizes: {
        "1/7": { value: "14.285%" },
        "2/7": { value: "28.571%" },
        "3/7": { value: "42.857%" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
```

## Notes

- Define sizes as objects with a `value` property containing a CSS measurement
- Supports percentages, rem, px, or any valid CSS unit
- Custom tokens merge with Chakra's built-in size scale
- Size tokens are available as CSS variables: `--chakra-sizes-[token]`

## Related

- [Sizes Tokens](../design-tokens/sizes.md)
- [Customization — Spacing](./spacing.md)
- [Customization Overview](./overview.md)
