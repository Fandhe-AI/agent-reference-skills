# Runtimes React

| Name | Description | Path |
|------|-------------|------|
| Artboards | Select which artboard to render at runtime via the `artboard` prop or `useRive` parameter. | [artboards.md](./artboards.md) |
| Best Practices | Performance and usage considerations for Rive in React. | [best-practices.md](./best-practices.md) |
| Caching a Rive File | Loads a `.riv` file once via `useRiveFile` and reuses it across multiple `useRive` component instances, avoiding redundant fetches. | [caching-a-rive-file.md](./caching-a-rive-file.md) |
| Data Binding | Connects React application state to Rive animated elements through View Models and View Model Instances. Replaces the deprecated `useStateMachineInput` pattern. | [data-binding.md](./data-binding.md) |
| Fonts (React) | Loading and replacing fonts at runtime, and supplying fallback fonts for glyphs the active font cannot render. | [fonts.md](./fonts.md) |
| GPU Canvas (React) | Opt a Rive component into GPU Canvas to render 3D and shader content in React. Experimental; available in `@rive-app/react-webgl2` `4.34.0+`. | [gpu-canvas.md](./gpu-canvas.md) |
| Layout Props | Controls how a Rive artboard scales and positions itself within its container. Pass a `Layout` instance to the `layout` prop of the `Rive` component or the `useRive` hook. | [layout.md](./layout.md) |
| Loading Assets (React) | Loading and replacing Rive file assets (fonts, images, audio) dynamically at runtime via the `assetLoader` callback of `useRive` / `useRiveFile`. | [loading-assets.md](./loading-assets.md) |
| Migration Guides | Migration paths for Rive's React runtime across major package versions. | [migration-guides.md](./migration-guides.md) |
| React Runtime Overview | The Rive React runtime provides two primary packages for integrating Rive animations into React applications. Choose a package based on which rendering backend you need. | [overview.md](./overview.md) |
| Playing Audio (React) | Playing Rive audio events in the React runtime. Audio is added to the Rive file via audio events in the editor. | [playing-audio.md](./playing-audio.md) |
| Preloading WASM (React) | Preload or self-host `rive.wasm` so Rive instances initialize faster. By default the runtime fetches `https://unpkg.com/@rive-app/canvas@x.x.x/rive.wasm` when a Rive instance is rendered. | [preloading-wasm.md](./preloading-wasm.md) |
| Rendering to a Bitmap | Rendering to a bitmap is not supported directly in the React runtime. | [rendering-to-a-bitmap.md](./rendering-to-a-bitmap.md) |
| Semantics (React) | Expose Rive graphics to screen readers by opting into semantics through `useRive`. | [semantics.md](./semantics.md) |
| useRive | Primary hook for accessing the Rive runtime with full control. Returns a `RiveComponent` for rendering and the underlying `rive` instance for imperative control. | [use-rive.md](./use-rive.md) |
| useStateMachineInput | Hook to retrieve a named input from an active state machine, enabling boolean, number, and trigger interactions from React code. | [use-state-machine-input.md](./use-state-machine-input.md) |
