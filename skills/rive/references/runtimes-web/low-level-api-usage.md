# Low-level API Usage

Advanced JS APIs (`@rive-app/canvas-advanced` / `@rive-app/webgl2-advanced`) for constructing and driving your own render loop, with multiple artboards/animations/state machines on one `<canvas>`.

## Signature / Usage

```javascript
import RiveCanvas from '@rive-app/canvas-advanced';

const rive = await RiveCanvas({
  locateFile: (_) => 'https://unpkg.com/@rive-app/canvas-advanced@2.26.1/rive.wasm',
});

const canvas = document.getElementById('your-canvas-element');
const renderer = rive.makeRenderer(canvas);

const bytes = await (await fetch(new Request('basketball.riv'))).arrayBuffer();
const file = await rive.load(new Uint8Array(bytes));

const artboard = file.artboardByName('New Artboard');
const stateMachine = new rive.StateMachineInstance(
  artboard.stateMachineByName('your-state-machine-name'),
  artboard
);

let lastTime = 0;
function renderLoop(time) {
  if (!lastTime) lastTime = time;
  const elapsedTimeSec = (time - lastTime) / 1000;
  lastTime = time;

  renderer.clear();
  stateMachine.advance(elapsedTimeSec);
  artboard.advance(elapsedTimeSec);
  renderer.save();
  renderer.align(
    rive.Fit.contain,
    rive.Alignment.center,
    { minX: 0, minY: 0, maxX: canvas.width, maxY: canvas.height },
    artboard.bounds,
  );
  artboard.draw(renderer);
  renderer.restore();
  rive.requestAnimationFrame(renderLoop);
}
rive.requestAnimationFrame(renderLoop);
```

## Options / Props

| Class | Purpose |
|-------|---------|
| `Artboard` | Instance of one or more artboards from a loaded `File` |
| `StateMachineInstance` | Instance of a state machine from an artboard; order: `.advance()` → artboard `.advance()` |
| `LinearAnimationInstance` | Instance of a timeline animation from an artboard; order: `.advance()` → `.apply(mix)` → artboard `.advance()` |

## Notes

- Order of operations for a linear animation: advance animation → apply animation values → advance artboard. For a state machine: advance state machine → advance artboard (no `.apply()` mix step needed).
- Use `rive.requestAnimationFrame()` / `rive.cancelAnimationFrame()` (wraps rAF) instead of the browser's directly; to integrate into an existing rAF loop, call `rive.resolveAnimationFrame()` at the end of each frame instead.
- Call `.delete()` on every created instance (`renderer`, `file`, `artboard`, animation/state-machine instances) when finished — there is no automatic finalizer-based cleanup.
- When using `@rive-app/webgl2-advanced`, call `renderer.flush()` to empty buffer commands.
- The high-level API (play/pause/stop, `onStateChange`, `onLoad`, Listeners) is built on top of these low-level APIs; replicate needed affordances manually when using the low-level API directly.

## Related

- [rive-methods.md](./rive-methods.md)
- [preloading-wasm.md](./preloading-wasm.md)
- [layout.md](./layout.md)
