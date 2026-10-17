---
source: https://vite.dev/changes/shared-plugins-during-build
---

# Shared Plugins during Build

Aligns dev and build plugin pipelines by sharing plugins across environments during build. Affected scope: Vite plugin authors.

## Signature / Usage

Plugin state must be keyed by the current environment. Per-environment counting with a map:

```ts
function PerEnvironmentCountTransformedModulesPlugin() {
  const state = new Map<Environment, { count: number }>()
  return {
    name: 'count-transformed-modules',
    perEnvironmentStartEndDuringDev: true,
    buildStart() {
      state.set(this.environment, { count: 0 })
    },
    transform(id) {
      state.get(this.environment).count++
    },
    buildEnd() {
      console.log(this.environment.name, state.get(this.environment).count)
    },
  }
}
```

With the exported `perEnvironmentState` helper:

```ts
function PerEnvironmentCountTransformedModulesPlugin() {
  const state = perEnvironmentState<{ count: number }>(() => ({ count: 0 }))
  return {
    name: 'count-transformed-modules',
    perEnvironmentStartEndDuringDev: true,
    buildStart() {
      state(this).count = 0
    },
    transform(id) {
      state(this).count++
    },
    buildEnd() {
      console.log(this.environment.name, state(this).count)
    },
  }
}
```

## Notes

- Future default change: `builder.sharedConfigBuild` was first introduced in v6.0. Set it to true to check how plugins work with a shared config. Feedback is sought about changing the default in a future major once the plugin ecosystem is ready.
- The un-keyed form (a single `transformedModules` counter) would count modules across all environments.
- Listed under "Considering" on the breaking changes index: not recommended yet.
- Feedback: Environment API feedback discussion (https://github.com/vitejs/vite/discussions/16358).

## Related

- [breaking-changes.md](./breaking-changes.md)
- [../environment-api/environment-build-hooks.md](../environment-api/environment-build-hooks.md)
- [../environment-api/per-environment-state-plugins.md](../environment-api/per-environment-state-plugins.md)
