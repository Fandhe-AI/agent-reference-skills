---
source: https://r3f.docs.pmnd.rs/api/events#customizing-the-event-settings
---

# Customizing the event settings

For some advanced usage it's possible to customize the setting of the event manager globally with the `events` prop on `<Canvas/>`.

## Signature / Usage

```tsx
import { Canvas, events } from '@react-three/fiber'

const eventManagerFactory: Parameters<typeof Canvas>[0]['events'] = (state) => ({
  // Default configuration
  ...events(state),

  // Determines if the event layer is active
  enabled: true,

  // Event layer priority, higher prioritized layers come first and may stop(-propagate) lower layer
  priority: 1,

  // The filter can re-order or re-structure the intersections
  filter: (items: THREE.Intersection[], state: RootState) => items,

  // The compute defines how pointer events are translated into the raycaster and pointer vector2
  compute: (event: DomEvent, state: RootState, previous?: RootState) => {
    state.pointer.set((event.offsetX / state.size.width) * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1)
    state.raycaster.setFromCamera(state.pointer, state.camera)
  },

  // Find more configuration default on ./packages/fiber/src/web/events.ts
  // And type definitions in ./packages/fiber/src/core/events.ts
})

function App() {
  return (
    <Canvas events={eventManagerFactory}>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| enabled | boolean | Determines if the event layer is active |
| priority | number | Event layer priority, higher prioritized layers come first and may stop(-propagate) lower layer |
| filter | (items: THREE.Intersection[], state: RootState) => items | Can re-order or re-structure the intersections |
| compute | (event: DomEvent, state: RootState, previous?: RootState) => void | Defines how pointer events are translated into the raycaster and pointer vector2 |

## Notes

- The snippet is verbatim from the docs and is not a complete component (the JSX is left unclosed in the original).
- More default configuration is in `packages/fiber/src/web/events.ts`; type definitions are in `packages/fiber/src/core/events.ts`.

## Related

- [Using a different target element / prefix](./event-target-and-prefix.md)
- [Allow raycast without user interaction](./raycast-without-interaction.md)
