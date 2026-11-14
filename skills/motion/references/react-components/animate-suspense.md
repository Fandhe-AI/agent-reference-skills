# AnimateSuspense (Motion+ early access)

Animated version of React's `Suspense` component: keeps the loading fallback in the DOM until its `exit` animation has finished, including server-rendered fallbacks replaced by streamed content.

## Signature / Usage

```jsx
import { AnimateSuspense } from "motion-plus/animate-suspense"

<AnimateSuspense
  fallback={
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Loading...
    </motion.div>
  }
>
  <Comments />
</AnimateSuspense>
```

## Options / Props

Shares the same API as React's `Suspense`: replace `Suspense` with `AnimateSuspense` and give the `fallback` an `exit` animation.

| Name | Type | Description |
|------|------|-------------|
| `fallback` | `ReactNode` | Rendered while children suspend (for example while `use` loads data or a `lazy` component loads). When the content resolves, the fallback plays its `exit` animation before it is removed |

## Notes

- Motion+ early access (paid); not included in the free `motion` package. Install Motion UI first (see `guides/motion-ui-installation.md`).
- Import from `"motion-plus/animate-suspense"`. Requires `motion-plus@4.3.0`, `motion@14.1.0` and React 18 or above.
- React's `Suspense` removes its fallback the moment content resolves; `AnimateSuspense` keeps it until `exit` finishes, as `AnimatePresence` does for removed elements. The fallback doesn't need a `key`; `AnimateSuspense` adds one.
- Works with server rendering: a fallback that streams from the server is handed over to the client on hydration, so it can still animate out when the streamed content arrives.
- Only the introduction is public; the rest of the docs page is for Motion+ members, so this page covers the public part only.
- Source: https://motion.dev/docs/react-animate-suspense (fetched 2026-11-14).

## Related

- [AnimatePresence](./animate-presence.md)
- [AnimateActivity](./animate-activity.md)
