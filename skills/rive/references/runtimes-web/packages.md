# Web Packages Overview

Three npm packages for different rendering needs and bundle-size trade-offs.

## Signature / Usage

```bash
npm install @rive-app/webgl2
# or
npm install @rive-app/canvas
# or
npm install @rive-app/canvas-lite
```

```html
<!-- Via CDN (no bundler) -->
<script src="https://unpkg.com/@rive-app/webgl2"></script>
```

```ts
import { Rive } from "@rive-app/webgl2";
// or selective import
import * as rive from "@rive-app/webgl2";
```

Getting started (current pattern):

```ts
const r = new rive.Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  autoBind: true,
  stateMachine: "bumpy",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
  },
});

// When the instance is no longer needed
r.cleanup();
```

## Options / Props

| Package | Renderer | Text / Layout / Audio / Scripting | Bundle Size |
|---------|----------|-----------------------------------|-------------|
| `@rive-app/webgl2` | Rive Renderer (WebGL2) | Full support | Larger |
| `@rive-app/canvas` | CanvasRenderingContext2D | Full support | Medium |
| `@rive-app/canvas-lite` | CanvasRenderingContext2D | **Not supported** | Smallest |

## Notes

- `@rive-app/webgl2` is the recommended default — best rendering quality and performance for most use cases.
- Choose `@rive-app/canvas` when WebGL2 is unavailable or simpler graphics are targeted.
- Choose `@rive-app/canvas-lite` only when bundle size is the top priority and text, layouts, audio, and scripting features are not needed.
- When rendering many Rive instances on one page with WebGL2, set `useOffscreenRenderer: true` to avoid hitting the browser's WebGL context limit.
- Pass `stateMachine` explicitly; otherwise only the first linear animation may play (v3 will play the default state machine). `autoBind: true` is recommended.
- Call `resizeDrawingSurfaceToCanvas()` inside `onLoad` and again on window resize to keep the drawing surface sharp on high-DPI displays.
- Cleanup: call `cleanup()` when the UI hosting the graphic is gone (e.g. a modal closes) or playback is finished; it frees the C++ artboard / animation / state machine instances and avoids memory leaks.
- The CDN script tag `https://unpkg.com/@rive-app/webgl2@latest` loads the latest; pin a version (e.g. `@2.40.1` in the source example) for control. It exposes a global `rive`.
- The legacy `@rive-app/webgl` package is deprecated (no updates after v2.37.0).

## Related

- [rive-constructor.md](./rive-constructor.md)
- [layout.md](./layout.md)
