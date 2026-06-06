# waitForTask

Keeps the widget process alive until an async operation (e.g., a network request) completes. Used together with `useEffect` for data fetching on mount.

## Signature / Usage

```typescript
waitForTask(task: Promise<void>): void
```

```tsx
useEffect(() => {
  waitForTask(
    fetch("https://api.example.com/data")
      .then(res => res.json())
      .then(data => setData(data))
  )
})
```

## Notes

- Without `waitForTask`, an async operation in `useEffect` may be cut short when the widget finishes its synchronous render.
- The widget stays alive until the promise resolves or `figma.closePlugin()` is called.
- Only available in `useEffect` and event handler contexts, not in rendering code.

## Related

- [useEffect](./useEffect.md)
- [how-widgets-run](./how-widgets-run.md)
- [register](./register.md)
