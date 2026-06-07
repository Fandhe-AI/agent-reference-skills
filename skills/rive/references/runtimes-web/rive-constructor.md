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
  stateMachines: "bumpy",
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
| `stateMachines` | `string \| string[]` | — | State machine name(s) to load |
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
| `automaticallyHandleEvents` | `boolean` | `false` | Handle Rive events (e.g., OpenUrl) automatically |
| `dispatchPointerExit` | `boolean` | `true` | Fire pointer-exit event when pointer leaves canvas |
| `tabIndex` | `number` | — | Canvas tab index for keyboard focus |

### Lifecycle callbacks

| Name | Type | Description |
|------|------|-------------|
| `onLoad` | `() => void` | File loaded successfully |
| `onLoadError` | `() => void` | File load failed |
| `onPlay` | `(event: Event) => void` | Playback started |
| `onPause` | `(event: Event) => void` | Playback paused |
| `onStop` | `(event: Event) => void` | Playback stopped |
| `onLoop` | `(event: Event) => void` | Timeline animation looped |
| `onStateChange` | `(event: Event) => void` | State machine transitioned to a new state |
| `onAdvance` | `(event: Event) => void` | Artboard advanced each frame |

## Notes

- Call `r.resizeDrawingSurfaceToCanvas()` inside `onLoad` to match the canvas's device pixel ratio.
- Call `r.cleanup()` when the instance is no longer needed to free WASM memory.
- Only one artboard can be rendered per `Rive` instance.

## Related

- [packages.md](./packages.md)
- [layout.md](./layout.md)
- [state-machine-playback.md](./state-machine-playback.md)
- [data-binding.md](./data-binding.md)
- [loading-assets.md](./loading-assets.md)
- [rive-methods.md](./rive-methods.md)
