# GPU Canvas (React)

Opt a Rive component into GPU Canvas to render 3D and shader content in React. Experimental; available in `@rive-app/react-webgl2` `4.34.0+`.

## Signature / Usage

```jsx
import { useRive } from '@rive-app/react-webgl2';

export default function Scene() {
  const { RiveComponent } = useRive({
    src: 'my_file.riv',
    stateMachine: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    enableGPUCanvas: true,
  });

  return <RiveComponent />;
}
```

The default exported `<Rive />` takes the same prop:

```jsx
import Rive from '@rive-app/react-webgl2';

<Rive src="my_file.riv" stateMachine="State Machine 1" enableGPUCanvas />
```

On a cached file, `useRiveFile` takes the same flag:

```jsx
const { riveFile, status } = useRiveFile({
  src: 'my_file.riv',
  enableGPUCanvas: true,
});

const { RiveComponent } = useRive(
  status === 'success'
    ? { riveFile, stateMachine: 'State Machine 1', autoplay: true, autoBind: true, enableGPUCanvas: true }
    : null
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| enableGPUCanvas | boolean | Per-instance opt-in; disabled by default (may change in a future major version). |
| useOffscreenRenderer | boolean | Must stay false for GPU Canvas. React defaults it to `true`, but enabling GPU Canvas flips the default to `false`; only matters if set to `true` explicitly. |

## Notes

- Experimental: the API may change in a minor release without a major version bump.
- `@rive-app/react-webgl2` only; `@rive-app/react-canvas` and `@rive-app/react-canvas-lite` (Canvas2D) do not support GPU Canvas yet.
- A `RiveFile`'s rendering mode is fixed at creation, so changing `enableGPUCanvas` on `useRiveFile` re-constructs the file. The `RiveFile`'s flag wins over `useRive`'s: a file created with `enableGPUCanvas: true` renders through the deferred renderer even if `useRive` sets it false/unset (a warning is logged), and it turns the offscreen renderer optimization off.
- A GPU Canvas file cannot be shared across Rive instances (the renderer binds a file to a single `<canvas>`). Call `useRiveFile` separately per component; additional components log a warning and get a fresh copy of the `.riv` from the file's buffer, so configuration made via the original file does not apply to them.
- Each instance uses its own WebGL context and browsers limit contexts per page; enable only for graphics that need it.

## Related

- [useRive](./use-rive.md)
- [Caching a Rive File](./caching-a-rive-file.md)

Source: https://rive.app/docs/runtimes/react/gpu-canvas (fetched 2026-10)
