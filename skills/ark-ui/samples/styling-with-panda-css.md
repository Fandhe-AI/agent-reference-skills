# Styling with Panda CSS

Use `defineSlotRecipe` with a component's exported anatomy to style all its parts and states in one recipe.

```ts
// accordion.recipe.ts
import { accordionAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const accordionStyles = defineSlotRecipe({
  className: 'accordion',
  slots: accordionAnatomy.keys(),
  base: {
    item: {
      borderBottom: '1px solid {colors.gray.300}',
      // style based on the built-in `_open` state condition
      _open: {
        backgroundColor: 'gray.100',
      },
    },
  },
  defaultVariants: {},
  variants: {},
})
```

```tsx
// Accordion.tsx
import { Accordion } from '@ark-ui/react/accordion'
import { accordion } from '../styled-system/recipes'

const classes = accordion()

export const Example = () => (
  <Accordion.Root className={classes.root}>
    <Accordion.Item value="a" className={classes.item}>
      <Accordion.ItemTrigger className={classes.itemTrigger}>Trigger</Accordion.ItemTrigger>
      <Accordion.ItemContent className={classes.itemContent}>Content</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
)
```

## Notes

- Import anatomy from the `@ark-ui/<framework>/anatomy` entrypoint (e.g. `@ark-ui/react/anatomy`), not the main package export, to avoid build errors.
- `slots: accordionAnatomy.keys()` generates one style slot per component part automatically.
- Panda's built-in state conditions (e.g. `_open`, `_disabled`, `_invalid`) map directly to the `data-state` / `data-*` attributes Ark UI renders.
- The generated recipe function (`accordion()`) returns a `className` per part, matched against Ark UI's `className` props.
