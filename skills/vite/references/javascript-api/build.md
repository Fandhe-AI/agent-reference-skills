---
source: https://vite.dev/guide/api-javascript#build
---

# build

Runs a production build programmatically.

## Signature / Usage

```ts
async function build(
  inlineConfig?: InlineConfig,
): Promise<RolldownOutput | RolldownOutput[] | RolldownWatcher>
```

```ts
import path from 'node:path'
import { build } from 'vite'

await build({
  root: path.resolve(import.meta.dirname, './project'),
  base: '/foo/',
  build: {
    rolldownOptions: {
      // ...
    },
  },
})
```

Handling the error thrown by `build()`:

```js
try {
  await build()
} catch (e) {
  if (e.errors) {
    for (const error of e.errors) {
      console.log(error.code) // error code
    }
  }
}
```

## Notes

- Migration (v7 → v8): `build()` now throws a `BundleError` instead of the raw error thrown in the plugin. `BundleError` is typed as `Error & { errors?: RolldownError[] }` and wraps individual errors in an `errors` array. This only affects JS API users.
- When using `build` and `createServer` in the same Node.js process, both rely on `process.env.NODE_ENV` / `mode`; set both to `development` or run them in separate child processes.

## Related

- [createServer](./create-server.md)
- [build.rolldownOptions](../config-build/build-rolldown-options.md)
- [Migration: build API changes](../migration-troubleshooting/migration-build-api-changes.md)
