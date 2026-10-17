---
source: https://vite.dev/guide/api-environment
---

# Environment API Overview

Vite 6 formalizes Environments: instead of the two implicit ones (`client`, optionally `ssr`), an app can define as many environments as it needs to map how it runs in production.

## Signature / Usage

```js
export default defineConfig({
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['lib'],
  },
})
```

For a simple SPA/MPA no environment-specific API is exposed in the config; Vite applies these options to an internal `client` environment and Vite 5 config and behavior work unchanged.

## Notes

- Release Candidate: the Environment API is generally in the release candidate phase. API stability is maintained between major releases, but some specific APIs are still considered experimental. Stabilization (with potential breaking changes) is planned for a future major release.
- A typical SSR app has two environments: `client` (runs the app in the browser) and `ssr` (runs the app in node or another server runtime and renders pages before sending them to the browser).
- In dev, a single Vite dev server can run code in multiple environments concurrently. On top of the shared HTTP server, middlewares, resolved config, and plugins pipeline, the dev server has a set of independent dev environments, each connected to a dev runtime where the code is executed. In the client the browser imports and executes the code; in other environments a module runner fetches and evaluates the transformed code.
- Target users: end users (this page), plugin authors (Environment API for Plugins), framework authors (Environment API for Frameworks), runtime providers (Environment API for Runtimes).
- Distinct from the vitest `environment` option (jsdom / node test environments); test configuration belongs to the vitest skill. Also unrelated to anthropic-managed-agents "environments".

## Related

- [Environments Configuration](./environments-configuration.md)
- [Custom Environment Instances](./custom-environment-instances.md)
- [DevEnvironment class](./dev-environment-class.md)
- [Per-environment Hooks](./per-environment-hooks.md)
- [RunnableDevEnvironment](./runnable-dev-environment.md)
- [Environment Factories](./environment-factories.md)
