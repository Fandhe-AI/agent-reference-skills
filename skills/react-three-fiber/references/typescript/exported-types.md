---
source: https://r3f.docs.pmnd.rs/api/typescript#exported-types
---

# Exported types

react-three-fiber is extensible and exports types for its internals, such as render props, canvas props, and events.

## Signature / Usage

```tsx
// Event raycaster intersection
Intersection

// `useFrame` internal subscription and render callback
Subscription
RenderCallback

// `useThree`'s returned internal state
RootState
Performance
Dpr
Size
Viewport
Camera

// Canvas props
CanvasProps

// Supported events
Events

// Event manager signature (is completely modular)
EventManager

// Wraps a platform event as it's passed through the event manager
ThreeEvent
```

## Related

- [Accessing typed three-elements](./three-elements.md)
