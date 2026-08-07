# AnimateView

Motion+ Early Access component (3kb) that animates transitions between views using the browser's native View Transition API, built on Motion's `animate()` function.

## Signature / Usage

```tsx
import { AnimateView } from "motion-plus/animate-view"
import { startTransition, useState } from "react"

function Example() {
  const [show, setShow] = useState(true)

  return (
    <>
      <button onClick={() => startTransition(() => setShow(!show))}>
        Toggle
      </button>
      {show && (
        <AnimateView>
          <div className="box" />
        </AnimateView>
      )}
    </>
  )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `transition` | Motion transition config | — | Default settings for all animation types; supports springs and easing |
| `enter` | object \| function | `{ opacity: 1 }` | Entry animation; disables default fade when custom values set |
| `exit` | object \| function | — | Exit animation configuration |
| `update` | object \| function | — | Animation for content/style changes; auto-animates position/size shifts |
| `share` | object \| function | — | Shared element animation settings |
| `name` | string | — | Identifier for shared element animations between entering/exiting components |

Functions passed to `enter`/`exit`/`update`/`share` receive the `types` array from `addTransitionType()` for conditional animations.

## Notes

- Requires Motion+ membership and access token, `motion@12.34.0+`, and `react@canary` or above.
- State changes that trigger a view swap must be wrapped in `startTransition()`.
- Not interruptible: transitions must complete before a new one begins, unlike Motion's layout animations. Best suited for page-level transitions (route changes, full-view swaps).
- Shared element (morphing) animations require matching `name` props on the entering/exiting `AnimateView`; multiple elements sharing the same `name` at once causes animation failure.
- Springs must be explicitly imported: `import { spring } from "motion"`.
- This is distinct from Motion's layout animation system (`motion` component's `layout`/`layoutId` props); `AnimateView` instead wraps the browser's View Transition API.

## Related

- [motion](./motion.md)
- [AnimatePresence](./animate-presence.md)
