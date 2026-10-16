# runtimes-web

| Name | Description | Path |
|------|-------------|------|
| Artboards (Web) | Selecting which artboard to render at runtime. | [artboards.md](./artboards.md) |
| Audio | Playing audio from Rive animations in the web runtime. | [audio.md](./audio.md) |
| Caching a Rive File | Load a `.riv` file once and reuse it across multiple `Rive` instances instead of re-fetching per instance. | [caching-a-rive-file.md](./caching-a-rive-file.md) |
| Canvas vs WebGL2 | Choosing between `@rive-app/webgl2` and `@rive-app/canvas` (and their `-lite` / `-single` variants), with guidance on performance and package size. | [canvas-vs-webgl.md](./canvas-vs-webgl.md) |
| Data Binding | Connect JavaScript code to animated properties through View Models and View Model Instances (VMI). | [data-binding.md](./data-binding.md) |
| Events | Subscribe to Rive runtime lifecycle events and Rive-defined custom events from animations and state machines. | [events.md](./events.md) |
| Web Runtime FAQ | Common issues and answers for the web runtime. | [faq.md](./faq.md) |
| Fonts | Dynamic font loading and fallback font configuration for the Rive web runtime. | [fonts.md](./fonts.md) |
| GPU Canvas (Web) | Opt a Rive instance into GPU Canvas to render 3D and shader content on the web. Opt-in per Rive instance; available in `@rive-app/webgl2` `2.42.0+`. | [gpu-canvas.md](./gpu-canvas.md) |
| Layout / Fit / Alignment | Controls how Rive content is scaled and positioned within the canvas. | [layout.md](./layout.md) |
| Loading Assets | Three strategies for supplying image, font, and audio assets to a Rive file at runtime. | [loading-assets.md](./loading-assets.md) |
| Low-level API Usage | Advanced JS APIs (`@rive-app/canvas-advanced` / `@rive-app/webgl2-advanced`) for constructing and driving your own render loop, with multiple artboards/animations/state machines on one `<canvas>`. | [low-level-api-usage.md](./low-level-api-usage.md) |
| Migration Guides (Web) | Migration paths between web runtime package versions and legacy packages. | [migration-guides.md](./migration-guides.md) |
| Web Packages Overview | Three npm packages for different rendering needs and bundle-size trade-offs. | [packages.md](./packages.md) |
| Preloading WASM | Self-host and preload the Rive WebAssembly binary for faster startup and better reliability. | [preloading-wasm.md](./preloading-wasm.md) |
| Rive (constructor) | High-level class that loads a `.riv` file, manages the render loop, and exposes playback controls. | [rive-constructor.md](./rive-constructor.md) |
| RiveFile | Pre-parse a `.riv` file once and share it across multiple `Rive` instances to avoid redundant loading and parsing. | [rive-file.md](./rive-file.md) |
| Rive Instance Methods | Methods available on a `Rive` instance for playback control, rendering, data access, and resource management. | [rive-methods.md](./rive-methods.md) |
| Semantics (Web) | Make Rive graphics accessible to screen readers by enabling semantics in the Web (JS) runtime. The runtime builds an invisible DOM tree next to the `<canvas>` from the semantics defined in the editor and keeps it in sync with the state machine. | [semantics.md](./semantics.md) |
| State Machine Playback | Control state machine playback and interact with inputs (booleans, numbers, triggers) from JavaScript. | [state-machine-playback.md](./state-machine-playback.md) |
