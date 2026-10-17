---
source: https://vite.dev/changes/per-environment-apis
---

# Move to Per-environment APIs

Multiple `ViteDevServer` APIs related to the module graph and module transforms have moved to `DevEnvironment` instances. Affected scope: Vite plugin authors.

## Signature / Usage

```ts
future: {
  removeServerModuleGraph: 'warn',
  removeServerReloadModule: 'warn',
  removeServerPluginContainer: 'warn',
  removeServerHot: 'warn',
  removeServerTransformRequest: 'warn',
  removeServerWarmupRequest: 'warn',
}
```

## Options / Props

| Old (server) | New (environment) |
| --- | --- |
| `server.moduleGraph` | `environment.moduleGraph` |
| `server.reloadModule(module)` | `environment.reloadModule(module)` |
| `server.pluginContainer` | `environment.pluginContainer` |
| `server.transformRequest(url, ssr)` | `environment.transformRequest(url)` |
| `server.warmupRequest(url, ssr)` | `environment.warmupRequest(url)` |
| `server.hot` | `server.environments.client.hot` |

## Notes

- Future deprecation: the `Environment` instance was first introduced at v6.0. The deprecation of `server.moduleGraph` and other methods now in environments is planned for a future major. Moving away from server methods is not recommended yet; set the `future` flags above to identify usage.
- Motivation: in Vite v5 and before, a dev server always had two environments (`client` and `ssr`), `server.moduleGraph` mixed modules from both (connected through `clientImportedModules` / `ssrImportedModules`), and a transformed module was represented by an `id` and a `ssr` boolean. In v6 any number of custom environments can exist, so these methods moved to the environment instance, allowing them to be called without a Vite dev server.
- Listed under "Considering" on the breaking changes index: experimental, not recommended yet.
- The upstream page (v8.3.4) lists the replacement as `server.client.environment.hot`; the actual property path is `server.environments.client.hot` (as used in the SSR guide).
- Feedback: Environment API feedback discussion (https://github.com/vitejs/vite/discussions/16358).

## Related

- [breaking-changes.md](./breaking-changes.md)
- [../environment-api/module-graphs.md](../environment-api/module-graphs.md)
- [../environment-api/dev-environment-class.md](../environment-api/dev-environment-class.md)
