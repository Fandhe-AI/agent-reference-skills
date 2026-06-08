# studio.transaction

Executes a batch of property changes as a single undoable action. Rolls back automatically if an error is thrown inside the callback.

## Signature / Usage

```ts
studio.transaction(fn: (api: { set: SetFn; unset: UnsetFn }) => void): void
```

```ts
import studio from '@theatre/studio'

studio.transaction(({ set, unset }) => {
  set(obj.props.x, 10)
  set(obj.props.y, 20)
  unset(obj.props.z)
})
```

## Options / Props

### Callback API

| Name | Type | Description |
|------|------|-------------|
| `set(pointer, value)` | `(pointer: Pointer<T>, value: T) => void` | Sets the value of a prop by its pointer |
| `unset(pointer)` | `(pointer: Pointer<T>) => void` | Reverts a prop to its default value |

## Notes

- All changes inside one `transaction()` call appear as a **single undo level** in Studio
- If an error is thrown inside `fn`, all changes within that transaction are rolled back
- For incremental changes (e.g., dragging a slider) use `studio.scrub()` instead to avoid creating many undo entries

## Related

- [studio.scrub](./studio-scrub.md)
- [studio.selection](./studio-selection.md)
