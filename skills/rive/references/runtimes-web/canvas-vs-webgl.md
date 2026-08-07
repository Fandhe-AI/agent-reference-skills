# Canvas vs WebGL2

Choosing between `@rive-app/webgl2` and `@rive-app/canvas` (and their `-lite` / `-single` variants), with guidance on performance and package size.

## Signature / Usage

```bash
npm install @rive-app/webgl2
# or
npm install @rive-app/canvas
```

Both packages share the same high-level API — switching packages requires no change to how `new Rive({...})` is constructed.

## Options / Props

| Package | Renderer | Notes |
|---------|----------|-------|
| `@rive-app/webgl2` | Rive Renderer (WebGL2) | Recommended; best rendering quality/performance; supports Rive Renderer-only features (e.g. vector feathering) |
| `@rive-app/canvas` | `CanvasRenderingContext2D` | Smaller package; good for simpler vector/raster graphics |
| `@rive-app/canvas-lite` | `CanvasRenderingContext2D` | Smallest footprint; drops text, layout, audio, and scripting engine support |
| `@rive-app/canvas-single` | `CanvasRenderingContext2D` | Bundles `rive.wasm` into the JS file to avoid a separate WASM network request; larger JS bundle |

## Notes

- WebGL has browser limits on concurrent contexts; when rendering many `Rive` instances on one page, set `useOffscreenRenderer: true` to move rendering to a shared offscreen WebGL context.
- Enabling the draft `WEBGL_shader_pixel_local_storage` extension in Chrome improves WebGL2 rendering performance; without it, Rive falls back to an MSAA-based path.
- `@rive-app/webgl` is deprecated as of v2.37.0; use `@rive-app/webgl2` instead.

## Related

- [packages.md](./packages.md)
- [migration-guides.md](./migration-guides.md)
