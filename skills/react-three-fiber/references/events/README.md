# events

| Name | Description | Path |
|------|-------------|------|
| Customizing the event settings | For some advanced usage, the event manager can be customized globally with the `events` prop on `<Canvas/>`. | [customizing-events.md](./customizing-events.md) |
| Event data | Shape of the object passed to every event handler. | [event-data.md](./event-data.md) |
| Event handlers | `three.js` objects that implement their own `raycast` method (meshes, lines, etc.) receive pointer, click and wheel events when declared on them. | [event-handlers.md](./event-handlers.md) |
| Event propagation (bubbling and capture) | Propagation differs from the DOM because objects can occlude each other in 3D, so `intersections` includes all objects along the ray. | [event-propagation.md](./event-propagation.md) |
| Using a different target element / prefix | Connects the event handlers to another DOM element instead of the canvas, typically a shared parent that both the canvas and DOM overlays can receive events on. | [event-target-and-prefix.md](./event-target-and-prefix.md) |
| Pointer capture | Capturing adds the capturing object to the hit test result instead of replacing it, which differs from the DOM. | [pointer-capture.md](./pointer-capture.md) |
| Allow raycast without user interaction | By default Fiber only raycasts while the user interacts with the canvas, and `update()` forces a raycast when needed. | [raycast-without-interaction.md](./raycast-without-interaction.md) |
