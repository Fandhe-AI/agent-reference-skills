---
source: https://vite.dev/changes/hotupdate-hook
---

# HMR hotUpdate Plugin Hook

Plan to deprecate `handleHotUpdate` in favor of the Environment API aware `hotUpdate` hook, which also handles `create` and `delete` watch events. Affected scope: Vite plugin authors.

## Signature / Usage

```ts
interface HmrContext {
  file: string
  timestamp: number
  modules: Array<ModuleNode>
  read: () => string | Promise<string>
  server: ViteDevServer
}

interface HotUpdateOptions {
  type: 'create' | 'update' | 'delete'
  file: string
  timestamp: number
  modules: Array<EnvironmentModuleNode>
  read: () => string | Promise<string>
  server: ViteDevServer
}
```

Migration examples:

```js
handleHotUpdate({ modules }) {
  return modules.filter(condition)
}

// Migrate to:

hotUpdate({ modules }) {
  return modules.filter(condition)
}
```

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

// Migrate to:

hotUpdate({ modules, timestamp }) {
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

```js
handleHotUpdate({ server }) {
  server.ws.send({
    type: 'custom',
    event: 'special-update',
    data: {}
  })
  return []
}

// Migrate to...

hotUpdate() {
  this.environment.hot.send({
    type: 'custom',
    event: 'special-update',
    data: {}
  })
  return []
}
```

## Notes

- Future deprecation: `hotUpdate` was first introduced in v6.0. The deprecation of `handleHotUpdate` is planned for a future major. Moving away from `handleHotUpdate` is not recommended yet. To experiment, set `future.removePluginHookHandleHotUpdate` to `"warn"` in the Vite config.
- `handleHotUpdate` is called once for all environments with mixed Client / SSR module info. `hotUpdate` is called for each environment and `modules` contains module nodes of the current environment only; each environment can define different update strategies. The current environment is available as `this.environment`.
- `hotUpdate` is also called for additional watch events, not only `'update'`; use `type` to differentiate.
- Feedback: Environment API feedback discussion (https://github.com/vitejs/vite/discussions/16358).

## Related

- [breaking-changes.md](./breaking-changes.md)
- [../environment-api/hot-update-hook.md](../environment-api/hot-update-hook.md)
- [../plugin-api/hook-handle-hot-update.md](../plugin-api/hook-handle-hot-update.md)
