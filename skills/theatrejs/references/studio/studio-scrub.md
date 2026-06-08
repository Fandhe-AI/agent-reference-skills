# studio.scrub

Creates a scrub interface that accumulates multiple property captures into a single undoable action. Useful for continuous interactions like dragging.

## Signature / Usage

```ts
studio.scrub(): IScrub
```

```ts
import studio from '@theatre/studio'

const scrub = studio.scrub()

// called repeatedly during a drag
scrub.capture(({ set }) => {
  set(obj.props.x, currentX)
})

// finalise as one undo entry
scrub.commit()
// or discard all changes
// scrub.discard()
// or revert to the state before the first capture
// scrub.reset()
```

## Options / Props

### IScrub methods

| Name | Type | Description |
|------|------|-------------|
| `capture(fn)` | `(fn: (api: { set; unset }) => void) => void` | Records a set of changes; replaces any previous capture in this scrub |
| `commit()` | `() => void` | Finalizes all captures as a single undo level |
| `reset()` | `() => void` | Clears all captured operations, reverting to original state |
| `discard()` | `() => void` | Destroys the scrub; captured changes are abandoned |

## Notes

- Multiple `capture()` calls on the same scrub do **not** create multiple undo entries — only `commit()` creates one
- `reset()` reverts values to what they were before the first `capture()` in this scrub
- After `commit()` or `discard()`, the scrub object should not be reused

## Related

- [studio.transaction](./studio-transaction.md)
