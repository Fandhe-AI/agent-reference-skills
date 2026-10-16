---
source: https://r3f.docs.pmnd.rs/api/canvas#createroot
---

# createRoot (Custom Canvas)

R3F can render to a root, similar to how `react-dom` and all the other React renderers work. This allows you to shave off `react-dom` (~40kb), `react-use-measure` (~3kb) and, if you don't need them, `pointer-events` (~7kb) (you need to explicitly import `events` and add them to the config otherwise).

Roots have the same options and properties as `Canvas`, but you are responsible for resizing it. It requires an existing DOM `<canvas>` object into which it renders.

## Signature / Usage

Creates a root targeting a canvas, rendering JSX.

```jsx
import * as THREE from 'three'
import { extend, createRoot, events } from '@react-three/fiber'

// Register the THREE namespace as native JSX elements.
// See below for notes on tree-shaking
extend(THREE)

// Create a react root
const root = createRoot(document.querySelector('canvas'))

async function app() {
  // Configure the root, inject events optionally, set camera, etc
  // This *must* be called before render. It runs synchronously unless `gl` is an
  // async factory (e.g. WebGPU), so awaiting it is only required in that case
  await root.configure({ events, camera: { position: [0, 0, 50] } })

  // createRoot by design is not responsive, you have to take care of resize yourself
  window.addEventListener('resize', () => {
    root.configure({ size: { width: window.innerWidth, height: window.innerHeight } })
  })

  // Trigger resize
  window.dispatchEvent(new Event('resize'))

  // Render entry point. Once the root is configured the first render mounts synchronously,
  // with the same caveats as `flushSync`. Before that it waits for `root.ready`
  root.render(<App />)

  // Unmount and dispose of memory
  // root.unmount()
}

app()
```

Declarations in `packages/fiber/src/core/root.tsx` (tag v9.8.2):

```ts
export function createRoot<TCanvas extends HTMLCanvasElement | OffscreenCanvas>(
  canvas: TCanvas,
): ReconcilerRoot<TCanvas>

export function unmountComponentAtNode<TCanvas extends HTMLCanvasElement | OffscreenCanvas>(
  canvas: TCanvas,
  callback?: (canvas: TCanvas) => void,
): void
```

## Notes

- `root.ready` is a promise that is pending only while an async renderer is being created. It carries a `status` field, so it can be passed to React's `use` to suspend until the renderer is available.
- `createRoot` and `unmountComponentAtNode` are both exported from `@react-three/fiber` (`core/index.tsx`).
- Repeated `root.configure()` calls follow the rules in [Updating configuration](./updating-configuration.md).

## Related

- [Canvas (Properties)](./canvas.md)
- [Tree-shaking](./tree-shaking.md)
- [Renderers](./renderers.md)
