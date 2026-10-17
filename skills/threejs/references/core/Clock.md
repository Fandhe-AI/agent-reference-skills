# Clock

Tracks elapsed and per-frame delta time for use in animation loops.

> **Deprecated note:** `Clock` is deprecated since r183; use [Timer](./Timer.md).

## Signature / Usage

```js
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();     // seconds since last call
  const elapsed = clock.getElapsedTime(); // total seconds
  mesh.rotation.y += delta;
  renderer.render(scene, camera);
}
```

## Constructor

```js
new Clock(autoStart?: boolean)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `autoStart` | boolean | Start automatically on first `getDelta()` call. Default: `true`. |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `autoStart` | boolean | Whether to start on first `getDelta()` |
| `elapsedTime` | number | Accumulated running time in seconds |
| `oldTime` | number | Timestamp of last `start()` / `getDelta()` / `getElapsedTime()` call |
| `running` | boolean | Whether clock is currently running |
| `startTime` | number | Timestamp when `start()` was last called |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getDelta()` | number | Seconds elapsed since last call |
| `getElapsedTime()` | number | Total seconds since clock started |
| `start()` | void | Starts the clock |
| `stop()` | void | Stops the clock |

## Notes

- The Migration Guide (182 → 183) states: "`Clock` has been deprecated. Please use `Timer` instead."
- Each call to `getDelta()` updates the internal reference time, so calling it multiple times per frame yields different values. Use [Timer](./Timer.md) to avoid this issue.

## Related

- [Timer](./Timer.md)
