---
source: https://r3f.docs.pmnd.rs/getting-started/introduction
---

# Introduction

React-three-fiber is a React renderer for three.js. Build your scene declaratively with re-usable, self-contained components that react to state, are readily interactive and can participate in React's ecosystem.

## Signature / Usage

```bash
npm install three @types/three @react-three/fiber
```

> [!WARNING]
> Three-fiber is a React renderer, it must pair with a major version of React, just like react-dom, react-native, etc. @react-three/fiber@8 pairs with react@18, @react-three/fiber@9 pairs with react@19.

### Does it have limitations?

None. Everything that works in Threejs will work here without exception.

### Is it slower than plain Threejs?

No. There is no overhead. Components render outside of React. It outperforms Threejs in scale due to React's scheduling abilities.

### Can it keep up with frequent feature updates to Threejs?

Yes. It merely expresses Threejs in JSX, `<mesh />` dynamically turns into `new THREE.Mesh()`. If a new Threejs version adds, removes or changes features, it will be available to you instantly without depending on updates to this library.

### What does it look like?

A re-usable component that has its own state, reacts to user-input and participates in the render-loop (TypeScript version):

```tsx
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import './styles.css'

function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
    </mesh>
  )
}

createRoot(document.getElementById('root')).render(
  <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>,
)
```

### First steps

You need to be versed in both React and Threejs before rushing into this. As for Threejs, make sure you at least glance over the following:

1. Make sure you have a basic grasp of Threejs. Keep that site open.
2. When you know what a scene is, a camera, mesh, geometry, material, fork the demo above.
3. Look up the JSX elements that you see (mesh, ambientLight, etc), _all_ threejs exports are native to three-fiber.
4. Try changing some values, scroll through the API to see what the various settings and hooks do.

### Ecosystem

There is a vibrant and extensive ecosystem around three-fiber, full of libraries, helpers and abstractions (names only; none of these are covered by this skill, except where noted in Notes):

- `@react-three/drei` - useful helpers, this is an ecosystem in itself
- `@react-three/gltfjsx` - turns GLTFs into JSX components
- `@react-three/postprocessing` - post-processing effects
- `@react-three/test-renderer` - for unit tests in node
- `@react-three/flex` - flexbox for react-three-fiber
- `@react-three/xr` - VR/AR controllers and events
- `@react-three/csg` - constructive solid geometry
- `@react-three/rapier` - 3D physics using Rapier
- `@react-three/cannon` - 3D physics using Cannon
- `@react-three/p2` - 2D physics using P2
- `@react-three/a11y` - real a11y for your scene
- `@react-three/gpu-pathtracer` - realistic path tracing
- `create-r3f-app next` - nextjs starter
- `lamina` - layer based shader materials
- `zustand`, `jotai`, `valtio` - state management
- `react-spring`, `framer-motion-3d` - animation libraries
- `use-gesture` - mouse/touch gestures
- `leva` - create GUI controls in seconds
- `maath` - a kitchen sink for math helpers
- `miniplex` - ECS (entity management system)
- `composer-suite` - composing shaders, particles, effects and game mechanics

## Notes

- The official introduction states that v10 is in alpha (WebGPU support and a new frame-loop scheduler). This skill targets v9 (`@react-three/fiber` 9.8.2) only; v10 alpha is not covered.
- `@react-three/drei` is a separate package with its own versioning and is not covered by this skill. Samples that use drei helpers (`useGLTF`, `useTexture`, `Html`, ...) carry a note to that effect.
- three.js class APIs (`Mesh`, `BoxGeometry`, `Scene`, ...) belong to the threejs skill; this skill covers only the R3F renderer layer.
- `@theatre/r3f` (`editable`, `SheetProvider`) is a Theatre.js integration on top of R3F and belongs to the theatrejs skill.

## Related

- [Installation](./installation.md)
- [How does it work?](./how-it-works.md)
- [v9 Migration Guide](./v9-migration-guide.md)
