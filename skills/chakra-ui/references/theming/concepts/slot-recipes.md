# Slot Recipes

Multi-part component style definitions that apply coordinated style variations across multiple slots simultaneously.

## Overview

A slot recipe consists of:

| Property | Description |
|----------|-------------|
| `className` | Prefix applied to component slots |
| `slots` | Array identifying each component part to style |
| `base` | Default styles per slot |
| `variants` | Visual style options for each slot |
| `defaultVariants` | Default variant selection |
| `compoundVariants` | Style overrides for specific variant combinations |

## Usage

```tsx
import { defineSlotRecipe } from "@chakra-ui/react"

export const checkboxRecipe = defineSlotRecipe({
  className: "checkbox",
  slots: ["root", "control", "label"],
  base: {
    root: { display: "flex", alignItems: "center" },
    control: { borderWidth: "1px" },
    label: { marginStart: "2" },
  },
  variants: {
    size: {
      sm: {
        control: { width: "4", height: "4" },
        label: { fontSize: "sm" },
      },
      md: {
        control: { width: "5", height: "5" },
        label: { fontSize: "md" },
      },
    },
  },
})
```

## Notes

- Use `useSlotRecipe` hook for direct style application
- Use `createSlotRecipeContext` (recommended) for context-based component architecture
- Unlike standard recipes, slot recipes distribute styling across multiple interconnected parts
- Slot recipes are registered under `theme.slotRecipes` in the system config

## Related

- [Recipes](./recipes.md)
- [Customization — Recipes](../customization/recipes.md)
