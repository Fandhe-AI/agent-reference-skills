# Base UI & Motion

Animate Base UI components with Motion by swapping their DOM element for a `motion` component via the `render` prop.

## Signature / Usage

```tsx
import { Menu } from "@base-ui-components/react/menu"
import { motion } from "motion/react"

function Component() {
  return (
    <Menu.Trigger render={
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.9 }}
      />
    } />
  )
}
```

Exit animation for components that control their own mounting (`ContextMenu`, `Popover`): hoist `open`, add `keepMounted` to `Portal`, render the `Portal` inside `AnimatePresence`.

```tsx
function App() {
  const [open, setOpen] = useState(false)

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger>Open menu</ContextMenu.Trigger>
      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner>
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, transform: "scale(0.9)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    exit={{ opacity: 0, transform: "scale(0.9)" }}
                  />
                }
              >
                {/* Children */}
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  )
}
```

## Notes

- Most Base UI components accept `render`; for ordinary conditional rendering `AnimatePresence` + `exit` works as usual.
- `Portal` stays mounted while Base UI detects animations via `element.getAnimations()`. Motion runs `opacity`, `transform`, `filter` and `clipPath` hardware accelerated, so use at least one of these in the exit animation.
- Motion+ includes Motion x Base UI examples and an LLM ruleset.
- Upstream snippets are excerpts; closing tags were added so the example is syntactically complete.
- The official Base UI guide example uses `whilePress`, which is a Motion for Vue prop; in Motion for React the press gesture prop is `whileTap` (see the React gestures docs: https://motion.dev/docs/react-gestures).
- Source: https://motion.dev/docs/base-ui (fetched 2026-10).

## Related

- [Installation](./installation.md)
