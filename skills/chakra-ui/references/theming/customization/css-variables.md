# CSS Variables Customization

Configure the root selector where design token CSS variables are applied.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  cssVarsRoot: ":where(html)",
})

export const system = createSystem(defaultConfig, customConfig)
```

## Notes

- `cssVarsRoot` controls which CSS selector receives design token custom property declarations
- Default root is typically `:host, :root`
- All design tokens are exposed as CSS custom properties: `--chakra-[category]-[token]`
- CSS variables support both light and dark modes through runtime theme switching
- Variable categories include: colors, spacing, typography, animations, shadows, radii, z-index, durations, easings, breakpoints

## CSS Variable Naming Pattern

```
--chakra-colors-gray-500
--chakra-spacing-4
--chakra-fontSizes-md
--chakra-radii-lg
--chakra-shadows-md
--chakra-zIndex-modal
```

## Related

- [Customization Overview](./overview.md)
- [Tokens](../concepts/tokens.md)
