---
source: https://orm.drizzle.team/docs/jit-mappers
---

# JIT Mappers

JIT (Just-In-Time) mappers are dynamically generated JavaScript functions that transform database rows into JS objects. Instead of interpreting column metadata at runtime for every row, a JIT mapper compiles a specialized function once and reuses it for all rows in the result set.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/...';

const db = drizzle({ client, jit: true });
```

## Notes

- Disabled by default; enable with the `jit: true` option, available in every driver's config
- On initialization, Drizzle checks whether the `Function` constructor works in the current runtime; if it doesn't (some edge runtimes or CSP-restricted environments), it falls back to regular mappers with a console warning
- Without JIT, the regular mapper loops through column metadata for every row (decoder lookup, codec check, null check, nested path navigation) on every invocation; JIT mappers hardcode this into a generated function body once
- Transcribed from `jit-mappers.mdx`, which lives at the docs root (`src/content/docs/`), not under `pg/` — dialect-independent page

## Related

- [Serverless queries](./perf-serverless.md)
- [Queries performance](./perf-queries.md)
