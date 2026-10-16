# animateLayout (layout animations)

`animateLayout()` animates an element's size and position between layouts, and shared element transitions via `data-layout-id`.

## Signature / Usage

```
npm install motion
```

`animateLayout` requires `motion@14.1.0` or above.

```
import { animateLayout } from "motion"

animateLayout(() => {
  document.getElementById("box").style.width = "500px"
})
```

Any elements tagged with `data-layout` animate to their new size and position:

```
<div id="toggle-handle" data-layout />
```

Transition and scope:

```
animateLayout(update, { type: "spring" })

// Scope to a selector or element(s)
animateLayout(".container", update)
animateLayout(container, update)
```

Shared element transition (remove an element, add one with a matching `data-layout-id`):

```
<ul class="tabs">
  <li>
    First
    <div data-layout-id="underline" class="underline"></div>
  </li>
  <li>Second</li>
  <li>Third</li>
</ul>
```

```
const firstItem = document.querySelector(".tabs li:first-child")
const underline = firstItem.querySelector("[data-layout-id='underline']")
underline.remove()

// Add underline to second item
const secondItem = document.querySelector(".tabs li:nth-child(2)")
const newUnderline = document.createElement("div")
newUnderline.setAttribute("data-layout-id", "underline")
newUnderline.className = "underline"
secondItem.appendChild(newUnderline)
```

Override a shared transition and use controls:

```
animateLayout(update)
  .shared("card", { duration: 0.5 })

const controls = await animateLayout(update)

controls.pause()
controls.play()
controls.cancel()
controls.time = 0.4
await controls.finished

scroll(controls)
```

## Notes

- Can animate previously unanimatable CSS values, like switching `justify-content` between `flex-start` and `flex-end`.
- Crossfade: leave the initial element in the DOM and add a new element with a matching `data-layout-id`.
- `animateLayout` is async and returns `AnimationPlaybackControls` like `animate`.
- In React, one can crossfade back by removing the new element with `<AnimatePresence>`; there is not yet an equivalent for vanilla JS, so this is not yet possible.

## Related

- [animate-view](./animate-view.md)
- [animate](./animate.md)
- [scroll](./scroll.md)
