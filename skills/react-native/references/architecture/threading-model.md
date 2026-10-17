---
source: https://reactnative.dev/architecture/threading-model
---

# Threading Model

The React Native renderer distributes the work of the render pipeline across multiple threads. The renderer is designed to be thread safe: at a high level, thread safety is guaranteed by using immutable data structures in the internals of the framework (enforced by C++ "const correctness" feature). Every update in React creates or clones new objects in the renderer instead of updating data structures, which allows the framework to expose thread safe and synchronous APIs to React.

## Signature / Usage

The renderer uses two different threads (original text):

```text
- UI thread (often called main): The only thread that can manipulate host views.
- JavaScript thread: This is where React's render phase, as well as layout, are executed.
```

### Render Scenarios

- **Render in a JS Thread:** the most common scenario where most of the render pipeline happens on the JavaScript thread.
- **Render in the UI Thread:** when there is a high priority event on the UI Thread, the renderer is able to execute all the render pipeline synchronously on the UI thread.
- **Default or continuous event interruption:** the render phase is interrupted by a low priority event in the UI thread. React and the renderer are able to interrupt the render phase and merge its state with a low priority event that is executed on the UI thread. The render process continues executing in the JS thread.
- **Discrete event interruption:** the render phase is interruptible. A high priority event in the UI thread interrupts the render phase and its state is merged with the high priority event executed on the UI thread. The render phase executes synchronously on the UI thread.
- **C++ State update:** an update originating on the UI thread that skips the rendering phase.

## Notes

- The page is marked in the source with the caution: "This document refers to the New Architecture, that is in active roll-out."
- Per-scenario thread diagrams of the source page are omitted.

## Related

- [Render, Commit, and Mount](./render-pipeline.md)
- [Fabric](./fabric-renderer.md)
