---
source: https://r3f.docs.pmnd.rs/advanced/scaling-performance#nested-loading
---

# Nested loading

Nested loading means that lesser textures and models are loaded first, higher-resolution later. The docs sandbox goes through three loading stages: a loading indicator, low quality, high quality.

## Signature / Usage

You can nest suspense and even use it as a fallback:

```jsx
function App() {
  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas>
        <Suspense fallback={<Model url="/low-quality.glb" />}>
          <Model url="/high-quality.glb" />
        </Suspense>
      </Canvas>
    </Suspense>
  )
}

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}
```

## Notes

- `useGLTF` is from `@react-three/drei`, a separate package not covered by this skill. Use `useLoader` with a three.js loader as the in-package equivalent.

## Related

- [level-of-detail](./level-of-detail.md)
- [reusing-geometries-materials](./reusing-geometries-materials.md)
