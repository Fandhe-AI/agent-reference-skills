# GPU Canvas (Web)

Opt a Rive instance into GPU Canvas to render 3D and shader content on the web. Opt-in per Rive instance; available in `@rive-app/webgl2` `2.42.0+`.

## Signature / Usage

```javascript
import { Rive } from "@rive-app/webgl2";

const rive = new Rive({
  src: "my_file.riv",
  canvas: document.getElementById("canvas"),
  stateMachine: "State Machine 1",
  autoplay: true,
  autoBind: true,
  enableGPUCanvas: true,
});
```

Cached file: `RiveFile` takes the same flag, which cannot be changed after construction.

```javascript
import { RiveFile, Rive } from "@rive-app/webgl2";

const riveFile = new RiveFile({
  src: "my_file.riv",
  enableGPUCanvas: true,
});
await riveFile.init();

const rive = new Rive({
  riveFile,
  canvas: document.getElementById("canvas"),
  stateMachine: "State Machine 1",
  autoplay: true,
  autoBind: true,
  enableGPUCanvas: true,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enableGPUCanvas` | boolean | `false` | Opt the `Rive` / `RiveFile` into GPU Canvas (3D and shader content). |

## Notes

- Experimental: the API may change in a minor release without a major version bump.
- Requires `@rive-app/webgl2`; `@rive-app/canvas` and `@rive-app/canvas-lite` do not support it yet.
- `useOffscreenRenderer` must stay `false` (its default): GPU Canvas needs a WebGL context per `<canvas>`.
- Disabled by default, but that may change in a future major version.
- The file's flag wins: a `RiveFile` created with `enableGPUCanvas: true` renders through the deferred renderer technique even if the `Rive` instance sets it to `false` or leaves it unset, and the runtime logs a warning.
- A GPU Canvas `RiveFile` cannot be shared across Rive instances; it binds to the first `<canvas>`. Additional instances load from a fresh copy of the `.riv` made from the file's buffer (with a warning), so anything configured on the original `RiveFile` does not apply to them.
- Each instance takes its own WebGL context and browsers cap contexts per page; opt in only for graphics that need it.

## Related

- [canvas-vs-webgl.md](./canvas-vs-webgl.md)
- [rive-constructor.md](./rive-constructor.md)
- [rive-file.md](./rive-file.md)
