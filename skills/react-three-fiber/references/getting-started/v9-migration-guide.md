---
source: https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide
---

# v9 Migration Guide

Changes and new features with v9 and React 19. This is a compatibility release for React 19, which brings further performance, stability, and type improvements.

> [!WARNING]
> This release contains breaking changes when using Strict Mode, which can highlight bugs during development. See StrictMode below.

## Signature / Usage

Summary of v8 to v9 changes:

| Area | Change in v9 |
| --- | --- |
| `useLoader` | Accepts a loader instance in addition to a class |
| `extend` | Factory signature: `extend(Class)` returns a component |
| Canvas `gl` prop | Callback receives constructor parameters; may return a promise (WebGPU) |
| Textures | Automatic sRGB conversion of texture props removed |
| Suspense | Side-effects (attach, constructor effects) no longer fire repeatedly during suspension |
| `args` / primitive swap | Swapping improved for arrays / iterators |
| `Props` | Renamed to `CanvasProps` (`Props` removed) |
| JSX types | Dynamic mapping; hardcoded exports like `MeshProps` removed, use `ThreeElements['mesh']` |
| Node helpers | `Node`, `Object3DNode`, `BufferGeometryNode`, `MaterialNode`, `LightNode` removed; use `ThreeElement` |
| StrictMode | Inherited from parent renderer |
| `act` | Exported from React itself |

### useLoader Accepts Loader Instance

`useLoader` now supports re-use of external loader instances for more controlled pooling and setup.

```jsx
import { GLTFLoader } from 'three/addons'
import { useLoader } from '@react-three/fiber'

function Model() {
  const gltf = useLoader(GLTFLoader, '/path/to/model.glb')
  // ...
}

// or,

const loader = new GLTFLoader()
function Model() {
  const gltf = useLoader(loader, '/path/to/model.glb')
  // ...
}
```

### Factory extend Signature

`extend` can now produce a component when a three.js class is passed to it individually instead of a catalog of named classes. This is backwards compatible and reduces TypeScript boilerplate and JSX collisions. We recommend libraries migrate to this signature so internal components don't clash with user-land declarations.

```tsx
import { OrbitControls } from 'three/addons'
import { type ThreeElement, type ThreeElements } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: ThreeElement<typeof OrbitControls>
  }
}

extend({ OrbitControls })

<orbitControls args={[camera, gl.domElement]}>

// or,

const Controls = extend(OrbitControls)
<Controls args={[camera, gl.domElement]} />
```

### Async GL prop

The Canvas GL prop accepts constructor parameters, properties, or a renderer instance via a callback. The callback now passes constructor parameters instead of just a canvas reference.

```diff
<Canvas
  gl={{ reverseDepthBuffer: true }}
- gl={(canvas) => new WebGLRenderer({ canvas })}
+ gl={(props) => new WebGLRenderer(props)}
>
```

Further, a callback passed to GL can now return a promise for async constructors like `WebGPURenderer` (see WebGPU).

```tsx
<Canvas
  gl={async (props) => {
    // ...
    return renderer
  }}
>
```

### WebGPU

Recent Three.js now includes a WebGPU renderer. While still a work in progress and not fully backward-compatible with all of Three's features, the renderer requires an async initialization method. R3F streamlines this by allowing the gl prop to return a promise.

```tsx
import * as THREE from 'three/webgpu'
import * as TSL from 'three/tsl'
import { Canvas, extend, useFrame, useThree, type ThreeToJSXElements } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

extend(THREE as any)

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

### Color Management of Textures

Automatic sRGB conversion of texture props has been removed. Color textures are now handled automatically for built-in materials, aligning with vanilla Three.js behavior. This prevents issues where data textures (e.g., normals or displacement) become corrupted or non-linear. For custom materials or shaders, annotate color textures with `texture.colorSpace = THREE.SRGBColorSpace` or `texture-colorSpace={THREE.SRGBColorSpace}` in JSX.

### Suspense and Side-Effects

The handling of Suspense and fallback content has improved in React and R3F. Side-effects like attach and constructor effects (e.g., controls adding event listeners) no longer fire repeatedly without proper cleanup during suspension.

```tsx
import { extend, type ThreeElement, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/addons'

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: ThreeElement<typeof OrbitControls>
  }
}

