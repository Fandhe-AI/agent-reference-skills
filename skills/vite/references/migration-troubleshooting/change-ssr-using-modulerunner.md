---
source: https://vite.dev/changes/ssr-using-modulerunner
---

# SSR Using ModuleRunner API

`server.ssrLoadModule` has been replaced by importing from a Module Runner. Affected scope: Vite plugin authors.

## Signature / Usage

Import modules with the runner instead of `server.ssrLoadModule(url)`:

```ts
moduleRunner.import(url)
```

## Notes

- Future deprecation: `ModuleRunner` was first introduced in v6.0. The deprecation of `server.ssrLoadModule` is planned for a future major. To identify usage, set `future.removeSsrLoadModule` to `"warn"` in the Vite config.
- Motivation: `server.ssrLoadModule(url)` only imports modules in the `ssr` environment and runs them in the same process as the dev server. For apps with custom environments, each environment is associated with a `ModuleRunner` that may run in a separate thread or process.
- Migration: see the Environment API for Frameworks guide. `server.ssrFixStacktrace` and `server.ssrRewriteStacktrace` do not have to be called when using Module Runner APIs; stack traces are updated unless `sourcemapInterceptor` is set to `false`.
- Framework-level SSR (react-router, tanstack-start, nextjs-app) is covered by the respective skills; this page is only about Vite's own API.
- Feedback: Environment API feedback discussion (https://github.com/vitejs/vite/discussions/16358).

## Related

- [breaking-changes.md](./breaking-changes.md)
- [../environment-api/module-runner.md](../environment-api/module-runner.md)
- [../environment-api/runnable-dev-environment.md](../environment-api/runnable-dev-environment.md)
