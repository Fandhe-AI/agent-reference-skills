# Rive Instance Methods

Methods available on a `Rive` instance for playback control, rendering, data access, and resource management.

## Signature / Usage

```ts
const r = new Rive({ ... });

// Playback
r.play("animationName");
r.pause();
r.stop();
r.reset({ stateMachine: "Machine", autoplay: true });

// Rendering
r.resizeDrawingSurfaceToCanvas();
r.startRendering();
r.stopRendering();

// Cleanup
r.cleanup();
```

## Options / Props

### Playback control

| Method | Signature | Description |
|--------|-----------|-------------|
| `play` | `(names?: string \| string[], autoplay?: boolean) => void` | Start/resume animation(s) |
| `pause` | `(names?: string \| string[]) => void` | Pause animation(s) without resetting |
| `stop` | `(names?: string \| string[]) => void` | Stop animation(s) and reset to entry state |
| `reset` | `(params?: RiveResetParameters) => void` | Dispose and recreate instances. `RiveResetParameters`: `artboard?`, `stateMachine?`, `autoplay?`, `autoBind?`, plus deprecated `animations?` / `stateMachines?` |

### Canvas size and layout

| Member | Signature | Description |
|--------|-----------|-------------|
| `resizeDrawingSurfaceToCanvas` | `(customDevicePixelRatio?: number) => void` | Set canvas `width` / `height` from CSS layout size and device pixel ratio; calls `resizeToCanvas()` and updates `devicePixelRatioUsed`. With `Fit.Layout`, artboard width/height are adjusted from the layout |
| `resizeToCanvas` | `() => void` | Set layout bounds (`minX`, `minY`, `maxX`, `maxY`) from current canvas pixel size |
| `resetArtboardSize` | `() => void` | Restore artboard dimensions to the file's original values |
| `devicePixelRatioUsed` | getter/setter | DPR applied when sizing the drawing surface |
| `bounds` | getter | Artboard axis-aligned bounds, or `undefined` if the artboard is not ready |
| `layout` | getter/setter | Current `Layout` (treat as immutable; use `new Layout({...})` or `copyWith`) |
| `artboardWidth` / `artboardHeight` | getter/setter | Logical artboard dimensions; may be `0` if not loaded. Avoid setting manually with `resizeDrawingSurfaceToCanvas()` + `Fit.Layout` |
| `volume` | getter/setter | Artboard audio volume, default `1.0` |

### Rendering loop

| Method | Signature | Description |
|--------|-----------|-------------|
| `startRendering` | `() => void` | Begin the render loop (no-op if running) |
| `stopRendering` | `() => void` | Stop scheduling frames without changing play/pause/stop state; useful when the canvas is not visible |
| `drawFrame` | `() => void` | Advance and draw a single frame; usually not needed manually |
| `resolveAnimationFrame` | `() => void` | Not on `Rive`. On the low-level `RiveCanvas` (`@rive-app/canvas-advanced` / `@rive-app/webgl2-advanced`), call after drawing when running your own `requestAnimationFrame` loop |

### Data / state accessors

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `contents` | `RiveFileContents \| undefined` | Artboards, animations, state machines and each state machine's inputs; `undefined` until loaded |
| `source` | `string` | Current `src` (if any) |
| `activeArtboard` | `string` | Active artboard name, or `""` if none |
| `animationNames` / `stateMachineNames` | `string[]` | All animation / state machine names on the active artboard |
| `playingAnimationNames` / `playingStateMachineNames` | `string[]` | Currently playing on the active artboard |
| `pausedAnimationNames` / `pausedStateMachineNames` | `string[]` | Currently paused on the active artboard |
| `isPlaying` / `isPaused` / `isStopped` | `boolean` | Aggregate playback flags |
| `viewModelCount` | `number` | Number of View Models in the file |
| `viewModelInstance` | `ViewModelInstance \| null` | Bound instance (when `autoBind: true`) |

### View Model

| Method | Signature | Description |
|--------|-----------|-------------|
| `viewModelByName` | `(name: string) => ViewModel` | Get a View Model by name |
| `viewModelByIndex` | `(index: number) => ViewModel` | Get a View Model by index |
| `defaultViewModel` | `() => ViewModel` | Get the file's default View Model |
| `bindViewModelInstance` | `(vmi: ViewModelInstance) => void` | Manually bind a View Model instance |
| `enums` | `() => DataEnum[]` | Return all enum definitions in the file |
| `setViewModelInstance` | `(vmi: ViewModelInstance \| null) => void` | Set the main instance without binding; call `bind()` to flush |
| `setGlobalViewModelInstance` | `(name: string, instance: ViewModelInstance) => boolean` | Set the instance in the named global view model slot (not bound until `bind()`); `false` if `name` is not a global view model |
| `globalViewModelInstance` | `(name: string) => ViewModelInstance \| null` | Instance in the named global slot; pure read, never creates one |
| `globalViewModelNames` | `() => string[]` | Names of the file's global view models, in file order |
| `bind` | `() => void` | Flush set main/global instances to the state machine; creates default instances for unset ones when a state machine is running (automatic with `autoBind: true`) |
| `getBindableArtboard` | `(name: string) => BindableArtboard \| null` | Named artboard as a `BindableArtboard` |
| `getDefaultBindableArtboard` | `() => BindableArtboard \| null` | Default artboard as a `BindableArtboard` |

