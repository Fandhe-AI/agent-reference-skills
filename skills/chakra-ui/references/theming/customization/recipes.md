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

## TypeScript

Chakra can generate TypeScript types from your theme file. That output reflects your **entire** system (tokens, conditions, recipes, and utilities), not only the recipes you customize on this page.

> Whenever you edit the config passed to `createSystem`, run `typegen` again so your editor stays accurate. If the generated files fall behind, TypeScript may flag working code until you regenerate.

```bash
npx @chakra-ui/cli typegen ./theme.ts
```

Use the path to the file where you call `createSystem` (often `./theme.ts`).

## Notes

- Recipes are merged with existing component recipes when using `defaultConfig`
- Use `theme.recipes` for single-element component recipes
- Use `theme.slotRecipes` for multi-part component slot recipes
- `defineRecipe` provides type-safe recipe definitions

## Related

- [Recipes Concept](../concepts/recipes.md)
- [Slot Recipes Concept](../concepts/slot-recipes.md)
- [Customization Overview](./overview.md)
