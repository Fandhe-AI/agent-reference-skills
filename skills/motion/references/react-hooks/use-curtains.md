# useCurtains (Motion+)

Creates cover-then-reveal page and element transitions in React. It covers the view with an effect, runs a state change or navigation while hidden, then reveals the new view once React has committed and painted.

## Signature / Usage

```jsx
import { useCurtains } from "motion-plus/react"
import { wipe } from "motion-plus/curtains"

const [curtains, isPending] = useCurtains()

await curtains(() => router.push("/about"), {
  effect: wipe({ direction: "left", angle: 12 }),
})
```

Returns a `curtains` function (same call signature as the vanilla `curtains()`) plus an `isPending` flag. The callback runs inside `startTransition`, and the reveal is held until React has committed the update (including any Suspense it triggered) and painted a frame. `curtains()` returns a promise that resolves once the reveal has finished.

While the curtain is up and the update is in flight, `isPending` is `true`:

```jsx
<button onClick={next} disabled={isPending}>
  Next
</button>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `effect` | effect factory or `[cover, reveal]` tuple | The transition effect. Pass the factory itself for defaults (`effect: iris`) or call it with options (`effect: iris({ origin: { x: 20, y: 80 } })`). Defaults to `fade`. |
| `transition` | transition options or `[cover, reveal]` tuple | Animation timing. A single value times both phases; a tuple times each independently. Accepts `delay: stagger()` for multi-element effects like `pixels`. |
| `scope` | `Element` | Mounts the curtain inside the element instead of covering the viewport. The element must establish a containing block (`position: relative` or another non-`static` position). |

```jsx
curtains(update, {
  effect: [wipe({ direction: "left" }), iris()],
  transition: [{ duration: 0.3 }, { duration: 0.5 }],
  scope: cardRef.current,
})
```

### Effects (import from `motion-plus/curtains`)

| Effect | Options | Description |
|--------|---------|-------------|
| `fade` | — | Default. Solid panel fades in, then out. |
| `wipe` | `direction` (`"up"`/`"down"`/`"left"`/`"right"` or `[cover, reveal]`), `directionMode` (`"normal"`/`"reverse"`), `angle` (degrees) | Solid panel sweeps across the view. |
| `clipWipe` | `direction`, `directionMode`, `angle`, `bow` (0 to around 0.4, takes precedence over `angle`) | Wipe whose edge is a clip on a static panel; suited to revealing fixed content. |
| `iris` | `origin` (`{ x, y }`, 0 to 1 fractions or CSS-length strings; default centre) | Circle expands from a point to cover, then contracts. |
| `doors` | `direction` (horizontal gives left/right doors, vertical gives top/bottom; default horizontal) | Two panels meet in the middle, then part. |
| `pixels` | `size` (px, `"50%"`, or `[width, height]`; default `100`), `direction` (degrees; `0` right, `90` down, `180` left, `270` up; takes precedence over `order`), `noise` (0 to 1), `order` (`"rows"`/`"columns"`/`"diagonal"`/`"radial"`/`"random"`; default `"random"`), `directionMode` | Grid of tiles fills in, then clears out. |
| `blinds` | `size` (px, default `64`), `direction` (`"row"` default / `"column"`), `directionMode` | Venetian-blind slats scale shut, then open. |
| `shutter` | `size` (px, default `120`) | Interleaved columns slide in from alternating top and bottom. |
| `staggerWipe` | `size` (px, default `120`), `direction` (default `"down"`), `directionMode` | Strips each wipe in one direction, staggered across the perpendicular axis. |

### Custom effects

An effect is a factory returning three methods: `setup(container, box)` builds the overlay DOM (size from `box`, not `window`; add the `motion-curtain` class), `cover(transition)` and `reveal(transition)` return an animation (Motion's `animate()` satisfies the contract).

```jsx
import { animate } from "motion/mini"

function slideUp() {
  let panel

  return {
    setup(container) {
      panel = document.createElement("div")
      panel.className = "motion-curtain"
      Object.assign(panel.style, {
        position: "absolute",
        inset: "0",
        transform: "translateY(100%)",
      })
      container.appendChild(panel)
    },
    cover(transition) {
      return animate(
        panel,
        { transform: ["translateY(100%)", "translateY(0%)"] },
        transition,
      )
    },
    reveal(transition) {
      return animate(
        panel,
        { transform: ["translateY(0%)", "translateY(-100%)"] },
        transition,
      )
    },
  }
}

curtains(update, { effect: slideUp() })
```

### Styling

Each covering element (panel, tile, slat or door) carries the `motion-curtain` class (dark default fill); the overlay container carries `motion-curtains`.

```css
.motion-curtain {
  background: #6d28d9;
}
```

## Notes

- Motion+ (paid) feature, not included in the free `motion` package. Requires installing Motion UI and a Motion+ access token. Imports come from `motion-plus/react` and `motion-plus/curtains`.
- Requires React 19 (transitions and async actions). For a version-independent alternative use the vanilla `curtains()` function.
- Uses the browser Popover API for full-page overlays (no `z-index` hacks) and respects `prefers-reduced-motion`.
- Unlike `AnimateView` (built on React `ViewTransition` / View Transition API, which animates the content between before and after states), `useCurtains` never animates content: only the opaque curtain moves while the update runs hidden.
- Source: https://motion.dev/docs/react-use-curtains (the rest of the page is for Motion+ members).
