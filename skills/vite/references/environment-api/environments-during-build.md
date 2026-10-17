---
source: https://vite.dev/guide/api-environment-frameworks#environments-during-build
---

# Environments During Build (buildApp / createBuilder)

When the `builder` option is set, `vite build` builds the entire app: a `ViteBuilder` (the build-time equivalent of `ViteDevServer`) builds every configured environment, in series by default.

## Signature / Usage

`builder.buildApp` config option, e.g. building environments in parallel:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  builder: {
    buildApp: async (builder) => {
      const environments = Object.values(builder.environments)
      await Promise.all(
        environments.map((environment) => builder.build(environment)),
      )
    },
  },
})
```

`buildApp` plugin hook:

- **Type:** `(this: MinimalPluginContextWithoutEnvironment, builder: ViteBuilder) => Promise<void>`
- **Kind:** `async`, `sequential`
- **Scope:** Global

Programmatic build:

```js
import { createBuilder } from 'vite'

const builder = await createBuilder()
await builder.buildApp()
```

## Notes

- In the CLI, `vite build` and `vite build --ssr` still build only the client and only the ssr environments, for backward compatibility. Setting `builder` (even to `{}`, which is what `vite build --app` does) opts in to building the entire app; this will become the default in a future major.
- By default, environments are built in series, following the order of the `environments` record.
- `buildApp` hooks run in a defined order: hooks with order `'pre'` or `null` first, then the configured `builder.buildApp`, then hooks with order `'post'`. `environment.isBuilt` tells whether an environment has already been built, so a plugin can avoid building it twice.
- `createBuilder` is the build-time equivalent of `createServer`: it resolves the config and returns a `ViteBuilder`; `builder.buildApp()` builds every configured environment (programmatic equivalent of `vite build --app`), and `builder.build(environment)` builds one.
- `createBuilder` supersedes the standalone `build` function for environment-aware builds; `build` remains the simple entry point for legacy client-only and ssr-only builds but cannot build arbitrary environments.
- Framework-level build orchestration is a different layer: see the react-router, tanstack-start, tanstack-router, nextjs-app skills for their own build pipelines.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [Environment in Build Hooks / Shared Plugins During Build](./environment-build-hooks.md)
- [Environment Agnostic Code](./environment-agnostic-code.md)
- [Environments Configuration](./environments-configuration.md)
