# Rive (constructor)

High-level class that loads a `.riv` file, manages the render loop, and exposes playback controls.

## Signature / Usage

```ts
const r = new Rive(params: RiveParameters): Rive
```

```ts
import { Rive } from "@rive-app/webgl2";

const r = new Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  autoplay: true,
  stateMachine: "bumpy",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
  },
});
```

## Options / Props

### File source (one required)

| Name | Type | Description |
|------|------|-------------|
| `src` | `string` | URL or relative path to a `.riv` file |
| `buffer` | `ArrayBuffer` | Raw bytes of a `.riv` file |
| `riveFile` | `RiveFile` | Pre-parsed `RiveFile` instance (for sharing across instances) |

### Rendering

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `canvas` | `HTMLCanvasElement \| OffscreenCanvas` | — | **Required.** Canvas element to render into |
| `layout` | `Layout` | `Fit.Contain / Alignment.Center` | Fit and alignment configuration |
| `useOffscreenRenderer` | `boolean` | `false` | Share a single WebGL2 context across many instances |

### Playback

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `artboard` | `string` | default artboard | Artboard name to render |
| `stateMachine` | `string` | — | State machine name to play (v2.41.0+, strongly recommended). Takes priority over the deprecated `stateMachines` / `animations` |
| `autoplay` | `boolean` | `false` | Start playback immediately after load |
| `autoBind` | `boolean` | `false` | Auto-bind the default ViewModelInstance |

### Asset loading

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enableRiveAssetCDN` | `boolean` | `true` | Allow runtime to fetch hosted assets from Rive's CDN |
| `assetLoader` | `(asset: FileAsset, bytes: Uint8Array) => boolean` | — | Custom callback for referenced assets |

### Interaction

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enableMultiTouch` | `boolean` | `false` | Support multiple simultaneous touch points |
| `dispatchPointerExit` | `boolean` | `true` | Fire pointer-exit event when pointer leaves canvas |
| `tabIndex` | `number` | — | Canvas tab index for keyboard focus |
| `shouldDisableRiveListeners` | `boolean` | `false` | Disable Rive's implicit state machine listener/detector setup on the canvas |
| `isTouchScrollEnabled` | `boolean` | `false` | Allow page scroll behavior during touch/drag interactions on the canvas |
| `focusOptions` | `RiveFocusOptions` | — | Focus behavior configuration object |

### Rendering (additional)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `drawingOptions` | `DrawOptimizationOptions` | `DrawOnChanged` | Rendering optimization mode (e.g., only redraw when the artboard state changes) |
| `enablePerfMarks` | `boolean` | `false` | Emit `performance.mark` / `performance.measure` entries for profiling |
| `enableGPUCanvas` | `boolean` | `false` | Experimental (2.42.0+, `@rive-app/webgl2` only). Render GPU Canvas content (3D and shaders). Cannot be combined with `useOffscreenRenderer: true`; ignored when a `riveFile` is passed (the file carries its own mode) |

### Accessibility (experimental)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `semanticsMode` | `SemanticMode` | `SemanticMode.Disabled` | `SemanticMode.Disabled` or `SemanticMode.Enabled`; build an accessible DOM overlay for the graphic's semantics |
| `semanticsOptions` | `RiveSemanticsOptions` | — | Options for the accessibility overlay |
| `semanticsOptions.riveCanvasLabel` | `string` | `"Rive animation"` | `aria-label` applied to the overlay's container element |

### Lifecycle callbacks

| Name | Type | Description |
|------|------|-------------|
| `onLoad` | `() => void` | File loaded successfully |
| `onLoadError` | `() => void` | File load failed |
| `onPlay` | `(event: Event) => void` | Playback started |
| `onPause` | `(event: Event) => void` | Playback paused |
| `onStop` | `(event: Event) => void` | Playback stopped |
| `onAdvance` | `(event: Event) => void` | Artboard advanced each frame |

### Deprecated parameters (v2.41.0)

| Name | Type | Description |
|------|------|-------------|
| `stateMachines` | `string \| string[]` | Use `stateMachine` with a single name. Playing multiple state machines at once is going away |
| `animations` | `string \| string[]` | Timeline animation name(s); use `stateMachine` instead |
| `automaticallyHandleEvents` | `boolean` | Handle Rive Events (e.g., `OpenUrlEvent`) in the runtime. Deprecated along with Rive Events; use data binding. Default `false` |
| `onLoop` | `(event: Event) => void` | Loop callback, only reported for linear animation playback. Use a state machine and data binding |
| `onStateChange` | `(event: Event) => void` | State change callback. Use data binding (view model property observers) or state machine actions |

## Notes

- As of v2.41.0 the deprecated parameters above still work and nothing has been removed, but using one logs a one-time `[Rive]`-prefixed console warning; each will be removed in a future major version.
- If no `stateMachine` (or deprecated `stateMachines` / `animations`) is passed, the runtime plays the first linear animation it finds on the artboard. In the next major version (v3) it will play the artboard's default state machine when one exists.
- `semanticsMode` / `semanticsOptions` / `enableGPUCanvas` are experimental and may change in a breaking way without a major version bump.
- Rive Listeners are not set up on the canvas when there is no playing state machine, or when the state machine has no listeners.

- Call `r.resizeDrawingSurfaceToCanvas()` inside `onLoad` to match the canvas's device pixel ratio. It accepts an optional `customDevicePixelRatio?: number` argument (e.g. `r.resizeDrawingSurfaceToCanvas(customDevicePixelRatio)`) that overrides the device pixel ratio used to size the canvas; see rive-methods.md.
- Call `r.cleanup()` when the instance is no longer needed to free WASM memory.
- Only one artboard can be rendered per `Rive` instance.
- `load(params: RiveLoadParameters)` replaces the current file/artboard/state machines on an existing `Rive` instance; it accepts a subset of constructor options (`src`/`buffer`/`riveFile`, `autoplay`, `autoBind`, `artboard`, `stateMachine`, `useOffscreenRenderer`, `shouldDisableRiveListeners`, `tabIndex`, `semanticsMode`, `semanticsOptions`, `enableGPUCanvas`) and the deprecated `animations` / `stateMachines`.

## Related

- [packages.md](./packages.md)
- [layout.md](./layout.md)
- [state-machine-playback.md](./state-machine-playback.md)
- [data-binding.md](./data-binding.md)
- [loading-assets.md](./loading-assets.md)
- [rive-methods.md](./rive-methods.md)
