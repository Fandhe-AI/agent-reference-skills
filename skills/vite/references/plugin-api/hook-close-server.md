---
source: https://vite.dev/guide/api-plugin#closeserver
---

# closeServer / closePreviewServer

Hooks called after the dev server (or preview server) has been torn down; typically used to dispose resources created in `configureServer` / `configurePreviewServer`.

## Signature / Usage

```ts
// closeServer
(context: { reason: 'restart' | 'close' }) => void | Promise<void>

// closePreviewServer
() => void | Promise<void>
```

```js
const myPlugin = () => {
  let resource
  return {
    name: 'close-server',
    configureServer(server) {
      resource = createResource()
    },
    async closeServer({ reason }) {
      if (reason === 'close') {
        await resource.dispose()
      }
    },
  }
}
```

```js
const myPlugin = () => {
  let resource
  return {
    name: 'close-preview-server',
    configurePreviewServer(server) {
      resource = createResource()
    },
    async closePreviewServer() {
      await resource.dispose()
    },
  }
}
```

## Options / Props

| Hook | Kind | Scope |
|------|------|-------|
| `closeServer` | `async`, `parallel` | Global |
| `closePreviewServer` | `async`, `parallel` | Global |

| `context.reason` | Meaning |
|------------------|---------|
| `'restart'` | The server is restarting (e.g. a config file change or a call to `server.restart()`). |
| `'close'` | The server is shutting down (e.g. the `q` shortcut, or a call to `server.close()`). |

## Notes

- The preview server never restarts, so `closePreviewServer` has no `reason`.

## Related

- [configureServer / configurePreviewServer](./hook-configure-server.md)