extend({ OrbitControls })

function Controls() {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)

  // Will only initialize when tree is connected to screen
  return <orbitControls args={[camera, gl.domElement]} />
}

<Suspense>
  <Controls />
  <AsyncComponent />
</Suspense>
```

### Swapping with args and primitives

Swapping elements when changing the `args` or primitive `object` prop has been improved for structured children like arrays or iterators (React supports both, including async iterators). Previously, primitives sharing an object could update out of order or be removed from the scene along with their children. See pmndrs/react-three-fiber PR 3272.

### Props renamed to CanvasProps

Canvas `Props` is now called `CanvasProps` for clarity. These were aliased in v8 for forward compatibility, but `Props` is removed with v9.

```diff
-function Canvas(props: Props)
+function Canvas(props: CanvasProps)
```

### Dynamic JSX Types

Since v8, a catalog of known elements was added to a `ThreeElements` interface, and with v9 three API is automatically mapped to JSX types. As types are now dynamically mapped, hardcoded exports like `MeshProps` have been removed, and can be accessed as `ThreeElements['mesh']`. Helper types like `Color` or `Vector3` remain to reflect the JSX `MathType` API for shorthand expression.

```diff
-import { MeshProps } from '@react-three/fiber'
-type Props = MeshProps

+import { ThreeElements } from '@react-three/fiber'
+type Props = ThreeElements['mesh']
```

### Node Helpers

Specialized `Node` type helpers for extending JSX (`Node`, `Object3DNode`, `BufferGeometryNode`, `MaterialNode`, `LightNode`) are removed and combined into `ThreeElement`, which accepts a single type representing the extended element instance.

```tsx
import { type ThreeElement } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    customElement: ThreeElement<typeof CustomElement>
  }
}

extend({ CustomElement })
```

### ThreeElements

`ThreeElements` was added as an interface since v8.1.0 and is the current way of declaring or accessing JSX within R3F since React's deprecation of `global` JSX. All JSX types belonging to R3F are accessible from `ThreeElements`.

```diff
-import { type Node } from '@react-three/fiber'
-
-declare global {
-  namespace JSX {
-    interface IntrinsicElements {
-      customElement: Node<CustomElement, typeof CustomElement>
-    }
-  }
-}
-
-extend({ CustomElement })

+import { type ThreeElement } from '@react-three/fiber'
+
+declare module '@react-three/fiber' {
+  interface ThreeElements {
+    customElement: ThreeElement<typeof CustomElement>
+  }
+}
+
+extend({ CustomElement })
```

### StrictMode

`StrictMode` is now correctly inherited from a parent renderer like react-dom. Previously, `<StrictMode />` mounted in another root such as react-dom would not affect the R3F canvas, so it had to be redeclared within the canvas as well.

```diff
<StrictMode>
  <Canvas>
-    <StrictMode>
-      // ...
-    </StrictMode>
+    // ...
  </Canvas>
</StrictMode>
```

Keep in mind, this change may affect the behavior of your application. If you encounter anything that worked before and fails now, profile it first in dev and then production. If it works in prod then strict mode has flushed out a side-effect in your code.

### Act

`act` is now exported from React itself and can be used for all renderers. It will return the contents of a passed async callback like before and recursively flush async effects to synchronously test React output.

```tsx
import { act } from 'react'
import { createRoot } from '@react-three/fiber'

const store = await act(async () => createRoot(canvas).render(<App />))
console.log(store.getState())
```

## Notes

- Verbatim sections above are retained from the official guide; the summary table is added for lookup.
- The docs WebGPU snippet omits the `ThreeToJSXElements` import; added here. The docs Suspense snippet uses key `OrbitControls` with `<orbitControls>`, lacks the `extend` import and a closing tag; corrected here (key `orbitControls`, `extend` imported, self-closed).
- WebGPU renderer classes (`WebGPURenderer`) and color management belong to the threejs skill.
- Other categories carry per-page `Migration (v8 → v9): ...` notes where affected.

## Related

- [Introduction](./introduction.md)
- [How does it work?](./how-it-works.md)
