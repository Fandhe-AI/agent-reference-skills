---
source: https://r3f.docs.pmnd.rs/tutorials/loading-models
---

# Showing a Loader

Show a loading indicator with `Suspense` while a large model loads.

```jsx
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}
```

```jsx
export default function App() {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  )
}
```

## Notes

- `Html` and `useProgress` come from `@react-three/drei`, a separate package that this skill does not cover.
- `Model` is the component from the GLTF sample (see loading-gltf-models); `Suspense` is imported from `react` and `Canvas` from `@react-three/fiber`.
- `useProgress` returns more than `progress`; only `progress` is shown in the official tutorial.
