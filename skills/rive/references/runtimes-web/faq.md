# Web Runtime FAQ

Common issues and answers for the web runtime.

## Notes

- **CORS errors fetching `.riv` files**: when hosting `.riv` files on a CDN/S3, ensure CORS headers are set on the host so browsers do not block loading the file.
- **Smaller dependency without full feature set**: use [`@rive-app/canvas-lite`](./canvas-vs-webgl.md) if the native Rive Text engine (added in v2.0.0, increasing `rive.wasm` size) is not needed.
- **Canvas width/height attributes change unexpectedly**: the high-level API internally adjusts canvas width/height attributes by `window.devicePixelRatio` to avoid blurry output on high-DPI screens; it does not resize the canvas's DOM box.
- **Blurry animation**: set CSS width/height on the `<canvas>` element, and/or call `resizeDrawingSurfaceToCanvas()` on load; ensure the canvas CSS size is bound before calling it, otherwise the canvas can double in size.
- **CSS width/height vs canvas attribute width/height**: CSS size controls the element's box on the page; the `width`/`height` attributes control the unitless drawing surface size. Attribute values should be at least as large as the CSS size to avoid blur.
- **State machine not playing**: set the `stateMachines` property when instantiating `Rive`, and set `autoplay: true` to autoplay it.
- **Other web framework support**: only React is officially supported (via `rive-react`); other frameworks rely on community wrappers.
- **`Content-Security-Policy: unsafe-eval` blocks Rive from loading**: the WASM build (via Emscripten) needs script evaluation that `unsafe-eval` blocks; use the `wasm-unsafe-eval` CSP directive instead.

## Related

- [canvas-vs-webgl.md](./canvas-vs-webgl.md)
- [rive-methods.md](./rive-methods.md)
- [state-machine-playback.md](./state-machine-playback.md)
