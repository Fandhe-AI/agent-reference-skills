---
source: https://r3f.docs.pmnd.rs/api/canvas#properties
---

# Canvas (Properties)

The `Canvas` object is where you start to define your React Three Fiber Scene.

## Signature / Usage

```jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'

const App = () => (
  <Canvas>
    <pointLight position={[10, 10, 10]} />
    <mesh>
      <sphereGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  </Canvas>
)
```

## Options / Props

| Prop | Description | Default |
| --- | --- | --- |
| children | three.js JSX elements or regular components | |
| fallback | optional DOM JSX elements or regular components in case GL is not supported | |
| gl | Renderer props, an instance, or a sync/async factory. See [Renderers](./renderers.md). | `{}` |
| camera | Props that go into the default camera, or your own `THREE.Camera` | `{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }` |
| scene | Props that go into the default scene, or your own `THREE.Scene` | `{}` |
| shadows | Props that go into `gl.shadowMap`, can be set true for `PCFsoft` or one of the following: 'basic', 'percentage', 'soft', 'variance' | `false` |
| raycaster | Props that go into the default raycaster | `{}` |
| frameloop | Render mode: always, demand, never | `always` |
| resize | Resize config, see react-use-measure's options | `{ scroll: true, debounce: { scroll: 50, resize: 0 } }` |
| orthographic | Creates an orthographic camera | `false` |
| dpr | Pixel-ratio, use `window.devicePixelRatio`, or automatic: [min, max] | `[1, 2]` |
| legacy | Disables THREE.ColorManagement (three r139 or later) when true | `false` |
| linear | Switch off automatic sRGB color space and gamma correction | `false` |
| events | Configuration for the event manager, as a function of state | `import { events } from "@react-three/fiber"` |
| eventSource | The source where events are being subscribed to, HTMLElement | `React.RefObject<HTMLElement>`, `gl.domElement.parentNode` |
| eventPrefix | The event prefix that is cast into canvas pointer x/y events | `offset` |
| flat | Use `THREE.NoToneMapping` instead of `THREE.ACESFilmicToneMapping` | `false` |
| onCreated | Callback after the canvas has rendered (but not yet committed) | `(state) => {}` |
| onPointerMissed | Response for pointer clicks that have missed any target | `(event) => {}` |

## Notes

- Migration (v8 → v9): Canvas `Props` is now called `CanvasProps`. It was aliased in v8 for forward compatibility, but `Props` is removed with v9. The `gl` callback now receives the default constructor props (`gl={(props) => new WebGLRenderer(props)}`) instead of the canvas, and may return a promise for async constructors like `WebGPURenderer`.
- canvas.mdx says `legacy` "Enables" ColorManagement, but `configuration.ts` (v9.8.2) sets `THREE.ColorManagement.enabled = !legacy`, so `legacy: true` disables global color management (consistent with the useThree docs).
- R3F's `<Canvas>` is a React component that renders three.js scenes. It is unrelated to Jetpack Compose `Canvas` (android-compose-graphics-animation) and to the plain HTML `<canvas>` drawing API.
- The `WebGLRenderer`, `ColorManagement`, and tone-mapping classes themselves are documented in the threejs skill (renderers); this page covers only the R3F props.
- `dpr`, `frameloop`, `performance`, and `shadows` follow the update rules in [Updating configuration](./updating-configuration.md).

## Related

- [Updating configuration](./updating-configuration.md)
- [Defaults](./defaults.md)
- [Renderers](./renderers.md)
- [createRoot](./create-root.md)
