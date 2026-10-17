---
source: https://vite.dev/guide/api-plugin#handlehotupdate
---

# handleHotUpdate

Performs custom HMR update handling on the server side.

## Signature / Usage

```ts
(ctx: HmrContext) => Array<ModuleNode> | void | Promise<Array<ModuleNode> | void>

interface HmrContext {
  file: string
  timestamp: number
  modules: Array<ModuleNode>
  read: () => string | Promise<string>
  server: ViteDevServer
}
```

Full reload with an empty array:

```js
handleHotUpdate({ server, modules, timestamp }) {
  // Invalidate modules manually
  const invalidatedModules = new Set()
  for (const mod of modules) {
    server.moduleGraph.invalidateModule(
      mod,
      invalidatedModules,
      timestamp,
      true
    )
  }
  server.ws.send({ type: 'full-reload' })
  return []
}
```

Custom HMR handling by sending custom events:

```js
handleHotUpdate({ server }) {
  server.ws.send({
    type: 'custom',
    event: 'special-update',
    data: {}
  })
  return []
}
```

Client handler (could be injected by the same plugin's `transform` hook):

```js
if (import.meta.hot) {
  import.meta.hot.on('special-update', (data) => {
    // perform custom update
  })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| file | `string` | Changed file. |
| timestamp | `number` | Update timestamp. |
| modules | `Array<ModuleNode>` | Modules affected by the changed file; an array because one file may map to multiple served modules (e.g. Vue SFCs). |
| read | `() => string \| Promise<string>` | Async read function returning the file content; normalizes cases where the change callback fires before the editor finishes writing and `fs.readFile` returns empty content. |
| server | `ViteDevServer` | Dev server instance. |

## Notes

- Kind: `async`, `sequential`. Scope: Per-environment. See also: HMR API.
- The hook can filter and narrow the affected module list for more accurate HMR, return an empty array and do a full reload, or return an empty array and do fully custom HMR handling via custom events.

## Related

- [HMR API (import.meta.hot)](./hmr-api-overview.md)
- [Client-server Communication](./client-server-communication.md)
