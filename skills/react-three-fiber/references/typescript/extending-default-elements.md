---
source: https://r3f.docs.pmnd.rs/api/typescript#extending-three-default-elements
---

# Extending three default elements

If you open your own root instead of using `<Canvas>`, you can extend the default elements with `extend`.

## Signature / Usage

```tsx
import * as THREE from 'three'
import { extend, createRoot, events } from '@react-three/fiber'

// Register the THREE namespace as native JSX elements.
extend(THREE as any)

// Create a react root
const root = createRoot(document.querySelector('canvas'))
```

## Notes

- Keep in mind that the `* as THREE` namespace contains classes, functions, numbers, strings. At the moment the docs suggest you use `any` or `@ts-ignore` unless you extract the exact classes you need (`extend({ Mesh, Group, ... })`).

## Related

- [Extend usage](./extend-types.md)
