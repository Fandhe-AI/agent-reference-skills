# Colors Customization

Add new color palettes and override default color tokens.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#e6f2ff" },
          200: { value: "#bfdeff" },
          300: { value: "#99caff" },
          // ... continue through 950
          950: { value: "#001a33" },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
```

## Examples

Adding semantic tokens for light/dark mode:

```tsx
const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        "brand.solid": {
          value: { _light: "{colors.brand.600}", _dark: "{colors.brand.400}" },
        },
        "brand.contrast": {
          value: { _light: "white", _dark: "white" },
        },
      },
    },
  },
})
```

## Notes

- Provide shades from `50` to `950` for a complete palette
- Semantic tokens automatically adapt to color modes using `_light`/`_dark` conditions
- Use `{}` reference syntax to reference base tokens in semantic tokens

## Related

- [Colors Tokens](../design-tokens/colors.md)
- [Semantic Tokens](../concepts/semantic-tokens.md)
- [Customization Overview](./overview.md)
