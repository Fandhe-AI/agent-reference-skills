---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# events (createPointerEvents) / createEvents

`events` is the DOM pointer-event system. It is `createPointerEvents` from `src/web/events.ts` re-exported under the name `events`; `createEvents` is the lower-level factory from `src/core/events.ts`.

## Signature / Usage

Declarations (tag v9.8.2):

```ts
// packages/fiber/src/index.tsx
export { createPointerEvents as events } from './web/events'

// packages/fiber/src/web/events.ts
/** Default R3F event manager for web */
export function createPointerEvents(store: RootStore): EventManager<HTMLElement>

// packages/fiber/src/core/events.ts
export function createEvents(store: RootStore)
```

Usage with a custom root (from the canvas docs):

```jsx
import { extend, createRoot, events } from '@react-three/fiber'

const root = createRoot(document.querySelector('canvas'))
await root.configure({ events, camera: { position: [0, 0, 50] } })
```

## Notes

- Source behavior: the web manager has `priority: 1`, `enabled: true`, and registers listeners on the connect target for `click`, `contextmenu`, `dblclick`, `wheel`, `pointerdown`, `pointerup`, `pointerleave`, `pointermove`, `pointercancel` and `lostpointercapture` (`wheel` and the pointer events are registered with `passive: true`).
- Source behavior: `compute` sets `state.pointer` from `offsetX` / `offsetY` and `state.raycaster.setFromCamera(state.pointer, state.camera)`.
- `connect(target)` disconnects any previous target first; `disconnect()` removes the listeners.
- `createEvents` is also exported from `@react-three/fiber` (`export { createEvents } from './events'`).

## Related

- [create-portal](./create-portal.md)
