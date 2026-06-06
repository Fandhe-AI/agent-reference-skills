# useSyncedMap

Declares a persistent, synced key-value map on the widget. Unlike `useSyncedState`, each key in the map is updated with **last-writer-wins per key**, so concurrent clients updating different keys are merged instead of overwritten.

## Signature / Usage

```typescript
useSyncedMap<T>(name: string): SyncedMap<T>
```

```tsx
const votes = useSyncedMap<boolean>("votes")

// Record each user's vote keyed by their session ID
<AutoLayout onClick={() => {
  votes.set(figma.activeUsers[0].sessionId, true)
}}>
  <Text>Vote ({votes.size()})</Text>
</AutoLayout>
```

## Options / Props

| `SyncedMap<T>` method | Description |
|-----------------------|-------------|
| `set(key: string, value: T)` | Set or update a key |
| `get(key: string): T \| undefined` | Read a value by key |
| `delete(key: string)` | Remove a key |
| `has(key: string): boolean` | Check key existence |
| `keys(): string[]` | All current keys |
| `values(): T[]` | All current values |
| `entries(): [string, T][]` | All key-value pairs |
| `size(): number` | Number of entries |

## Notes

- The whole map is created with a single key (`name`); individual entries within the map are then keyed by your own string keys.
- Per-key last-writer-wins: simultaneous set/delete calls on **different** keys are merged; simultaneous updates to the **same** key still result in one winner.
- Best for multiplayer scenarios like polls, counters, and presence indicators where each client owns its own key (e.g., `sessionId`).
- Values must be **JSON-serializable**.

## Related

- [useSyncedState](./useSyncedState.md)
- [widget-state-and-multiplayer](./widget-state-and-multiplayer.md)
