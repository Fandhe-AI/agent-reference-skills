# useVal

Hook from `@theatre/react` that subscribes a React component to a Theatre.js pointer or Dataverse prism, returning its current value and re-rendering when the value changes.

## Signature / Usage

```tsx
import { useVal } from '@theatre/react'

// Subscribe to a Theatre.js sheet object prop
const brightness = useVal(lightObj.props.intensity)

// Subscribe to an atom pointer path
const isReady = useVal(atom.pointer.ready)

// Subscribe to a prism
const derived = useVal(somePrism)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pointerOrPrism` | `Pointer<T> \| Prism<T>` | A Dataverse pointer, Dataverse prism, or Theatre.js object prop pointer |

Returns `T` — the current value at the pointer/prism.

## Notes

- Can only be called inside a React component's render function (React hook rules apply)
- Component re-renders whenever the pointed-to value changes
- Works with Theatre.js `ISheetObject` prop pointers (`obj.props.someProp`) and Dataverse atoms/prisms
- Imported from `@theatre/react`, not `@theatre/r3f`

## Related

- [usePrism.md](./usePrism.md)
- [useCurrentSheet.md](./useCurrentSheet.md)
