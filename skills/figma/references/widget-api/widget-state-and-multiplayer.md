# Widget State & Multiplayer

Explains how to design widget state for concurrent multi-user scenarios using `useSyncedState` and `useSyncedMap`.

## Signature / Usage

```tsx
// useSyncedState — last-writer-wins on the whole value
const [vote, setVote] = useSyncedState("vote", "")

// useSyncedMap — last-writer-wins per key (safe for concurrent updates)
const votes = useSyncedMap<boolean>("votes")

// Recording a vote per session
votes.set(figma.activeUsers[0].sessionId, true)
```

## Notes

- **`useSyncedState` vs `useSyncedMap`**: Use `useSyncedState` for values that should simply override (e.g., a show/hide toggle). Use `useSyncedMap` when multiple clients may update different keys simultaneously — the map merges per-key changes instead of overwriting the whole value.
- **Multiple `useSyncedState` calls**: Each call with its own unique key merges independently at the property level. A single large state object causes later updates to overwrite earlier ones entirely.
- **Multiplayer counter pitfall**: If two users click "increment" simultaneously with `useSyncedState`, only one increment registers. Use `useSyncedMap` keyed by `sessionId` to capture both.
- All widget state is synced across all connected clients in real time.

## Related

- [useSyncedState](./useSyncedState.md)
- [useSyncedMap](./useSyncedMap.md)
- [how-widgets-run](./how-widgets-run.md)
