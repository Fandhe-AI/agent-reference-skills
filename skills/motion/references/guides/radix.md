# Radix UI & Motion (React)

Animate Radix primitives with Motion for React: `asChild` for motion components, hoisted state for exit and layout animations.

## Signature / Usage

```tsx
<Toast.Root asChild>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    layout
  />
</Toast.Root>
```

Exit animation with `AnimatePresence` and `forceMount`:

```tsx
const [isOpen, setOpen] = useState(false)

return (
  <Tooltip.Provider>
    <Tooltip.Root open={isOpen} onOpenChange={setOpen}>
      <AnimatePresence>
        {isOpen && (
          <Tooltip.Portal forceMount>
            <Tooltip.Content asChild>
              <motion.div exit={{ opacity: 0 }} />
            </Tooltip.Content>
          </Tooltip.Portal>
        )}
      </AnimatePresence>
    </Tooltip.Root>
  </Tooltip.Provider>
)
```

Layout animation:

```tsx
const [tab, setTab] = useState("account")

return (
  <Tabs.Root value={tab} onValueChange={setTab} asChild>
    <motion.div layout layoutDependency={tab}>
      {/* Tabs.List / Tabs.Content */}
    </motion.div>
  </Tabs.Root>
)
```

## Notes

- `asChild={true}` makes a Radix component use its first child as the DOM node; pass a `motion` component to use all animation props.
- Exit animations need the open state hoisted (e.g. Tooltip `open` / `onOpenChange`) so `AnimatePresence` can mount/unmount children. Set `forceMount` on the Portal because Radix expects children to always render.
- Layout animations need the same hoisted state so `motion` components know when to animate; pass it to `layoutDependency` for better performance.
- Motion+ includes Motion x Radix examples.
- Upstream snippets are excerpts; closing tags were added so the example is syntactically complete.
- Source: https://motion.dev/docs/radix (fetched 2026-10).

## Related

- [Installation](./installation.md)
