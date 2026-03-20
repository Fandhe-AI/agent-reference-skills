# Customization Overview

Entry point for customizing the Chakra UI v3 styling engine using `defineConfig` and `createSystem`.

## Configuration

Two base config types are available:

| Config | Description |
|--------|-------------|
| `defaultBaseConfig` | Conditions and style properties only (no tokens/recipes) |
| `defaultConfig` | Everything in `defaultBaseConfig` plus built-in tokens and recipes |

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          "500": { value: "tomato" },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
```

## Provider Setup

```tsx
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { system } from "./theme"

export function Provider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class">{props.children}</ThemeProvider>
    </ChakraProvider>
  )
}
```

## Customizable Areas

| Area | Description |
|------|-------------|
| Animations | Add/override keyframes and durations |
| Breakpoints | Customize responsive breakpoints |
| Colors | Add color palettes and semantic tokens |
| Conditions | Define custom CSS selector conditions |
| CSS Variables | Set `cssVarsRoot` and variable structure |
| Global CSS | Add application-wide base styles |
| Recipes | Add/extend component style recipes |
| Sizes | Add custom dimension tokens |
| Spacing | Add custom spacing values |
| Utilities | Define custom CSS shorthand properties |

## Notes

- Merge your config with `defaultConfig` to extend defaults
- Use `defaultBaseConfig` to build from scratch without built-in tokens
- Read this overview before customizing to ensure type safety

## Related

- [Theming Overview](../concepts/overview.md)
- [Tokens](../concepts/tokens.md)
