# @kubb/core

Kubb のコアエンジン（プラグインドライバー・ファイルマネージャー・ビルド制御層）。Kubb 5.11.0 の `packages/core/README.md` と docs 5.x reference/kit/engine に準拠。

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
- The v4 `build({ config })` function and its `{ error, files, driver }` result are not documented in the 5.11.0 README. Use `createKubb(...).safeBuild()` which returns `{ files, storage, driver, diagnostics }` (see samples/programmatic-build.md and kit-api.md)
- The previous page listed the storage helpers (`defineStorage`, `fsStorage`, `memoryStorage`) and `URLPath` as `@kubb/core` exports (v4.36.0+ / v4.36.1+). The 5.11.0 core README does not list them; in v5 storage helpers are imported from `kubb/kit` (migration guide: "Move to top-level `storage` and import helpers from `kubb/kit`")

## Related

- [overview.md](./overview.md)
- [../reference/kit-api.md](../reference/kit-api.md)
- [../getting-started/quick-start.md](../getting-started/quick-start.md)
