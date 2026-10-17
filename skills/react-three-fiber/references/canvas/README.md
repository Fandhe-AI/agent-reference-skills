# canvas

| Name | Description | Path |
|------|-------------|------|
| Canvas (Properties) | The `Canvas` object is where you start to define your React Three Fiber Scene. | [canvas.md](./canvas.md) |
| createRoot (Custom Canvas) | R3F can render to a root, similar to how `react-dom` and all the other React renderers work. | [create-root.md](./create-root.md) |
| Defaults | What `Canvas` (via `createRoot`) creates for you by default. | [defaults.md](./defaults.md) |
| Errors and fallbacks | Provide a fallback when WebGL is unsupported and guard the canvas against WebGL context crashes. | [errors-and-fallbacks.md](./errors-and-fallbacks.md) |
| Renderers / Custom renderers / Ownership | Canvas creates a `THREE.WebGLRenderer` by default, and the `gl` prop configures it or supplies your own renderer. | [renderers.md](./renderers.md) |
| Tree-shaking | New with v8, the underlying reconciler no longer pulls in the THREE namespace automatically. | [tree-shaking.md](./tree-shaking.md) |
| Updating configuration | How `Canvas` (and repeated `root.configure()` calls) apply changed props after the first render. | [updating-configuration.md](./updating-configuration.md) |
| WebGPU | To use `WebGPURenderer`, import it from `three/webgpu` and initialize it in an async `gl` factory. | [webgpu.md](./webgpu.md) |
