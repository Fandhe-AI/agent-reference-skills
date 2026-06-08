# onChange

Subscribes to value changes on a pointer. The callback fires whenever the pointed-to value changes. Returns an unsubscribe function.

## Signature / Usage

```ts
import { onChange } from '@theatre/core'

onChange(
  pointer: Pointer<T>,
  callback: (value: T) => void,
  rafDriver?: RafDriver
): () => void
```

```ts
// Subscribe to a single prop
const unsub = onChange(obj.props.position.x, (x) => {
  mesh.position.x = x
})

// Subscribe to sequence playhead position
onChange(sheet.sequence.pointer.position, (pos) => {
  console.log('playhead at', pos)
})

// Stop listening
unsub()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `pointer` | `Pointer<T>` | The pointer to observe |
| `callback` | `(value: T) => void` | Called with the new value on each change |
| `rafDriver` | `RafDriver` | Optional custom RAF driver for scheduling callbacks |

## Notes

- The returned function must be called to avoid memory leaks (analogous to `addEventListener`/`removeEventListener`)
- `onChange` fires on every change, including programmatic writes and Studio edits
- For subscribing to all props of an object at once, prefer `object.onValuesChange(callback)` over multiple `onChange` calls
- `rafDriver` allows batching updates to a custom animation loop instead of the default `requestAnimationFrame`

## Related

- [val](./val.md)
- [Object](./object.md)
- [dataverse](./dataverse.md)
