# Global CSS Customization

Add application-wide CSS styles using the `globalCss` configuration option.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  globalCss: {
    "*::placeholder": {
      opacity: 1,
      color: "fg.subtle",
    },
    "*::selection": {
      bg: "green.200",
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
```

## Notes

- The `globalCss` object accepts CSS selectors as keys with style properties as values
- Style values support Chakra's token-based syntax (e.g., `"fg.subtle"`, `"green.200"`)
- Useful for styling pseudo-elements (`::placeholder`, `::selection`) and global resets
- Global styles are applied once and affect the entire application

## Related

- [Customization Overview](./overview.md)
- [CSS Variables](./css-variables.md)
