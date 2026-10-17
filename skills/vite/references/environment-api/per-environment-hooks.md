---
source: https://vite.dev/guide/api-environment-plugins#per-environment-hooks-and-global-hooks
---

# Per-environment Hooks / configEnvironment

Plugin hooks are either global (called once for the whole server) or per-environment (called once per environment with `this.environment`). Plugins register environments in `config` and tune each one in `configEnvironment`.

## Signature / Usage

```ts
  transform(code, id) {
    console.log(this.environment.config.resolve.conditions)
  }
```

Registering a new environment in the `config` hook:

```ts
  config(config: UserConfig) {
    return {
      environments: {
        rsc: {
          resolve: {
            conditions: ['react-server', ...defaultServerConditions],
          },
        },
      },
    }
  }
```

`configEnvironment` hook:

- **Type:** `(name: string, config: EnvironmentOptions, env: { mode: string, command: 'build' | 'serve', isSsrBuild?: boolean, isPreview?: boolean, isSsrTargetWebworker?: boolean }) => EnvironmentOptions | null | void`
- **Kind:** `async`, `sequential`
- **Scope:** Per-environment

```ts
  configEnvironment(name: string, options: EnvironmentOptions) {
    // add "workerd" condition to the rsc environment
    if (name === 'rsc') {
      return {
        resolve: {
          conditions: ['workerd'],
        },
      }
    }
  }
```

## Notes

- Global hooks are independent of configured environments and handle app-wide concerns (config resolution, dev and preview server setup); `this.environment` is not relevant to them.
- Per-environment hooks expose the current environment through `this.environment`. All Rolldown hooks are per-environment, as are other Vite-specific hooks that handle modules. `buildStart` and `buildEnd` are only called for the client environment without the `perEnvironmentStartEndDuringDev: true` flag.
- Before Vite 6 a `ssr` boolean identified the environment (hooks received `ssr` in the last options parameter; APIs like `server.moduleGraph.getModuleByUrl(url, { ssr })`). APIs that took `ssr` are now scoped to the environment (for example `environment.moduleGraph.getModuleByUrl(url)`).
- An empty object is enough to register an environment, using default values from the root level environment config.
- While `config` runs, the complete list of environments is not yet known. Set defaults in `config`; use `configEnvironment` to configure each environment with its partially resolved config including final defaults.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [hotUpdate Hook](./hot-update-hook.md)
- [Per-environment State / applyToEnvironment](./per-environment-state-plugins.md)
- [Environments Configuration](./environments-configuration.md)
- [Environment in Build Hooks](./environment-build-hooks.md)
