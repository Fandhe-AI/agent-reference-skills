# Semantic Tokens

Context-specific design tokens that reference existing base tokens to add semantic meaning.

## Overview

Semantic tokens consist of:
- **`value`**: The token's value or a reference to an existing token using `{}` syntax
- **`description`**: Optional context about the token's intended use

Unlike base tokens that define raw values, semantic tokens map those values to specific use cases (e.g., `danger` instead of `red`).

## Usage

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        red: { value: "#EE0F0F" },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
      },
    },
  },
})

export default createSystem(defaultConfig, config)
```

## Notes

- Reference existing tokens with the `{category.tokenName}` syntax
- Semantic tokens support conditions for dark mode and other theme variations
- Separates design intent from implementation details

## Related

- [Tokens](./tokens.md)
- [Colors](../design-tokens/colors.md)
- [Customization Overview](../customization/overview.md)
