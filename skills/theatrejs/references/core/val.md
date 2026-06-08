# val

Reads the current value of a pointer non-reactively (a one-time read).

## Signature / Usage

```ts
import { val } from '@theatre/core'

val(pointer: Pointer<T>): T
```

```ts
// Read a single prop
const x = val(obj.props.position.x)

// Read the entire object's props
const allValues = val(obj.props)

// Read sequence state
const pos = val(sheet.sequence.pointer.position)
```

## Notes

- `val()` is a snapshot read; it does not subscribe to future changes. Use `onChange()` or `object.onValuesChange()` for reactive updates
- Pointers are obtained from `obj.props`, `sheet.sequence.pointer`, or Dataverse `Atom` instances
- Calling `val()` outside a reactive context (e.g., a `prism`) simply reads the latest value once

## Related

- [onChange](./on-change.md)
- [Object](./object.md)
- [Sequence](./sequence.md)
- [dataverse](./dataverse.md)
