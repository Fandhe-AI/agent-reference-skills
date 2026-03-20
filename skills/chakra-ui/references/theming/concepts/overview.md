# Theming Overview

Overview of the Chakra UI v3 theming system built on Panda CSS APIs.

## Overview

The theming system uses three core steps:

1. Define styling configuration using `defineConfig`
2. Create the styling engine with `createSystem`
3. Pass the engine to `ChakraProvider`

The `cssVarsRoot` configuration property specifies the root element where token CSS variables are applied.

## Usage

```tsx
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
})

const system = createSystem(defaultConfig, config)

export default function App() {
  return (
    <ChakraProvider value={system}>
      <Box>Hello World</Box>
    </ChakraProvider>
  )
}
```

## Notes

- `defaultBaseConfig` contains conditions and style properties without tokens/recipes
- `defaultConfig` includes everything from `defaultBaseConfig` plus built-in tokens and recipes
- Choose whether to merge your config with `defaultConfig` or start fresh with `defaultBaseConfig`

## Related

- [Tokens](./tokens.md)
- [Semantic Tokens](./semantic-tokens.md)
- [Recipes](./recipes.md)
- [Slot Recipes](./slot-recipes.md)
- [Customization Overview](../customization/overview.md)
