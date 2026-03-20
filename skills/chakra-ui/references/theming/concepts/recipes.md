# Recipes

Multi-variant style definitions for components, providing type-safe runtime APIs.

## Overview

A recipe consists of five properties:

| Property | Description |
|----------|-------------|
| `className` | The CSS class name attached to the component |
| `base` | Foundational styles applied to all instances |
| `variants` | Different style variations |
| `compoundVariants` | Style combinations for specific variant pairings |
| `defaultVariants` | Default variant values when none are specified |

## Usage

```tsx
import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
  },
  variants: {
    variant: {
      solid: { bg: "red.200", color: "white" },
      outline: { borderWidth: "1px", borderColor: "red.200" },
    },
    size: {
      sm: { padding: "4", fontSize: "12px" },
      lg: { padding: "8", fontSize: "24px" },
    },
  },
})
```

## Notes

- Use `useRecipe` hook for direct usage within components
- Use the `chakra` factory (recommended) for component creation
- Recipes are registered under `theme.recipes` in the system config

## Related

- [Slot Recipes](./slot-recipes.md)
- [Customization — Recipes](../customization/recipes.md)
