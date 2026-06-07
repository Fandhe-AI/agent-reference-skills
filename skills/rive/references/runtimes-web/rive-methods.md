# Rive Instance Methods

Methods available on a `Rive` instance for playback control, rendering, data access, and resource management.

## Signature / Usage

```ts
const r = new Rive({ ... });

// Playback
r.play("animationName");
r.pause();
r.stop();
r.reset({ stateMachines: "Machine", autoplay: true });

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
| `reset` | `(params?: { artboard?: string; stateMachines?: string \| string[]; autoplay?: boolean }) => void` | Dispose and recreate instances |

### Rendering

| Method | Signature | Description |
|--------|-----------|-------------|
| `resizeDrawingSurfaceToCanvas` | `(customDPR?: number) => void` | Adjust canvas drawing surface for device pixel ratio |
| `resizeToCanvas` | `() => void` | Update layout bounds to match canvas size |
| `startRendering` | `() => void` | Begin the render loop |
| `stopRendering` | `() => void` | Halt the render loop |
| `drawFrame` | `() => void` | Render a single frame |

### State machine inputs

| Method | Signature | Description |
|--------|-----------|-------------|
| `stateMachineInputs` | `(name: string) => StateMachineInput[]` | Return all inputs for a named state machine |

### Data / state accessors

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `contents` | `RiveFile` | Artboards, animations, and state machines in the file |
| `activeArtboard` | `string` | Currently active artboard name |
| `playingAnimationNames` | `string[]` | Names of currently playing timeline animations |
| `playingStateMachineNames` | `string[]` | Names of currently playing state machines |
| `bounds` | `AABB` | Axis-aligned bounding box of the artboard |
| `viewModelCount` | `number` | Number of View Models in the file |
| `viewModelInstance` | `ViewModelInstance \| null` | Bound instance (when `autoBind: true`) |

### View Model

| Method | Signature | Description |
|--------|-----------|-------------|
| `viewModelByName` | `(name: string) => ViewModel` | Get a View Model by name |
| `viewModelByIndex` | `(index: number) => ViewModel` | Get a View Model by index |
| `defaultViewModel` | `() => ViewModel` | Get the file's default View Model |
| `bindViewModelInstance` | `(vmi: ViewModelInstance) => void` | Manually bind a View Model instance |
| `enums` | `() => object` | Return all enum definitions in the file |

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

## Notes

- `stateMachineInputs(name)` is the legacy approach for controlling state machines; prefer Data Binding for new projects.
- `reset()` recreates instances from scratch; any bound ViewModelInstance must be rebound afterward.
- Always call `cleanup()` when removing a Rive component to prevent WASM memory leaks.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [state-machine-playback.md](./state-machine-playback.md)
- [data-binding.md](./data-binding.md)
- [events.md](./events.md)
