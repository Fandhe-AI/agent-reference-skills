---
source: https://r3f.docs.pmnd.rs/tutorials/basic-animations
---

# Basic Animations

Mutate a mesh through a ref inside `useFrame` instead of going through React state.

```jsx
import { useFrame } from '@react-three/fiber'

function MyAnimatedBox() {
  useFrame(() => {
    console.log("Hey, I'm executing every frame!")
  })
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color="royalblue" />
    </mesh>
  )
}
```

```jsx
useFrame(({ clock }) => {
  const a = clock.elapsedTime
  console.log(a) // the value will be 0 at scene initialization and grow each frame
})
```

```jsx
import React from 'react'

function MyAnimatedBox() {
  const myMesh = React.useRef()
  return (
    <mesh ref={myMesh}>
      <boxGeometry />
      <meshBasicMaterial color="royalblue" />
    </mesh>
  )
}
```

```jsx
useFrame(({ clock }) => {
  myMesh.current.rotation.x = clock.elapsedTime
})
```

## Notes

- Fiber hooks can only be called inside a `<Canvas />` parent.
- The `useFrame` callback receives the state of the Fiber scene; `clock` is a three.js Clock, and `clock.elapsedTime` is the total elapsed time.
- Continuous updates should mutate the three.js object directly via `ref`, not via `setState`.
- The tutorial's final component combines the `useRef` and `useFrame` snippets above (the `useFrame` call goes inside `MyAnimatedBox`).
