# scopeMotion

scopeMotion() groups animations, gestures and scroll listeners, so you can stop or cancel them together.

## Signature / Usage

```javascript
import { scopeMotion } from "motion"

const scope = scopeMotion(() => {
  animate(".box", { x: 100 })
  hover(".button", (element) => animate(element, { scale: 1.1 }))
  inView(".card", (element) => animate(element, { opacity: 1 }))
})

scope.cancel()
```

- `scopeMotion(setup, options?)` runs `setup` immediately and collects the work started inside it. `scopeMotion(root, setup, options?)` resolves selectors inside `root` (an element or a selector for it).
- The scope collects `animate` (including timeline sequences), `scroll`, `inView`, `hover`, `press`, `drag`, `resize`, `delay`, `animateLayout` and `animateView`, plus animations started in their callbacks (and in the function `inView` / `hover` / `press` call when the gesture ends). `resize` callbacks aren't collected.
- `setup` receives the scope itself, so `run`, `bind`, `ignore` and `media` are available inside it (also when destructured).
- `setup` can return a cleanup function, which the scope runs when it stops or is cancelled.

Root element (selectors resolve inside `.list`):

```javascript
scopeMotion(".list", () => {
  animate("li", { opacity: 1 })
  inView("li", (element) => animate(element, { y: 0 }))
})
```

Default transition:

```javascript
scopeMotion(
  () => {
    animate(".box", { x: 100 })
    animate(".circle", { scale: 2 }, { duration: 1 })
  },
  { transition: { duration: 0.4, ease: "easeOut" } }
)
```

Media query:

```javascript
scopeMotion(
  () => {
    scroll(animate(".progress", { scaleX: [0, 1] }))
  },
  { matchMedia: "(min-width: 800px)" }
)
```

Named conditions:

```javascript
scopeMotion(
  ({ media }) => {
    animate(".box", { x: media.desktop ? 300 : 100 })

    if (!media.reduce) {
      inView(".card", (element) => animate(element, { y: [50, 0] }))
    }
  },
  {
    matchMedia: {
      desktop: ">=800",
      mobile: "<800",
      reduce: "reducedMotion"
    }
  }
)
```

Work that starts later (after an `await` or in a `setTimeout`) runs outside the scope. Wrap it, or use `delay`:

```javascript
scopeMotion(({ bind }) => {
  fetchItems().then(bind(() => animate("li", { opacity: 1 })))
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `transition` | transition options | Default transition for every `animate` and `animateLayout` call in the scope. Options passed to `animate` are merged over it, option by option. For sequences, the default for each segment (like `defaultTransition`) |
| `matchMedia` | `string` \| object | A media query or shorthand, or an object of named conditions. Setup runs only while it matches. When it changes, everything in the scope is stopped and inline styles are restored, then setup runs again if it matches |

Scope members:

| Name | Description |
|------|-------------|
| `state` | `"active"`, `"stopped"` or `"cancelled"`. A scope is `"active"` while its media queries don't match, even though setup hasn't run |
| `media` | Whether each named `matchMedia` condition matched when setup last ran. With a string `matchMedia`, the state is `media.matches` |
| `run(callback)` | Run `callback` in the scope and return its result |
| `bind(callback)` | Return a function that runs `callback` in the scope (useful for event handlers) |
| `ignore(callback)` | Run `callback` outside any scope; what it starts isn't collected |
| `stop()` | Stop everything in the scope and remove its media query listeners. Styles stay as they are |
| `cancel()` | As `stop()`, then restore the `style` attribute of every element animated with `animate` or made draggable. Motion values and SVG attributes keep their values |
| `refresh()` | Stop everything in an active scope and restore inline styles, then run setup again if the media queries match |

### Media query shorthands

- Width comparisons: `">=800"` (`width >= 800px`), `"<1200px"`, `"> 40em"`.
- Keywords: `reducedMotion`, `motion`, `dark`, `light`, `hover` (fine pointer), `touch` (coarse pointer), `portrait`, `landscape`.
- Combine with spaces, negate with `!` (for example `">=800 <1200 !touch"`). Don't mix shorthands and media queries in one string: a condition containing `(` is used as is.
- `toMediaQuery(shorthand)` (exported from `"motion"`) turns a shorthand into a media query.

## Notes

- Nested scopes belong to the outer one: cancelling the outer scope cancels the inner. An inner scope doesn't inherit the outer root or transition; its root selector resolves inside the outer root.
- If the root matches no element, selectors resolve in the whole document. Server-side (no `window`), setup runs once and no media query listeners are added; pass an element as the root or don't call `scopeMotion`.
- Limitations: effects like `styleEffect` keep running when the scope stops; `cancel()` releases the motion values kept for each animated element (so a `styleEffect` bound to the same element is released too); after `cancel()` the `x` / `y` motion values of a dragged element can keep their dragged values.
- Added in motion 14.5.0 (together with the React `useScopeMotion` hook).
- Source: https://motion.dev/docs/scope-motion (fetched 2026-11-14).

## Related

- [animate](./animate.md)
- [drag](./drag.md)
- [timeline](./timeline.md)
- [delay](./delay.md)
