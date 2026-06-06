# useSyncedState

Declares a persistent, synced state value on the widget. Analogous to React's `useState` but requires an explicit key and syncs across all clients.

## Signature / Usage

```typescript
useSyncedState<T>(
  name: string,
  defaultValue: T | (() => T)
): [T, (newValue: T | ((currValue: T) => T)) => void]
```

```tsx
const [count, setCount] = useSyncedState("count", 0)

// Functional update
setCount(prev => prev + 1)

// Lazy initialization (runs only when no stored value exists)
const [users, setUsers] = useSyncedState("users", () => figma.activeUsers)
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Unique storage key within the widget |
| `defaultValue` | `T \| (() => T)` | Initial value or a lazy initializer function |
| **Returns** `[value, setter]` | — | Current value and an update function |

## Notes

- `name` must be **unique** among all `useSyncedState` calls in the same widget.
- The stored value must be **JSON-serializable**.
- State updates cannot occur during rendering — only in event handlers or `useEffect`.
- Uses **last-writer-wins** semantics: two simultaneous updates result in only one being stored. For concurrent multi-user updates (e.g., vote counting), use `useSyncedMap` instead.
- Lazy initializer (`() => T`) is useful for expensive computations or Plugin API calls that should run only once.

## Related

- [useSyncedMap](./useSyncedMap.md)
- [widget-state-and-multiplayer](./widget-state-and-multiplayer.md)
- [useEffect](./useEffect.md)
