# useScopeMotion

Run animations, gestures and scroll listeners scoped to a React component, with automatic cleanup.

## Signature / Usage

```tsx
import { useScopeMotion, animate, inView, drag } from "motion/react"

function List({ children }) {
  const ref = useRef(null)

  useScopeMotion(ref, () => {
    inView("li", (element) => animate(element, { opacity: 1 }))
    drag(".handle", { axis: "x" })
  })

  return <ul ref={ref}>{children}</ul>
}
```

`useScopeMotion(ref, setup, options?)` is the React version of `scopeMotion` (see the vanilla-js category). Selectors resolve inside the `ref` element. `setup` runs after the component mounts, before the browser paints, and can return a cleanup function for work the scope doesn't collect.

Re-run setup when values change:

```tsx
useScopeMotion(
  ref,
  () => {
    inView("li", (element) => animate(element, { opacity: 1 }))
  },
  { deps: [items] }
)

const scope = useScopeMotion(ref, setup)

const onClick = () => {
  scope.current?.run(() => animate("li", { x: 100 }))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `deps` | `any[]` | `[]` | Cancel the scope and run setup again when any of these values change |
| `transition` | transition options | - | Default transition for every `animate` call in the scope |
| `matchMedia` | `string` \| object | - | A media query or shorthand (`">=800"`, `"touch"`, `"!reducedMotion"`), or an object of named conditions. Setup runs only while it matches; `setup` receives `{ media }` |

## Notes

- Returns a ref to the current scope (`scope.current` is `null` after unmount). Use `run` / `bind` in event handlers so the scope collects what they start.
- On unmount the scope is cancelled: animations stop, gestures and scroll / viewport listeners are removed, and the `style` attribute of every element animated with `animate` or made draggable is restored.
- By default setup runs once, on mount; a new setup function on each render doesn't re-run it. `ref`, `transition` and `matchMedia` are read only when the scope is created, so if the `ref` element mounts later (for example after a conditional render), add a `deps` entry that changes when it mounts.
- If `ref` isn't attached to an element, selectors resolve in the whole document.
- Differs from `useAnimate`: `useAnimate` scopes only `animate`; `useScopeMotion` also collects `inView`, `hover`, `press`, `drag`, `scroll`, `resize` and `delay`.
- Added in motion 14.5.0. Motion for Vue (motion-v 2.9.0) has `useScopeMotion(domRef, setup, options?)` with reactive options; the motion.dev docs have no Vue page for it (CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md, release notes: https://github.com/motiondivision/motion-vue/releases/tag/v2.9.0).
- Source: https://motion.dev/docs/react-use-scope-motion (fetched 2026-11-14).

## Related

- [useAnimate](./use-animate.md)
- [useInView](./use-in-view.md)
