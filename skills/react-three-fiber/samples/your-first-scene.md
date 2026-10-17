---
source: https://r3f.docs.pmnd.rs/getting-started/your-first-scene
---

# Your First Scene

Render a mesh with a box geometry, a material, and two lights inside a `<Canvas>`.

```jsx
import { Canvas } from "@react-three/fiber";

export default function App() {
  return (
      <Canvas>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhongMaterial />
        </mesh>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Canvas>
  );
}
```

Mounting the app with the Canvas inside a sized parent:

```jsx
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <div id="canvas-container">
      <Canvas />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
```

## Notes

- Lowercase JSX elements such as `<mesh />` are the three.js classes in camel-case and need no imports; `<boxGeometry />` and `<meshStandardMaterial />` attach to their parent automatically.
- `args` always takes an array of constructor arguments, and changing `args` re-constructs the object.
- Props set the property of the same name on the three.js instance; props with a `.set()` method accept shortcuts (`position={[0, 0, 5]}`, `color="red"`).
- Canvas is responsive to its parent node, so size it by sizing the parent (`#canvas-container` above). The three.js class APIs themselves belong to the threejs skill.
