---
source: https://fastify.dev/docs/latest/Reference/Warnings/
---

# Warnings and Deprecations

Fastify uses the Node.js warning event API to notify of deprecated features and coding mistakes. Warnings use the `FSTWRN` prefix, deprecations use `FSTDEP`.

## Signature / Usage

```sh
node --trace-warnings --trace-deprecation server.js
```

## Options / Props

Warning codes:

| Code | Description | How to solve |
|------|-------------|---------------|
| FSTWRN001 | The specified schema for a route is missing. This may indicate the schema is not well specified. | Check the schema for the route. |
| FSTWRN003 | The `%s` plugin mixes async and callback styles, which may lead to unhandled rejections. | Do not mix async and callback style. |
| FSTWRN004 | An `errorHandler` is being overridden in the same scope, which can lead to subtle bugs. | Avoid calling `setErrorHandler` more than once in the same scope. |

Deprecation codes:

| Code | Description | How to solve |
|------|-------------|---------------|
| FSTDEP022 | Accessing deprecated router options on top-level option properties. | Use `options.routerOptions`. |
| FSTDEP023 | `disableRequestLogging` top-level option is deprecated. | Pass a `LogController` instance via the `logController` option with `disableRequestLogging` in its constructor. |
| FSTDEP024 | `requestIdLogLabel` top-level option is deprecated. | Pass a `LogController` instance via the `logController` option with `requestIdLogLabel` in its constructor. |
| FSTDEP025 | Calling `addHttpMethod` for an existing HTTP method without `{ overrideExisting: true }` is deprecated. | Pass `{ overrideExisting: true }` to make the override explicit. |

## Notes

- Warnings/deprecations can be disabled via `NODE_NO_WARNINGS=1`, the `--no-warnings` flag, `NODE_OPTIONS=--no-warnings`, or (for a single code) `--disable-warning=FSTWRN004`. Disabling is not recommended and may cause unexpected behavior.
- Node's own `--no-deprecation`, `--throw-deprecation`, and `--trace-deprecation` flags also apply to `FSTDEP*` codes.
- FSTDEP022-025 reflect v5 API changes; see `guides/migration-v5.md` for the full v4 → v5 migration context.

## Related

- [lts.md](./lts.md)