### Events

| Method | Signature | Description |
|--------|-----------|-------------|
| `on` | `(type: EventType, callback: EventCallback) => void` | Subscribe to a runtime event |
| `off` | `(type: EventType, callback: EventCallback) => void` | Unsubscribe from a runtime event |

### Cleanup

| Method | Signature | Description |
|--------|-----------|-------------|
| `cleanup` | `() => void` | Dispose all WASM resources (artboard, animations, renderer) |
| `cleanupInstances` | `() => void` | Dispose artboard/animation instances only, keep file |
| `deleteRiveRenderer` | `() => void` | Delete the renderer, releasing GPU/WebGL resources; call only after `cleanup()` for a full teardown |

### Debugging and profiling

| Method | Signature | Description |
|--------|-----------|-------------|
| `enableFPSCounter` | `(fpsCallback?: (fps: number) => void) => void` | Enable FPS readout; without a callback a fixed-position readout may be injected in the viewport corner |
| `disableFPSCounter` | `() => void` | Disable the FPS readout |

Set `enablePerfMarks: true` in the constructor to emit `performance.mark` / `performance.measure` entries (WASM fetch, renderer instantiation, `.riv` parse/load, first frames); view them in the Chrome DevTools Performance panel. `enablePerfMarks` is also available on `RuntimeLoader` and `RiveFile`.

### Deprecated

| Method | Signature | Description |
|--------|-----------|-------------|
| `stateMachineInputs` | `(name: string) => StateMachineInput[] \| undefined` | Inputs of an instantiated state machine; `undefined` if the file is not loaded. Use Data Binding |
| `scrub` | `(animationNames?: string \| string[], value?: number) => void` | Scrub timeline animations to a time; deprecated in v2.41.0, use a state machine |
| `setBooleanStateAtPath` / `setNumberStateAtPath` / `fireStateAtPath` | `(inputName, value?, path)` | Set/fire inputs on nested artboards by path (e.g. `"group/nested"`) |
| `getTextRunValueAtPath` / `setTextRunValueAtPath` | `(textName, [value,] path)` | Text runs on nested artboards by path |
| `getTextRunValue` / `setTextRunValue` | `(textRunName, [textValue])` | Text runs on the active artboard |
| `setupRiveListeners` / `removeRiveListeners` | `(options?: { isTouchScrollEnabled?: boolean }) => void` / `() => void` | (Re)attach / remove canvas pointer/touch listeners for Rive Listeners; normally automatic |

### Related module exports

| Export | Members | Description |
|--------|---------|-------------|
| `RuntimeLoader` | `getInstance(cb)`, `awaitInstance()`, `setWasmUrl(url)` / `getWasmUrl()`, `setWasmFallbackUrl(url \| null)` / `getWasmFallbackUrl()`, `setWasmBinary(buf \| null)` / `getWasmBinary()`, `enablePerfMarks` | Singleton managing loading/caching of the WASM binary. Call setters before any `Rive` / `RiveFile` is constructed. Default URL is UNPKG for the installed version, fallback is jsdelivr |
| `RiveFont` | `setFallbackFontCallback(cb \| null)` | Static-only fallback fonts utility |
| `decodeImage` / `decodeFont` / `decodeAudio` | `(bytes: Uint8Array) => Promise<ImageWrapper \| FontWrapper \| AudioWrapper>` | Decode raw bytes into asset wrappers for `assetLoader` |

## Notes

- `stateMachineInputs(name)`, the nested-path input/text-run setters and `scrub()` are deprecated; prefer Data Binding for new projects.
- `on()` is not deprecated, but subscribing with `EventType.RiveEvent`, `EventType.StateChange` or `EventType.Loop` is (one-time console warning). `off()` never warns. `removeAllRiveEventListeners(type?)` removes all listeners for a type, or all types.
- `reset()` recreates instances from scratch; any bound ViewModelInstance must be rebound afterward.
- Always call `cleanup()` when removing a Rive component to prevent WASM memory leaks.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [state-machine-playback.md](./state-machine-playback.md)
- [data-binding.md](./data-binding.md)
- [events.md](./events.md)
