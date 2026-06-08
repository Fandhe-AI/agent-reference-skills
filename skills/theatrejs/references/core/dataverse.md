# @theatre/dataverse

The reactive dataflow library Theatre.js is built on. Inspired by functional reactive programming, optimised for interactivity and animation.

## Signature / Usage

```ts
import { Atom, prism, val, onChange } from '@theatre/dataverse'

// Create a reactive atom
const atom = new Atom({ intensity: 0.5 })

// Derive a computed value
const doubled = prism(() => val(atom.pointer.intensity) * 2)

// Subscribe to changes
onChange(atom.pointer.intensity, (v) => {
  console.log('intensity changed to', v)
})

// Update state
atom.setByPointer(atom.pointer.intensity, 0.8)
```

## API Overview

### `Atom`

Mutable state container. Access properties via `atom.pointer.<prop>`.

| Member | Description |
| --- | --- |
| `new Atom(initialState)` | Creates an atom with initial state |
| `atom.pointer` | Root pointer for type-safe property access |
| `atom.setByPointer(pointer, value)` | Writes a value at the given pointer |
| `atom.get()` | Returns current full state snapshot |

### `prism(fn)`

Creates a derived, reactive computation. Re-evaluates when its dependencies change.

| Member | Description |
| --- | --- |
| `prism(fn)` | Creates a `Prism<T>` from a function |
| `prism.getValue()` | Reads the current derived value |
| `prism.source(fn, cleanup)` | Reacts to external (non-reactive) sources |
| `prism.memo(key, fn, deps)` | Memoizes a computation inside a prism |
| `prism.effect(key, fn)` | Runs a side-effect when deps change |
| `prism.ref(key, init)` | Persistent ref scoped to the prism |

### `val(pointer)` / `onChange(pointer, callback)`

Same semantics as the `@theatre/core` re-exports. See [val](./val.md) and [onChange](./on-change.md).

### `Ticker`

Schedules batched computations outside React's render cycle. Used by Theatre.js internally to synchronise animation updates.

## Notes

- `@theatre/dataverse` is a lower-level primitive; most Theatre.js users interact with it only through `val()` and `onChange()` re-exported from `@theatre/core`
- Full API documentation is maintained on the [GitHub repository](https://github.com/theatre-js/theatre/tree/main/packages/dataverse)
- Pointers are type-safe property paths; they are stable (referentially equal) across renders

## Related

- [val](./val.md)
- [onChange](./on-change.md)
- [Object](./object.md)
