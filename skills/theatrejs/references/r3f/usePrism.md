# usePrism

Hook from `@theatre/react` that creates a derived reactive value (prism) from a function and subscribes the component to it, similar to `useMemo` but reactive to Dataverse state.

## Signature / Usage

```tsx
import { usePrism } from '@theatre/react'
import { val } from '@theatre/dataverse'

const scaledIntensity = usePrism(() => {
  return val(lightObj.props.intensity) * 2
}, [lightObj])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fn` | `() => T` | Function executed within a prism context; may call `val()` on pointers |
| `deps` | `unknown[]` | Dependency array (same semantics as `useMemo`) |

Returns `T` — the current computed value.

## Notes

- `fn` runs inside a prism context, so calls to `val(pointer)` inside it are automatically tracked
- Re-renders when any tracked value (or a listed dependency) changes
- Requires a `deps` array; missing deps cause stale closures just like `useMemo`
- Imported from `@theatre/react`

## Related

- [useVal.md](./useVal.md)
- [useAtom.md](./useAtom.md)
