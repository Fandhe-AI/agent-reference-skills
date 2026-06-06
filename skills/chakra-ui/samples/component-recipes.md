# Component Recipes

Create type-safe multi-variant component styles using `defineRecipe` and the `chakra` factory.

```tsx
import { chakra, defineRecipe, useRecipe } from "@chakra-ui/react"

// Define a recipe
const badgeRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "full",
    fontWeight: "medium",
    px: "2",
  },
  variants: {
    variant: {
      solid:   { bg: "colorPalette.solid", color: "colorPalette.contrast" },
      subtle:  { bg: "colorPalette.muted", color: "colorPalette.fg" },
      outline: { borderWidth: "1px", borderColor: "colorPalette.muted", color: "colorPalette.fg" },
    },
    size: {
      sm: { fontSize: "xs", px: "1.5", py: "0.5" },
      md: { fontSize: "sm", px: "2",   py: "1" },
    },
  },
  defaultVariants: {
    variant: "subtle",
    size: "md",
  },
})

// Option A: Factory — create a reusable component
const Badge = chakra("span", badgeRecipe)

export function App() {
  return (
    <Badge variant="solid" colorPalette="green" size="sm">
      Active
    </Badge>
  )
}

// Option B: useRecipe hook — apply recipe inside a custom component
function CustomBadge({ variant, size, children }) {
  const recipe = useRecipe({ recipe: badgeRecipe })
  const [variantProps, rest] = badgeRecipe.splitVariantProps({ variant, size })
  const styles = recipe(variantProps)
  return <chakra.span css={styles} {...rest}>{children}</chakra.span>
}
```

## Notes

- `colorPalette` is a special token that maps to the active color palette's semantic tokens (e.g., `colorPalette.solid`)
- `splitVariantProps` separates recipe props from HTML props to avoid DOM attribute leakage
- `compoundVariants` allow styles conditional on multiple variant combinations
- `compoundVariants` do not support responsive values
