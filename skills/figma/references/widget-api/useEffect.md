# useEffect

Runs a side-effect callback every time widget state changes. The primary hook for data fetching, Plugin API access, and event listener setup.

## Signature / Usage

```typescript
useEffect(effect: () => (() => void) | void): void
```

```tsx
useEffect(() => {
  // Setup
  const handler = (msg: any) => setData(msg)
  figma.ui.on("message", handler)

  // Cleanup — runs before next effect
  return () => {
    figma.ui.off("message", handler)
  }
})

// Data fetching on mount
useEffect(() => {
  waitForTask(
    fetch("https://api.example.com/data")
      .then(r => r.json())
      .then(d => setItems(d))
  )
})
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `effect` | `() => (() => void) \| void` | Side-effect function; optionally returns a cleanup function |

## Notes

- Called **every time** state changes (no dependency array like React's `useEffect`).
- Runs after the first render and after every subsequent re-render.
- If `effect` returns a function, that cleanup runs before the next effect execution.
- When registering `figma.on(...)` event listeners, **always** return a cleanup that calls `figma.off(...)` — otherwise the handler fires multiple times per event.
- Combine with `waitForTask` to perform async work (e.g., network requests) without the widget terminating prematurely.
- Plugin API calls (e.g., `figma.currentPage.selection`) are allowed inside `useEffect` but not in rendering code.

## Related

- [waitForTask](./waitForTask.md)
- [useSyncedState](./useSyncedState.md)
- [how-widgets-run](./how-widgets-run.md)
