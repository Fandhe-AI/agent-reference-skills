# Timer

An improved alternative to `Clock` that separates state update from value retrieval, and supports the Page Visibility API to avoid large delta spikes when the tab is inactive.

## Signature / Usage

```js
const timer = new THREE.Timer();
timer.connect(document); // opt-in to Page Visibility API

function animate(timestamp) {
  requestAnimationFrame(animate);

  timer.update(timestamp);          // call once per frame first
  const delta = timer.getDelta();   // consistent value per frame
  const elapsed = timer.getElapsed();

  mesh.rotation.y += delta;
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);
```

## Constructor

```js
new Timer()
```

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `update` | `(timestamp?: number): Timer` | Update internal state. Call once per frame before `getDelta()`/`getElapsed()`. Uses `performance.now()` if no timestamp is provided. |
| `getDelta` | `(): number` | Time delta in seconds since last `update()` |
| `getElapsed` | `(): number` | Total elapsed time in seconds |
| `getTimescale` | `(): number` | Current timescale multiplier |
| `setTimescale` | `(timescale: number): Timer` | Scale time delta (e.g., `0.5` for slow motion) |
| `reset` | `(): Timer` | Reset time computation for current step |
| `connect` | `(document: Document): void` | Enable Page Visibility API integration |
| `disconnect` | `(): void` | Disconnect from DOM |
| `dispose` | `(): void` | Free all resources |

## Notes

- Unlike `Clock.getDelta()`, calling `getDelta()` multiple times per frame always returns the same value after a single `update()`.
- `connect(document)` prevents large delta jumps when the user switches tabs.
- Pass `timestamp` from `requestAnimationFrame` to `update()` for the most accurate timing.

## Related

- [Clock](./Clock.md)
