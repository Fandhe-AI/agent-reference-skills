---
source: https://r3f.docs.pmnd.rs/advanced/scaling-performance#level-of-detail
---

# Level of detail

Reduce the quality of an object the further it is away from the camera. This can reduce the overall vertex-count, which means less work for the GPU.

## Signature / Usage

There is a small component in Drei called `<Detailed />` which sets up LOD without boilerplate. You load or prepare a couple of resolution stages, as many as you like, and then give them the same amount of distances from the camera, starting from highest quality to lowest.

```jsx
import { Detailed, useGLTF } from '@react-three/drei'

function Model() {
  const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
  return (
    <Detailed distances={[0, 10, 20]}>
      <mesh geometry={high} />
      <mesh geometry={mid} />
      <mesh geometry={low} />
    <Detailed/>
  )
}
```

## Notes

- `Detailed` and `useGLTF` are from `@react-three/drei`, a separate package not covered by this skill.
- The three.js `LOD` class API belongs to the threejs skill.
- The closing tag `<Detailed/>` in the snippet is reproduced verbatim from the official docs; it should be `</Detailed>` in real code.

## Related

- [instancing](./instancing.md)
- [nested-loading](./nested-loading.md)
