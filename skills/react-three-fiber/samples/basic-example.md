---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/docs/getting-started/basic-example-sandpack/index.jsx
---

# Basic Example

A reusable component with its own state that reacts to pointer input and participates in the render loop.

```jsx
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
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

`styles.css`:

```css
html,
body,
#root {
  height: 100%;
  margin: unset;
}
```

## Notes

- The same example appears in the repository `readme.md` (without the `styles.css` import); the readme also carries a TypeScript variant using `ThreeElements['mesh']` and `useRef<THREE.Mesh>(null!)`.
- `useFrame` and other Fiber hooks can only be called inside a `<Canvas>` child component.
- Installation: `npm install three @types/three @react-three/fiber`. `@react-three/fiber@9` pairs with `react@19`.
