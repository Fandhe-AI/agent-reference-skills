---
source: https://r3f.docs.pmnd.rs/tutorials/loading-textures
---

# Loading Textures

Load one or many textures with `useLoader` and `TextureLoader`, then apply them to a material.

```jsx
import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

function Scene() {
  const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
```

Multiple textures through an array:

```jsx
function Scene() {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    'PavingStones092_1K_Color.jpg',
    'PavingStones092_1K_Displacement.jpg',
    'PavingStones092_1K_Normal.jpg',
    'PavingStones092_1K_Roughness.jpg',
    'PavingStones092_1K_AmbientOcclusion.jpg',
  ])
  return (
    <mesh>
      {/* Width and height segments for displacementMap */}
      <sphereGeometry args={[1, 100, 100]} />
      <meshStandardMaterial
        displacementScale={0.2}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
      />
    </mesh>
  )
}
```

With `useTexture` (drei), object notation:

```jsx
const props = useTexture({
  map: 'PavingStones092_1K_Color.jpg',
  displacementMap: 'PavingStones092_1K_Displacement.jpg',
  normalMap: 'PavingStones092_1K_Normal.jpg',
  roughnessMap: 'PavingStones092_1K_Roughness.jpg',
  aoMap: 'PavingStones092_1K_AmbientOcclusion.jpg',
})

return (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial {...props} />
  </mesh>
)
```

## Notes

- `useTexture` comes from `@react-three/drei` (`import { useTexture } from "@react-three/drei"`), a separate package that this skill does not cover. The `useLoader` snippets need only `@react-three/fiber` and three.js.
- `useLoader` suspends, so wrap the consuming component in `Suspense`.
- The displacement is usually too strong; the tutorial sets `displacementScale={0.2}`.
