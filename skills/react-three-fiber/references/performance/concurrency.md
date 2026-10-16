---
source: https://r3f.docs.pmnd.rs/advanced/scaling-performance#enable-concurrency
---

# Enable concurrency

React 18 introduced concurrent scheduling, specifically time slicing via `startTransition` and `useTransition`. This virtualizes the component graph, which allows you to prioritise components and actions. It can defer load and heavy tasks in ways that would be hard or impossible in a vanilla application, thereby holding a stable framerate even in demanding situations.

## Signature / Usage

```jsx
import { useTransition } from 'react'

const [isPending, startTransition] = useTransition()
startTransition(() => {
  setRadius(prev => prev + 1)
})
```

The docs' benchmark (https://github.com/drcmda/scheduler-test) simulates heavy load by creating 510 `THREE.TextGeometry` instances (approximately 1.5 seconds of jank on Apple M1 when created at once), every 2 seconds:

|          | Distributed | At-once |
| -------- | ----------- | ------- |
| three.js | ~20fps      | ~5fps   |
| React    | ~60fps      | ~60fps  |

## Notes

- The snippet above is taken from the "use startTransition for expensive ops" section of the pitfalls page, which this section links to; see pitfalls-mounting-and-objects.
- Per the pitfalls page, since version 8 of Fiber canvases use concurrent mode by default.

## Related

- [pitfalls-mounting-and-objects](./pitfalls-mounting-and-objects.md)
