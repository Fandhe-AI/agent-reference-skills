---
source: https://r3f.docs.pmnd.rs/api/objects#using-3rd-party-objects-declaratively
---

# Using 3rd-party objects declaratively

The `extend` function extends React Three Fiber's catalogue of JSX elements. Components added this way can then be referenced in the scene-graph using camel casing, similar to other primitives.

## Signature / Usage

```jsx
import { extend } from '@react-three/fiber'
import { OrbitControls, TransformControls } from 'three-stdlib'
extend({ OrbitControls, TransformControls })

// ...
return (
  <>
    <orbitControls />
    <transformControls />
```

## Notes

- With TypeScript, the JSX namespace must also be extended (see the v9 migration guide, `ThreeElements`).
- `OrbitControls` / `TransformControls` shown here come from `three-stdlib`; three.js addon classes are covered by the threejs skill.

## Related

- [Constructor arguments (args)](./constructor-arguments.md)
