---
source: https://r3f.docs.pmnd.rs/api/typescript#typing-with-useref
---

# Typing with useRef

React's `useRef` won't automatically infer types despite pointing it to a typed ref. You can type the ref yourself by passing a type through `useRef`'s generics.

## Signature / Usage

```tsx
import { useRef, useEffect } from 'react'
import { Mesh } from 'three'

function Box(props) {
  const meshRef = useRef<Mesh>(null!)

  useEffect(() => {
    console.log(Boolean(meshRef.current))
  }, [])

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry />
      <meshBasicMaterial />
    </mesh>
  )
}
```

## Notes

- The exclamation mark is a non-null assertion that will let TS know that `ref.current` is defined when we access it in effects, useFrame et al. You do not need to check against null, the element is assumed to exist.
- `Mesh` is a three.js class; its own API belongs to the threejs skill.

## Related

- [Accessing typed three-elements](./three-elements.md)
