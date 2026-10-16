# resize

`resize()` monitors and reacts to size changes of the viewport or specific HTML and SVG elements.

## Signature / Usage

```
import { resize } from "motion"

// Viewport
resize(({ width, height }) => console.log(width, height))

// Specific elements
resize("li", (element) => console.log(element, "change detected"))

resize(".drawer", (element, { width, height }) => {
  frame.render(() => {
    element.style.height = `${Math.max(400, height)}px`
  })
})

const stop = resize(log)
stop()
```

- Viewport form: `resize(callback)`, callback receives `{ width, height }` getters.
- Element form: `resize(elementOrSelector, callback)`, callback receives `(element, { width, height })`.
- Returns a function that removes the attached listeners.

## Notes

- All handlers are triggered via a single shared `ResizeObserver`; an element is removed from it when it has no more listeners, and the observer stops when there are no listeners at all.
- Returned `width` and `height` are the element's border box.
- Perform subsequent DOM writes with the Motion frameloop to batch reads and writes.
- Upstream example assigns a unitless number to style.height; px suffix added here because DOM style properties require units.
- Source: https://motion.dev/docs/resize (fetched 2026-10).

## Related

- [frame](./frame.md)
- [resolve-elements](./resolve-elements.md)
