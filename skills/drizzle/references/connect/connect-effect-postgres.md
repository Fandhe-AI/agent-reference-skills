---
source: https://orm.drizzle.team/docs/connect-effect-postgres
---

# Drizzle <> Effect Postgres

Drizzle has native support for Effect PostgreSQL connections via the `@effect/sql-pg` driver, exposed through the `drizzle-orm/effect-postgres` package with an Effect-native API that integrates with Effect's service pattern.

## Signature / Usage

```ts
import 'dotenv/config';
import * as PgDrizzle from 'drizzle-orm/effect-postgres';
import { PgClient } from '@effect/sql-pg';
import * as Effect from 'effect/Effect';
import * as Redacted from 'effect/Redacted';
import { sql } from 'drizzle-orm';

const PgClientLive = PgClient.layer({
  url: Redacted.make(process.env.DATABASE_URL!),
});

const program = Effect.gen(function* () {
  // Create the database with default services (no logging, no caching)
  const db = yield* PgDrizzle.makeWithDefaults();

  const result = yield* db.execute<{ id: number }>(sql`SELECT 1 as id`);
  console.log(result);
});

Effect.runPromise(program.pipe(Effect.provide(PgClientLive)));
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `PgDrizzle.makeWithDefaults()` | `Effect` | Quickly creates a Drizzle database instance with sensible defaults (no logging, no caching) |
| `PgDrizzle.make({ schema, relations, casing })` | `Effect` | Creates a Drizzle database instance for composing with custom `EffectLogger`/`EffectCache` services |
| `EffectLogger.Default` / `EffectLogger.layer` / `EffectLogger.fromDrizzle(logger)` / `EffectLogger.layerFromDrizzle(logger)` | `Layer` | No-op logger, Effect-log-based logger, or wrappers for an existing Drizzle `Logger` |
| `EffectCache.Default` / `EffectCache.fromDrizzle(cache)` / `EffectCache.layerFromDrizzle(cache)` | `Layer` | No-op cache, or wrappers for an existing Drizzle `Cache` |

## Notes

- Transcribed from `pg/connect-effect-postgres.mdx`.
- For larger applications, wrap `PgDrizzle.make({ relations })` with `Effect.provide(PgDrizzle.DefaultServices)` and expose it as a `Context.Tag` service for dependency injection.
- `makeWithDefaults()` uses a no-op logger and no-op cache by default; use `EffectLogger.layer` / a custom `EffectCache` to opt into logging or caching.
- Migration (v0 → v1): new driver, no v0 equivalent — Effect PostgreSQL support was added as part of the v1 release (`@effect/sql-pg` integration).

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
