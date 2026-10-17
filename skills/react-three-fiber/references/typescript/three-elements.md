---
source: https://r3f.docs.pmnd.rs/api/typescript#accessing-typed-three-elements
---

# Accessing typed three-elements (ThreeElements)

Whenever you want to spread props or type components that rely on three elements, you can use the `ThreeElements` interface to extract the mesh, group, or any other three element, including custom elements.

## Signature / Usage

```tsx
import { ThreeElements } from '@react-three/fiber'

type FooProps = ThreeElements['mesh'] & { bar: boolean }

function Foo({ bar, ...props}: FooProps) {
  useEffect(() => {
    console.log(bar)
  }, [bar])
  return <mesh {...props} />
}
```

## Notes

- The element classes wrapped by `ThreeElements` are three.js classes; their APIs belong to the threejs skill.

## Related

- [Extend usage](./extend-types.md)
- [Exported types](./exported-types.md)
