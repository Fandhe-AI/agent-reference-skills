# useRive

Primary hook for accessing the Rive runtime with full control. Returns a `RiveComponent` for rendering and the underlying `rive` instance for imperative control.

## Signature / Usage

```ts
useRive(riveParams: UseRiveParameters | null, opts?: UseRiveOptions): RiveState
```

```tsx
import { useRive } from '@rive-app/react-webgl2';

export default function Example() {
  const { rive, RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachine: 'bumpy',
    autoplay: false,
  });

  return (
    <RiveComponent
      onMouseEnter={() => rive && rive.play()}
      onMouseLeave={() => rive && rive.pause()}
    />
  );
}
```

## Options / Props

### UseRiveParameters (riveParams)

Passed directly to the underlying Rive web runtime object. Accepts `null` or `undefined` for deferred / conditional initialization.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | URL or public path to the `.riv` file |
| `buffer` | `ArrayBuffer` | — | Raw `.riv` bytes; alternative to `src` |
| `artboard` | `string` | — | Name of the artboard to display (defaults to the editor default) |
| `stateMachine` | `string` | — | State machine to play (strongly recommended) |
| `animations` | `string \| string[]` | — | Deprecated; use `stateMachine` |
| `stateMachines` | `string \| string[]` | — | Deprecated; use `stateMachine` |
| `automaticallyHandleEvents` | `boolean` | — | Deprecated along with Rive Events; use data binding |
| `enableGPUCanvas` | `boolean` | `false` | Experimental; `@rive-app/react-webgl2` only. Render GPU Canvas content (3D and shaders). Flips the `useOffscreenRenderer` default to `false` |
| `onRiveReady` | `(rive: Rive) => void` | — | Called once the file is loaded and the `Rive` instance is initialized, synchronously before the state machine advances. Put pre-render data binding here (`setViewModelInstance()` / `setGlobalViewModelInstance()` / property values / `bind()`). Prefer over `onLoad` |
| `layout` | `Layout` | — | Layout configuration (`Fit`, `Alignment`, bounds) |
| `autoplay` | `boolean` | `true` | Start playback immediately after load |
| `autoBind` | `boolean` | `false` | Auto-bind the default View Model instance on load |
| `onLoad` | `EventCallback` | — | Fired after the Rive file loads (note: `rive` instance may not be available yet — prefer `useEffect`) |

### UseRiveOptions (opts)

React-specific options passed as the second argument.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `useDevicePixelRatio` | `boolean` | `true` | Scales resolution to the device pixel ratio; requires `setContainerRef` to be wired |
| `fitCanvasToArtboardHeight` | `boolean` | `false` | Resizes the canvas height to match the artboard height |
| `useOffscreenRenderer` | `boolean` | `true` | Shares a single WebGL context across Rive instances to work around browser WebGL context limits. Default flips to `false` when `enableGPUCanvas` is on; an explicit value always wins (`true` with `enableGPUCanvas` means GPU Canvas content will not draw) |

### RiveState (return value)

| Name | Type | Description |
| --- | --- | --- |
| `rive` | `Rive \| null` | Instantiated Rive object; `null` until the component mounts |
| `RiveComponent` | `React.FC` | JSX element that renders the canvas; pass `className`/`style` and event handlers |
| `canvas` | `HTMLCanvasElement \| null` | The underlying canvas element |
| `container` | `HTMLElement \| null` | The parent container element |
| `setCanvasRef` | `React.RefCallback` | Ref callback for manual canvas control |
| `setContainerRef` | `React.RefCallback` | Ref callback for manual container control (required when `useDevicePixelRatio` is `true`) |

### useResizeCanvas

`useResizeCanvas(resizeProps: UseResizeCanvasProps): void` resizes the `<canvas>` to its parent container and resets its surface size. Already used internally by `useRive` / `<RiveComponent />`; only needed when using the web JS runtime directly in React.

| Name | Type | Description |
| --- | --- | --- |
| `riveLoaded` | `boolean` | `true` once the Rive instance is created and the file parsed (default `false`) |
| `canvasRef` | `MutableRefObject<HTMLCanvasElement \| null>` | Ref of the `<canvas>` |
| `containerRef` | `MutableRefObject<HTMLElement \| null>` | Ref of the canvas's parent container |
| `onCanvasHasResized` | `() => void` | Optional; e.g. call `rive.resizeToCanvas()` to reset layout bounds |
| `options` | `Partial<UseRiveOptions>` | Optional; options passed to `useRive` |
| `artboardBounds` | `Bounds` | Optional; only needed if `options.fitCanvasToArtboardHeight` is `true` |

### useRiveFile

`useRiveFile(params: UseRiveFileParameters): RiveFileState`

| Name | Type | Description |
| --- | --- | --- |
| `src` | `string` | URL or public asset path (root-relative, e.g. `/public/foo.riv`) of the `.riv`; one of `src` / `buffer` required |
| `buffer` | `ArrayBuffer` | Raw `.riv` bytes |
| `assetLoader` | `AssetLoadCallback` | Custom asset loading |
| `enableRiveAssetCDN` | `boolean` | Allow loading assets from Rive's CDN (default enabled) |
| `enablePerfMarks` | `boolean` | Emit `performance.mark` / `performance.measure` entries (default `false`) |
| `enableGPUCanvas` | `boolean` | Experimental; `@rive-app/react-webgl2` only |

Returns `RiveFileState`: `riveFile` (`null` until loaded) and `status` (`idle` / `loading` / `failed` / `success`).

### RiveComponent props (default export)

The default-exported `<RiveComponent />` always plays with `autoplay: true`; for playback control, the `Rive` instance or data binding use `useRive`.

| Name | Type | Description |
| --- | --- | --- |
| `src` | `string` | Required; URL or public path |
| `artboard` | `string` | Artboard to render (default: first artboard) |
| `stateMachine` | `string` | State machine to play (strongly recommended) |
| `layout` | `Layout` | Fit and alignment |
| `useOffscreenRenderer` | `boolean` | Share one WebGL context (default `true`; `false` when `enableGPUCanvas` is set unless explicit) |
| `shouldDisableRiveListeners` | `boolean` | Prevent attaching pointer listeners to the canvas |
| `shouldResizeCanvasToContainer` | `boolean` | Auto-resize canvas to its container (default `true`) |
| `enableGPUCanvas` | `boolean` | Experimental GPU Canvas |
| `stateMachines` / `animations` / `automaticallyHandleEvents` | — | Deprecated; use `stateMachine` / data binding |

## Notes

- Deprecated props (`stateMachines`, `animations`, `automaticallyHandleEvents`) still work; `automaticallyHandleEvents` is deprecated along with the Rive Events surface.
- Other web runtime parameters (e.g. `enablePerfMarks` per the web parameters page) are passed through to the underlying `Rive` object.
- Any `canvas` attributes (`role`, `aria-*`, event handlers) passed to `RiveComponent` are spread onto the `<canvas>`; children can serve as fallback content.
- `RiveComponent` wraps the `<canvas>` inside a `<div>`. `style`/`className` props target the `<div>` (layout); other attributes are forwarded to `<canvas>`.
- Do not rely on `onLoad` to access the `rive` instance — use `useEffect` watching `rive` instead.
- Rive will not instantiate until `<RiveComponent />` is rendered; the canvas must be present in the DOM.
- For conditional rendering patterns, lift `useRive` into an isolated wrapper component to avoid animation restarts caused by parent re-renders.

## Related

- [Overview](./overview.md)
- [useStateMachineInput](./use-state-machine-input.md)
- [Layout Props](./layout.md)
- [Data Binding](./data-binding.md)
