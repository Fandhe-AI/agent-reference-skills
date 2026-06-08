# useAtom

Hook from `@theatre/react` that creates a Dataverse `Atom` — a reactive state container similar to `useState`, but the component does **not** re-render on atom value changes (use `useVal` to subscribe).

## Signature / Usage

```tsx
import { useAtom } from '@theatre/react'

function MyScene() {
  const atom = useAtom({ ready: false, count: 0 })

  // Read a value reactively in another component
  const isReady = useVal(atom.pointer.ready)

  // Update a specific path
  atom.setByPointer(atom.pointer.count, 42)

  return null
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T` | Initial state object for the atom |

Returns an `Atom<T>` with:

| Member | Description |
|--------|-------------|
| `pointer` | Type-safe pointer root for accessing sub-paths |
| `setByPointer(pointer, value)` | Updates a specific path in the atom |
| `get()` | Returns the current full value |

## Notes

- The component that calls `useAtom` does **not** re-render when the atom changes — use `useVal(atom.pointer.someField)` in child components to subscribe
- Useful for sharing reactive state across a component tree without prop drilling
- Imported from `@theatre/react`

## Related

- [useVal.md](./useVal.md)
- [usePrism.md](./usePrism.md)
