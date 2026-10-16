# curtains (Motion+)

`curtains()` runs a cover-then-reveal page or element transition: an overlay covers the viewport, your content is swapped while hidden, then it reveals.

## Signature / Usage

Motion+ (paid); not included in the free `motion` package. Install Motion UI first (access token requires Motion+ membership). Import from `motion-plus/curtains`.

```js
import { curtains, wipe } from "motion-plus/curtains"

await curtains(
  async () => await update(),
  { effect: wipe({ direction: "left", angle: 12 }) },
)
```

Configure and mix effects (`[cover, reveal]` tuples):

```js
curtains(update, {
  transition: { duration: 0.4 },
  effect: clipWipe,
})

curtains(update, {
  effect: [wipe({ direction: "left" }), iris()],
  transition: [{ duration: 0.3 }, { duration: 0.5 }],
})
```

Scope to an element (needs `position: relative` or another non-`static` position):

```js
curtains(update, { effect: wipe(), scope: cardElement })
```

Sequencing (resolves once the reveal has finished):

```js
await curtains(update, { effect: wipe() })
// the new view is now fully revealed
```

Custom effect (a factory returning `setup`, `cover`, `reveal`):

```js
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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `effect` | effect or `[cover, reveal]` | The transition effect. Defaults to `fade` |
| `transition` | transition or `[cover, reveal]` | Animation timing. Accepts `delay: stagger()` for effects like `pixels` |
| `scope` | `Element` | Mount the curtain inside this element instead of covering the viewport |

Built-in effects (each imported separately from `motion-plus/curtains`, tree-shakable):

| Effect | Options | Description |
|--------|---------|-------------|
| `fade` | none | Default. A solid panel fades in, then out |
| `wipe` | `direction` (`"up"` \| `"down"` \| `"left"` \| `"right"`, or tuple), `directionMode` (`"normal"` \| `"reverse"`), `angle` (degrees) | A solid panel sweeps across the viewport |
| `clipWipe` | `direction`, `directionMode`, `angle`, `bow` (0 to ~0.4, overrides `angle`) | A wipe whose edge is a clip on a static panel; suited to revealing fixed content |
| `iris` | `origin` (`{ x, y }`, 0-1 fractions or CSS lengths; default centre) | A circle expands from a point to cover, then contracts |
| `doors` | `direction` (axis; default horizontal) | Two panels meet in the middle, then part |
| `pixels` | `size` (default `100`; px, `"50%"`, or `[w, h]`), `direction` (degrees; takes precedence over `order`), `noise` (0-1), `order` (`"rows"` \| `"columns"` \| `"diagonal"` \| `"radial"` \| `"random"`; default `"random"`), `directionMode` | A grid of tiles fills in, then clears |
| `blinds` | `size` (px, default `64`), `direction` (`"row"` \| `"column"`; default `"row"`), `directionMode` | Venetian-blind slats scale shut, then open |
| `shutter` | `size` (px, default `120`) | Interleaved columns slide in from alternating top and bottom |
| `staggerWipe` | `size` (px, default `120`), `direction` (default `"down"`), `directionMode` | Strips wipe in one direction, staggered across the perpendicular axis |

## Notes

- Motion+ members only; the source page notes the rest of its content is for members.
- Uses the browser's Popover API for a full-page overlay (no `z-index` hacks), is GPU accelerated, respects `prefers-reduced-motion`, and adds only a couple kb on top of mini `animate()`.
- Styling: covering elements carry the `motion-curtain` class (dark default fill, overridable in CSS); the overlay container carries `motion-curtains`.
- Custom effect: `setup(container, box)` receives the measured `{ width, height }`; size from `box`, not `window`, so it works when `scope`d. `cover(transition)` / `reveal(transition)` must return an object with a `finished` promise and a `stop()` method; `animate()` satisfies this.
- Versus `animateView`: `animateView` animates the content between old and new snapshots; `curtains` never animates your content, it hides the page with an opaque overlay while your update runs.

## Related

- [animate-view](./animate-view.md)
- [animate](./animate.md)
- [stagger](./stagger.md)
