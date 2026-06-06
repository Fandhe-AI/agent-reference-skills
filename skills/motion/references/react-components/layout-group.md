# LayoutGroup

Groups `motion` components that might not render together but affect each other's layout, so sibling layout animations stay in sync.

## Signature / Usage

```tsx
import { LayoutGroup } from "motion/react"

function Accordion() {
  return (
    <LayoutGroup>
      <AccordionItem header="Item 1" />
      <AccordionItem header="Item 2" />
    </LayoutGroup>
  )
}
```

Use when independent components each manage their own state (e.g. accordion items) yet need their `layout` animations to coordinate.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Namespaces the group so multiple groups can use the same `layoutId` values without collision |
| `inherit` | boolean | Controls whether children inherit the group's layout animation behavior |

## Notes

- Works with `motion` components that have the `layout` prop enabled.
- `layoutId` is global; supply `id` to prevent collisions when several `LayoutGroup`s coexist.
- Enables smooth shared element transitions across components with independent state.

## Related

- [motion](./motion.md)
- [AnimatePresence](./animate-presence.md)
