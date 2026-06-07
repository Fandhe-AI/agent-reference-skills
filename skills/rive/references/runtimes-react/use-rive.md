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
    stateMachines: 'bumpy',
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
| `animations` | `string \| string[]` | — | Animation(s) to play |
| `stateMachines` | `string \| string[]` | — | State machine(s) to activate |
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
| `useOffscreenRenderer` | `boolean` | `true` | Shares a single WebGL context across Rive instances to work around browser WebGL context limits |

### RiveState (return value)

| Name | Type | Description |
| --- | --- | --- |
| `rive` | `Rive \| null` | Instantiated Rive object; `null` until the component mounts |
| `RiveComponent` | `React.FC` | JSX element that renders the canvas; pass `className`/`style` and event handlers |
| `canvas` | `HTMLCanvasElement \| null` | The underlying canvas element |
| `container` | `HTMLElement \| null` | The parent container element |
| `setCanvasRef` | `React.RefCallback` | Ref callback for manual canvas control |
| `setContainerRef` | `React.RefCallback` | Ref callback for manual container control (required when `useDevicePixelRatio` is `true`) |

## Notes

- `RiveComponent` wraps the `<canvas>` inside a `<div>`. `style`/`className` props target the `<div>` (layout); other attributes are forwarded to `<canvas>`.
- Do not rely on `onLoad` to access the `rive` instance — use `useEffect` watching `rive` instead.
- Rive will not instantiate until `<RiveComponent />` is rendered; the canvas must be present in the DOM.
- For conditional rendering patterns, lift `useRive` into an isolated wrapper component to avoid animation restarts caused by parent re-renders.

## Related

- [Overview](./overview.md)
- [useStateMachineInput](./use-state-machine-input.md)
- [Layout Props](./layout.md)
- [Data Binding](./data-binding.md)
