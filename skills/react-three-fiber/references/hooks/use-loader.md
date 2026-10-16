---
source: https://r3f.docs.pmnd.rs/api/hooks#useloader
---

# useLoader

This hook loads assets and suspends for easier fallback- and error-handling. It can take any three.js loader as its first argument: GLTFLoader, OBJLoader, TextureLoader, FontLoader, etc. It is based on React.Suspense, so fallback-handling and error-handling (error boundary) happen at the parental level.

## Signature / Usage

```jsx
import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

function Model() {
  const result = useLoader(GLTFLoader, '/model.glb')
  // You don't need to check for the presence of the result, when we're here
  // the result is guaranteed to be present since useLoader suspends the component
  return <primitive object={result.scene} />
}

function App() {
  return (
    <Suspense fallback={<FallbackComponent /> /* or null */}>
      <Model />
    </Suspense>
  )
}
```

Signature (from `packages/fiber/src/core/hooks.tsx`, tag v9.8.2):

```ts
export function useLoader<I extends InputLike, L extends LoaderLike | ConstructorRepresentation<LoaderLike>>(
  loader: L,
  input: I,
  extensions?: Extensions<L>,
  onProgress?: (event: ProgressEvent<EventTarget>) => void,
)

useLoader.preload(loader, input, extensions?)  // void
useLoader.clear(loader, input)                 // void
```

### Loader extensions

You can provide a callback as the third argument if you need to configure your loader:

```jsx
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

useLoader(GLTFLoader, url, (loader) => {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco-gltf/')
  loader.setDRACOLoader(dracoLoader)
})
```

### Loading multiple assets at once

It can also make multiple requests in parallel:

```jsx
const [bumpMap, specMap, normalMap] = useLoader(TextureLoader, [url1, url2, url2])
```

### Loading status

You can get the loading status from a callback you provide as the fourth argument. Though consider alternatives like THREE.DefaultLoadingManager or better yet, Drei's loading helpers.

```jsx
useLoader(loader, url, extensions, (xhr) => {
  console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
})
```

### Special treatment of GLTFLoaders and all loaders that return a scene prop

If a `result.scene` prop is found the hook will automatically create a object & material collection: `{ nodes, materials }`. This lets you build immutable scene graphs selectively. You can also specifically alter the data without having to traverse it. GLTFJSX specifically relies on this data.

```jsx
const { nodes, materials } = useLoader(GLTFLoader, url)
```

### Pre-loading assets

You can pre-load assets in global space so that models can be loaded in anticipation before they're mounted in the component tree.

```jsx
useLoader.preload(GLTFLoader, '/model.glb' /* extensions */)
```

## Notes

- Internally, `useLoader` relies on `suspend-react`.
- Assets loaded with useLoader are cached by default. The urls given serve as cache-keys. This allows you to re-use loaded data everywhere in the component tree.
- Be very careful with mutating or disposing of loaded assets, especially when you plan to re-use them. Refer to the automatic disposal section in the API (objects/disposal).
- Source: `useLoader.clear(loader, input)` removes a loaded asset from cache. The loader may be a constructor (instantiated once and memoized per constructor) or a loader instance; the caller must be wrapped with `React.Suspense`. Load errors reject with `Could not load <input>: <message>`.
- Migration (v8 → v9): `useLoader` accepts a loader instance as well as a constructor (as in the source signature above); see getting-started/v9-migration-guide for the v8 → v9 overview.
- Distance: `GLTFLoader`, `OBJLoader`, `FBXLoader`, `STLLoader`, `DRACOLoader`, `TextureLoader` are three.js classes; their APIs belong to the threejs skill (loaders-addons). `@react-three/drei` loading helpers (`useGLTF`, `useTexture`, `useProgress`) are a separate package not covered by this skill.

## Related

- [useGraph](./use-graph.md)
- [useThree](./use-three.md)
