# Preloading WASM (React)

Preload or self-host `rive.wasm` so Rive instances initialize faster. By default the runtime fetches `https://unpkg.com/@rive-app/canvas@x.x.x/rive.wasm` when a Rive instance is rendered.

## Signature / Usage

```html
<!-- index.html (or main app entry point) -->
<link rel="preconnect" href="https://unpkg.com" crossorigin />

<!-- If hosting the WASM file yourself, point this to where rive.wasm lives in your CDN -->
<link
  rel="preload"
  as="fetch"
  crossorigin
  href="https://unpkg.com/@rive-app/canvas@2.41.0/rive.wasm"
/>

<!-- Preload the main hero .riv file too -->
<link rel="preload" as="fetch" crossorigin href="/assets/hero.riv" />
```

```jsx
import {useRive, RuntimeLoader} from '@rive-app/react-canvas';

// (Optional) Only if you serve rive.wasm from your own CDN. Must match the URL you preload
// RuntimeLoader.setWasmUrl("https://cdn.example.com/assets/rive-2.41.0.wasm");

if (typeof window !== 'undefined') {
  RuntimeLoader.awaitInstance().catch(() => {});
}

export default function Hero() {
  const { RiveComponent } = useRive({
    src: '/assets/hero.riv',
    stateMachine: 'State Machine 1',
    autoplay: true,
    autoBind: true,
  });

  return <RiveComponent style={{ width: 400, height: 400 }} />;
}
```

Bundler-hosted alternative:

```js
import riveWASMResource from '@rive-app/canvas/rive.wasm'; // Vite: append ?url
import {RuntimeLoader} from '@rive-app/react-canvas';
RuntimeLoader.setWasmUrl(riveWASMResource);
```

## Notes

- Reasons to self-host: control over WASM origin (instead of third-party unpkg), faster init, control over caching policy.
- React runtimes are thin wrappers over the JS runtimes and load the same WASM from the same location. You do not need `RuntimeLoader.setWasmUrl()` unless self-hosting.
- Version matching: the `@rive-app/react-canvas` version differs from the `@rive-app/canvas` version it wraps, and `rive.wasm` must match the canvas version. Read the `@rive-app/canvas` dependency in the installed React runtime's `package.json` (e.g. `rive-react@v4.33.0` pins `@rive-app/canvas@2.41.0`).
- The official example writes `@rive-app/canvas@4.33.0` in the preload URL (the React runtime's version number); it is corrected here to the canvas version `2.41.0`, since `@rive-app/canvas` is on the 2.x line and `rive.wasm` must match the canvas version.
- The import approach resolves under npm/yarn (hoisting) but fails under pnpm unless `@rive-app/canvas` is added to your own `package.json` at the matching version. The import emits `rive.wasm` as a separate hashed file, not inlined in the JS bundle.
- For hero animations, preload both `rive.wasm` and the `.riv` so the browser starts downloading up front.

## Related

- [Caching a Rive File](./caching-a-rive-file.md)
- [Best Practices](./best-practices.md)

Source: https://rive.app/docs/runtimes/react/preloading-wasm (fetched 2026-10)
