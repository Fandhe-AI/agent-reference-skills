---
source: https://r3f.docs.pmnd.rs/api/canvas#webgpu
---

# WebGPU

To use `WebGPURenderer`, import it from `three/webgpu` and initialize it in an async `gl` factory.

## Signature / Usage

```tsx
import * as THREE from 'three/webgpu'
import { Canvas, extend, type ThreeToJSXElements } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

extend(THREE)

export default () => (
  <Canvas
    gl={async (props) => {
      const renderer = new THREE.WebGPURenderer(props as any)
      await renderer.init()
      return renderer
    }}>
      <mesh>
        <meshBasicNodeMaterial />
        <boxGeometry />
      </mesh>
  </Canvas>
)
```

## Notes

- Migration (v8 → v9): a `gl` callback can now return a promise for async constructors like `WebGPURenderer`. `root.configure()` runs synchronously unless `gl` is an async factory, in which case awaiting it is required.
- Return a renderer dedicated to that root from the factory; R3F owns and disposes factory-created renderers (see [Renderers](./renderers.md)).
- `WebGPURenderer` and node materials are three.js APIs, covered by the threejs skill (renderers).

## Related

- [Renderers](./renderers.md)
- [createRoot](./create-root.md)
