---
source: https://vite.dev/changes/
---

# Breaking Changes (planned / considering / past)

List of breaking changes in Vite including API deprecations, removals, and changes. Most of them can be opted into using the `future` option in the Vite config.

## Signature / Usage

The index page itself has no code; the `future` flags below are taken from the "Move to Per-environment APIs" change page (https://vite.dev/changes/per-environment-apis) and show how to opt in:

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

| Status | Change | Page |
| --- | --- | --- |
| Planned | `this.environment` in Hooks | [change-this-environment-in-hooks.md](./change-this-environment-in-hooks.md) |
| Planned | HMR `hotUpdate` Plugin Hook | [change-hotupdate-hook.md](./change-hotupdate-hook.md) |
| Planned | SSR Using `ModuleRunner` API | [change-ssr-using-modulerunner.md](./change-ssr-using-modulerunner.md) |
| Considering | Move to Per-environment APIs | [change-per-environment-apis.md](./change-per-environment-apis.md) |
| Considering | Shared Plugins During Build | [change-shared-plugins-during-build.md](./change-shared-plugins-during-build.md) |
| Past | _No past changes yet_ | — |

## Notes

- Planned: changes planned for the next major version of Vite. Deprecation or usage warnings guide you where possible, and framework, plugin authors and users are being reached out to apply them.
- Considering: often experimental APIs intended to improve current usage patterns; not all changes are listed (see the Experimental label in Vite GitHub Discussions). Switching to these APIs is not recommended yet; they are included to gather feedback.
- Past: changes that have been done or reverted, no longer relevant in the current major version. Currently none.

## Related

- [migration-v7-overview.md](./migration-v7-overview.md)
- [../config-shared/future.md](../config-shared/future.md)
