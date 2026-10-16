# AnimateActivity (Motion+ early access)

Animated version of React's `Activity` component: adds exit animations when hiding children, which are then hidden with `display: none` while keeping their internal state.

## Signature / Usage

```tsx
import { AnimateActivity } from "motion-plus/animate-activity"

<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
</AnimateActivity>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mode` | `"visible"` \| `"hidden"` | Same API as `Activity`. Switching to `"hidden"` applies `display: none` after child exit animations complete |
| `layoutMode` | `"pop"` | Pops the exiting element out of layout immediately so surrounding elements reflow. By default exiting children keep affecting layout until the exit finishes |

Sequencing exit animations through a tree uses variants, as with `AnimatePresence`:

```tsx
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <motion.ul exit="hidden" variants={{ hidden: { delayChildren: stagger(0.1) } }}>
    {items.map(item => (
      <motion.li variants={{ hidden: { opacity: 0 } }}>{item.title}</motion.li>
    ))}
  </motion.ul>
</AnimateActivity>
```

## Notes

- Motion+ early access (paid); not included in the free `motion` package. Early access APIs may change with feedback.
- Import from `"motion-plus/animate-activity"`. Requires `motion@12.23.24` and `react@19.2.0` or above. Once out of alpha it will be imported from the main `"motion"` package.
- Differs from AnimatePresence: AnimatePresence animates elements being added to and removed from the tree; AnimateActivity shows/hides via `Activity`, preserving state.
- Source: https://motion.dev/docs/react-animate-activity (fetched 2026-10).

## Related

- [AnimatePresence](./animate-presence.md)
- [motion](./motion.md)
