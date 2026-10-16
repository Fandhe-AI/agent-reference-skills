# distance / distance2D

`distance()` measures how far apart two numbers are; `distance2D()` measures how far apart two points are.

## Signature / Usage

```
import { distance, distance2D } from "motion"

distance(100, 40) // 60
distance2D({ x: 0, y: 0 }, { x: 30, y: 40 }) // 50
```

`distance` returns a positive difference regardless of order:

```
distance(10, 50) // 40
distance(50, 10) // 40
```

`distance2D` accepts two `{ x, y }` points and returns the straight-line distance:

```
const start = { x: 100, y: 100 }

window.addEventListener("pointermove", (event) => {
  const moved = distance2D(start, { x: event.clientX, y: event.clientY })

  if (moved > 3) {
    // Start dragging
  }
})
```

## Notes

- Useful for gesture thresholds, e.g. only start a drag after the pointer moves a few pixels, or strengthen an effect the closer the pointer is to an element.

## Related

- [progress](./progress.md)
- [clamp](./clamp.md)
