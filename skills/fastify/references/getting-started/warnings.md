---
source: https://fastify.dev/docs/latest/Reference/Warnings/
---

# Warnings and Deprecations

Fastify uses the Node.js warning event API to notify of deprecated features and coding mistakes. Warnings use the `FSTWRN` prefix, security warnings use `FSTSEC`, deprecations use `FSTDEP`.

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

Security codes:

| Code | Description | How to solve |
|------|-------------|---------------|
| FSTSEC001 | A `RegExp` Content-Type is used that may be vulnerable to a CORS bypass, because it does not anchor the essence MIME type. | Start the `RegExp` with `^` or include `;?` so the essence MIME type is detected correctly. |
| FSTSEC002 | A headers schema references an external `$ref` (a schema registered with `addSchema`) that is not reached by header case normalization. Header names in the referenced schema keep their original case and do not match the lowercased request headers, so case-insensitive assertions such as `required` and `dependencies` may not apply. | Inline the header schema instead of referencing it with an external `$ref`. |
| FSTSEC003 | A headers schema uses a `$ref` inside `propertyNames` that is not reached by header case normalization. Header names held in the referenced schema keep their original case and do not match the lowercased request headers, so a case-insensitive deny-list or allow-list on header names may not apply. | Inline the `propertyNames` constraint instead of referencing it with a `$ref`. |

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

- FSTSEC001 already existed in `lib/warnings.js` at v5.12.1 but was undocumented. The security codes documentation, FSTSEC002 and FSTSEC003 were added in v5.12.6.
- For header name case handling in headers schemas (FSTSEC002 / FSTSEC003), see `validation-serialization/schema-basics.md`.

## Related

- [lts.md](./lts.md)
