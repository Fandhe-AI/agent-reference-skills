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
| `onExitComplete` | `VoidFunction` | — | Callback invoked when the exit animation completes |

## Notes

- Child components start hidden and remain hidden after `present` toggles off, by default
- `lazyMount` and `unmountOnExit` can be combined to mount only when needed and unmount when done

## Related

- [Swap](./swap.md)
- [Focus Trap](./focus-trap.md)
