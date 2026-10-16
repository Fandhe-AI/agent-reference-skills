# animateView

`animateView()` runs view transitions with spring animations and interruption handling, built on the browser's View Transition API.

## Signature / Usage

```
import { animateView } from "motion"

let isOn = true

const update = () => {
  isOn = !isOn
  container.style.justifyContent = isOn ? "flex-end" : "flex-start"
}

animateView(update).add(".toggle-handle")
```

`animateView(update, options)` takes a function (or async function) that updates the DOM, and accepts the same transition options as `animate`:

```
import { spring } from "motion"

animateView(
  update,
  { type: spring, duration: 0.8, bounce: 0.4 }
)
```

It returns a chainable builder; every method returns the builder, and the builder is awaitable to get animation controls.

```
const animation = await animateView(update)

animation.pause()
await animation.finished
```

Page transitions and shared elements:

```
// Crossfade
animateView(update)
  .old({ opacity: 0 })
  .new({ opacity: 1 })

// Shared element: pass the element before and after the update
animateView(update).add(fromElement, toElement)

// Enter / exit
animateView(update)
  .add(".dialog")
  .exit({ clipPath: "inset(50%)" })
  .enter({ clipPath: "inset(0%)" }) // animates from 50%
```

Stagger:

```
import { stagger } from "motion"

animateView(update)
  .add(".item")
  .enter(
    { opacity: [0, 1], scale: [0.6, 1] },
    { delay: stagger(0.05) }
  )
```

## Options / Props

Builder methods:

| Name | Type | Description |
|------|------|-------------|
| `.add(target, newTarget?)` | selector or `Element` | Target elements, assigning each an automatic `view-transition-name` and opting them into a layout animation. A second target morphs two different elements into one another |
| `.new(keyframes, options?)` | keyframes | Animate the new (incoming) view of a layer, whether appearing or persisting |
| `.old(keyframes, options?)` | keyframes | Animate the old (outgoing) view of a layer, whether leaving or persisting |
| `.enter(keyframes, options?)` | keyframes | Animate a layer that purely appears. A defined `exit` is mirrored as the starting value |
| `.exit(keyframes, options?)` | keyframes | Animate a layer that purely leaves |
| `.layout(options?)` | transition | Set the transition for a targeted element's layout animation only |
| `.crop(enabled?)` | boolean | Force aspect-ratio cropping (`overflow: clip` + `object-fit: cover`) on or off. Morphs crop by default; `crop(false)` is useful for text |
| `.group(enabled?)` | boolean | Control whether a layer nests under its DOM-ancestor layer. `group(false)` flattens it so it can escape an ancestor's clip |
| `.class(name)` | string | Tag generated layers with a `view-transition-class` for CSS targeting, e.g. `::view-transition-group(.card) { z-index: 2; }` |

Other:

| Name | Type | Description |
|------|------|-------------|
| `interrupt` | `"immediate"` | Overrides the default queueing: starting an animation with `"immediate"` flushes pending DOM update functions along with the interrupting animation |

## Notes

- By default no animation occurs; add `new`, `old`, `add` etc.
- `add` re-runs a selector after `update` so newly-added elements are included, and removes the generated `view-transition-name` once the animation finishes.
- Animates only values the browser can animate with CSS (`transform`, `opacity`, `clipPath`, `filter`, `backgroundColor`). Custom properties can be animated after `CSS.registerProperty`, e.g. to animate `mask-image` gradient stops.
- Controls support everything `animate` does except `then` and `cancel`.
- Interruption: an incoming animation is queued until the current one has finished (the native API snaps the current animation to its end).
- `group()` nesting relies on View Transition API grouping, still rolling out across browsers (Safari did not support it at the time of the source page).
- `animateView(() => window.scrollTo(0, 100))` animates elements with a `view-transition-name` by 100px; the page states a future version will allow cancelling this out.
- Where the View Transition API is unavailable the DOM update still runs without animation.
- Versus layout animations: view animations snapshot old and new states (one animation at a time, can morph across completely different DOM); layout animations use `transform` and are fully interruptible. Motion for React has an `AnimateView` component.

## Related

- [animate-layout](./animate-layout.md)
- [animate](./animate.md)
- [stagger](./stagger.md)
- [spring](./spring.md)
- [curtains](./curtains.md)
