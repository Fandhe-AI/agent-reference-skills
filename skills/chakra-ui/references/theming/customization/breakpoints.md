# Breakpoints Customization

Override or extend the default responsive breakpoints.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    breakpoints: {
      tablet: "992px",
      desktop: "1200px",
      wide: "1400px",
    },
  },
})

export default createSystem(defaultConfig, config)
```

## Notes

- Override existing defaults by reusing the same key names (`sm`, `md`, `lg`, `xl`, `2xl`)
- Add new breakpoints with custom names and pixel values
- Custom breakpoints can be used with responsive prop syntax immediately after configuration
- The `defineConfig` function provides TypeScript type safety for custom breakpoint names

## Related

- [Breakpoints Tokens](../design-tokens/breakpoints.md)
- [Customization Overview](./overview.md)
