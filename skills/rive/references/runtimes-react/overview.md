# React Runtime Overview

The Rive React runtime provides two primary packages for integrating Rive animations into React applications. Choose a package based on which rendering backend you need.

## Signature / Usage

```bash
# Recommended — Rive Renderer with WebGL2
npm i --save @rive-app/react-webgl2

# Canvas-based alternative
npm i --save @rive-app/react-canvas
```

```tsx
import Rive from '@rive-app/react-webgl2';

export const Simple = () => (
  <Rive
    src="https://cdn.rive.app/animations/vehicles.riv"
    stateMachines="bumpy"
  />
);
```

## Options / Props

| Package | Renderer | Notes |
| --- | --- | --- |
| `@rive-app/react-webgl2` | Rive Renderer (WebGL2) | Recommended; supports Vector Feathering and advanced features |
| `@rive-app/react-canvas` | Canvas 2D | No Rive Renderer; broader browser compatibility |
| `@rive-app/react-canvas-lite` | Canvas 2D (lite) | Smaller bundle; not recommended for files using Rive Text |

## Notes

- The default export (`Rive`) is a drop-in component for simple use cases; use `useRive` for advanced control.
- `@rive-app/react-webgl2`: enable the draft `WEBGL_shader_pixel_local_storage` Chrome extension to get full performance benefits of the Rive Renderer. Browsers without it fall back to MSAA.
- Rive does not instantiate until `<RiveComponent />` is rendered — the underlying `<canvas>` must be present in the DOM.
- The canvas initially defaults to 0×0; set sizing via `className` or a wrapper container.
- For conditional rendering, isolate `useRive` in a dedicated wrapper component to prevent animation restarts during re-renders.

## Related

- [useRive Hook](./use-rive.md)
- [Layout Props](./layout.md)
- [Data Binding](./data-binding.md)
