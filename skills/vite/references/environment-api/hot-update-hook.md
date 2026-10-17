---
source: https://vite.dev/guide/api-environment-plugins#the-hotupdate-hook
---

# hotUpdate Hook

Lets plugins perform custom HMR update handling for a given environment.

## Signature / Usage

- **Type:** `(this: { environment: DevEnvironment }, options: HotUpdateOptions) => Array<EnvironmentModuleNode> | void | Promise<Array<EnvironmentModuleNode> | void>`
- **Kind:** `async`, `sequential`
- **Scope:** Per-environment
- **See also:** HMR API

```ts
interface HotUpdateOptions {
  type: 'create' | 'update' | 'delete'
  file: string
  timestamp: number
  modules: Array<EnvironmentModuleNode>
  read: () => string | Promise<string>
  server: ViteDevServer
}
```

Return an empty array and perform a full reload:

```js
hotUpdate({ modules, timestamp }) {
  if (this.environment.name !== 'client')
    return

  // Invalidate modules manually
  const invalidatedModules = new Set()
  for (const mod of modules) {
    this.environment.moduleGraph.invalidateModule(
      mod,
      invalidatedModules,
      timestamp,
      true
    )
  }
  this.environment.hot.send({ type: 'full-reload' })
  return []
}
```

Return an empty array and send custom events to the client:

```js
hotUpdate() {
  if (this.environment.name !== 'client')
    return

  this.environment.hot.send({
    type: 'custom',
    event: 'special-update',
    data: {}
  })
  return []
}
```

Client code registers the handler (could be injected by the same plugin's `transform` hook):

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
| type | `'create' \| 'update' \| 'delete'` | Kind of file change. |
| file | `string` | Changed file. |
| timestamp | `number` | Change timestamp. |
| modules | `Array<EnvironmentModuleNode>` | Modules in this environment affected by the changed file. An array because a single file may map to multiple served modules (e.g. Vue SFCs). |
| read | `() => string \| Promise<string>` | Async read function returning the file content. Provided because on some systems the file change callback may fire before the editor finishes updating the file and a direct `fs.readFile` can return empty content. |
| server | `ViteDevServer` | The dev server. |

## Notes

- When a file changes, the HMR algorithm runs for each environment in series according to the order in `server.environments`, so the hook is called multiple times.
- `this.environment` is the module execution environment where the file update is currently being processed.
- The hook can filter and narrow the affected module list so HMR is more accurate, return an empty array and perform a full reload, or return an empty array and do fully custom HMR via custom events.
- The docs list "HMR `hotUpdate` Plugin Hook" among the future breaking changes (see the `handleHotUpdate` hook, which receives backward compatible mixed module nodes).
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [Separate Module Graphs](./module-graphs.md)
- [Application-Plugin Communication](./application-plugin-communication.md)
- [Per-environment Hooks](./per-environment-hooks.md)
