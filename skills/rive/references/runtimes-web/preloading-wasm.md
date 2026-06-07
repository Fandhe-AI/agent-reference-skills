# Preloading WASM

Self-host and preload the Rive WebAssembly binary for faster startup and better reliability.

## Signature / Usage

```ts
import riveWASMResource from "@rive-app/webgl2/rive.wasm";
import { Rive, RuntimeLoader } from "@rive-app/webgl2";

// Call before creating any Rive instance
RuntimeLoader.setWasmUrl(riveWASMResource);

const r = new Rive({
  src: "scene.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  autoplay: true,
});
```

## Options / Props

### `RuntimeLoader.setWasmUrl(url: string): void`

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Data URI or URL pointing to the `.wasm` binary |

`RuntimeLoader` is a singleton; call `setWasmUrl` once per page, before any `Rive` instance is created.

## Notes

- By default the runtime fetches `rive.wasm` from the Rive CDN on first use.
- Preloading avoids the CDN dependency and speeds up time-to-first-frame.
- Your bundler (Vite, webpack, etc.) may require configuration to import `.wasm` files as data URIs.
- The WASM version **must match** the installed `@rive-app/*` package version.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [packages.md](./packages.md)
