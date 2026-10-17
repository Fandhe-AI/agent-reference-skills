---
source: https://vite.dev/changes/this-environment-in-hooks
---

# this.environment in Hooks

`this.environment` in the plugin context replaces the `options.ssr` argument of `resolveId`, `load` and `transform`. Affected scope: Vite plugin authors.

## Signature / Usage

```ts
import { Plugin } from 'vite'

export function myPlugin(): Plugin {
  return {
    name: 'my-plugin',
    resolveId(id, importer, options) {
      const isSSR = options.ssr // [!code --]
      const isSSR = this.environment.config.consumer === 'server' // [!code ++]

      if (isSSR) {
        // SSR specific logic
      } else {
        // Client specific logic
      }
    },
  }
}
```

## Notes

- Before Vite 6 only `client` and `ssr` environments existed, distinguished by `options.ssr`. In Vite 6 an application can define any number of named environments.
- Future deprecation: `this.environment` was introduced in v6.0. The deprecation of `options.ssr` is planned for a future major. To identify usage, set `future.removePluginHookSsrArgument` to `"warn"` in the Vite config.
- Motivation: `this.environment` gives the current environment name plus access to `environment.config`, `environment.moduleGraph` and `environment.transformRequest()`, avoiding dependence on the whole dev server (typically cached via `configureServer`).
- For a robust long-term implementation, handle multiple environments using fine-grained environment options instead of relying on the environment name.
- Feedback: Environment API feedback discussion (https://github.com/vitejs/vite/discussions/16358).

## Related

- [breaking-changes.md](./breaking-changes.md)
- [../environment-api/per-environment-hooks.md](../environment-api/per-environment-hooks.md)
