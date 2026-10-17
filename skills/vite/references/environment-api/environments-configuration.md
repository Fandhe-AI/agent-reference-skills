---
source: https://vite.dev/guide/api-environment#environments-configuration
---

# Environments Configuration

Configure multiple environments explicitly with the `environments` config option; each inherits the top-level options unless documented otherwise.

## Signature / Usage

```js
export default {
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['lib'],
  },
  environments: {
    server: {},
    edge: {
      resolve: {
        noExternal: true,
      },
    },
  },
}
```

```ts
interface EnvironmentOptions {
  define?: Record<string, any>
  resolve?: EnvironmentResolveOptions
  optimizeDeps: DepOptimizationOptions
  consumer?: 'client' | 'server'
  dev: DevOptions
  build: BuildOptions
}

interface UserConfig extends EnvironmentOptions {
  environments: Record<string, EnvironmentOptions>
  // other options
}
```

## Notes

- Environments inherit the configured top-level options (the `server` and `edge` environments above inherit `build.sourcemap: false`).
- A small number of top-level options, like `optimizeDeps`, only apply to the `client` environment because they do not work well as a default for server environments. In the config reference these carry a "Not inherited by environments" badge.
- The `client` environment can be configured through `environments.client`, but configuring it with top-level options is recommended so the client config stays unchanged when environments are added.
- `EnvironmentOptions` exposes all per-environment options. Some apply to both `build` and `dev` (like `resolve`); `DevEnvironmentOptions` and `BuildEnvironmentOptions` hold dev- and build-specific options (like `dev.warmup` or `build.outDir`). Options like `optimizeDeps` only apply to dev but stay top-level for backward compatibility.
- During dev, `client` and a server environment named `ssr` are always present (backward compatibility with `server.ssrLoadModule(url)` and `server.moduleGraph`). During build, `client` is always present and `ssr` only when explicitly configured (`environments.ssr` or, for backward compatibility, `build.ssr`). The SSR environment does not need to be named `ssr` (for example `server`).
- The top-level `ssr` property will be deprecated once the Environment API is stable. It has the same role as `environments` for the default `ssr` environment but only allows a small set of options.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [Environment API Overview](./environment-api-overview.md)
- [Custom Environment Instances](./custom-environment-instances.md)
- [Per-environment Hooks](./per-environment-hooks.md)
