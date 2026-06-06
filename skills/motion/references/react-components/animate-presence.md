# AnimatePresence

Enables exit animations for `motion` components when they are removed from the React tree, unlocking the `exit` prop on direct children.

## Signature / Usage

```tsx
import { AnimatePresence, motion } from "motion/react"

;<AnimatePresence>
  {show && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

Detects removal via conditional rendering, `key` prop changes, or list item changes.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `initial` | boolean | Set `false` to skip initial animations for children present on first render |
| `mode` | "sync" \| "wait" \| "popLayout" | `sync` (default) animates in/out together; `wait` defers entering until exit completes; `popLayout` removes exiting elements from layout to allow reflow |
| `custom` | any | Dynamic data passed to exiting components, read via `usePresenceData()` |
| `onExitComplete` | function | Fires when all exit animations finish |
| `propagate` | boolean | When `true`, child exit animations trigger even when this `AnimatePresence` exits a parent one |

## Notes

- All immediate children require unique, stable `key` props (avoid array indices).
- `AnimatePresence` must wrap the conditional logic; do not conditionally render `AnimatePresence` itself.
- Children can read exit state via `useIsPresent()` and `usePresence()` hooks.

## Related

- [motion](./motion.md)
- [Reorder](./reorder.md)
