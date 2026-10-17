---
source: https://vite.dev/guide/api-environment-runtimes#modulerunneroptions
---

# ModuleRunnerOptions

Options passed as the first argument to `new ModuleRunner(...)`.

## Signature / Usage

```ts
interface ModuleRunnerOptions {
  /**
   * A set of methods to communicate with the server.
   */
  transport: ModuleRunnerTransport
  /**
   * Configure how source maps are resolved.
   * Prefers `node` if `process.setSourceMapsEnabled` is available.
   * Otherwise it will use `prepareStackTrace` by default which overrides
   * `Error.prepareStackTrace` method.
   * You can provide an object to configure how file contents and
   * source maps are resolved for files that were not processed by Vite.
   */
  sourcemapInterceptor?:
    | false
    | 'node'
    | 'prepareStackTrace'
    | InterceptorOptions
  /**
   * Disable HMR or configure HMR options.
   *
   * @default true
   */
  hmr?: boolean | ModuleRunnerHmr
  /**
   * Custom module cache. If not provided, it creates a separate module
   * cache for each module runner instance.
   */
  evaluatedModules?: EvaluatedModules
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| transport | `ModuleRunnerTransport` | required | Methods to communicate with the server. |
| sourcemapInterceptor | `false \| 'node' \| 'prepareStackTrace' \| InterceptorOptions` | — | How source maps are resolved. Prefers `node` if `process.setSourceMapsEnabled` is available, otherwise `prepareStackTrace` (overrides `Error.prepareStackTrace`). An object configures how file contents and source maps are resolved for files not processed by Vite. |
| hmr | `boolean \| ModuleRunnerHmr` | `true` | Disable HMR or configure HMR options. |
| evaluatedModules | `EvaluatedModules` | — | Custom module cache; if not provided, a separate cache is created for each runner instance. |

## Notes

- All types are imported from `vite/module-runner`.
- `hmr` requires `transport.connect`; set `hmr: false` for invoke-only (for example HTTP) transports.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [ModuleRunner](./module-runner.md)
- [ModuleRunnerTransport](./module-runner-transport.md)
- [ModuleEvaluator](./module-evaluator.md)
