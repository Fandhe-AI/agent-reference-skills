# @kubb/core

Kubb のコアエンジン（プラグインドライバー・ファイルマネージャー・ビルド制御層）。`packages/core/README.md` と docs 5.x reference/kit/engine に準拠。

## Usage

`@kubb/core` provides the plugin driver, file manager, `defineConfig`, `defineExtension`, `defineMiddleware`, and the build orchestration layer used by every Kubb plugin. It is an internal library: install the `kubb` meta-package instead and author plugins, generators, resolvers, parsers, and adapters through its `kubb/kit` subpath, which re-exports the authoring surface of this package.

```bash
npm install @kubb/core
```

`createKubb` can be imported from `@kubb/core` for a bare engine without package defaults. `createKubb` from `kubb` and `defineConfig` from `kubb/config` apply the package defaults (OpenAPI adapter, parsers, barrel plugin).

```typescript
import { createKubb } from '@kubb/core'
```

## Cancellation

`createKubb` accepts an `AbortSignal`. The engine checks it before setup, while it parses input and normalizes plugins, and before each generated-file write. Plugin authors receive the same signal in their generator context when they need to stop their own asynchronous work.

## Notes

- `defineConfig` is imported from `kubb/config` in v5, not from `@kubb/core`
- The v4 `build({ config })` function and its `{ error, files, driver }` result are not documented in the 5.20.0 README. Use `createKubb(...).safeBuild()` which returns `{ files, storage, driver, diagnostics, input }` (see samples/programmatic-build.md and kit-api.md)
- The previous page listed the storage helpers (`defineStorage`, `fsStorage`, `memoryStorage`) and `URLPath` as `@kubb/core` exports (v4.36.0+ / v4.36.1+). The 5.20.0 core README does not list them; in v5 storage helpers are imported from `kubb/kit` (migration guide: "Move to top-level `storage` and import helpers from `kubb/kit`")
- `createKubb` takes an optional second argument with `hooks` (a shared `Hookable<KubbHooks>`), `signal` (an `AbortSignal`), and `fileRefs` (the only folders a `$ref` in the input may read local files from). To build every config of a `defineConfig([...])` array, use the static `Kubb.generate(configs)` from `@kubb/core`, which `kubb generate` runs; it yields one result per config and a failed config does not stop the others (docs 5.x reference/kit/engine)
- Source: https://kubb.dev/docs/5.x/reference/kit/engine and packages/core/README.md of kubb@5.20.0 (retrieved 2026-11-14)
- Migration (5.11 → 5.20): `BuildOutput` and `GenerateResult` gained `input` (the parsed `InputNode`, or `null`), and `kubb.storage` is now the configured storage backend available right after `createKubb` (docs diff 5.11 → 5.20)

## Related

- [overview.md](./overview.md)
- [../reference/kit-api.md](../reference/kit-api.md)
- [../getting-started/quick-start.md](../getting-started/quick-start.md)
