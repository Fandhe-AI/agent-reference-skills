# Recipes Customization

Add new variants to existing component recipes or register entirely new recipes.

## Configuration

```tsx
import { defineRecipe, defineConfig, createSystem, defaultConfig } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  variants: {
    size: {
      xl: {
        fontSize: "lg",
        px: 6,
        py: 3,
      },
    },
  },
})

const customConfig = defineConfig({
  theme: {
    recipes: {
      button: buttonRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
```

## Examples

Registering a slot recipe:

```tsx
const customConfig = defineConfig({
  theme: {
    slotRecipes: {
      myComponent: mySlotRecipe,
    },
  },
})
```

## Notes

- Recipes are merged with existing component recipes when using `defaultConfig`
- Use `theme.recipes` for single-element component recipes
- Use `theme.slotRecipes` for multi-part component slot recipes
- `defineRecipe` provides type-safe recipe definitions

## Related

- [Recipes Concept](../concepts/recipes.md)
- [Slot Recipes Concept](../concepts/slot-recipes.md)
- [Customization Overview](./overview.md)
