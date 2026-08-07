# useAnimate

Provides an `animate` function scoped to the elements within a component, with manual controls, timelines, and automatic cleanup.

## Signature / Usage

```javascript
import { useAnimate } from "motion-v"

const [scope, animate] = useAnimate()

// scoped selector, only targets children of scope element
animate("li", { opacity: 1 })

// direct element animation
animate(scope.value, { opacity: 1 })
```

`scope` is attached to an element via `ref`; `animate` triggers animations scoped to its children.

## Notes

- Selectors like `"li"` only target children of the scoped element.
- Animations are automatically cleaned up when the component unmounts.
- Combines with `useInView` for scroll-triggered animations.

## Related

- [motion-value](./motion-value.md)
- [transitions](./transitions.md)
- [use-in-view](./use-in-view.md)
