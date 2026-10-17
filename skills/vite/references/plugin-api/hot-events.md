---
source: https://vite.dev/guide/api-hmr#hot-on-event-cb
---

# hot.on / hot.off / hot.send

Listen to HMR events (`on`), remove listeners (`off`), and send custom events back to Vite's dev server (`send`).

## Signature / Usage

```ts
on<T extends CustomEventName>(
  event: T,
  cb: (payload: InferCustomEventPayload<T>) => void,
): void
off<T extends CustomEventName>(
  event: T,
  cb: (payload: InferCustomEventPayload<T>) => void,
): void
send<T extends CustomEventName>(
  event: T,
  data?: InferCustomEventPayload<T>,
): void
```

```js
if (import.meta.hot) {
  import.meta.hot.on('special-update', (data) => {
    // perform custom update
  })
}
```

## Options / Props

Events dispatched by Vite automatically:

| Event | When |
|-------|------|
| `'vite:beforeUpdate'` | An update is about to be applied (e.g. a module will be replaced). |
| `'vite:afterUpdate'` | An update has just been applied (e.g. a module has been replaced). |
| `'vite:beforeFullReload'` | A full reload is about to occur. |
| `'vite:beforePrune'` | Modules no longer needed are about to be pruned. |
| `'vite:invalidate'` | A module is invalidated with `import.meta.hot.invalidate()`. |
| `'vite:error'` | An error occurs (e.g. syntax error). |
| `'vite:ws:disconnect'` | The WebSocket connection is lost. |
| `'vite:ws:connect'` | The WebSocket connection is (re-)established. |

## Notes

- Custom HMR events can also be sent from plugins; see `handleHotUpdate`.
- If `hot.send` is called before connected, the data is buffered and sent once the connection is established.
- Prefix custom event names to avoid collisions; typing custom events is covered in Client-server Communication.

## Related

- [Client-server Communication / Custom Events](./client-server-communication.md)
- [handleHotUpdate](./hook-handle-hot-update.md)
