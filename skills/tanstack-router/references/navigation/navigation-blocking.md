---
source: https://tanstack.com/router/latest/docs/framework/react/guide/navigation-blocking
---

# Navigation Blocking

`useBlocker` and `<Block>` prevent navigation (e.g. away from a dirty form) until a condition resolves, falling back to the browser's native `onbeforeunload` dialog for tab close/reload.

## Signature / Usage

```tsx
import { useBlocker } from '@tanstack/react-router'

function MyComponent() {
  const [formIsDirty, setFormIsDirty] = useState(false)

  useBlocker({
    shouldBlockFn: () => {
      if (!formIsDirty) return false
      return !confirm('Are you sure you want to leave?')
    },
  })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shouldBlockFn` | `({ current, next }) => boolean \| Promise<boolean>` | Returns/resolves `true` to block navigation; receives typed `current`/`next` location |
| `withResolver` | `boolean` | When `true`, returned `status`/`proceed`/`reset` drive custom UI instead of the return value resolving the block |
| `enableBeforeUnload` | `boolean \| (() => boolean)` | Conditionally registers the browser `beforeunload` handler |
| `Block` component props | same as above | Component form; supports render-prop children `{({ status, proceed, reset }) => ...}` |

## Notes

- Blockers run asynchronously and sequentially; if any resolves `false`, navigation is canceled and remaining blockers are skipped.
- Even if `shouldBlockFn` returns `false`, the browser `beforeunload` dialog may still fire on tab close/refresh unless controlled via `enableBeforeUnload`.
- `ignoreBlocker: true` (a `NavigateOptions` field) bypasses blockers for a specific navigation.
- With `withResolver: true`, `shouldBlockFn`'s return value does not itself resolve the block — call `proceed()`/`reset()` from custom UI instead.

## Related

- [navigation.md](./navigation.md)
- [history-types.md](./history-types.md)
