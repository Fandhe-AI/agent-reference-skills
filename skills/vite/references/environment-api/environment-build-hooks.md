---
source: https://vite.dev/guide/api-environment-plugins#environment-in-build-hooks
---

# Environment in Build Hooks / Shared Plugins During Build

During build, plugin hooks receive the environment instance (replacing the `ssr` boolean), and all environments are built in a single process so the plugin pipeline can be shared as in dev.

## Signature / Usage

```js
function myPlugin() {
  // Share state among all environments in dev and build
  const sharedState = ...
  return {
    name: 'shared-plugin',
    transform(code, id) { ... },

    // Opt-in into a single instance for all environments
    sharedDuringBuild: true,
  }
}
```

## Notes

- `this.environment` also works in `renderChunk`, `generateBundle`, and other build-only hooks.
- Before Vite 6: during dev plugins were shared; during build plugins were isolated per environment (separate processes: `vite build` then `vite build --ssr`), forcing frameworks to share state via manifest files on disk. Vite 6 builds all environments in a single process.
- A possible future major: plugins shared during both dev and build, with per-environment filtering (`applyToEnvironment`), and a single `ResolvedConfig` instance shared during build.
- For Vite 6 compatibility, a new `ResolvedConfig` is created per environment by default because ecosystem plugins use `config.build` instead of `environment.config.build`. A project can opt in to sharing the full config and plugins pipeline by setting `builder.sharedConfigBuild` to `true`.
- That option only works for a small subset of projects at first, so a plugin author can opt a particular plugin into being shared with `sharedDuringBuild: true`.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [Per-environment State / applyToEnvironment](./per-environment-state-plugins.md)
- [Environments During Build](./environments-during-build.md)
- [Per-environment Hooks](./per-environment-hooks.md)
