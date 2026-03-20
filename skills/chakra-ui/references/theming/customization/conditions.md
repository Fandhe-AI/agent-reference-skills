# Conditions Customization

Define custom CSS selector conditions for state-based and attribute-based styling.

## Configuration

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  conditions: {
    off: "&:is([data-state=off])",
    on: "&:is([data-state=on])",
  },
})

export const system = createSystem(defaultConfig, customConfig)
```

## Examples

Using a custom condition in styles:

```tsx
<Box _on={{ bg: "green.500" }} _off={{ bg: "gray.200" }} />
```

## Notes

- Condition values are CSS selector strings prefixed with `&`
- Can target data attributes, pseudo-classes, or any CSS selector
- Custom conditions integrate with Chakra's style prop system (prefixed with `_`)
- Built-in conditions include `_dark`, `_hover`, `_focus`, `_disabled`, `_checked`, etc.

## Related

- [Customization Overview](./overview.md)
- [Semantic Tokens](../concepts/semantic-tokens.md)
