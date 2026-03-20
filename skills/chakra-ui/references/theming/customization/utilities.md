# Utilities Customization

Create custom CSS properties, map existing properties to token values, or define shorthand aliases.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  utilities: {
    extend: {
      br: {
        values: "radii",
        transform(value) {
          return { borderRadius: value }
        },
      },
    },
  },
})

const system = createSystem(defaultConfig, customConfig)
```

## Usage

```tsx
import { Box } from "@chakra-ui/react"

function App() {
  return <Box br="sm" />
}
```

## Notes

- Each utility requires three properties:
  - `shorthand`: An alias name for the property
  - `values`: The accepted value type — a token category (e.g., `"radii"`), enum, string, number, or boolean
  - `transform`: Function that converts the value to valid CSS object
- Use `utilities.extend` to add to existing utilities without replacing them
- Utilities enable concise, token-aware shorthand style props

## Related

- [Customization Overview](./overview.md)
- [Tokens](../concepts/tokens.md)
