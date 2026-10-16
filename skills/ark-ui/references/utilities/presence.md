# Presence

The `Presence` utility controls the rendering and unmounting of content based on a given state, and is commonly used for animated modals, tooltips, and dropdowns.

## Signature / Usage

```tsx
import { Presence } from '@ark-ui/react/presence'

export const App = () => (
  <Presence present={isOpen} lazyMount unmountOnExit>
    <div>Content</div>
  </Presence>
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `present` | `boolean` | — | Controls whether the node is present (user-controlled) |
| `asChild` | `boolean` | — | Use the provided child element as the rendered element |
| `immediate` | `boolean` | — | Synchronizes presence changes immediately instead of on next frame |
| `lazyMount` | `boolean` | `false` | Delays mounting until `present` becomes `true` |
| `unmountOnExit` | `boolean` | `false` | Removes the component from the DOM when no longer present |
| `skipAnimationOnMount` | `boolean` | `false` | Disables the initial presence animation |
| `hideMode` | `HideMode` | `'display-none'` | How to hide content when mounted but not present. `'display-none'`: HTML `hidden` attribute, effects stay alive. `'activity'`: React 19 `<Activity mode="hidden">`, effects pause, requires React 19+ |
| `onEnterComplete` | `VoidFunction` | — | Callback invoked once the enter animation finishes (added in 5.39.0; Vue emit `enter-complete`) |
| `onExitComplete` | `VoidFunction` | — | Callback invoked when the exit animation completes |

## Notes

- Child components start hidden and remain hidden after `present` toggles off, by default
- `lazyMount` and `unmountOnExit` can be combined to mount only when needed and unmount when done
- `hideMode` (5.38.0) does not apply with `unmountOnExit`, since the tree is removed on close. When `'activity'` is requested but the active React build does not expose `Activity`, it falls back to `'display-none'`.
- `onEnterComplete` appears in the package source (`split-presence-props.ts` / `use-presence.ts`) and the 5.39.0 changelog, but not yet in the website types JSON or the live props table.

## Related

- [Swap](./swap.md)
- [Focus Trap](./focus-trap.md)
