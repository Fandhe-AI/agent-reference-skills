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
- The legacy `@rive-app/webgl` package is deprecated (no updates after v2.37.0).

## Related

- [rive-constructor.md](./rive-constructor.md)
- [layout.md](./layout.md)
