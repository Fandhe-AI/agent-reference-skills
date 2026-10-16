# AnimateView

Free component (3kb) that animates transitions between views using the browser's native View Transition API, built on Motion's mini `animate()` function and React's `ViewTransition`. Imported from `motion/react-animate-view`.

## Signature / Usage

```tsx
import { AnimateView } from "motion/react-animate-view"
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
| `children` | ReactNode | — | Content to animate. Uses React's `ViewTransition` boundary and adds no wrapper element to the DOM |
| `transition` | Motion transition config | — | Default settings for all animation types; supports springs and easing. `transition.layout` sets separate timing for size and position changes |
| `enter` | object \| function | Browser fade-in | Entry animation; disables default fade when custom values set (re-enable with `opacity: 1`) |
| `exit` | object \| function | Browser fade-out | Exit animation configuration |
| `update` | object \| function | — | Animation for content/style changes; size/position changes also animate |
| `share` | object \| function | — | Shared element animation; set on the entering component |
| `name` | string | — | Identifier for shared element animations between entering/exiting components |
| `onAnimationStart` | `(animation, type) => void` | — | Called when an animation starts. Receives the animation controls and its type: `"enter"`, `"exit"`, `"update"` or `"share"` |
| `onAnimationComplete` | `(type) => void` | — | Called when an animation finishes. Not called for an animation cancelled during React's cleanup |

Functions passed to `enter`/`exit`/`update`/`share` receive the `types` array from `addTransitionType()` for conditional animations.

```tsx
<AnimateView
  transition={{
    duration: 0.2,
    layout: { type: spring, duration: 0.6, bounce: 0.2 },
  }}
>
  <div className="box" />
</AnimateView>
```

## Notes

- Added in 13.4.0 (free; previously Motion+ early access). Requires `motion` and **React and React DOM 19.3 or later** (`npm install react@^19.3.0 react-dom@^19.3.0`). Other Motion for React APIs continue to support React 18.
- Import from the separate `"motion/react-animate-view"` entry point. It isn't exported from `"motion/react"`.
- Migrate from Motion+: replace imports from `"motion-plus/animate-view"` with `"motion/react-animate-view"`. The API stays the same otherwise, and no Motion+ membership or access token is required.
- State changes that trigger a view swap must be wrapped in `startTransition()`.
- Suspense: wrap a `Suspense` boundary in `AnimateView` to crossfade between its content and fallback.
- Not interruptible: transitions must complete before a new one begins, unlike Motion's layout animations. Best suited for page-level transitions (route changes, full-view swaps).
- Shared element (morphing) animations require matching `name` props on the entering/exiting `AnimateView`; more than one element with the same `name` before or after the transition causes the animation to fail.
- Springs must be explicitly imported: `import { spring } from "motion"`.
- This is distinct from Motion's layout animation system (`motion` component's `layout`/`layoutId` props); `AnimateView` instead wraps the browser's View Transition API.

## Related

- [motion](./motion.md)
- [AnimatePresence](./animate-presence.md)
